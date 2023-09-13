import { IUser, PublicUserData } from '@backend/models/User/types';
import { Socket } from 'socket.io';
import { BetData } from '../game/types';

export enum Rooms {
    Chat = 'chat',
    Betting = 'betting',
}

export type MessageData = {
    sender: PublicUserData;
    text: string;
};

export type OnlineData = {
    online: number;
};

export type ClientToServerEvents = {
    joinChat: () => void;
    joinBetting: () => void;
};

export type ServerToClientEvents = {
    onlineChanged: (data: OnlineData) => void;
    message: (data: MessageData) => void;
    bet: (data: BetData) => void;
};

export type InterServerEvents = Record<string, never>;

export type SocketData = {
    userId: string;
};

export type HandshakeAuth = {
    token: string;
};

export type BackendSocket = Socket<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>;
