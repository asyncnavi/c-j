'use client'
import { Container } from '@mantine/core'
import React from 'react'
import Header from '@/@app/ui/header'

export default function PodcastLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <Container size="xl">
            <Header />
            {children}
        </Container>
    )
}
