'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export function Modal({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  const handleClose = () => {
    router.back();
  };

  return (
    <div
      className='w-screen h-screen overflow-hidden fixed top-0 left-0 backdrop-blur-md flex flex-col items-center justify-center'
      onClick={handleClose}
    >
      <button
        className='absolute top-5 right-5'
        onClick={(e) => {
          e.stopPropagation();
          handleClose();
        }}
      >
        Close modal
      </button>
      <div
        className='relative z-10'
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}