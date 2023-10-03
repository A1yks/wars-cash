import http from 'http';
import { Server, Socket } from 'socket.io';
import { BackendSocket, ClientToServerEvents, HandshakeAuth, InterServerEvents, MessageData, Rooms, ServerToClientEvents, SocketData } from './types';
import { ExtendedError } from 'socket.io/dist/namespace';
import { BetTypes, GameData, GameEventPayload } from '../game/types';
import TokensService from '../tokens';
import { TokenPayload } from '@backend/middleware/tokens/types';
import gameInstance from '../game/setup';

namespace SocketService {
    export let io: Server<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>;

    export const sockets = new Map<string, BackendSocket>();

    export function init(httpServer: http.Server) {
        if (io === undefined) {
            io = new Server(httpServer, {
                cors: {
                    origin: '*',
                },
            });

            io.use(verifyAcessToken);
            io.on('connection', setEventListeners);
        }
    }

    export function broadcastOnline() {
        io.emit('onlineChanged', { online: getChatOnline() });
    }

    export function broadcastMessage(data: MessageData) {
        io.to(Rooms.Chat).emit('message', data);
    }

    export function broadcastGame(data: GameData) {
        io.to(Rooms.Game).emit('bet', data);
    }

    export function broadcastWinner(winner: BetTypes) {
        io.to(Rooms.Game).emit('winner', winner);
    }

    export function broadcastWinnerDegrees(data: GameEventPayload['winnerDegrees']) {
        io.to(Rooms.Game).emit('winnerDegrees', data);
    }

    export function broadcastGameEnd(gameData: GameData) {
        io.to(Rooms.Game).emit('gameEnd', gameData);
    }

    export function broadcastData<EventName extends keyof ServerToClientEvents>(
        room: Rooms,
        event: EventName,
        data: Parameters<ServerToClientEvents[EventName]>[0]
    ) {
        if (room === Rooms.All) {
            // @ts-ignore - type bug
            io.emit(event, data);
        } else {
            // @ts-ignore - type bug
            io.to(room).emit(event, data);
        }
    }

    function setEventListeners(socket: BackendSocket) {
        console.log('SOCKET CONNECTED');

        socket.on('connected', () => {
            connectionHandler(socket);
        });

        socket.on('disconnecting', () => {
            socket.leave(Rooms.Chat);
            socket.leave(Rooms.Game);
            socket.to(Rooms.Chat).emit('onlineChanged', { online: getChatOnline() });

            if (socket.data.userId !== undefined) {
                sockets.delete(socket.data.userId.toString());
            }
        });
    }

    function connectionHandler(socket: BackendSocket) {
        if (socket.data.userId !== undefined) {
            sockets.set(socket.data.userId.toString(), socket);
            socket.join(Rooms.Chat);
        }

        socket.join(Rooms.Game);

        broadcastGame(gameInstance.getGameData());

        if (gameInstance.isSpinning) {
            socket.emit('winnerDegrees', {
                degrees: gameInstance.rotation,
                progress: gameInstance.spinningProgress,
            });
        }

        broadcastOnline();
    }

    function getChatOnline() {
        return io.sockets.adapter.rooms.get(Rooms.Chat)?.size || 0;
    }

    async function verifyAcessToken(
        socket: Socket<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>,
        next: (err?: ExtendedError | undefined) => void
    ) {
        const { token } = socket.handshake.auth as HandshakeAuth;
        console.log('handshake', token);

        if (!token) {
            next();
            return;
        }

        try {
            const { userId } = (await TokensService.verifyToken(token)) as TokenPayload;

            socket.data.userId = userId;

            next();
        } catch {
            next(new Error('Ошибка авторизации'));
        }
    }
}

export default SocketService;
