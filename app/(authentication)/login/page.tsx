'use client'

import React, { useEffect } from 'react'
import {
    Box,
    Button,
    Divider,
    Group,
    LoadingOverlay,
    PasswordInput,
    Text,
    TextInput,
    Title,
} from '@mantine/core'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { LoginSchemaResolver } from '@/@app/validators'
import {
    loginUserWithEmailAndPassword,
    RootState,
    useAppDispatch,
} from '@/@app/store'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/navigation'
import { IconEyeCheck, IconEyeOff, IconLock } from '@tabler/icons-react'
import { promptError } from '@/@app/ui/prompt'

type Inputs = { email: string; password: string }

const LoginPage = () => {
    const dispatch = useAppDispatch()
    const router = useRouter()
    const { user, error, status } = useSelector(
        (state: RootState) => state.auth,
    )
    const { register, handleSubmit, formState } = useForm<Inputs>({
        resolver: LoginSchemaResolver,
    })

    const login = (values: Inputs) => {
        dispatch(loginUserWithEmailAndPassword(values))
            .unwrap()
            .then(() => {
                router.push('/')
            })
            .catch(() => {
                // eslint-disable-next-line no-console
                console.log('SOMETHING_WENT_WRONG_PLEASE_CONTACT_DEVELOPER')
            })
    }

    useEffect(() => {
        if (error) {
            promptError(`${error}`)
        }
        if (user !== null) {
            router.push('/')
        }
    }, [dispatch, router, user, error, status])

    return (
        <Box>
            <>
                <Title order={1}>Login</Title>
                <LoadingOverlay
                    loaderProps={{
                        size: 'lg',
                        color: 'yellow',
                        variant: 'dots',
                    }}
                    visible={status === 'processing'}
                />
                <form onSubmit={handleSubmit(login)}>
                    <Box my="md">
                        <TextInput
                            color="yellow"
                            label="Email"
                            my="md"
                            radius="xl"
                            size="lg"
                            {...register('email')}
                            error={formState.errors?.email?.message}
                        />
                        <PasswordInput
                            color="yellow"
                            label="Password"
                            my="md"
                            radius="xl"
                            size="lg"
                            {...register('password')}
                            error={formState.errors?.password?.message}
                            icon={<IconLock size="1rem" />}
                            visibilityToggleIcon={({ reveal, size }) =>
                                reveal ? (
                                    <IconEyeOff size={size} />
                                ) : (
                                    <IconEyeCheck size={size} />
                                )
                            }
                        />
                        <Link href="/forgot-password">Forgot Password ?</Link>
                        <Group position="right">
                            <Button
                                color="yellow"
                                ml="auto"
                                radius="xl"
                                size="lg"
                                type="submit"
                            >
                                Continue
                            </Button>
                        </Group>

                        <Divider my="md" variant="dashed" />
                        <Text>
                            Don{"'"}t have an account ?{' '}
                            <Link href="/register">Register</Link>{' '}
                        </Text>
                    </Box>
                </form>
            </>
        </Box>
    )
}
export default LoginPage
