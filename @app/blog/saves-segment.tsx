import React from 'react'
import { RootState } from '@/@app/store'
import {
    useFetchSavesQuery,
    useUpdateSavesMutation,
} from '@/@app/store/api/blog'
import { promptError } from '@/@app/ui/prompt'
import { useParams } from 'next/navigation'
import { Button, Group } from '@mantine/core'
import {
    IconBookmark,
    IconBookmarkFilled,
    IconShare,
} from '@tabler/icons-react'
import { useSelector } from 'react-redux'

type SavesSegmentProps = {
    shareModalHandler: () => void
}

const SavesSegment: React.FC<SavesSegmentProps> = ({ shareModalHandler }) => {
    const { id } = useParams()
    const { user } = useSelector((state: RootState) => state.auth)

    const { data } = useFetchSavesQuery({ user_id: user?.uid ?? '' })

    const isSavedForCurrentPost = data ? data.posts.includes(id) : false
    const [updateSave] = useUpdateSavesMutation()

    const updateSaves = () => {
        if (user) {
            updateSave({
                doc_id: id,
                user_id: user.uid,
                attribute: 'posts',
                action: isSavedForCurrentPost ? 'remove' : 'add',
            })
        } else {
            promptError('Please login to add to save.')
        }
    }

    return (
        <Group>
            <Button
                color="yellow"
                compact
                leftIcon={
                    !isSavedForCurrentPost ? (
                        <IconBookmark size={16} />
                    ) : (
                        <IconBookmarkFilled />
                    )
                }
                onClick={() => {
                    updateSaves()
                }}
                size="xs"
                variant={isSavedForCurrentPost ? 'light' : 'subtle'}
            >
              {isSavedForCurrentPost ? 'saved' : 'save'}
            </Button>
            <Button
                compact
                leftIcon={<IconShare size={16} />}
                onClick={shareModalHandler}
                size="xs"
                variant="subtle"
            >
                Share
            </Button>
        </Group>
    )
}

export default SavesSegment
