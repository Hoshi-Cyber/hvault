import '../styles/globals.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { CompareProvider } from '../context/CompareContext';
import { DrawerProvider } from '../context/DrawerContext';
import CompareTray from '../components/CompareTray';
import InquiryDrawer from '../components/InquiryDrawer';

export default function App({ Component, pageProps }) {
  return (
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
  );
}