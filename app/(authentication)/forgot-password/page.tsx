'use client'
import React, { useEffect } from 'react'
import {
    Box,
    Button,
    Divider,
    Group,
    LoadingOverlay,
    Text,
    TextInput,
    Title,
} from '@mantine/core'
import Link from 'next/link'
import { ForgotPasswordSchema } from '@/@app/validators'
import {
    RootState,
    sendUserForgotPasswordEmail,
    useAppDispatch,
} from '@/@app/store'
import { promptError, promptSuccess } from '@/@app/ui/prompt'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'

type Inputs = { email: string }

const ForgotPasswordPage = () => {
    const dispatch = useAppDispatch()
    const router = useRouter()
    const { user, error, status } = useSelector(
        (state: RootState) => state.auth,
    )
    const { register, handleSubmit, formState } = useForm<Inputs>({
        resolver: ForgotPasswordSchema,
    })

    const forgotUserPassword = (values: Inputs) => {
        dispatch(sendUserForgotPasswordEmail(values))
            .unwrap()
            .then(() => {
                promptSuccess(
                    'We send an email to your email address! Go and reset password',
                )
                router.push('/login')
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
    }, [dispatch, router, user, error, status])

    return (
        <Box>
            <Title order={1}>Forgot Password?</Title>
            <LoadingOverlay
                loaderProps={{
                    size: 'lg',
                    color: 'yellow',
                    variant: 'dots',
                }}
                visible={status === 'processing'}
            />
            <form onSubmit={handleSubmit(forgotUserPassword)}>
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
                        Go back to? <Link href="/login">Login</Link>{' '}
                    </Text>
                </Box>
            </form>
        </Box>
    )
}
export default ForgotPasswordPage
