import React, { useCallback } from 'react'
import {
    Avatar,
    Box,
    Button,
    FileButton,
    Group,
    Paper,
    Text,
    TextInput,
    Title,
} from '@mantine/core'
import { IconMail, IconUser } from '@tabler/icons-react'
import { useSelector } from 'react-redux'
import { RootState } from '@/@app/store'
import { useForm } from 'react-hook-form'
import { UpdateProfileSchemaResolver } from '@/@app/validators'
import useFirebaseStorage from '@/@app/hooks/use-firebase-storage'
import { useUpdateProfileMutation } from '@/@app/store/api/profile'

type Inputs = {
    displayName: string
    photoURL: string
}

const ProfileSettings = () => {
    const { user, error, status } = useSelector(
        (state: RootState) => state.auth,
    )
    const { uploadFile, uploadProgress } = useFirebaseStorage('profilePics')

    const { register, watch, setValue, getValues, handleSubmit, formState } =
        useForm<Inputs>({
            resolver: UpdateProfileSchemaResolver,
            defaultValues: {
                displayName: user?.displayName ?? '',
                photoURL: user?.photoURL ?? '',
            },
        })

    const isImageFile = (file: File): boolean => {
        const acceptedImageTypes = ['image/jpeg', 'image/png', 'image/gif']
        return file && acceptedImageTypes.includes(file.type)
    }

    const handleProfilePicUpload = async (file: File) => {
        if (isImageFile(file)) {
            try {
                const imageURL = await uploadFile(file)
                setValue('photoURL', `${imageURL}`)
            } catch (err) {
                // eslint-disable-next-line no-console
                console.log(err)
            }
        }
    }

    const [updateUserProfile] = useUpdateProfileMutation()
    const updateProfile = useCallback(
        (values: Inputs) => {
            updateUserProfile({
                displayName: values.displayName,
                photoURL: values.photoURL,
            })
        },
        [user],
    )
    return (
        <Box>
            <form onSubmit={handleSubmit(updateProfile)}>
                <Group align="center" my="lg" position="left">
                    <Avatar
                        radius="xl"
                        size="xl"
                        src={watch('photoURL')}
                    ></Avatar>
                    <Box>
                        <Title mb="sm" order={2}>
                            {user?.displayName}
                        </Title>

                        <FileButton
                            accept="image/png,image/jpeg"
                            onChange={handleProfilePicUpload}
                        >
                            {props => (
                                <Button
                                    {...props}
                                    color="yellow"
                                    compact
                                    size="sm"
                                    variant="light"
                                >
                                    Change Avatar
                                </Button>
                            )}
                        </FileButton>
                    </Box>
                </Group>

                <Paper
                    my="lg"
                    p="md"
                    radius="md"
                    shadow="lg"
                    sx={{
                        border: '1px solid white',
                    }}
                    w="100%"
                >
                    <Box w="100%">
                        <TextInput
                            icon={<IconUser />}
                            label={
                                <Text color="dimmed" my="sm">
                                    Display Name
                                </Text>
                            }
                            sx={{ width: '100%' }}
                            {...register('displayName')}
                        />
                    </Box>
                    <Box w="100%">
                        <Group align="center" position="apart">
                            <TextInput
                                icon={<IconMail />}
                                label={
                                    <Text color="dimmed" my="sm">
                                        Password
                                    </Text>
                                }
                                readOnly
                                type="password"
                                value="asyncnavi@gmail.com"
                            />
                            <Button>Change</Button>
                        </Group>
                    </Box>
                </Paper>

                <Group position="left">
                    <Button
                        color="yellow"
                        disabled={!formState.isDirty}
                        variant="filled"
                        w="100%"
                    >
                        Update
                    </Button>
                </Group>
            </form>
        </Box>
    )
}

export default ProfileSettings
