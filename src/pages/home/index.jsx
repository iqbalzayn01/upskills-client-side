import Header from '../../components/Header';
import Hero from '../../components/Hero';
import EventsList from '../../components/EventsList';
import { Footer } from '../../components/Footer';

export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
      <EventsList />
      <Footer />
    </main>
  );
}
