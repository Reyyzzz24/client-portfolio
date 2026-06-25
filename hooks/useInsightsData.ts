import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';

export const useInsightsData = () => {
    const [posts, setPosts] = useState<any[]>([]);
    const [uploadingId, setUploadingId] = useState<number | null>(null);

    useEffect(() => { fetchPosts(); }, []);

    const fetchPosts = async () => {
        const { data } = await supabase.from('insights_posts').select('*').order('date', { ascending: false });
        if (data) setPosts(data);
    };

    const updateLocalPost = (id: number, field: string, value: string) => {
        setPosts(prev => prev.map(p => p.id === id ? { ...p, [field]: value } : p));
    };

    const saveAllPosts = async () => {
        const { error } = await supabase.from('insights_posts').upsert(posts);
        if (error) toast.error("Gagal menyimpan");
        else toast.success("Insight berhasil disimpan!");
    };

    const addPost = async () => {
        const { data, error } = await supabase
            .from('insights_posts')
            .insert([{ title: 'Judul Baru', date: new Date().toISOString(), description: '' }])
            .select();
        if (data) setPosts([...data, ...posts]);
    };

    const deletePost = async (id: number) => {
        await supabase.from('insights_posts').delete().eq('id', id);
        fetchPosts();
    };

    const uploadInsightImage = async (id: number, e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploadingId(id);

        try {
            const fileExt = file.name.split('.').pop();
            const fileName = `insight-${id}-${Math.random()}.${fileExt}`;

            const { error: uploadError } = await supabase.storage
                .from('insight_images')
                .upload(fileName, file);

            if (uploadError) throw uploadError;

            const { data } = supabase.storage
                .from('insight_images')
                .getPublicUrl(fileName);

            updateLocalPost(id, 'image_url', data.publicUrl);
            toast.success("Gambar berhasil diupload!");
        } catch (error) {
            console.error("Gagal upload:", error);
            toast.error("Gagal mengupload gambar");
        } finally {
            setUploadingId(null);
        }
    };

    return { posts, updateLocalPost, deletePost, addPost, saveAllPosts, uploadInsightImage, uploadingId };
};