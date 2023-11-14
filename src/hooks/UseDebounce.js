import { useState, useEffect } from 'react'

export const useDebounc = ( value, delay ) => {

  const [ debouncedValue, setDebouncedValue ] = useState( value )

  useEffect( () => {

    const handler = setTimeout( () => {

      setDebouncedValue( value )

    }, delay )

    return () => {
      clearTimeout( handler )
    }

  } )

  return debouncedValue

}