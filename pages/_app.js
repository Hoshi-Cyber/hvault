import '../styles/globals.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { CompareProvider } from '../context/CompareContext';
import { DrawerProvider } from '../context/DrawerContext';
import CompareTray from '../components/CompareTray';
import InquiryDrawer from '../components/InquiryDrawer';
import Script from 'next/script';

export default function App({ Component, pageProps }) {
  return (
    <>
      {/* Analytics via next/script */}
      <Script id="plausible-init" strategy="afterInteractive">
        {`window.plausible=window.plausible||function(){(window.plausible.q=window.plausible.q||[]).push(arguments)}`}
      </Script>
      <Script
        strategy="afterInteractive"
        data-domain="hoshivault.com"
        src="https://plausible.io/js/plausible.js"
      />

      <CompareProvider>
        <DrawerProvider>
          <Header />
          <main style={{ minHeight: '60vh' }}>
            <Component {...pageProps} />
          </main>
          <Footer />
          <CompareTray />
          <InquiryDrawer />
        </DrawerProvider>
      </CompareProvider>
    </>
  );
}
