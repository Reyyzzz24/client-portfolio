"use client";
import { useInsightsData } from '@/hooks/useInsightsData';
import { Trash2, Plus, Save } from 'lucide-react';
import Button from './Button';
import ImageUploader from './ImageUploader';

export default function AdminInsights() {
    const { posts, updateLocalPost, deletePost, addPost, saveAllPosts, uploadInsightImage, uploadingId } = useInsightsData();

    return (
        <div className="space-y-6">
            <div className="flex justify-end items-center gap-2">
                <Button variant='outline' onClick={addPost}><Plus size={16} /> Tambah Insight</Button>
                <Button onClick={saveAllPosts}><Save size={16} /> Simpan</Button>
            </div>

            <div className="grid gap-6">
                {posts.map((post) => (
                    <div key={post.id} className="bg-white p-6 rounded-2xl border border-zinc-200 grid md:grid-cols-12 gap-6 items-start">
                        <div className="md:col-span-3">
                            <ImageUploader
                                url={post.image_url}
                                onUpload={(e: React.ChangeEvent<HTMLInputElement>) => uploadInsightImage(post.id, e)}
                                uploading={uploadingId === post.id}
                            />
                        </div>
                        <div className="md:col-span-7 space-y-3">
                            <input className="w-full font-bold outline-none border-b border-zinc-200" value={post.title} onChange={(e) => updateLocalPost(post.id, 'title', e.target.value)} placeholder="Judul" />
                            <textarea className="w-full text-sm outline-none border-b border-zinc-200" value={post.description} onChange={(e) => updateLocalPost(post.id, 'description', e.target.value)} placeholder="Deskripsi" />
                            <input className="w-full text-sm text-blue-600 outline-none border-b border-zinc-200" value={post.read_more_link || ''} onChange={(e) => updateLocalPost(post.id, 'read_more_link', e.target.value)} placeholder="Link Read More" />
                        </div>
                        <div className="md:col-span-2 flex justify-end">
                            <button onClick={() => deletePost(post.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg"><Trash2 size={18} /></button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}