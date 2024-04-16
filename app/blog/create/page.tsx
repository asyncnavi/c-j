/* eslint-disable no-console */
'use client'
import {
    Box,
    Button,
    Center,
    Divider,
    FileButton,
    Group,
    Image,
    MultiSelect,
    Paper,
    RingProgress,
    SegmentedControl,
    Text,
    TextInput,
    Title,
    useMantineTheme,
} from '@mantine/core'
import { IconCloudUpload } from '@tabler/icons-react'
import React, { useEffect, useState } from 'react'
import { FieldErrors, useForm } from 'react-hook-form'
import { CreatePostSchemaResolver } from '@/@app/validators'
import useFirebaseStorage from '@/@app/hooks/use-firebase-storage'
import ContentEditor from '@/@app/editor/editor'
import { OutputData } from '@editorjs/editorjs'
import { promptError, promptSuccess } from '@/@app/ui/prompt'
import { useCreatePostMutation } from '@/@app/store/api/blog'
import { useRouter } from 'next/navigation'
type Inputs = {
    title: string
    tags: string[]
    coverImage: string
    content: string
    type: string
}

const CreateBlogPage = () => {
    const { uploadFile, uploadProgress } =
        useFirebaseStorage('/blogCoverImages')
    // const [editorPreview, setEditorPreview] = useState<boolean>(false)
    const [editorState, setEditorState] = useState<OutputData>()
    const { register, handleSubmit, formState, setValue, getValues } =
        useForm<Inputs>({
            resolver: CreatePostSchemaResolver,
        })
    const theme = useMantineTheme()
    const router = useRouter()
    const isImageFile = (file: File): boolean => {
        const acceptedImageTypes = ['image/jpeg', 'image/png', 'image/gif']
        return file && acceptedImageTypes.includes(file.type)
    }

    const isImageImageUploading = (uploadProgess: number) => {
        return !(uploadProgress === 0 || uploadProgress === 100)
    }

    const handleCoverImageUpload = async (file: File) => {
        if (isImageFile(file)) {
            try {
                const imageURL = await uploadFile(file)
                setValue('coverImage', `${imageURL}`)
            } catch (err) {
                console.log(err)
            }
        }
    }

    const [createPost] = useCreatePostMutation()
    const handleEditorChange = (newEditorState: OutputData) => {
        // TODO : Add logic -> if image block is deleted remove it from database
        setEditorState(newEditorState)
    }

    const submitPost = async (values: Inputs) => {
        try {
            await createPost(values)
            router.push('/blog')
            promptSuccess('Post is created')
        } catch (e) {
            promptError('Error in creating post')
        }
    }

    useEffect(() => {
        setValue('content', JSON.stringify(editorState))
    }, [editorState])

    useEffect(() => {
        if (!(Object.keys(formState.errors).length === 0)) {
            Object.keys(formState.errors).map((v: string) => {
                promptError(
                    formState.errors[v as keyof FieldErrors<Inputs>]?.message,
                )
            })
        }
    }, [formState])

    return (
        <Paper sx={{ position: 'relative' }}>
            <Title>Create Post</Title>
            <Divider my="lg" variant="dashed" />
            <form onSubmit={handleSubmit(submitPost)}>
                <Group
                    my="lg"
                    p="sm"
                    position="apart"
                    sx={{
                        position: 'sticky',
                        top: '0',
                        boxShadow: theme.shadows.md,
                        backgroundColor: '#1A1B1E',
                        zIndex: 999,
                    }}
                >
                    <Button color="yellow" my="lg" size="md" variant="outline">
                        Preview
                    </Button>
                    <Button my="lg" size="md" type="submit">
                        Save
                    </Button>
                </Group>
                <SegmentedControl
                    data={[
                        { label: 'Publish', value: 'published' },
                        { label: 'Draft', value: 'drafted' },
                    ]}
                    my="lg"
                    onChange={v => setValue('type', v)}
                    value={getValues().type}
                />
                {isImageImageUploading(uploadProgress) && (
                    <RingProgress
                        label={
                            <Text
                                align="center"
                                color="yellow"
                                size="xl"
                                weight={700}
                            >
                                {`${uploadProgress}%`}
                            </Text>
                        }
                        rootColor="yellow"
                        sections={[{ value: uploadProgress, color: 'yellow' }]}
                    />
                )}
                {getValues().coverImage && (
                    <Image
                        alt="c-img"
                        height="200"
                        src={getValues().coverImage}
                        width="200"
                    />
                )}
                <Group position="right">
                    <FileButton
                        accept="image/png,image/jpeg"
                        onChange={handleCoverImageUpload}
                    >
                        {props => (
                            <Button
                                loaderProps={{
                                    variant: 'bars',
                                }}
                                loading={isImageImageUploading(uploadProgress)}
                                rightIcon={<IconCloudUpload />}
                                variant="outline"
                                {...props}
                            >
                                Upload Cover Image
                            </Button>
                        )}
                    </FileButton>
                </Group>

                <TextInput
                    label="Title"
                    my="md"
                    size="lg"
                    variant="filled"
                    {...register('title')}
                />

                <MultiSelect
                    clearable
                    creatable
                    data={[]}
                    getCreateLabel={query => `+ Create ${query}`}
                    label="Creatable MultiSelect"
                    my="lg"
                    onChange={(tags: string[]) => {
                        setValue('tags', tags)
                    }}
                    onCreate={(tag: string) => {
                        return tag
                    }}
                    placeholder="Select items"
                    searchable
                    size="lg"
                />
                <Paper my="lg" p="sm" withBorder>
                    <Box my="lg">
                        <ContentEditor
                            data={editorState}
                            holder={'creat-post-editor'}
                            onChange={handleEditorChange}
                        />
                    </Box>
                </Paper>
            </form>
        </Paper>
    )
}

export default CreateBlogPage
