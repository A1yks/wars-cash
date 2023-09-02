import { createSlice } from '@reduxjs/toolkit';

const testSlice = createSlice({
    name: 'testSlice',
    initialState: {
        value: 4,
    },
    reducers: {
        increment: (state) => {
            state.value += 1;
        },
        decrement: (state) => {
            state.value -= 1;
        },
    },
});

export default testSlice;
