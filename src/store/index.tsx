import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { persistStore, persistReducer, createTransform } from 'redux-persist';
import storage from 'redux-persist/lib/storage'
import { createWrapper } from 'next-redux-wrapper'
import rootReducer from "@/reducer";

const persistConfig = {
    key: 'root',
    storage
}
const persistedReducer = persistReducer(persistConfig, rootReducer)

const makeStore = () => {
    const store = configureStore({
        reducer: persistedReducer,
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