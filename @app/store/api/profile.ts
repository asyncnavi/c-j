/* eslint-disable no-console */

import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react'
import { auth } from '@/@app/config/firebase'
import { UpdateProfile } from '@/@app/models/profile'
import { updateProfile } from 'firebase/auth'

export const blogApi = createApi({
    reducerPath: 'blog-api',
    baseQuery: fakeBaseQuery(),
    endpoints: builder => ({
        updateProfile: builder.mutation<string, UpdateProfile>({
            queryFn: async args => {
                try {
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    await updateProfile(auth.currentUser, {
                        displayName: args.displayName,
                        photoURL: args.photoURL,
                    })
                    return {
                        data: 'Updated',
                    }
                } catch (e) {
                    return { error: e }
                }
            },
        }),
    }),
})

export const { useUpdateProfileMutation } = blogApi
