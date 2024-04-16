'use client'
import { Box, Container, Paper } from '@mantine/core'
import CJLogo from '@/@app/ui/logo'
import React from 'react'

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <Container size="xl">
            <Box py="lg">
                <CJLogo />
            </Box>
            <Box
                sx={{
                    minHeight: '90vh',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Paper
                    p="lg"
                    shadow="lg"
                    sx={{ width: '100%', maxWidth: '400px' }}
                >
                    {children}
                </Paper>
            </Box>
        </Container>
    )
}
