import { ISiteInfo, SiteInfoTypes } from '@backend/models/SiteInfo/types';
import { createSlice } from '@reduxjs/toolkit';
import { siteInfoApi } from 'store/api/siteInfo';

export type SiteInfoState = {
    pages: {
        [key in SiteInfoTypes]?: ISiteInfo;
    };
};

const initialState: SiteInfoState = {
    pages: {},
};

const siteInfoSlice = createSlice({
    name: 'siteInfo',
    initialState,
    reducers: {},
    extraReducers(builder) {
        function pageExists(state: SiteInfoState, type: SiteInfoTypes) {
            return state.pages[type] !== undefined;
        }

        return builder
            .addMatcher(siteInfoApi.endpoints.getPagesInfo.matchFulfilled, (state, action) => {
                action.payload.data.forEach((page) => {
                    if (!pageExists(state, page.type)) {
                        state.pages[page.type] = page;
                    }
                });
            })
            .addMatcher(siteInfoApi.endpoints.getPageContent.matchFulfilled, (state, action) => {
                state.pages[action.payload.data.type] = action.payload.data;
            })
            .addMatcher(siteInfoApi.endpoints.changePageContent.matchFulfilled, (state, action) => {
                state.pages[action.payload.data.type] = action.payload.data;
            });
    },
});

export default siteInfoSlice;
