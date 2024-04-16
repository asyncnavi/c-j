import { MantineProvider, Text, Title } from '@mantine/core'
import React from 'react'
import Link from 'next/link'

const CJLogo = () => {
    return (
        <MantineProvider
            theme={{ colorScheme: 'dark' }}
            withGlobalStyles
            withNormalizeCSS
        >
            <Link href="/" style={{ textDecoration: 'none' }}>
                <Title color="white" order={1}>
                    Coding{' '}
                    <Text c="yellow" span>
                        Jutsu
                    </Text>{' '}
                </Title>
            </Link>
        </MantineProvider>
    )
}

export default CJLogo
