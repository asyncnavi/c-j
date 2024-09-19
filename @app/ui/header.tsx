'use client'
import React from 'react'
import {
    Avatar,
    Box,
    Button,
    Container,
    Group,
    LoadingOverlay,
    Menu,
    Text,
    useMantineTheme,
} from '@mantine/core'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import CJLogo from '@/@app/ui/logo'
import {
    IconBookmarks,
    IconLogout,
    IconSchool,
    IconUserEdit,
} from '@tabler/icons-react'
import { useSelector } from 'react-redux'
import { authSlice, logOutUser, RootState, useAppDispatch } from '../store'
import { promptSuccess } from './prompt'

import { collection, doc, writeBatch } from 'firebase/firestore'
import { db } from '../config/firebase'

const NavLinks: React.FC<{
    links: {
        id: string
        href: string
        label: string
    }[]
}> = props => {
    const theme = useMantineTheme()

    return (
        <Group>
            {props.links.map(link => {
                return (
                    <Link
                        href={link.href}
                        key={link.id}
                        style={{ textDecoration: 'none' }}
                    >
                        <Text
                            color="white"
                            size="xl"
                            sx={{
                                transition: 'all .3s ease-in',
                                '&:hover': {
                                    color: theme.colors.yellow[6],
                                    textDecoration: 'underline',
                                },
                            }}
                        >
                            {link.label}
                        </Text>
                    </Link>
                )
            })}
        </Group>
    )
}

type ProfileDropDownProps = {
    displayName?: string
    photoURL?: string | null
    email?: string | null
    logOutHandler: React.MouseEventHandler<HTMLButtonElement>
}

const ProfileDropdown: React.FC<ProfileDropDownProps> = props => {
    const router = useRouter()

    return (
        <Menu position={'bottom-end'} shadow="md" width={180}>
            <Menu.Target>
                <Avatar
                    radius="xl"
                    src={props.photoURL}
                    sx={{
                        cursor: 'pointer',
                    }}
                >
                    {props.displayName && props.displayName[0]}
                </Avatar>
            </Menu.Target>

            <Menu.Dropdown>
                <Menu.Item>
                    <Box>
                        <Text>{props.displayName || 'Navraj Sandhu'}</Text>
                        <Text color="dimmed" size="sm">
                            {props.email}
                        </Text>
                    </Box>
                </Menu.Item>
                <Menu.Item
                    icon={<IconUserEdit size={14} />}
                    onClick={() => router.push('/blog/create')}
                >
                    Create
                </Menu.Item>
                <Menu.Divider />
                <Menu.Item
                    icon={<IconUserEdit size={14} />}
                    onClick={() => router.push('/profile')}
                >
                    Edit Profile
                </Menu.Item>
                <Menu.Item icon={<IconBookmarks size={14} />}>Saved</Menu.Item>
                <Menu.Item icon={<IconSchool size={14} />}>
                    My courses
                </Menu.Item>
                <Menu.Divider />

                <Menu.Item
                    color="red"
                    icon={<IconLogout size={14} />}
                    onClick={props.logOutHandler}
                >
                    Logout
                </Menu.Item>
            </Menu.Dropdown>
        </Menu>
    )
}

const Header = () => {
    const router = useRouter()
    const { user, status } = useSelector((state: RootState) => state.auth)
    const { clearState } = authSlice.actions
    const dispatch = useAppDispatch()

    const logOutCurrentUser = () => {
        dispatch(logOutUser())
            .unwrap()
            .then(() => {
                promptSuccess('Logged out successfully')
                router.push('/')
            })
            .catch(() => {
                // eslint-disable-next-line no-console
                console.log('SOMETHING_WENT_WRONG_PLEASE_CONTACT_DEVELOPER')
            })
        dispatch(clearState())
    }
    const HeaderLinks = [
        {
            id: '1',
            href: '/blog',
            label: 'Blog',
        },
        { id: '2', href: '/podcast', label: 'Podcast' },
        {
            id: '3',
            href: '/courses',
            label: 'Courses',
        },
    ]

    return (
        <Box>
            <Container py="md" size="xl">
                <LoadingOverlay
                    loaderProps={{
                        size: 'lg',
                        color: 'yellow',
                        variant: 'dots',
                    }}
                    visible={status === 'processing'}
                />

                <Group position="apart">
                    <CJLogo />
                    <Group>
                        <NavLinks links={HeaderLinks} />
                        {user !== null ? (
                            <ProfileDropdown
                                displayName={user?.displayName}
                                email={user?.email}
                                logOutHandler={() => {
                                    logOutCurrentUser()
                                }}
                                photoURL={user?.photoURL}
                            />
                        ) : (
                            <Button
                                color="yellow"
                                ml="md"
                                onClick={() => router.push('/login')}
                                radius="xl"
                                size="lg"
                                variant="filled"
                            >
                                Login
                            </Button>
                        )}
                    </Group>
                </Group>
            </Container>
        </Box>
    )
}

export default Header
