"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import Sidebar from "../components/Sidebar";
import AdminHero from "../components/AdminHero";
import AdminAbout from "../components/AdminAbout";
import AdminServices from "../components/AdminServices";
import AdminProcess from "../components/AdminProcess";
import AdminWorks from "../components/AdminWorks";
import AdminStat from "../components/AdminStat";
import AdminTestimonials from "../components/AdminTestimonials";
import AdminInsights from "../components/AdminInsights";
import AdminFooter from "../components/AdminFooter";

export default function AdminPage() {
  const [isOpen, setIsOpen] = useState(true);
  const [activeItem, setActiveItem] = useState("Hero");
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const { data: { user } } = await supabase.auth.getUser();

      if (user) {
        // Ambil data tambahan dari tabel profiles
        const { data: profile } = await supabase
          .from('profiles')
          .select('full_name')
          .eq('id', user.id)
          .single();

        // Gabungkan data auth (email) dan data profil (full_name)
        setUser({
          email: user.email,
          full_name: profile?.full_name || 'Administrator'
        });
      }
    };
    fetchUserData();
  }, []);

  const renderContent = () => {
    switch (activeItem) {
      case "Hero": return <AdminHero />;
      case "About": return <AdminAbout />;
      case "Services": return <AdminServices />;
      case "Process": return <AdminProcess />;
      case "Works": return <AdminWorks />
      case "Stat": return <AdminStat />
      case "Testimonials": return <AdminTestimonials />
      case "Insights": return <AdminInsights />
      case "Footer": return <AdminFooter />
      // Tambahkan case lainnya di sini
      default: return <div className="p-10 text-center">Konten untuk {activeItem} belum tersedia.</div>;
    }
  };

  return (
    <div className="flex bg-white h-screen p-4 gap-4">
      <Sidebar
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        activeItem={activeItem}
        setActiveItem={setActiveItem}
        user={user}
      />

      <main className="flex-1 overflow-y-auto bg-zinc-50 rounded-3xl border border-zinc-200 p-8">
        <header className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">{activeItem} Settings</h1>
          <p className="text-gray-500 text-sm">Kelola data untuk bagian {activeItem}.</p>
        </header>

        {renderContent()}
      </main>
    </div>
  );
}