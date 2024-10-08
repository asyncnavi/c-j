import Embed from '@editorjs/embed'
import List from '@editorjs/list'
import Code from '@editorjs/code'
import LinkTool from '@editorjs/link'
import Image from '@editorjs/image'
import Header from '@editorjs/header'
import Quote from '@editorjs/quote'
import CheckList from '@editorjs/checklist'
import Delimiter from '@editorjs/delimiter'
import InlineCode from '@editorjs/inline-code'

export const EDITOR_TOOLS = {
    header: Header,
    quote: Quote,
    list: List,
    checklist: CheckList,
    image: {
        class: Image,
        config: {
            endpoints: { byFile: '/api/photos/upload/forArticle' },
        },
    },
    linkTool: LinkTool,
    code: Code,
    inlineCode: InlineCode,
    embed: Embed,
    delimiter: Delimiter,
}
