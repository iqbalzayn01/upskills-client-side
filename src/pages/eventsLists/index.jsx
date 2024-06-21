import Header from '../../components/Header';
import CEventsList from '../../components/CEventsList';
import Footer from '../../components/Footer';

export default function EventsLists() {
  return (
    <>
      <Header />
      <main>
        <CEventsList />
      </main>
      <Footer />
    </>
  );
}
