import React from 'react'
import { Box, Container, Group, Text } from '@mantine/core'

const footerLinks = [
    {
        id: 'about-link',
        name: 'About',
        route: '/about',
    },
    {
        id: 'privacy-and-terms-link',
        name: 'Privacy & Terms',
        route: '/terms',
    },
    {
        id: 'join-link',
        name: 'Join',
        route: '/join',
    },
]
const Footer = () => {
    return (
        <Box
            py={20}
            sx={{
                position: 'sticky',
            }}
        >
            <Container size="xl">
                <Group position="apart">
                    <Text>@2023 CodingJutsu</Text>

                    <Group>
                        {footerLinks.map(_link => {
                            return (
                                <Text
                                    key={_link.id}
                                    sx={{
                                        cursor: 'pointer',
                                        '&:hover': {
                                            textDecoration: 'underline',
                                        },
                                    }}
                                >
                                    {_link.name}
                                </Text>
                            )
                        })}
                    </Group>
                </Group>
            </Container>
        </Box>
    )
}

export default Footer
