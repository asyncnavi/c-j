'use client'
import React from 'react'
import { Box, Button, Container, Grid, Image, Title } from '@mantine/core'
import { IconArrowRight } from '@tabler/icons-react'

const Hero = () => {
    return (
        <Box
            py={20}
            sx={{
                minHeight: 'calc(100vh - 184px)',
            }}
        >
            <Container size="xl">
                <Grid align="center">
                    <Grid.Col md={6} orderMd={1} orderXs={2}>
                        <Title order={1} size={60}>
                            Master your coding skills by learning new coding
                            jutsu{"'"}s.
                        </Title>

                        <Button
                            color="yellow"
                            my="xl"
                            radius="xl"
                            rightIcon={<IconArrowRight />}
                            size="xl"
                        >
                            Let{"'s"} explore.
                        </Button>
                    </Grid.Col>
                    <Grid.Col md={6} orderMd={2} orderXs={1}>
                        <Image alt="hero-img" src="/assets/hero-img.png" />
                    </Grid.Col>
                </Grid>
            </Container>
        </Box>
    )
}

export default Hero
