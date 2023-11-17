import React, { useState , useEffect } from 'react'
import { Loading } from './../assets/Loading';

const LazyImage = ( { url, alt } ) => {

  const [isLoading, setIsLoading] = useState(true)
  const [opacity, setOpacity] = useState('opacity-9')

  useEffect(() => {
    isLoading ? setOpacity('opacity-0') : setOpacity('opacity-100') 
  }, [isLoading])
  

  return (
    <>
      {isLoading &&(
        <div className='absolute h-full z-10 w-full flex items-center justify-center'>
          <Loading className='w-12 h-12 z-50 animate-spin text-slate-300'/>
        </div>
      )}
      <img 
        src={url}
        alt={alt}
        width='100%' 
        height='auto'
        loading='lazy'
        onLoad={()=>setIsLoading(false)}
        className={`object-contain h-full ${opacity}`}
        />
    </>
  )
}

export default LazyImage
