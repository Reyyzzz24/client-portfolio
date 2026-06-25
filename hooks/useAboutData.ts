import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';

export const useAboutData = () => {
    const [formData, setFormData] = useState({id: 1, description_1: '', description_2: '', description_3: '', photo_url: '' });
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        const fetchAbout = async () => {
            const { data } = await supabase.from('about_data').select('*').single();
            if (data) setFormData(data);
        };
        fetchAbout();
    }, []);

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setUploading(true);

        const fileExt = file.name.split('.').pop();
        const fileName = `about_${Math.random()}.${fileExt}`;

        const { data, error: uploadError } = await supabase.storage
            .from('about_images').upload(fileName, file);

        if (uploadError) {
            toast.error("Gagal mengupload gambar.");
            setUploading(false);
            return;
        }

        const { data: publicUrlData } = supabase.storage.from('about_images').getPublicUrl(data.path);
        const newPhotoUrl = publicUrlData.publicUrl;

        const { error: updateError } = await supabase.from('about_data').update({ photo_url: newPhotoUrl }).eq('id', 1);

        if (!updateError) {
            setFormData(prev => ({ ...prev, photo_url: newPhotoUrl }));
            toast.success("Foto berhasil diperbarui!");
        }
        setUploading(false);
    };

    const saveAbout = async () => {
        const { id, ...dataToUpdate } = formData;

        const promise = (async () => {
            const { error } = await supabase
                .from('about_data')
                .update(dataToUpdate)
                .eq('id', 1);

            if (error) throw error;
        })();

        toast.promise(promise, {
            loading: 'Menyimpan...',
            success: 'About berhasil diperbarui!',
            error: (err) => `Gagal menyimpan: ${err.message}`,
        });
    };

    return { formData, setFormData, handleFileUpload, saveAbout, uploading };
};