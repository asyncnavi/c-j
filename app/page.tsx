'use client'
import React from 'react'
import { Box } from '@mantine/core'
import Header from '@/@app/ui/header'
import Hero from '@/app/(home)/hero'
import Footer from '@/app/(home)/footer'

export default function Home() {
    return (
        <Box>
            <Header />
            <Hero />
            <Footer />
        </Box>
    )
}
