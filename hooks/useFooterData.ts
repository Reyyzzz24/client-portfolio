import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';

export const useFooterData = () => {
    const [socialLinks, setSocialLinks] = useState<any[]>([]);

    useEffect(() => {
        fetchSocialLinks();
    }, []);

    const fetchSocialLinks = async () => {
        const { data } = await supabase.from('social_links').select('*').order('id');
        if (data) setSocialLinks(data);
    };

    const updateLocalLink = (id: number, field: string, value: string) => {
        setSocialLinks(prev => prev.map(l => l.id === id ? { ...l, [field]: value } : l));
    };

    const saveAllLinks = async () => {
        const promise = async () => {
            const { error } = await supabase.from('social_links').upsert(socialLinks);
            if (error) throw error;
            fetchSocialLinks();
        };

        toast.promise(promise(), {
            loading: 'Menyimpan...',
            success: 'Link sosial media berhasil diperbarui!',
            error: 'Gagal menyimpan.',
        });
    };

    return { socialLinks, updateLocalLink, saveAllLinks };
};