import React, { useRef } from 'react'
import DamageRelations from './DamageRelations';
import useOnClickOutsite from '../hooks/useOnClickOutside'

const DamageModal = ( { damages, setIsModalOpen } ) => {

  const bgRef = useRef()
  
  useOnClickOutsite( bgRef, () => setIsModalOpen(false) )

  return (
    <div
      className='flex items-center justify-center z-50 fixed left-0 bottom-0 w-full h-full bg-gray-800'
    >
      <div
        ref={bgRef}
        className='modal bg-white rounded-lg w-1/2'
      >
        <div
          className='flex flex-col items-center p-4'
        >
          <div className='flex items-center w-full justify-between'>
            <div
              className='text-gray-900 font-medium text-lg'
            >
              데미지 관계
            </div>
            <span
              className='text-gray-900 font-medium text-lg cursor-pointer'
              onClick={()=>setIsModalOpen(false)}
            >
              X
            </span>
          </div>

          <DamageRelations 
           damages={damages} 
          />

        </div>
      </div>
    </div>
  )
}

export default DamageModal
