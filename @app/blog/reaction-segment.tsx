import { ReactionAttribute } from '@/@app/models/blog'
import { RootState } from '@/@app/store'
import {
    useFetchReactionsQuery,
    useUpdateReactionMutation,
} from '@/@app/store/api/blog'
import { promptError } from '@/@app/ui/prompt'
import { Button, Group } from '@mantine/core'
import { useParams } from 'next/navigation'
import React from 'react'
import { useSelector } from 'react-redux'

type ReactionDataType = {
    id: string
    name: ReactionAttribute
    icon: string
    color: string
}

const reactionData: ReactionDataType[] = [
    {
        id: '1',
        name: 'hearts',
        icon: '❤️',
        color: 'red',
    },
    {
        id: '2',
        name: 'thumbs',
        icon: '👍',
        color: 'yellow',
    },
    {
        id: '3',
        name: 'fires',
        icon: '🔥',
        color: 'gray',
    },
]
const ReactionsSegment: React.FC = () => {
    const { id } = useParams()
    const { data } = useFetchReactionsQuery({
        post_id: id as string,
    })
    const { user } = useSelector((state: RootState) => state.auth)
    const isReacted = (reactionType: ReactionAttribute) => {
        if (data) {
            const reaction = data[reactionType]
            return reaction.includes(user?.uid ?? '')
        }
    }

    const [updateReactions] = useUpdateReactionMutation()

    const updatePostReaction = (attribute: ReactionAttribute) => {
        if (user) {
            updateReactions({
                post_id: id as string,
                user_id: user.uid,
                attribute: attribute,
                action: isReacted(attribute) ? 'remove' : 'add',
            })
        } else {
            promptError('Please login to add reactions.')
        }
    }

    return (
        <Group my="lg">
            <Group>
                {reactionData.map(reaction => {
                    return (
                        <Button
                            color={reaction.color}
                            key={reaction.id}
                            leftIcon={reaction.icon}
                            onClick={() => {
                                updatePostReaction(
                                    reaction.name as ReactionAttribute,
                                )
                            }}
                            radius="xl"
                            size="sm"
                            variant={
                                isReacted(reaction.name as ReactionAttribute)
                                    ? 'light'
                                    : 'subtle'
                            }
                        >
                            {data
                                ? data[reaction.name as ReactionAttribute]
                                      .length
                                : '0'}
                        </Button>
                    )
                })}
            </Group>
        </Group>
    )
}

export default ReactionsSegment
