import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper'
import rootReducer from "@/reducer";

const makeStore = () => {
    const store = configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({
                serializableCheck: false,
            }), // 미들웨어를 정의해주도록 합니다.
        devTools: process.env.NODE_ENV !== 'production', // devTool 의 옵션을 선택합니다.
    });
     return store
}

const wrapper = createWrapper(makeStore, {
    debug: process.env.NODE_ENV !== 'production'
})

export default wrapper