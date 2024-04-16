import './globals.css'
import RootRegistery from './rootRegistery'

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body>
                <RootRegistery>{children}</RootRegistery>
            </body>
        </html>
    )
}
