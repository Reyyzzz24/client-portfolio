"use client";
import { useFooterData } from '@/hooks/useFooterData';
import { Save } from 'lucide-react';
import Button from './Button';

export default function AdminFooter() {
    const { socialLinks, updateLocalLink, saveAllLinks } = useFooterData();

    return (
        <div className="space-y-6">
            <div className="flex justify-end">
                <Button onClick={saveAllLinks}>
                    <Save size={16} /> Simpan Perubahan
                </Button>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-zinc-200">
                <div className="grid gap-4">
                    {socialLinks.map((link) => (
                        <div key={link.id} className="grid md:grid-cols-2 gap-4 border-b border-zinc-200 pb-4">
                            <div>
                                <label className="text-xs text-zinc-500 block">Ikon (FaLinkedin, FaInstagram, FaGithub, Globe)</label>
                                <input
                                    className="w-full outline-none font-mono text-sm"
                                    value={link.icon_type}
                                    onChange={(e) => updateLocalLink(link.id, 'type', e.target.value)}
                                />
                            </div>
                            <div>
                                <label className="text-xs text-zinc-500 block">URL</label>
                                <input
                                    className="w-full outline-none text-sm"
                                    value={link.url}
                                    onChange={(e) => updateLocalLink(link.id, 'url', e.target.value)}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}