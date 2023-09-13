import http from 'http';
import { Server, Socket } from 'socket.io';
import { BackendSocket, ClientToServerEvents, HandshakeAuth, InterServerEvents, MessageData, Rooms, ServerToClientEvents, SocketData } from './types';
import { ExtendedError } from 'socket.io/dist/namespace';
import { BetData } from '../game/types';

namespace SocketService {
    export let io: Server<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>;

    export function init(httpServer: http.Server) {
        if (io === undefined) {
            io = new Server(httpServer, {
                cors: {
                    origin: '*',
                },
            });

            // io.use(verifyAcessToken);
            io.on('connection', setEventListeners);
        }
    }

    export function broadcastMessage(data: MessageData) {
        io.to(Rooms.Chat).emit('message', data);
    }

    export function broadcastBet(data: BetData) {
        io.to(Rooms.Betting).emit('bet', data);
    }

    export function broadcastData<EventName extends keyof ServerToClientEvents>(
        room: Rooms,
        event: EventName,
        data: Parameters<ServerToClientEvents[EventName]>[0]
    ) {
        // @ts-ignore - type bug
        io.to(room).emit(event, data);
    }

    function setEventListeners(socket: BackendSocket) {
        socket.on('joinChat', () => {
            socket.join(Rooms.Chat);
            socket.to(Rooms.Chat).emit('onlineChanged', { online: getChatOnline() + 1 });
        });

        socket.on('joinBetting', () => {
            socket.join(Rooms.Betting);
        });

        socket.on('disconnecting', () => {
            socket.leave(Rooms.Chat);
            socket.leave(Rooms.Betting);
            socket.to(Rooms.Chat).emit('onlineChanged', { online: getChatOnline() });
        });
    }

    function getChatOnline() {
        return io.sockets.adapter.rooms.get(Rooms.Chat)?.size || 0;
    }

    // async function verifyAcessToken(
    //     socket: Socket<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>,
    //     next: (err?: ExtendedError | undefined) => void
    // ) {
    //     const { token } = socket.handshake.auth as HandshakeAuth;
    //     try {
    //         const { userId } = (await TokensService.verifyToken(token)) as TokenPayload;
    //         socket.data.userId = userId;
    //         next();
    //     } catch {
    //         next(new Error('Authentication error'));
    //     }
    // }
}

export default SocketService;
