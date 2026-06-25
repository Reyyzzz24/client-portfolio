import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';

export const useServicesData = () => {
    const [services, setServices] = useState<any[]>([]);

    useEffect(() => {
        fetchServices();
    }, []);

    const fetchServices = async () => {
        const { data } = await supabase.from('services_data').select('*').order('id');
        if (data) setServices(data);
    };

    const updateLocalService = (id: number, field: string, value: string) => {
        setServices(prev => prev.map(s => s.id === id ? { ...s, [field]: value } : s));
    };

    const saveAllServices = async () => {
        const promise = async () => {
            const { error } = await supabase
                .from('services_data')
                .upsert(services); 

            if (error) throw error;
            fetchServices(); 
        };

        toast.promise(promise(), {
            loading: 'Menyimpan...',
            success: 'Semua perubahan berhasil disimpan!',
            error: 'Gagal menyimpan perubahan.',
        });
    };

    const addService = async () => {
        const { data, error } = await supabase
            .from('services_data')
            .insert([{ title: 'Judul Baru', description: 'Deskripsi', icon_name: 'Code' }])
            .select();

        if (error) toast.error("Gagal menambah layanan");
        else {
            setServices([...services, ...data]);
            toast.success("Layanan ditambahkan!");
        }
    };

    const deleteService = async (id: number) => {
        const { error } = await supabase.from('services_data').delete().eq('id', id);
        if (error) toast.error("Gagal menghapus");
        else {
            toast.success("Layanan dihapus");
            fetchServices();
        }
    };

    return { services, updateLocalService, deleteService, addService, saveAllServices };
};