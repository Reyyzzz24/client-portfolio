import { Upload, Image as ImageIcon } from 'lucide-react';

export default function ImageUploader({ url, onUpload, uploading }: any) {
  return (
    <div className="aspect-square w-full bg-gray-100 rounded-3xl overflow-hidden border-2 border-dashed border-gray-200 flex flex-col items-center justify-center relative">
      {url ? <img src={url} className="w-full h-full object-cover" /> : <ImageIcon className="text-gray-400" size={48} />}
      <input type="file" onChange={onUpload} className="hidden" id="file-upload" />
      <label htmlFor="file-upload" className="absolute bottom-4 bg-white/90 px-4 py-2 rounded-full text-sm font-medium cursor-pointer shadow-sm border flex items-center gap-2">
        <Upload size={14} /> {uploading ? 'Uploading...' : 'Ganti Foto'}
      </label>
    </div>
  );
}