import { ClientToServerEvents, ServerToClientEvents } from '@backend/services/socket/types';
import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import useAppDispatch from 'hooks/useAppDispatch';
import gameSlice from 'store/reducers/gameSlice';
import useAppSelector from 'hooks/useAppSelector';
import userSlice from 'store/reducers/userSlice';
import lastGamesSlice from 'store/reducers/lastGamesSlice';
import chatSlice from 'store/reducers/chatSlice';
import { AppState } from 'store';
import { createSelector } from '@reduxjs/toolkit';
import siteConfigSlice from 'store/reducers/siteConfigSlice';

const { setBalance, restrictChatAccess } = userSlice.actions;
const { setOnline, addMessage, deleteMessage, deleteUserMessages } = chatSlice.actions;
const { addGameResult } = lastGamesSlice.actions;
const { setGame, setWinner, setDegreesData, resetCustomFields } = gameSlice.actions;
const { setConfig } = siteConfigSlice.actions;

const tokenSelector = (state: AppState) => state.auth.token;
const userIdSelector = (state: AppState) => state.user?._id;

const tokenAndUserIdSelector = createSelector([tokenSelector, userIdSelector], (token, userId) => ({ token, userId }));

type ClientSocket = Socket<ServerToClientEvents, ClientToServerEvents>;

let socket: ClientSocket;

const SocketContext = React.createContext<typeof socket | null>(null);

function connectToSocket(accessToken: string | null, reconnect = false) {
    if (socket === undefined || reconnect) {
        socket = io({
            autoConnect: false,
            auth: { token: accessToken },
            transports: ['websocket', 'polling'],
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
    const { token: accessToken, userId } = useAppSelector(tokenAndUserIdSelector);
    const dispatch = useAppDispatch();

    const reconnect = useCallback(() => {
        socket?.disconnect();
        setSocket(connectToSocket(accessToken, true));
    }, [accessToken, socket]);

    useEffect(() => {
        if (socket?.connected) {
            reconnect();
        }
    }, [accessToken, reconnect, socket]);

    useEffect(() => {
        if (socket === null) {
            const connectedSocket = connectToSocket(accessToken);
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
            dispatch(setOnline(online));
        });

        socket.on('message', (message) => {
            dispatch(addMessage(message));
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

        socket.on('messageDeleted', (data) => {
            dispatch(deleteMessage(data));
        });

        socket.on('restrictChatAccess', (data) => {
            if (data.userId === userId) {
                dispatch(restrictChatAccess(data));
            }

            dispatch(deleteUserMessages(data));
        });

        socket.on('configUpdated', (data) => {
            dispatch(setConfig(data));
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
            socket.off('message');
            socket.off('messageDeleted');
            socket.off('restrictChatAccess');
            socket.off('configUpdated');
        };
    }, [dispatch, socket, userId]);

    return <SocketContext.Provider value={socket}>{props.children}</SocketContext.Provider>;
}
