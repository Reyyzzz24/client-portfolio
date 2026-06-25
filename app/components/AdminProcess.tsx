"use client";
import { useProcessData } from '@/hooks/useProcessData';
import { Trash2, Plus, Save } from 'lucide-react';
import Button from './Button';

export default function AdminProcess() {
    const { steps, updateLocalStep, deleteStep, addStep, saveAllSteps } = useProcessData();

    return (
        <div className="space-y-6">
            <div className="flex justify-end items-center gap-2">
                <div className="flex gap-2">
                    <Button variant='outline' onClick={addStep}>
                        <Plus size={16} /> Tambah
                    </Button>
                    <Button onClick={saveAllSteps}>
                        <Save size={16} /> Simpan Perubahan
                    </Button>
                </div>
            </div>

            <div className="grid gap-4">
                {steps.map((step) => (
                    <div key={step.id} className="bg-white p-6 rounded-2xl border border-zinc-200 grid md:grid-cols-12 gap-4 items-center">
                        <div className="md:col-span-1">
                            <label className="text-xs text-zinc-500">Urutan</label>
                            <input
                                type="number"
                                className="w-full border-b border-zinc-200 outline-none"
                                value={step.order_index}
                                onChange={(e) => updateLocalStep(step.id, 'order_index', parseInt(e.target.value))}
                            />
                        </div>
                        <div className="md:col-span-3">
                            <label className="text-xs text-zinc-500">Judul</label>
                            <input
                                className="w-full border-b border-zinc-200 outline-none"
                                value={step.title}
                                onChange={(e) => updateLocalStep(step.id, 'title', e.target.value)}
                            />
                        </div>
                        <div className="md:col-span-4">
                            <label className="text-xs text-zinc-500">Deskripsi</label>
                            <textarea
                                className="w-full border-b border-zinc-200 outline-none"
                                value={step.description}
                                onChange={(e) => updateLocalStep(step.id, 'description', e.target.value)}
                            />
                        </div>
                        <div className="md:col-span-2">
                            <label className="text-xs text-zinc-500">Icon Name</label>
                            <input
                                className="w-full border-b border-zinc-200 outline-none"
                                value={step.icon_name || ''}
                                onChange={(e) => updateLocalStep(step.id, 'icon_name', e.target.value)}
                            />
                        </div>
                        <div className="md:col-span-2 flex justify-end">
                            <button onClick={() => deleteStep(step.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg">
                                <Trash2 size={18} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}