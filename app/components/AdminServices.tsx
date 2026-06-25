"use client";
import { useServicesData } from '@/hooks/useServicesData';
import { Trash2, Plus, Save } from 'lucide-react';
import Button from './Button';

export default function AdminServices() {
    const { services, updateLocalService, deleteService, addService, saveAllServices } = useServicesData();

    return (
        <div className="space-y-6">
            <div className="flex justify-end items-center gap-2">
                <Button
                    variant='outline'
                    onClick={addService}
                >
                    <Plus size={16} /> Tambah
                </Button>
                <Button
                    onClick={saveAllServices}
                >
                    <Save size={16} /> Simpan Perubahan
                </Button>
            </div>

            <div className="grid gap-4">
                {services.map((service) => (
                    <div key={service.id} className="bg-white p-6 rounded-2xl border border-zinc-200 grid md:grid-cols-12 gap-4 items-center">
                        <div className="md:col-span-3">
                            <label className="text-xs text-zinc-500">Judul</label>
                            <input
                                className="w-full border-b border-zinc-200 outline-none"
                                value={service.title}
                                onChange={(e) => updateLocalService(service.id, 'title', e.target.value)}
                            />
                        </div>
                        <div className="md:col-span-4">
                            <label className="text-xs text-zinc-500">Deskripsi</label>
                            <textarea
                                className="w-full border-b border-zinc-200 outline-none"
                                value={service.description}
                                onChange={(e) => updateLocalService(service.id, 'description', e.target.value)}
                            />
                        </div>
                        <div className="md:col-span-3">
                            <label className="text-xs text-zinc-500">Icon Name</label>
                            <input
                                className="w-full border-b border-zinc-200 outline-none"
                                value={service.icon_name || ''}
                                onChange={(e) => updateLocalService(service.id, 'icon_name', e.target.value)}
                            />
                        </div>
                        <div className="md:col-span-2 flex justify-end">
                            <button onClick={() => deleteService(service.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg">
                                <Trash2 size={18} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}