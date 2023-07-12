import { combineReducers } from '@reduxjs/toolkit';
import { boardReducer } from "@/reducer/BoardReducer";
import {HYDRATE} from "next-redux-wrapper";

let { page } = boardReducer;
export const appReducer = combineReducers({
    page
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
