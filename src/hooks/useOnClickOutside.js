import {useEffect} from 'react'

export default function useOnClickOutsite( ref, handler ){

  useEffect(() => {

    const listener = ( event ) => {

      if( ref.current && !ref.current.contains( event.target ) ){

        handler() 
        
      }

      return


    }

    document.addEventListener('mousedown', listener)
    document.addEventListener('touchstart', listener)

    return () => {
      document.removeEventListener('mousedown', listener)
      document.removeEventListener('touchstart', listener)
    }

  }, [ ref, handler  ])
  
}