import { ClientToServerEvents, ServerToClientEvents } from '@backend/services/socket/types';
import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import useAppDispatch from 'hooks/useAppDispatch';
import gameSlice from 'store/reducers/gameSlice';
import useAppSelector from 'hooks/useAppSelector';
import userSlice from 'store/reducers/userSlice';
import lastGamesSlice from 'store/reducers/lastGamesSlice';

const { setBalance } = userSlice.actions;
const { addGameResult } = lastGamesSlice.actions;
const { setGame, setWinner, setDegreesData, resetCustomFields } = gameSlice.actions;

type ClientSocket = Socket<ServerToClientEvents, ClientToServerEvents>;

let socket: ClientSocket;

const SocketContext = React.createContext<typeof socket | null>(null);

function connectToSocket(accessToken: string | null, reconnect = false) {
    console.log('connect', accessToken);
    if (socket === undefined || reconnect) {
        socket = io({
            autoConnect: false,
            auth: { token: accessToken },
        });
    }

    if (!socket.connected) {
        socket.connect();
    }

    return socket;
}

export function useSocket() {
    const contextSocket = useContext(SocketContext);

    if (contextSocket === null) {
        throw new Error('useSocket must be used within a SocketContextProvider');
    }

    return contextSocket;
}

export function SocketContextProvider(props: Props.WithChildren) {
    const [socket, setSocket] = useState<ClientSocket | null>(null);
    const accessToken = useAppSelector((state) => state.auth.token);
    // console.log('token', accessToken);
    // const socket = connectToSocket(accessToken);
    const dispatch = useAppDispatch();

    const reconnect = useCallback(() => {
        console.log('rec inner', accessToken);
        socket?.disconnect();
        setSocket(connectToSocket(accessToken, true));
    }, [accessToken, socket]);

    useEffect(() => {
        console.log(socket?.connected);
        if (socket?.connected) {
            console.log('reconnect', accessToken);
            reconnect();
        }
    }, [accessToken, reconnect, socket]);

    useEffect(() => {
        console.log('effect', accessToken);

        if (socket === null) {
            const connectedSocket = connectToSocket(accessToken);

            console.log('set socket');
            setSocket(connectedSocket);
        }
    }, [accessToken, socket]);

    useEffect(() => {
        if (socket === null) {
            return;
        }

        socket.on('connect', () => {
            socket?.emit('connected');
        });

        socket.on('onlineChanged', ({ online }) => {
            // TODO
            console.log(online);
        });

        socket.on('bet', (gameData) => {
            dispatch(setGame(gameData));
        });

        socket.on('gameEnd', (gameData) => {
            dispatch(setGame(gameData));
            dispatch(resetCustomFields());
        });

        socket.on('winner', (winner) => {
            dispatch(setWinner(winner));
        });

        socket.on('winnerDegrees', (data) => {
            dispatch(setDegreesData(data));
        });

        socket.on('updateBalance', ({ balance }) => {
            dispatch(setBalance(balance));
        });

        socket.on('gameCancelled', (gameData) => {
            dispatch(setGame(gameData));
        });

        socket.on('gameResult', (gameResult) => {
            dispatch(addGameResult(gameResult));
        });

        return () => {
            socket.off('onlineChanged');
            socket.off('bet');
            socket.off('gameEnd');
            socket.off('winner');
            socket.off('winnerDegrees');
            socket.off('updateBalance');
            socket.off('gameCancelled');
            socket.off('gameResult');
        };
    }, [dispatch, socket]);

    return <SocketContext.Provider value={socket}>{props.children}</SocketContext.Provider>;
}
