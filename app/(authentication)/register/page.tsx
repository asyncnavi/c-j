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
import { RegistrationSchemaResolver } from '@/@app/validators'
import {
    registerUserWithEmailAndPassword,
    RootState,
    useAppDispatch,
} from '@/@app/store'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/navigation'
import { promptError, promptSuccess } from '@/@app/ui/prompt'
import { IconEyeCheck, IconEyeOff, IconLock } from '@tabler/icons-react'

type Inputs = { name: string; email: string; password: string }

const RegisterPage = () => {
    const dispatch = useAppDispatch()
    const router = useRouter()
    const { user, error, status } = useSelector(
        (state: RootState) => state.auth,
    )
    const { register, handleSubmit, formState } = useForm<Inputs>({
        resolver: RegistrationSchemaResolver,
    })

    const registerUser = (values: Inputs) => {
        dispatch(registerUserWithEmailAndPassword(values))
            .unwrap()
            .then(() => {
                promptSuccess('Successfully registered')
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
                <Title order={1}>Register</Title>
                <LoadingOverlay
                    loaderProps={{
                        size: 'lg',
                        color: 'yellow',
                        variant: 'dots',
                    }}
                    visible={status === 'processing'}
                />
                <form onSubmit={handleSubmit(registerUser)}>
                    <Box my="md">
                        <TextInput
                            color="yellow"
                            label="Name"
                            my="md"
                            radius="xl"
                            size="lg"
                            {...register('name')}
                            error={formState.errors?.name?.message}
                        />
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
                            Already have an account ?{' '}
                            <Link href="/login">Login</Link>{' '}
                        </Text>
                    </Box>
                </form>
            </>
        </Box>
    )
}
export default RegisterPage
