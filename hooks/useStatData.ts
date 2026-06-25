import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';

export const useStatsData = () => {
    const [stats, setStats] = useState<any[]>([]);

    useEffect(() => {
        fetchStats();
    }, []);

    const fetchStats = async () => {
        const { data } = await supabase.from('stats_data').select('*').order('display_order');
        if (data) setStats(data);
    };

    const updateLocalStat = (id: number, field: string, value: string | number) => {
        setStats(prev => prev.map(s => s.id === id ? { ...s, [field]: value } : s));
    };

    const saveAllStats = async () => {
        const promise = async () => {
            const { error } = await supabase
                .from('stats_data')
                .upsert(stats);

            if (error) throw error;
            fetchStats();
        };

        toast.promise(promise(), {
            loading: 'Menyimpan...',
            success: 'Statistik berhasil diperbarui!',
            error: 'Gagal menyimpan perubahan.',
        });
    };

    const addStat = async () => {
        const { data, error } = await supabase
            .from('stats_data')
            .insert([{ label: 'Label Baru', value: '0', display_order: stats.length }])
            .select();

        if (error) toast.error("Gagal menambah statistik");
        else {
            setStats([...stats, ...data]);
            toast.success("Statistik ditambahkan!");
        }
    };

    const deleteStat = async (id: number) => {
        const { error } = await supabase.from('stats_data').delete().eq('id', id);
        if (error) toast.error("Gagal menghapus");
        else {
            toast.success("Statistik dihapus");
            fetchStats();
        }
    };

    return { stats, updateLocalStat, deleteStat, addStat, saveAllStats };
};