import {
    ActionIcon,
    Group,
    Modal,
    Text,
    TextInput,
    ThemeIcon,
} from '@mantine/core'
import { useClipboard } from '@mantine/hooks'
import {
    IconBrandFacebook,
    IconBrandLinkedin,
    IconBrandTwitter,
    IconBrandWhatsapp,
    IconCircleCheck,
    IconCopy,
} from '@tabler/icons-react'
import React from 'react'

type ShareModalProps = {
    id: string
    opened: boolean
    close: () => void
}

const ShareModal: React.FC<ShareModalProps> = props => {
    const { id, opened, close } = props
    const clipboard = useClipboard({ timeout: 1500 })

    return (
        <Modal
            centered
            closeOnClickOutside={false}
            onClose={close}
            opened={opened}
            title="Share"
        >
            <Group>
                <ThemeIcon color="teal" radius="xl" size="lg" variant="light">
                    <IconBrandWhatsapp />
                </ThemeIcon>
                <ThemeIcon color="blue" radius="xl" size="lg" variant="light">
                    <IconBrandFacebook />
                </ThemeIcon>
                <ThemeIcon color="blue" radius="xl" size="lg" variant="light">
                    <IconBrandTwitter />
                </ThemeIcon>
                <ThemeIcon color="blue" radius="xl" size="lg" variant="light">
                    <IconBrandLinkedin />
                </ThemeIcon>
            </Group>
            <TextInput
                label={<Text my="sm">Copy link</Text>}
                placeholder="Your name"
                radius="md"
                readOnly
                rightSection={
                    <ActionIcon
                        color={clipboard.copied ? 'teal' : 'gray'}
                        onClick={() => {
                            clipboard.copy(`https://codingjustu.com/blog/${id}`)
                        }}
                    >
                        {clipboard.copied ? <IconCircleCheck /> : <IconCopy />}
                    </ActionIcon>
                }
                value={`https://codingjustu.com/blog/${id}`}
            />
        </Modal>
    )
}


export default ShareModal