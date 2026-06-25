"use client";
import { useAboutData } from '@/hooks/useAboutData';
import { Save } from 'lucide-react';
import Button from './Button';
import ImageUploader from './ImageUploader';

export default function AdminAbout() {
  const { formData, setFormData, handleFileUpload, saveAbout, uploading } = useAboutData();

  return (
    <form onSubmit={(e) => { e.preventDefault(); saveAbout(); }} className="grid md:grid-cols-12 gap-8">
      <div className="md:col-span-8 space-y-6">
        <textarea
          className="w-full px-4 py-3 rounded-2xl border border-zinc-200 bg-white"
          value={formData.description_1}
          onChange={(e) => setFormData({ ...formData, description_1: e.target.value })}
          rows={3}
          placeholder="Description 1"
        />
        <textarea
          className="w-full px-4 py-3 rounded-2xl border border-zinc-200 bg-white"
          value={formData.description_2}
          onChange={(e) => setFormData({ ...formData, description_2: e.target.value })}
          rows={3}
          placeholder="Description 2"
        />
        <textarea
          className="w-full px-4 py-3 rounded-2xl border border-zinc-200 bg-white"
          value={formData.description_3}
          onChange={(e) => setFormData({ ...formData, description_3: e.target.value })}
          rows={3}
          placeholder="Description 3"
        />

        <Button type="submit"><Save size={18} /> Simpan Perubahan</Button>
      </div>

      <div className="md:col-span-4">
        <ImageUploader url={formData.photo_url} onUpload={handleFileUpload} uploading={uploading} />
      </div>
    </form>
  );
}