import { nopeResolver } from '@hookform/resolvers/nope'
import Nope from 'nope-validator'

export const ForgotPasswordSchema = nopeResolver(
    Nope.object().shape({
        email: Nope.string()
            .required('Email address is required')
            .email('Invalid email format'),
    }),
)

export const LoginSchemaResolver = nopeResolver(
    Nope.object().shape({
        email: Nope.string()
            .required('Email address is required')
            .email('Invalid email format'),
        password: Nope.string().required('Password is required'),
    }),
)

export const RegistrationSchemaResolver = nopeResolver(
    Nope.object().shape({
        name: Nope.string()
            .required('Name is required')
            .min(2, 'Name is too short'),
        last_name: Nope.string(),
        email: Nope.string()
            .required('Email address is required')
            .min(12, 'Your email is too short')
            .max(255, 'Your email is too big')
            .email('Invalid email format'),
        password: Nope.string().required('Password is required'),
    }),
)

export const CreatePostSchemaResolver = nopeResolver(
    Nope.object().shape({
        title: Nope.string()
            .required('Title is required')
            .min(5, 'Title is too short'),
        tags: Nope.array(),
        content: Nope.string().required('Blog Content is empty'),
        coverImage: Nope.string(),
    }),
)

export const UpdateProfileSchemaResolver = nopeResolver(
    Nope.object().shape({
        displayName: Nope.string()
            .required('Display Name is required')
            .min(2, 'Display name should be greater than two characters.'),
        photoURL: Nope.string(),
    }),
)
