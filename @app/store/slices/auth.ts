import { UserInfo } from 'firebase/auth'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { auth } from '../../config/firebase'
import { parseFirebaseErrFromCodeToText } from '@/@app/utils/error'
import {
    ForgotPasswordParams,
    LoginParams,
    RegisterParams,
} from '@/@app/models/auth'

type AuthState = {
    status: 'idle' | 'processing' | 'success' | 'failed'
    error?: string | null | unknown
    user?: UserInfo | null
}

const initialState: AuthState = {
    status: 'idle',
    error: null,
    user: null,
}

export const sendUserForgotPasswordEmail = createAsyncThunk(
    '/forgot',
    async (schema: ForgotPasswordParams, { rejectWithValue }) => {
        const { email } = schema
        try {
            const response = await auth.sendPasswordResetEmail(email)
            return response
        } catch (error: any) {
            return rejectWithValue(parseFirebaseErrFromCodeToText(error.code))
        }
    },
)

export const logOutUser = createAsyncThunk(
    '/logout',
    async (_, { rejectWithValue }) => {
        try {
            const response = await auth.signOut()
            return response
        } catch (error: any) {
            return rejectWithValue(parseFirebaseErrFromCodeToText(error.code))
        }
    },
)

export const registerUserWithEmailAndPassword = createAsyncThunk(
    '/register',
    async (schema: RegisterParams, { rejectWithValue }) => {
        const { email, password, name } = schema
        try {
            const response = await auth.createUserWithEmailAndPassword(
                email,
                password,
            )
            const user = response.user
            if (user != null) {
                try {
                    await user.updateProfile({
                        displayName: name,
                    })
                } catch (error: any) {
                    return rejectWithValue(
                        parseFirebaseErrFromCodeToText(error.code),
                    )
                }
            }
            return user
        } catch (error: any) {
            return rejectWithValue(parseFirebaseErrFromCodeToText(error.code))
        }
    },
)

export const loginUserWithEmailAndPassword = createAsyncThunk(
    '/login',
    async (schema: LoginParams, { rejectWithValue }) => {
        const { email, password } = schema
        try {
            const response = await auth.signInWithEmailAndPassword(
                email,
                password,
            )
            const user = response.user
            return user
        } catch (error: any) {
            return rejectWithValue(parseFirebaseErrFromCodeToText(error.code))
        }
    },
)

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        clearState: () => initialState,
        setUser: (state, action) => {
            state.user = action.payload
        },
    },
    extraReducers: builder => {
        builder.addCase(
            loginUserWithEmailAndPassword.fulfilled,
            (state, action) => {
                state.status = 'success'
                state.user = action.payload
            },
        )
        builder.addCase(loginUserWithEmailAndPassword.pending, state => {
            state.status = 'processing'
            state.error = null
        })
        builder.addCase(
            loginUserWithEmailAndPassword.rejected,
            (state, action) => {
                state.status = 'failed'
                state.error = action.payload
            },
        )
        builder.addCase(
            registerUserWithEmailAndPassword.fulfilled,
            (state, action) => {
                state.status = 'success'
                state.user = action.payload
            },
        )
        builder.addCase(registerUserWithEmailAndPassword.pending, state => {
            state.status = 'processing'
            state.error = null
        })
        builder.addCase(
            registerUserWithEmailAndPassword.rejected,
            (state, action) => {
                state.status = 'failed'
                state.error = action.payload
            },
        )
        builder.addCase(logOutUser.fulfilled, state => {
            state.status = 'success'
            state.user = null
        })
        builder.addCase(logOutUser.pending, state => {
            state.status = 'processing'
        })
        builder.addCase(logOutUser.rejected, (state, action) => {
            state.status = 'failed'
            state.error = action.payload
        })

        builder.addCase(sendUserForgotPasswordEmail.fulfilled, state => {
            state.status = 'success'
        })
        builder.addCase(sendUserForgotPasswordEmail.pending, state => {
            state.status = 'processing'
        })
        builder.addCase(
            sendUserForgotPasswordEmail.rejected,
            (state, action) => {
                state.status = 'failed'
                state.error = action.payload
            },
        )
    },
})
