'use client'

import { X } from 'lucide-react';
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export function Modal({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  const handleClose = () => {
    router.back();
  };

  return (
    <div
      className='w-full h-full overflow-hidden fixed top-0 left-0 backdrop-blur-md flex flex-col items-center justify-center'
      onClick={handleClose}
    >
      <button
        className='fixed top-5 right-5 z-30'
        onClick={(e) => {
          e.stopPropagation();
          handleClose();
        }}
      >
        <X/>
      </button>
      <div
        className='relative z-20 max-w-[65ch] w-full'
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}