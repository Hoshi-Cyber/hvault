import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          {/* Sitewide meta tags */}
          <meta charSet="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="theme-color" content="#ffffff" />
          {/* Analytics: placeholder for GA or Plausible */}
          <script
            dangerouslySetInnerHTML={{ __html: `window.plausible=window.plausible||function(){(window.plausible.q=window.plausible.q||[]).push(arguments)}` }}
          ></script>
          <script async defer data-domain="hoshivault.com" src="https://plausible.io/js/plausible.js"></script>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;