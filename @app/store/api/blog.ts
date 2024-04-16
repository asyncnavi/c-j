/* eslint-disable no-console */
import {
    addDoc,
    arrayRemove,
    arrayUnion,
    collection,
    doc,
    getDoc,
    getDocs,
    query,
    updateDoc,
    where,
} from '@firebase/firestore'
import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react'
import { db } from '@/@app/config/firebase'
import {
    Post,
    ReactionAttribute,
    Reactions,
    Saves,
    SavesAttribute,
} from '@/@app/models/blog'

export const blogApi = createApi({
    reducerPath: 'blog-api',
    baseQuery: fakeBaseQuery(),
    endpoints: builder => ({
        fetchPosts: builder.query<Post[], void>({
            queryFn: async () => {
                try {
                    const blogRef = collection(db, 'BlogPosts')
                    const querySnapshot = await getDocs(blogRef)
                    const posts = querySnapshot.docs.map(
                        doc =>
                            ({
                                id: doc.id,
                                ...doc.data(),
                            } as Post),
                    )
                    return { data: posts }
                } catch (error) {
                    return { error }
                }
            },
            providesTags: [{ type: 'Posts' as never, id: 'Posts' }],
        }),
        fetchPost: builder.query<Post, { id: string }>({
            queryFn: async args => {
                try {
                    const blogRef = doc(db, 'BlogPosts', args.id)
                    const querySnapshot = await getDoc(blogRef)
                    const post = querySnapshot.data() as Post
                    return { data: post }
                } catch (error) {
                    return { error }
                }
            },
            providesTags: [{ type: 'Post' as never, id: 'post' }],
        }),
        fetchReactions: builder.query<Reactions, { post_id: string }>({
            queryFn: async args => {
                try {
                    const collectionRef = collection(db, 'reactions')
                    const q = query(
                        collectionRef,
                        where('postId', '==', args.post_id),
                    )
                    const qs = await getDocs(q)
                    if (qs.empty) {
                        const docRef = await addDoc(collectionRef, {
                            postId: args.post_id,
                            fires: [],
                            hearts: [],
                            thumbs: [],
                        })
                        const addedDoc = await getDoc(docRef)
                        if (addedDoc.exists()) {
                            return {
                                data: addedDoc.data() as Reactions,
                            }
                        }
                    }
                    const reactionsData = qs.docs[0].data()
                    return {
                        data: reactionsData as Reactions,
                    }
                } catch (error) {
                    return { error }
                }
            },
            providesTags: [{ type: 'Reactions' as never, id: 'reactions' }],
        }),

        fetchSaves: builder.query<Saves, { user_id: string }>({
            queryFn: async args => {
                try {
                    const collectionRef = collection(db, 'saves')
                    const q = query(
                        collectionRef,
                        where('userId', '==', args.user_id),
                    )
                    const qs = await getDocs(q)
                    if (qs.empty) {
                        const docRef = await addDoc(collectionRef, {
                            userId: args.user_id,
                            courses: [],
                            podcasts: [],
                            posts: [],
                        })
                        const addedDoc = await getDoc(docRef)
                        if (addedDoc.exists()) {
                            return {
                                data: addedDoc.data() as Saves,
                            }
                        }
                    }
                    const savesData = qs.docs[0].data()
                    return {
                        data: savesData as Saves,
                    }
                } catch (e) {
                    return { error: e }
                }
            },
            providesTags: [{ type: 'Saves' as never, id: 'saves' }],
        }),
        updateReaction: builder.mutation<
            string,
            {
                user_id: string
                post_id: string
                attribute: ReactionAttribute
                action: 'remove' | 'add'
            }
        >({
            queryFn: async args => {
                try {
                    const q = query(
                        collection(db, 'reactions'),
                        where('postId', '==', args.post_id),
                    )
                    const exists = args.action === 'remove'
                    const qs = await getDocs(q)
                    if (!qs.empty) {
                        const docSnapshot = qs.docs[0]
                        const docRef = docSnapshot.ref
                        await updateDoc(docRef, {
                            [args.attribute]: exists
                                ? arrayRemove(args.user_id)
                                : arrayUnion(args.user_id),
                        })
                    }

                    return {
                        data: `Reaction ${exists ? 'removed' : 'added'}`,
                    }
                } catch (e) {
                    return { error: e }
                }
            },
            invalidatesTags: [{ type: 'Reactions' as never, id: 'reactions' }],
        }),

        updateSaves: builder.mutation<
            string,
            {
                user_id: string
                doc_id: string
                attribute: SavesAttribute
                action: 'remove' | 'add'
            }
        >({
            queryFn: async args => {
                try {
                    const q = query(
                        collection(db, 'saves'),
                        where('userId', '==', args.user_id),
                    )
                    const exists = args.action === 'remove'
                    const qs = await getDocs(q)
                    if (!qs.empty) {
                        const docSnapshot = qs.docs[0]
                        const docRef = docSnapshot.ref
                        await updateDoc(docRef, {
                            [args.attribute]: exists
                                ? arrayRemove(args.doc_id)
                                : arrayUnion(args.doc_id),
                        })
                    }

                    return {
                        data: `Reaction ${exists ? 'removed' : 'added'}`,
                    }
                } catch (e) {
                    return { error: e }
                }
            },
            invalidatesTags: [{ type: 'Saves' as never, id: 'saves' }],
        }),

        createPost: builder.mutation<
            string,
            {
                title: string
                tags: string[]
                coverImage: string
                content: string
                type: string
            }
        >({
            queryFn: async args => {
                try {
                    const ref = await addDoc(collection(db, 'BlogPosts'), {
                        title: args.title ?? '',
                        tags: args.tags ?? [],
                        coverImage: args.coverImage ?? '',
                        content: args.content ?? '',
                        type: args.content ?? '',
                    })
                    return {
                        data: `Post created ${ref}`,
                    }
                } catch (e) {
                    return { error: e }
                }
            },
            providesTags: [{ type: 'Posts' as never, id: 'Posts' }],
        }),
    }),
})

export const {
    useFetchPostsQuery,
    useFetchPostQuery,
    useFetchReactionsQuery,
    useUpdateReactionMutation,
    useFetchSavesQuery,
    useUpdateSavesMutation,
    useCreatePostMutation,
} = blogApi
