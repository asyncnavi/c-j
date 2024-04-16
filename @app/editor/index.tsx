import { AtomicBlockUtils } from 'draft-js'
import React from 'react'
import { Editor, EditorState } from 'react-draft-wysiwyg'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import { storage } from '../config/firebase'

type PostEditorProps = {
    editorState: EditorState
    onChange: (editorState: EditorState) => void
    setEditorState: React.Dispatch<React.SetStateAction<EditorState>>
}

const PostEditor: React.FC<PostEditorProps> = ({
    editorState,
    onChange,
    setEditorState,
}) => {
    const handleImageUpload = async (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
            const storageRef = storage.ref()
            const imageRef = storageRef.child(`postInnerImages/${file.name}`)

            imageRef
                .put(file)
                .then(snapshot => {
                    snapshot.ref
                        .getDownloadURL()
                        .then(downloadURL => {
                            const contentState = editorState.getCurrentContent()
                            const contentStateWithEntity =
                                contentState.createEntity(
                                    'IMAGE',
                                    'IMMUTABLE',
                                    {
                                        src: downloadURL,
                                    },
                                )
                            const entityKey =
                                contentStateWithEntity.getLastCreatedEntityKey()
                            const newEditorState = EditorState.set(
                                editorState,
                                {
                                    currentContent: contentStateWithEntity,
                                },
                            )

                            setEditorState(
                                AtomicBlockUtils.insertAtomicBlock(
                                    newEditorState,
                                    entityKey,
                                    ' ',
                                ),
                            )

                            resolve(downloadURL)
                        })
                        .catch(error => {
                            reject(error)
                        })
                })
                .catch(error => {
                    reject(error)
                })
        })
    }

    return (
        <Editor
            editorClassName="post-editor"
            editorState={editorState}
            onEditorStateChange={onChange}
            toolbar={{
                image: {
                    uploadCallback: handleImageUpload,
                    alt: { present: true, mandatory: false },
                },
            }}
            toolbarClassName="post-editor-toolbar"
            wrapperClassName="wrapperClassName"
        />
    )
}
export default PostEditor
