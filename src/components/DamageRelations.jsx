import React, { useEffect, useState } from 'react'
import Type from './Type'

const DamageRelations = ( { damages } ) => {

  const [damagePokemonForm, setDamagePokemonForm] = useState()

  useEffect(() => {

    const dary = damages.map( d => separateObjectBetweenToAndFrom(d) )

    if( dary.length === 2 ){
/*
      
      rst = { 'from': reduceDuplicateValues( postDamageValue( rst.from ) ),
              'to':  reduceDuplicateValues( postDamageValue( rst.to ) ) }
*/
      const rst = joinDamageRelations( dary )
      setDamagePokemonForm( reduceDuplicateValues( postDamageValue( rst.from ) ) )

    }else{
      setDamagePokemonForm( reduceDuplicateValues( postDamageValue( dary[0].from ) ) ) 
    }

  }, [])

  const reduceDuplicateValues = ( obj ) => {

    const dval = {
      double_damage : '4x',
      half_damage : '1/4x',
      no_damage : '0x'
    }

    return Object.entries( obj ).reduce( ( acc, [ k, v ] ) => {

      const rst = filterForUniqueValues( v, dval[k] )

      return ( acc = { [k]:rst, ...acc } )

    }, {} )

  }

  const filterForUniqueValues = ( v, vs ) => {
    
    return v.reduce( (acc, tv ) => {

      const { name, url } = tv

      const fary = acc.filter( a => a.name !== name )
      
      return fary.length === acc.length 
           ? ( acc = [ tv, ...acc ] ) 
           : ( acc = [ { name, url, damageValue:vs }, ...fary ] )

    }, [] )

  }

  const joinDamageRelations = ( obj ) => {

    return {
      from : joinObjects( obj, 'from' ),
      to : joinObjects( obj, 'to' )
    }

  }

  const joinObjects = ( obj, type ) => {

    const fary = obj[0][type]
    const sary = obj[1][type]

    const rst = Object.entries(sary).reduce( ( acc, [k,v] ) => {
      const astr = fary[k].concat(v)
      return ( acc = { [k] : astr, ...acc } )
    }, {} )
    
    return rst

  }

  const postDamageValue = ( obj ) => {

    const rst = Object.entries( obj ).reduce( ( acc , [ k, v ] ) => {

      const kvalue = {
        double_damage : '2x',
        half_damage : '1/2x',
        no_damage : '0x'
      }

      return ( acc = { [k] : v.map( o => ( { ...o , damageValue: kvalue[k] } ) ) , ...acc } )

    }, {} )

    return rst

  }

  const separateObjectBetweenToAndFrom = d => {
    const from = fileterDamageRelations('_from', d)
    const to = fileterDamageRelations('_to', d)
    return { from, to }
  }

  const fileterDamageRelations = ( s, d ) => {

    const rary = Object
               .entries( d )
               .filter( ( [ k1 ] ) => k1.includes( s ) )
               .reduce( ( ac , [ k2, v2 ] ) =>{
                const rkey = k2.replace( s , '' )
                return ( ac = { [rkey] : v2 , ...ac} )
               }, {} )
 
    return rary

  }

  const damageOfKeyName = {
    double_damage : 'Week',
    half_damage : 'Registant',
    no_damage : 'Immune'
  }

  return (
    <div className='flex gap-2 flex-col'>
      { damagePokemonForm 
      ? (
        <>
          { 
            Object
              .entries(damagePokemonForm)
              .map( ([ key, val ]) => {
                return (
                  <div key={key}>
                    <h3 className='capitalize font-medium text-sm md:text-base text-slate-500 text-center'>
                      {damageOfKeyName[key]}
                    </h3>
                    <div className='flex flex-wrap gap-1 justify-center'>
                      {
                       val.length > 0 
                       ? (
                        val.map( ( { name, url, damageValue } ) => {
                          return (
                            <Type 
                              type={name} 
                              key={url}
                              damageValue={damageValue}
                            />
                          )
                        } )
                       )
                       : (
                        <Type type={'none'} key={'none'} />
                       )
                      }
                    </div>
                  </div>
                )
              } ) 
          }
        </>
      )
      : <div></div>
       }
    </div>
  )
}

export default DamageRelations
