'use client'
import { auth } from '@/@app/config/firebase'
import { darkTheme } from '@/@app/config/theme'
import { authSlice, store, useAppDispatch } from '@/@app/store'
import { Box, MantineProvider, useEmotionCache } from '@mantine/core'
import { Notifications } from '@mantine/notifications'
import { useEffect } from 'react'
import { Provider } from 'react-redux'
import { useServerInsertedHTML } from 'next/navigation'

const AuthWrapper = ({ children }: { children: React.ReactNode }) => {
    const dispatch = useAppDispatch()
    const { setUser } = authSlice.actions
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            dispatch(setUser(user))
        })

        return () => unsubscribe()
    }, [])
    return <Box>{children}</Box>
}

const RootRegistery = ({ children }: { children: React.ReactNode }) => {
    const cache = useEmotionCache()

    cache.compat = true

    useServerInsertedHTML(() => (
        <style
            dangerouslySetInnerHTML={{
                __html: Object.values(cache.inserted).join(' '),
            }}
            data-emotion={`${cache.key} ${Object.keys(cache.inserted).join(
                ' ',
            )}`}
        />
    ))

    return (
        <Provider store={store}>
            <AuthWrapper>
                <Notifications position="top-center" />
                <MantineProvider
                    theme={darkTheme}
                    withCSSVariables
                    withGlobalStyles
                >
                    {children}
                </MantineProvider>
            </AuthWrapper>
        </Provider>
    )
}

export default RootRegistery
