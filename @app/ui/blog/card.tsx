import React, { FC } from 'react'
import { Post } from '@/@app/models/blog'
import {
    Avatar,
    Badge,
    Group,
    Paper,
    Text,
    Title,
    useMantineTheme,
} from '@mantine/core'
import { useRouter } from 'next/navigation'
import { parseTimeToReadableString } from '@/@app/utils/time'

type BlogPostCardProps = {
    data: Post
}

const BlogPostCard: FC<BlogPostCardProps> = props => {
    const { data } = props
    const theme = useMantineTheme()
    const router = useRouter()
    return (
        <Paper
            my="md"
            onClick={() => {
                router.push(`/blog/${data.id}`)
            }}
            p="md"
            radius="lg"
            shadow="xl"
            sx={{
                transition: 'all ease .5s',
                cursor: 'pointer',
                border: '1px solid black',
                '&:hover': {
                    border: `1px solid ${theme.colors.yellow[5]}`,
                },
            }}
        >
            <Title order={2}>{data?.title}</Title>
            <Group my="md" position="left">
                <Avatar src=" ">NS</Avatar>
                <Text>{data.author}</Text>
            
            </Group>
            <Group my="lg">
                {data?.tags.map((tag: string, i: unknown) => {
                    return (
                        <Badge
                            color="yellow"
                            key={`${tag + i}`}
                            size="md"
                            variant="light"
                        >
                            #{tag}
                        </Badge>
                    )
                })}
            </Group>
        </Paper>
    )
}

export default BlogPostCard
