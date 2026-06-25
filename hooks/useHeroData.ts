import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';

export const useHeroData = () => {
    const [formData, setFormData] = useState({ title: '', subtitle: '', description: '', photo_url: '' });
    const [companies, setCompanies] = useState<any[]>([]); // New state
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        const fetchAll = async () => {
            const [heroRes, compRes] = await Promise.all([
                supabase.from('hero_data').select('*').single(),
                supabase.from('trusted_companies').select('*').order('id')
            ]);
            if (heroRes.data) setFormData(heroRes.data);
            if (compRes.data) setCompanies(compRes.data);
            setLoading(false);
        };
        fetchAll();
    }, []);

    const updateCompany = async (id: number, newName: string) => {
        setCompanies(prev => prev.map(c => c.id === id ? { ...c, name: newName } : c));

        const { error } = await supabase.from('trusted_companies').update({ name: newName }).eq('id', id);
        if (error) toast.error("Gagal mengupdate perusahaan.");
    };
    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setUploading(true);

        const fileExt = file.name.split('.').pop();
        const fileName = `hero_${Math.random()}.${fileExt}`;

        const { data, error: uploadError } = await supabase.storage
            .from('hero_images').upload(fileName, file);

        if (uploadError) {
            toast.error("Gagal mengupload gambar."); // 2. Ubah alert ke toast
            setUploading(false);
            return;
        }

        const { data: publicUrlData } = supabase.storage.from('hero_images').getPublicUrl(data.path);
        const newPhotoUrl = publicUrlData.publicUrl;

        const { error: updateError } = await supabase.from('hero_data').update({ photo_url: newPhotoUrl }).eq('id', 1);

        if (!updateError) {
            setFormData(prev => ({ ...prev, photo_url: newPhotoUrl }));
            toast.success("Gambar berhasil diperbarui!"); // 2. Ubah alert ke toast
        } else {
            toast.error("Gagal menyimpan URL gambar ke database.");
        }
        setUploading(false);
    };

    const saveHero = async () => {
        const promise = (async () => {
            const { error } = await supabase
                .from('hero_data')
                .update(formData)
                .eq('id', 1);

            if (error) throw error;
            return "Success";
        })();

        toast.promise(promise, {
            loading: 'Menyimpan perubahan...',
            success: 'Perubahan berhasil disimpan!',
            error: (err: any) => `Gagal menyimpan: ${err.message}`,
        });
    };

    return { formData, setFormData, handleFileUpload, saveHero, uploading, loading, companies, updateCompany };
};