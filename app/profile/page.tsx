'use client'
import Header from '@/@app/ui/header'
import {
    Avatar,
    Box,
    Button,
    Center,
    Container,
    Group,
    Paper,
    Tabs,
    Text,
    Title,
} from '@mantine/core'
import { IconLink } from '@tabler/icons-react'
import React from 'react'
import ProfileSettings from '@/@app/profile/profileSettings'

const EditProfile = () => {
    return (
        <Box>
            <Header />
            <Container pt="xl" size="lg">
                <Tabs color="yellow" defaultValue="settings" variant="outline">
                    <Tabs.List>
                        <Tabs.Tab value="settings">Account Settings</Tabs.Tab>
                        <Tabs.Tab value="saved">Saved</Tabs.Tab>
                    </Tabs.List>
                    <Tabs.Panel py="lg" value="settings">
                        <ProfileSettings />
                    </Tabs.Panel>
                    <Tabs.Panel value="saved">Saved</Tabs.Panel>
                </Tabs>
            </Container>
        </Box>
    )
}

export default EditProfile
