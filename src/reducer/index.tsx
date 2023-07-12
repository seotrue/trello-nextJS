import { combineReducers } from '@reduxjs/toolkit';
import { boardReducer } from "@/reducer/BoardReducer";
import {HYDRATE} from "next-redux-wrapper";

let { boardStore } = boardReducer;
export const appReducer = combineReducers({
    boardStore,
});

const rootReducer = (state, action) => {
    switch(action.type) {
        case HYDRATE:
            return action.payload;
        default: {
            // role
            return appReducer(state, action);
        }
    }
};

export default rootReducer;
