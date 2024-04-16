'use client'
import React from 'react'
import {
    Box,
    Divider,
    Group,
    LoadingOverlay,
    TextInput,
    ThemeIcon,
    Title,
} from '@mantine/core'
import { IconChevronLeft, IconSearch } from '@tabler/icons-react'
import { useFetchPostsQuery } from '@/@app/store/api/blog'
import { Post } from '@/@app/models/blog'
import BlogPostCard from '@/@app/ui/blog/card'

const BlogPage = () => {
    const { data, isLoading, isFetching } = useFetchPostsQuery()

    return (
        <Box p="lg">
            <LoadingOverlay
                loaderProps={{
                    size: 'lg',
                    color: 'yellow',
                    variant: 'dots',
                }}
                visible={isLoading || isFetching}
            />
            <Group my="md">
                <ThemeIcon color="gray" radius="xl" size="xl" variant="light">
                    <IconChevronLeft />
                </ThemeIcon>
                <Title order={2}>BLOG</Title>
                <TextInput
                    icon={<IconSearch />}
                    placeholder="Search for blog.."
                    radius="xl"
                    size="xl"
                    w="100%"
                />
            </Group>
            <Divider my="md" variant="dashed" />
            <Box>
                {data?.map((b: Post) => {
                    return <BlogPostCard data={b} key={b.id} />
                })}
            </Box>
        </Box>
    )
}

export default BlogPage
