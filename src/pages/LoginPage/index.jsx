import React, { useState, useEffect } from 'react'
import { Loading } from './../../assets/Loading';

const LoginPage = () => {

  const [imgUrl, setImgUrl] = useState("") 
  const [isLoading, setIsLoading] = useState(true)
  const [opacity, setOpacity] = useState('opacity-9')

  useEffect(() => {

    const rcnt = Math.round( Math.random() * ( 1008 - 1 ) + 1 )

    const img = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${rcnt}.png`

    setImgUrl(img)

    isLoading ? setOpacity('opacity-0') : setOpacity('opacity-100') 

  }, [isLoading])
  

  return (
    <section className='bg-gray-50 min-h-[90vh] flex items-center justify-center' >
      <div className='bg-gray-100 flex rounded-2xl shadow-lg max-w-3xl p-5 items-center'>
        <div className='md:w-1/2 px-8 md:px-16'>
          <h2 className='font-bold text-2xl'>Pokemon</h2>
          <p className='text-xs mt-4 text-[#002D74]'>포케몬 사이트에 오신걸</p>
          <p className='text-xs mt-4 text-[#002D74]'>환영합니다.</p>
          <p className='text-xs mt-4 text-[#002D74]'>로그인해 주세요.</p>
        </div>
        <div className='md:block hidden'>
          {isLoading &&(
            <div className='h-full z-10 w-full flex items-center justify-center'>
              <Loading className='w-12 h-12 z-50 animate-spin text-slate-300'/>
            </div>
          )}          
          <img 
          alt='login'
          src={imgUrl} 
          loading='lazy'
          onLoad={()=>setIsLoading(false)}
          className={`rounded-2xl w-[400px] object-contain h-full ${opacity}`}
          />
        </div>
      </div>
    </section>
  )
}

export default LoginPage
