'use client';

import { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Video } from 'lucide-react';
import { ReelUploadSectionProps } from '@/typescript/type/reel.type';



export default function ReelUploadSection({ onUpload }: ReelUploadSectionProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onUpload(file);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  return (
    <div className="mb-8">
      <div
        className="border-2 border-dashed border-[#262626] rounded-lg p-8 md:p-12 text-center hover:border-[#D493FF] transition-colors cursor-pointer"
        onClick={() => fileInputRef.current?.click()}
      >
        <Video className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-4 text-[#D493FF]" />
        <h3 className="text-lg md:text-xl font-semibold text-white mb-2">Create a Reel</h3>
        <p className="text-sm md:text-base text-[#A1A1AA] mb-4">Click to upload a video</p>
        <Button className="bg-[#D493FF] text-black hover:bg-[#D493FF]/90 font-semibold">
          Select Video
        </Button>
        <input
          ref={fileInputRef}
          type="file"
          accept="video/*"
          onChange={handleFileChange}
          className="hidden"
        />
      </div>
    </div>
  );
}