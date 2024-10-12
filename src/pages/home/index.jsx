import Header from '../../components/Header';
import MarqueeMessage from '../../components/Marquee';
import Hero from '../../components/Hero';
import CEventsList from '../../components/CEventsList';
import Footer from '../../components/Footer';

export default function Home() {
  return (
    <>
      <Header />
      <MarqueeMessage caption="Explore our in-demand courses and gain valuable skills" />
      <main>
        <Hero />
        <CEventsList />
      </main>
      <Footer />
    </>
  );
}
