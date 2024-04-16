/* eslint-disable no-console */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck
import Code from '@editorjs/code'
import Header from '@editorjs/header'
import Paragraph from '@editorjs/paragraph'
import Embed from '@editorjs/embed'
import Table from '@editorjs/table'
import List from '@editorjs/list'
import Warning from '@editorjs/warning'
import LinkTool from '@editorjs/link'
import Image from '@editorjs/image'
import Raw from '@editorjs/raw'
import Quote from '@editorjs/quote'
import Marker from '@editorjs/marker'
import CheckList from '@editorjs/checklist'
import Delimiter from '@editorjs/delimiter'
import InlineCode from '@editorjs/inline-code'
import SimpleImage from '@editorjs/simple-image'
import { storage } from '../config/firebase'
import editorjsCodeflask from '@calumk/editorjs-codeflask'

export const CONTENT_EDITOR_TOOLS = {
    code: editorjsCodeflask,
    header: Header,
    paragraph: Paragraph,
    embed: Embed,
    table: Table,
    list: List,
    warning: Warning,
    linkTool: LinkTool,
    image: {
        class: Image,
        config: {
            uploader: {
                uploadByFile(file) {
                    return new Promise((resolve, reject) => {
                        const storageRef = storage.ref()
                        const imageRef = storageRef.child(
                            `postInnerImages/${file.name}`,
                        )
                        // TODO : handle error in approriate manner
                        imageRef
                            .put(file)
                            .then(snapshot => {
                                snapshot.ref
                                    .getDownloadURL()
                                    .then(downloadURL => {
                                        const res = {
                                            success: 1,
                                            file: {
                                                url: downloadURL,
                                            },
                                        }
                                        resolve(res)
                                    })
                                    .catch(error => {
                                        reject(error)
                                    })
                            })
                            .catch(error => {
                                reject(error)
                            })
                    })
                },
            },
        },
    },
    raw: Raw,
    quote: Quote,
    marker: Marker,
    checklist: CheckList,
    delimiter: Delimiter,
    inlineCode: InlineCode,
    simpleImage: SimpleImage,
}
