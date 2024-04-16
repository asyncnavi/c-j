export type RegisterParams = {
    email: string
    password: string
    name: string
}

export type LoginParams = {
    email: string
    password: string
}

export type ForgotPasswordParams = {
    email: string
}

export type UpdateProfileParams = {
    displayName: string
    email: string
    photoURL: string
}
