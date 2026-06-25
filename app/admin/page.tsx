import AdminAbout from "../components/AdminAbout";
import AdminHero from "../components/AdminHero";
import AdminProcess from "../components/AdminProcess";
import AdminServices from "../components/AdminServices";

export default function AdminPage() {
  return (
    <div className="max-w-4xl mx-auto p-6 md:p-10">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard Admin</h1>
        <p className="text-gray-500">Kelola konten portofolio Anda.</p>
      </header>
      
      <AdminHero />
      <AdminAbout />
      <AdminServices />
      <AdminProcess />
      {/* Nanti Anda tinggal tambah: <AdminAbout /> */}
    </div>
  );
}