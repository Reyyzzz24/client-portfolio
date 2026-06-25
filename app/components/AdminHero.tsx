"use client";
import { useHeroData } from '@/hooks/useHeroData';
import { Save } from 'lucide-react';
import Button from './Button';
import ImageUploader from './ImageUploader';

export default function AdminHero() {
  const { formData, setFormData, handleFileUpload, saveHero, uploading, companies, updateCompany } = useHeroData();

  return (
    <form onSubmit={(e) => { e.preventDefault(); saveHero(); }} className="grid md:grid-cols-12 gap-8">
      {/* Kolom Kiri: Input Utama */}
      <div className="md:col-span-8 space-y-6">
        <input
          className="w-full px-4 py-3 rounded-2xl border border-zinc-200 bg-white"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          placeholder="Main Title"
        />

        <input
          className="w-full px-4 py-3 rounded-2xl border border-zinc-200 bg-white"
          value={formData.subtitle || ''}
          onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
          placeholder="Subtitle"
        />

        <textarea
          className="w-full px-4 py-3 rounded-2xl border border-zinc-200 bg-white"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          rows={5}
          placeholder="Description"
        />

        <div className="pt-8">
          <h3 className="font-bold mb-4 text-zinc-900">Trusted Companies</h3>
          <div className="grid grid-cols-2 gap-4">
            {companies.map((c) => (
              <div key={c.id} className="flex flex-col gap-1">
                <input
                  className="px-4 py-2 rounded-xl border border-zinc-200 bg-white w-full"
                  value={c.name}
                  onChange={(e) => updateCompany(c.id, e.target.value)}
                />
              </div>
            ))}
          </div>
        </div>

        <Button type="submit"><Save size={18} /> Simpan Perubahan</Button>
      </div>

      <div className="md:col-span-4">
        <ImageUploader
          url={formData.photo_url}
          onUpload={handleFileUpload}
          uploading={uploading}
        />
      </div>
    </form>
  );
}