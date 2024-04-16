// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck
import React, { memo, useEffect, useRef } from 'react'
import EditorJS, { OutputData } from '@editorjs/editorjs'
import { CONTENT_EDITOR_TOOLS } from './editor-tools'
import Output from 'editorjs-react-renderer'

type ContentEditorProps = {
    data?: OutputData
    onChange(val: OutputData): void
    holder: string
}
const ContentEditor = ({ data, onChange, holder }: ContentEditorProps) => {
    //add a reference to editor
    const ref = useRef<EditorJS>()
    //initialize editorjs
    useEffect(() => {
        //initialize editor if we don't have a reference
        if (!ref.current) {
            const editor = new EditorJS({
                holder: holder,
                tools: CONTENT_EDITOR_TOOLS,
                minHeight: 100,
                data,
                async onChange(api) {
                    const data = await api.saver.save()
                    onChange(data)
                },
            })
            ref.current = editor
        }
        //add a return function handle cleanup
        return () => {
            if (ref.current && ref.current.destroy) {
                ref.current.destroy()
            }
        }
    }, [])
    return <div id={holder} style={{ width: '100%', minHeight: '100px' }} />
}

export const RenderContent = (data: { data: any }) => {
    return <Output data={data} />
}

export default memo(ContentEditor)
