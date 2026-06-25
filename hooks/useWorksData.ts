import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';

export const useWorksData = () => {
    const [works, setWorks] = useState<any[]>([]);

    useEffect(() => {
        fetchWorks();
    }, []);

    const fetchWorks = async () => {
        const { data } = await supabase.from('portfolio_projects').select('*').order('id');
        if (data) setWorks(data);
    };

    const updateLocalWork = (id: number, field: string, value: string) => {
        setWorks(prev => prev.map(w => w.id === id ? { ...w, [field]: value } : w));
    };

    const saveAllWorks = async () => {
        const promise = async () => {
            const { error } = await supabase
                .from('portfolio_projects')
                .upsert(works);

            if (error) throw error;
            fetchWorks();
        };

        toast.promise(promise(), {
            loading: 'Menyimpan proyek...',
            success: 'Semua perubahan berhasil disimpan!',
            error: 'Gagal menyimpan perubahan.',
        });
    };

    const addWork = async () => {
        const { data, error } = await supabase
            .from('portfolio_projects')
            .insert([{ title: 'Proyek Baru', description: 'Deskripsi', category: 'Web', image_url: '', project_link: '' }])
            .select();

        if (error) toast.error("Gagal menambah proyek");
        else {
            setWorks([...works, ...data]);
            toast.success("Proyek ditambahkan!");
        }
    };

    const [uploadingId, setUploadingId] = useState<number | null>(null);

    const uploadWorkImage = async (id: number, e: React.ChangeEvent<HTMLInputElement>) => {
        // Ekstrak file dari event di dalam fungsi
        const file = e.target.files?.[0];
        if (!file) return;

        setUploadingId(id);

        try {
            const fileExt = file.name.split('.').pop();
            const fileName = `${id}-${Math.random()}.${fileExt}`;

            // Pastikan nama bucket sesuai dengan yang ada di Supabase Anda
            const { error: uploadError } = await supabase.storage
                .from('project_images')
                .upload(fileName, file);

            if (uploadError) throw uploadError;

            const { data } = supabase.storage.from('project_images').getPublicUrl(fileName);

            updateLocalWork(id, 'image_url', data.publicUrl);
            toast.success("Gambar berhasil diupload!");
        } catch (error) {
            console.error("Gagal upload:", error);
            toast.error("Gagal mengupload gambar");
        } finally {
            setUploadingId(null);
        }
    };

    const deleteWork = async (id: number) => {
        const { error } = await supabase.from('portfolio_projects').delete().eq('id', id);
        if (error) toast.error("Gagal menghapus");
        else {
            toast.success("Proyek dihapus");
            fetchWorks();
        }
    };

    return {
        works,
        updateLocalWork,
        deleteWork,
        addWork,
        saveAllWorks,
        uploadWorkImage,
        uploadingId
    };
};