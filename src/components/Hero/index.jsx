import CButton from '../CButton';

export default function Hero() {
  return (
    <div className="container-base py-10">
      <div className="flex flex-col items-center justify-center gap-5">
        <h1 className="text-center text-7xl">
          Transformasikan Keahlian Anda dengan Pelatihan Profesional
        </h1>
        <p className="w-1/2 text-center text-xl mb-2">
          Bersiap untuk Masa Depan dengan Pengetahuan dan Keterampilan Terbaru
        </p>
        <CButton
          //   onClick={() => {}}
          className="flex items-center justify-center bg-primarycolor font-semibold text-secondarycolor text-xl px-3 py-2 rounded-lg"
        >
          Daftar
        </CButton>
      </div>
    </div>
  );
}
