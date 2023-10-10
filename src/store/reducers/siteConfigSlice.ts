import { ISiteConfig } from '@backend/models/SiteConfig/types';
import { Roles } from '@backend/models/User/types';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { siteConfigApi } from 'store/api/siteConfig';

export type SiteConfigState = Omit<ISiteConfig, '_id'> & { isAdminConfigLoaded: boolean };

export const initialState: SiteConfigState = {
    minWithdrawalAmount: 100,
    chatMessagesToSave: 100,
    randomOrgApiKey: '',
    spinDuration: 10,
    betsTime: 10,
    sitePercent: 5,
    bonuses: {
        [Roles.User]: 10,
        [Roles.Vip]: 15,
        [Roles.Premium]: 20,
    },
    isAdminConfigLoaded: false,
};

const siteConfigSlice = createSlice({
    name: 'siteConfig',
    initialState,
    reducers: {
        setConfig(state, action: PayloadAction<Partial<SiteConfigState>>) {
            return { ...state, ...action.payload };
        },
    },
    extraReducers(builder) {
        return builder
            .addMatcher(siteConfigApi.endpoints.getConfig.matchFulfilled, (state, action) => {
                return { ...state, ...action.payload.data, isAdminConfigLoaded: true };
            })
            .addMatcher(siteConfigApi.endpoints.getPublicConfig.matchFulfilled, (state, action) => {
                return { ...state, ...action.payload.data };
            })
            .addMatcher(siteConfigApi.endpoints.changeConfig.matchFulfilled, (state, action) => {
                return { ...state, ...action.payload.data };
            });
    },
});

export default siteConfigSlice;
