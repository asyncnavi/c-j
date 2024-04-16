import { SetStateAction, useState } from 'react'
import { storage } from '../config/firebase'

interface UploadResult {
    uploadFile: (file: File) => Promise<string | null>
    uploadProgress: number
    uploadError: Error | null
    uploadComplete: boolean
}

const useFirebaseStorage = (bucketRef: string): UploadResult => {
    const [uploadProgress, setUploadProgress] = useState(0)
    const [uploadError, setUploadError] = useState<Error | null>(null)
    const [uploadComplete, setUploadComplete] = useState(false)

    const uploadFile = (file: File): Promise<string | null> => {
        return new Promise((resolve, reject) => {
            const storageRef = storage.ref()
            const fileRef = storageRef.child(`${bucketRef}/${file.name}`)

            const uploadTask = fileRef.put(file)

            uploadTask.on(
                'state_changed',
                (snapshot: {
                    bytesTransferred: number
                    totalBytes: number
                }) => {
                    const progress = Math.round(
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100,
                    )
                    setUploadProgress(progress)
                },
                (error: SetStateAction<Error | null>) => {
                    setUploadError(error)
                    reject(error)
                },
                async () => {
                    try {
                        const downloadURL = await fileRef.getDownloadURL()
                        setUploadComplete(true)
                        resolve(downloadURL)
                    } catch (error: any) {
                        setUploadError(error)
                        reject(error)
                    }
                },
            )
        })
    }

    return {
        uploadFile,
        uploadProgress,
        uploadError,
        uploadComplete,
    }
}

export default useFirebaseStorage
