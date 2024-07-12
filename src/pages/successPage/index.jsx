import { useNavigate } from 'react-router-dom';

export default function PaymentSuccess() {
  const navigate = useNavigate();

  const handleDashboard = () => {
    navigate('/dashboard-peserta');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
        <h1 className="text-lg font-bold text-green-500">
          Pembayaran Berhasil!
        </h1>
        <p className="mt-4 text-2xl font-semibold">
          Terima Kasih atas Pembelian Anda!
        </p>
        <p className="mt-4 text-gray-700">
          Selamat! Pembayaran Anda telah berhasil diproses. Kami sangat senang
          menyambut Anda dalam kegiatan pelatihan yang penuh inspirasi dan
          pengetahuan ini.
        </p>
        <button
          onClick={handleDashboard}
          className="mt-8 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-6 rounded"
        >
          &lt; My Dashboard
        </button>
      </div>
    </div>
  );
}
