import { configureStore } from '@reduxjs/toolkit'
import { authSlice } from './slices/auth'
import { useDispatch } from 'react-redux'
import { blogApi } from './api/blog'

export function makeStore() {
    return configureStore({
        reducer: {
            [authSlice.name]: authSlice.reducer,
            [blogApi.reducerPath]: blogApi.reducer,
        },
        middleware: getDefaultMiddleware =>
            getDefaultMiddleware({ serializableCheck: false }).concat(
                blogApi.middleware,
            ),
        devTools: true,
    })
}

export const store = makeStore()

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()
export * from './slices/auth'
