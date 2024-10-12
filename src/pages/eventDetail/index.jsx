import Header from '../../components/Header';
import CEventDetail from '../../components/CEventDetail';

export default function EventDetail() {
  return (
    <>
      <Header />
      <main className="container-base flex place-content-center">
        <div className="flex md:w-3/4 gap-5 bg-secondarycolor p-6 mb-5 shadow-md border border-slate-300 rounded-xl">
          <CEventDetail />
        </div>
      </main>
    </>
  );
}
