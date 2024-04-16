'use client'
import React from 'react'
import {
    Box,
    Button,
    Divider,
    Group,
    Paper,
    Text,
    TextInput,
    ThemeIcon,
    Title,
    useMantineTheme,
} from '@mantine/core'
import {
    IconChevronLeft,
    IconHeadset,
    IconPlayerPlay,
} from '@tabler/icons-react'

const PodcastCard: React.FC<{ episodeNo: number }> = props => {
    const theme = useMantineTheme()

    return (
        <Paper
            my="md"
            p="md"
            radius="lg"
            shadow="lg"
            sx={{
                transition: 'all ease .5s',
                cursor: 'pointer',
                border: '1px solid black',
                '&:hover': {
                    border: `1px solid ${theme.colors.yellow[5]}`,
                },
            }}
        >
            <Title color="gray" order={1}>
                {props.episodeNo < 10 ? `0${props.episodeNo}` : props.episodeNo}{' '}
                {'.'}
            </Title>
            <Title order={2}>Horton hears a linux user ?</Title>
            <Text color="gray" size="lg">
                Why we feel recent attacks by the Software Freedom Conservancy
                against Microsoft are costing the SFC serious credibility.
            </Text>
            <Button
                color="yellow"
                leftIcon={<IconPlayerPlay />}
                my="lg"
                radius="xl"
                variant="light"
            >
                43 min
            </Button>
        </Paper>
    )
}

const PodcastPage = () => {
    return (
        <Box p="lg">
            <Group my="md">
                <ThemeIcon color="gray" radius="xl" size="xl" variant="light">
                    <IconChevronLeft />
                </ThemeIcon>
                <Title order={2}>
                    {' '}
                    <IconHeadset size={36} /> PODCAST
                </Title>
            </Group>
            <TextInput
                placeholder="Search for podcast.."
                radius="xl"
                size="xl"
            />
            <Divider my="md" variant="dashed" />

            <Box>
                {Array(10)
                    .fill(0)
                    .map((v, i) => {
                        return <PodcastCard episodeNo={i} key={i + v} />
                    })}
            </Box>
        </Box>
    )
}

export default PodcastPage
