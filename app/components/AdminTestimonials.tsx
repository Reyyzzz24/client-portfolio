"use client";
import { useTestimonialsData } from '@/hooks/useTestimonialsData';
import { Trash2, Plus, Save } from 'lucide-react';
import Button from './Button';
import ImageUploader from './ImageUploader';

export default function AdminTestimonials() {
    const { testimonials, updateLocalTestimonial, deleteTestimonial, addTestimonial, saveAllTestimonials, uploadAvatar, uploadingId } = useTestimonialsData();

    return (
        <div className="space-y-6">
            <div className="flex justify-end items-center gap-2">
                <Button variant='outline' onClick={addTestimonial}>
                    <Plus size={16} /> Tambah Testimoni
                </Button>
                <Button onClick={saveAllTestimonials}>
                    <Save size={16} /> Simpan Perubahan
                </Button>
            </div>

            <div className="grid gap-6">
                {testimonials.map((item) => (
                    <div key={item.id} className="bg-white p-6 rounded-2xl border border-zinc-200 grid md:grid-cols-12 gap-6 items-start">
                        <div className="md:col-span-3">
                            <ImageUploader
                                url={item.avatar_url}
                                onUpload={(e: React.ChangeEvent<HTMLInputElement>) => uploadAvatar(item.id, e)}
                                uploading={uploadingId === item.id}
                            />
                        </div>
                        <div className="md:col-span-7 space-y-3">
                            <input
                                className="w-full font-bold text-lg outline-none border-b border-zinc-200"
                                value={item.name}
                                onChange={(e) => updateLocalTestimonial(item.id, 'name', e.target.value)}
                            />
                            <input
                                className="w-full text-sm text-zinc-500 outline-none border-b border-zinc-200"
                                value={item.role}
                                onChange={(e) => updateLocalTestimonial(item.id, 'role', e.target.value)}
                            />
                            <textarea
                                className="w-full text-sm outline-none border-b border-zinc-200 h-20"
                                value={item.quote}
                                onChange={(e) => updateLocalTestimonial(item.id, 'quote', e.target.value)}
                            />
                        </div>
                        <div className="md:col-span-2 flex justify-end">
                            <button onClick={() => deleteTestimonial(item.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg">
                                <Trash2 size={18} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}