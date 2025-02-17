import type { Metadata } from 'next'
import './globals.css'
import Head from 'next/head';

export const metadata: Metadata = {
  title: 'v0 App',
  description: 'Created with v0',
  generator: 'v0.dev',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <Head>
        <title>The Flag Game</title>
        <meta name="google-adsense-account" content={`${process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID}`}></meta>
      </Head>
      <body>
        {children}
      </body>
    </html>
  )
}
