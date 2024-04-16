'use client'
import React from 'react'
import {
    Avatar,
    Box,
    Divider,
    Group,
    Image,
    LoadingOverlay,
    Paper,
    Text,
    Title,
} from '@mantine/core'
import { useFetchPostQuery } from '@/@app/store/api/blog'
import { useParams } from 'next/navigation'
import { parseTimeToReadableString } from '@/@app/utils/time'
import { useDisclosure } from '@mantine/hooks'
import ReactionsSegment from '@/@app/blog/reaction-segment'
import SavesSegment from '@/@app/blog/saves-segment'
import ShareModal from '@/@app/blog/share-modal'
import Output from 'editorjs-react-renderer'
const SingleBlogPost = () => {
    const { id } = useParams()
    const { data, isUninitialized, isLoading, isFetching } = useFetchPostQuery({
        id: id,
    })
    const [opened, { open, close }] = useDisclosure(false)
    const parseContentToJSON = () => {
        try {
            if (data) {
                const output = JSON.parse(data?.content)
                return output
            }
        } catch (e) {
            console.log(e)
        }
    }
    return (
        <Paper
            p="lg"
            shadow="lg"
            sx={{
                width: '100%',
            }}
        >
            <LoadingOverlay
                loaderProps={{
                    size: 'lg',
                    color: 'yellow',
                    variant: 'dots',
                }}
                visible={(isLoading || isFetching) && isUninitialized}
            />
            <ShareModal close={close} id={id} opened={opened} />
            <Title>{data?.title}</Title>
            <Group my="sm">
                <Avatar></Avatar>
                <Box>
                    <Text>{data?.author}</Text>
                    <Text color="dimmed" size="sm">
                        {parseTimeToReadableString(
                            `${data?.updatedAt.toDate().toString()}`,
                        )}
                    </Text>
                </Box>
            </Group>
            <Image alt="demo-img" src={data?.coverImage} w="100%" />
            <Output data={parseContentToJSON()} />
            <Divider variant="dashed" />
            <ReactionsSegment />
            <SavesSegment shareModalHandler={open} />
        </Paper>
    )
}

export default SingleBlogPost

