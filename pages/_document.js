import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Great+Vibes&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="/logo.jpg" type="image/jpeg" />
        <meta name="theme-color" content="#2563EB" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
