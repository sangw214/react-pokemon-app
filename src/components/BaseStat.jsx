import React, { useRef, useEffect } from 'react'

const BaseStat = ( { valueStat, nameStat, type } ) => {

  const bg = `bg-${type}`

  const pokemonref = useRef(null)

  useEffect(() => {
    const setValueStat = pokemonref.current
    const calc = valueStat * ( 100 / 255 )
    setValueStat.style.width = calc + '%'
  }, [])

  return (
    <tr className='w-full text-white'>
      <td className='sm:px-5 text-left'>{nameStat}</td>
      <td className='sm:px-3 px-2'>{valueStat}</td>
      <td>
        <div
          className={`flex items-start h-2 overflow-hidden w-full min-w-[10rem] rounded bg-gray-600`}
        >
          <div ref={pokemonref} className={`h-3 ${bg}`}></div>
        </div>
      </td>
      <td className='px-2 sm:px-5'>255</td>
    </tr>
  )

}

export default BaseStat
