"use client";

import Image from 'next/image';
import { useState } from 'react';

const ImageSequence = ({ dirPath, images }) => {
  const [loading, setLoading] = useState(true);

  return (
    <div className={`flex flex-col w-full relative ${loading ? 'h-[100dvh] overflow-hidden' : 'h-auto'}`}>
       {/* Skeleton - Only visible when loading */}
       {loading && (
        <div className="absolute inset-0 z-10 w-full h-full bg-gray-100 animate-pulse" />
      )}
      
      <div className={`flex flex-col w-full transition-opacity duration-500 ${loading ? 'opacity-0' : 'opacity-100'}`}>
        {images.map((img, index) => (
          <div key={index} className="relative w-full">
            <Image
              src={`${dirPath}/${img}`}
              alt={`Page content ${index + 1}`}
              width={800} // Base width matching container
              height={0}
              sizes="100vw"
              style={{ width: '100%', height: 'auto' }}
              priority={index < 2} // Load first few images eagerly
              onLoad={() => {
                // 첫 번째 이미지가 로드되면 스켈레톤 제거
                if (index === 0) setLoading(false);
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageSequence;
