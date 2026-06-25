import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';

export const useProcessData = () => {
    const [steps, setSteps] = useState<any[]>([]);

    useEffect(() => {
        fetchSteps();
    }, []);

    const fetchSteps = async () => {
        const { data } = await supabase.from('process_data').select('*').order('order_index');
        if (data) setSteps(data);
    };

    const updateLocalStep = (id: number, field: string, value: any) => {
        setSteps(prev => prev.map(s => s.id === id ? { ...s, [field]: value } : s));
    };

    const saveAllSteps = async () => {
        const promise = async () => {
            const { error } = await supabase
                .from('process_data')
                .upsert(steps);

            if (error) throw error;
            fetchSteps();
        };

        toast.promise(promise(), {
            loading: 'Menyimpan proses...',
            success: 'Proses berhasil diperbarui!',
            error: 'Gagal menyimpan.',
        });
    };

    const addStep = async () => {
        const { data, error } = await supabase
            .from('process_data')
            .insert([{ title: 'Baru', description: 'Deskripsi', icon_name: 'Check', order_index: steps.length + 1 }])
            .select();

        if (error) toast.error("Gagal menambah langkah");
        else {
            setSteps([...steps, ...data]);
            toast.success("Langkah ditambahkan!");
        }
    };

    const deleteStep = async (id: number) => {
        const { error } = await supabase.from('process_data').delete().eq('id', id);
        if (error) toast.error("Gagal menghapus");
        else {
            toast.success("Langkah dihapus");
            fetchSteps();
        }
    };

    return { steps, updateLocalStep, deleteStep, addStep, saveAllSteps };
};