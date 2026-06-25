import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';

export const useTestimonialsData = () => {
    const [testimonials, setTestimonials] = useState<any[]>([]);
    const [uploadingId, setUploadingId] = useState<number | null>(null);

    useEffect(() => {
        fetchTestimonials();
    }, []);

    const fetchTestimonials = async () => {
        const { data } = await supabase.from('testimonials_data').select('*').order('id');
        if (data) setTestimonials(data);
    };

    const updateLocalTestimonial = (id: number, field: string, value: string) => {
        setTestimonials(prev => prev.map(t => t.id === id ? { ...t, [field]: value } : t));
    };

    const saveAllTestimonials = async () => {
        const promise = async () => {
            const { error } = await supabase.from('testimonials_data').upsert(testimonials);
            if (error) throw error;
            fetchTestimonials();
        };

        toast.promise(promise(), {
            loading: 'Menyimpan...',
            success: 'Testimoni berhasil disimpan!',
            error: 'Gagal menyimpan.',
        });
    };

    const addTestimonial = async () => {
        const { data, error } = await supabase
            .from('testimonials_data')
            .insert([{ name: 'Nama Baru', quote: 'Isi testimoni...', role: 'Posisi' }])
            .select();

        if (error) toast.error("Gagal menambah");
        else {
            setTestimonials([...testimonials, ...data]);
            toast.success("Ditambahkan!");
        }
    };

    const deleteTestimonial = async (id: number) => {
        const { error } = await supabase.from('testimonials_data').delete().eq('id', id);
        if (error) toast.error("Gagal menghapus");
        else {
            fetchTestimonials();
            toast.success("Dihapus");
        }
    };

    const uploadAvatar = async (id: number, e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setUploadingId(id);

        try {
            const fileExt = file.name.split('.').pop();
            const fileName = `avatar-${id}-${Math.random()}.${fileExt}`;
            const { error: uploadError } = await supabase.storage.from('avatars').upload(fileName, file);
            if (uploadError) throw uploadError;

            const { data } = supabase.storage.from('avatars').getPublicUrl(fileName);
            updateLocalTestimonial(id, 'avatar_url', data.publicUrl);
            toast.success("Avatar diupload!");
        } catch (error) {
            toast.error("Gagal upload avatar");
        } finally {
            setUploadingId(null);
        }
    };

    return { testimonials, updateLocalTestimonial, deleteTestimonial, addTestimonial, saveAllTestimonials, uploadAvatar, uploadingId };
};