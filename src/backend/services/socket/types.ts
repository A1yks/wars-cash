import { IUser, PublicUserData } from '@backend/models/User/types';
import { Socket } from 'socket.io';
import { BetData, BetTypes, GameData, GameEventPayload } from '../game/types';
import { Types } from 'mongoose';
import { IGameResult } from '@backend/models/GameResult/types';
import { IChatMessage } from '@backend/models/ChatMessage/types';
import { ISiteConfig } from '@backend/models/SiteConfig/types';

export enum Rooms {
    Chat = 'chat',
    Game = 'game',
    All = 'all',
}

export type MessageData = {
    _id: Types.ObjectId | string;
    sender: PublicUserData;
    text: string;
};

export type OnlineData = {
    online: number;
};

export type ClientToServerEvents = {
    connected: () => void;
};

export type BalanceData = {
    balance: number;
};

export type DeleteMessageData = {
    messageId: IChatMessage['_id'];
};

export type ModerationData = {
    userId: IUser['_id'];
    period?: IUser['chatTimeout'];
    reason?: string;
};

export type ServerToClientEvents = {
    onlineChanged: (data: OnlineData) => void;
    message: (data: MessageData) => void;
    bet: (data: GameData) => void;
    winner: (winner: BetTypes) => void;
    gameEnd: (gameData: GameData) => void;
    gameResult: (gameData: IGameResult) => void;
    gameCancelled: (gameData: GameData) => void;
    spinning: (progress: number) => void;
    winnerDegrees: (data: GameEventPayload['winnerDegrees']) => void;
    updateBalance: (data: BalanceData) => void;
    messageDeleted: (data: DeleteMessageData) => void;
    restrictChatAccess: (data: ModerationData) => void;
    configUpdated: (data: Partial<Omit<ISiteConfig, '_id'>>) => void;
};

export type InterServerEvents = Record<string, never>;

export type SocketData = {
    userId: IUser['_id'];
};

export type HandshakeAuth = {
    token: string;
};

export type BackendSocket = Socket<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>;
