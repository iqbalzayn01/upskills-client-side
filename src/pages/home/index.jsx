import Header from '../../components/Header';
import Hero from '../../components/Hero';
import CEventsList from '../../components/CEventsList';
import Footer from '../../components/Footer';

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <CEventsList />
      </main>
      <Footer />
    </>
  );
}
