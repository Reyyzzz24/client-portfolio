"use client";
import { useWorksData } from '@/hooks/useWorksData';
import { Trash2, Plus, Save } from 'lucide-react';
import Button from './Button';
import ImageUploader from './ImageUploader'; // Pastikan path ini benar

export default function AdminWorks() {
    const { works, updateLocalWork, deleteWork, addWork, saveAllWorks, uploadWorkImage, uploadingId } = useWorksData();

    return (
        <div className="space-y-6">
            <div className="flex justify-end items-center gap-2">
                <Button variant='outline' onClick={addWork}>
                    <Plus size={16} /> Tambah Proyek
                </Button>
                <Button onClick={saveAllWorks}>
                    <Save size={16} /> Simpan Perubahan
                </Button>
            </div>

            <div className="grid gap-6">
                {works.map((work) => (
                    <div key={work.id} className="bg-white p-6 rounded-2xl border border-zinc-200 grid md:grid-cols-12 gap-6 items-start">
                        {/* Image Uploader */}
                        <div className="md:col-span-3">
                            <ImageUploader
                                url={work.image_url}
                                onUpload={(e: React.ChangeEvent<HTMLInputElement>) => uploadWorkImage(work.id, e)}
                                uploading={uploadingId === work.id}
                            />
                        </div>

                        {/* Form Details */}
                        <div className="md:col-span-7 space-y-4">
                            <input
                                className="w-full border-b border-zinc-200 outline-none pb-2 font-bold"
                                value={work.title}
                                placeholder="Judul Proyek"
                                onChange={(e) => updateLocalWork(work.id, 'title', e.target.value)}
                            />
                            <input
                                className="w-full border-b border-zinc-200 outline-none pb-2 text-sm text-zinc-500"
                                value={work.category}
                                placeholder="Kategori"
                                onChange={(e) => updateLocalWork(work.id, 'category', e.target.value)}
                            />
                            <textarea
                                className="w-full border-b border-zinc-200 outline-none text-sm"
                                value={work.description}
                                placeholder="Deskripsi"
                                onChange={(e) => updateLocalWork(work.id, 'description', e.target.value)}
                            />
                            <input
                                className="w-full border-b border-zinc-200 outline-none text-sm text-blue-600"
                                value={work.project_link || ''}
                                placeholder="Link Proyek"
                                onChange={(e) => updateLocalWork(work.id, 'project_link', e.target.value)}
                            />
                        </div>

                        {/* Delete Action */}
                        <div className="md:col-span-2 flex justify-end">
                            <button onClick={() => deleteWork(work.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg">
                                <Trash2 size={18} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}