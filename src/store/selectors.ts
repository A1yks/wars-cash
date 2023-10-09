import { AppState } from 'store';

export const userSelector = (state: AppState) => state.user;
export const chatDataSelector = (state: AppState) => state.chat;
export const authDataSelector = (state: AppState) => state.auth;
export const paymentsSelector = (state: AppState) => state.payments;
export const configSelector = (state: AppState) => state.siteConfig;
export const gameSelector = (state: AppState) => state.game;
