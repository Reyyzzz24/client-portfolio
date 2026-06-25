"use client";
import { useStatsData } from '@/hooks/useStatData';
import { Trash2, Plus, Save } from 'lucide-react';
import Button from './Button';

export default function AdminStat() {
    const { stats, updateLocalStat, deleteStat, addStat, saveAllStats } = useStatsData();

    return (
        <div className="space-y-6">
            <div className="flex justify-end items-center gap-2">
                <Button variant='outline' onClick={addStat}>
                    <Plus size={16} /> Tambah
                </Button>
                <Button onClick={saveAllStats}>
                    <Save size={16} /> Simpan Perubahan
                </Button>
            </div>

            <div className="grid gap-4">
                {stats.map((stat) => (
                    <div key={stat.id} className="bg-white p-6 rounded-2xl border border-zinc-200 grid md:grid-cols-12 gap-4 items-center">
                        <div className="md:col-span-4">
                            <label className="text-xs text-zinc-500">Label</label>
                            <input
                                className="w-full border-b border-zinc-200 outline-none"
                                value={stat.label}
                                onChange={(e) => updateLocalStat(stat.id, 'label', e.target.value)}
                            />
                        </div>
                        <div className="md:col-span-3">
                            <label className="text-xs text-zinc-500">Nilai (Value)</label>
                            <input
                                className="w-full border-b border-zinc-200 outline-none"
                                value={stat.value}
                                onChange={(e) => updateLocalStat(stat.id, 'value', e.target.value)}
                            />
                        </div>
                        <div className="md:col-span-3">
                            <label className="text-xs text-zinc-500">Urutan (Display Order)</label>
                            <input
                                type="number"
                                className="w-full border-b border-zinc-200 outline-none"
                                value={stat.display_order}
                                onChange={(e) => updateLocalStat(stat.id, 'display_order', parseInt(e.target.value))}
                            />
                        </div>
                        <div className="md:col-span-2 flex justify-end">
                            <button onClick={() => deleteStat(stat.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg">
                                <Trash2 size={18} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}