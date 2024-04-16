declare module '@editorjs/checklist' {
    import { ToolSettings } from '@editorjs/editorjs'

    class Checklist {
        constructor(config: ToolSettings)
        // Add any specific methods or properties for the Checklist tool
    }

    export default Checklist
}

declare module '@editorjs/code' {
    import { ToolSettings } from '@editorjs/editorjs'

    class CodeTool {
        constructor(config: ToolSettings)
        // Add any specific methods or properties for the Code tool
    }

    export default CodeTool
}

declare module '@editorjs/delimiter' {
    import { ToolSettings } from '@editorjs/editorjs'

    class Delimiter {
        constructor(config: ToolSettings)
        // Add any specific methods or properties for the Delimiter tool
    }

    export default Delimiter
}

declare module '@editorjs/embed' {
    import { ToolSettings } from '@editorjs/editorjs'

    class Embed {
        constructor(config: ToolSettings)
        // Add any specific methods or properties for the Embed tool
    }

    export default Embed
}

declare module '@editorjs/image' {
    import { ToolSettings } from '@editorjs/editorjs'

    export interface ImageConfig {
        uploader: {
            uploadByFile(file: File): Promise<ImageData>
            uploadByUrl(url: string): Promise<ImageData>
        }
    }

    export interface ImageData {
        url: string
        caption?: string
        width?: string
        height?: string
    }

    class ImageTool {
        constructor(config: ToolSettings)
        // Add any specific methods or properties for the Image tool
    }

    export default ImageTool
}

declare module '@editorjs/inline-code' {
    import { ToolSettings } from '@editorjs/editorjs'

    class InlineCode {
        constructor(config: ToolSettings)
        // Add any specific methods or properties for the Inline Code tool
    }

    export default InlineCode
}

declare module '@editorjs/link' {
    import { ToolSettings } from '@editorjs/editorjs'

    class LinkTool {
        constructor(config: ToolSettings)
        // Add any specific methods or properties for the Link tool
    }

    export default LinkTool
}

declare module '@editorjs/list' {
    import { ToolSettings } from '@editorjs/editorjs'

    class List {
        constructor(config: ToolSettings)
        // Add any specific methods or properties for the List tool
    }

    export default List
}

declare module '@editorjs/quote' {
    import { ToolSettings } from '@editorjs/editorjs'

    class Quote {
        constructor(config: ToolSettings)
        // Add any specific methods or properties for the Quote tool
    }

    export default Quote
}

declare module '@editorjs/simple-image' {
    import { ToolSettings } from '@editorjs/editorjs'

    class SimpleImage {
        constructor(config: ToolSettings)
        // Add any specific methods or properties for the Simple Image tool
    }

    export default SimpleImage
}

declare module '@editorjs/header' {
    import { ToolSettings } from '@editorjs/editorjs'

    class Header {
        constructor(config: ToolSettings)
        // Add any specific methods or properties for the Header tool
    }

    export default Header
}
