"use client";

import { CldUploadWidget } from 'next-cloudinary';
import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { TrashIcon, ImageIcon } from '@radix-ui/react-icons';

type image = {
    url: string;
    id: string
}

interface ImageUploadProps {
  disabled?: boolean;
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
  values?: image[] | undefined;
  value?: string | undefined
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  disabled,
  onChange,
  onRemove,
  values,
  value
}) => {
  const onUpload = (result: any) => {
    onChange(result.info.secure_url);
  };

  return ( 
    <div>
      <div className="mb-4 flex items-center gap-4">
        {values?.map((url) => (
          <div key={url.id} className="relative w-[200px] h-[200px] rounded-md overflow-hidden">
            <div className="z-10 absolute top-2 right-2">
              <Button type="button" onClick={() => onRemove(url.id)} variant="destructive" size="sm">
                <TrashIcon className="h-4 w-4" />
              </Button>
            </div>
            <Image
              fill
              className="object-cover"
              alt="Image"
              src={url.url}
            />
          </div>
        ))}
      </div>
      {value ? (
        <div className="relative w-[200px] h-[200px] rounded-md overflow-hidden">
          <div className="z-10 absolute top-2 right-2">
              <Button type="button" onClick={() => onRemove(value)} variant="destructive" size="sm">
                <TrashIcon className="h-4 w-4" />
              </Button>
            </div>
            <Image
              fill
              className="object-cover"
              alt="Image"
              src={value}
            />
        </div>
      ) : (
        <div>
          <CldUploadWidget onUpload={onUpload} uploadPreset="ds7qvybc">
            {({ open }) => {
              const onClick = () => {
                open();
              };

              return (
                <Button 
                  type="button" 
                  disabled={disabled} 
                  variant="secondary" 
                  onClick={onClick}
                >
                  <ImageIcon className="h-4 w-4 mr-2" />
                  Upload an Image
                </Button>
              );
            }}
          </CldUploadWidget>
        </div>
      )}
    </div>
  );
}
 
export default ImageUpload;
