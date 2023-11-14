import axios from 'axios';
import { useEffect, useState, useMemo } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Loading } from './../../assets/Loading';
import { LessThan } from './../../assets/LessThan';
import { GreaterThan } from './../../assets/GreaterThan';
import { ArrowLeft } from './../../assets/ArrowLeft';
import { Balance } from './../../assets/Balance';
import { Vector } from './../../assets/Vector';
import Type from '../../components/Type';
import BaseStat from './../../components/BaseStat';
import DamageRelations from './../../components/DamageRelations';
import DamageModal from '../../components/DamageModal';

const DetailPage = () => {

  const [pokemon, setPokemon] = useState({})
  const [isLoading, setIsLoading] = useState(true)

  const [isModalOpen, setIsModalOpen] = useState(false)

  const { id:pokemonId } = useParams();
  const baseUrl = 'https://pokeapi.co/api/v2'

  useEffect( ()=>{
    fetchPokemonData()
    setIsLoading(true)
  },[ pokemonId ])

  const fetchPokemonData = async () => {

    const url = `${baseUrl}/pokemon/${pokemonId}`

    try{

      const { data:pokemonData } = await axios.get( url )

      if( pokemonData ){
        const { name, id, types, weight, height, stats, abilities, sprites  } = pokemonData
        const nextAntPreviousPokemonData = await nextAndPreviousPokemon( id )

        const DamageRelations = await Promise.all(
          types.map( async ( i ) => {
              const type = await axios.get( i.type.url )
              return type?.data?.damage_relations
          } )
        )

        const formattedPokemonData = {
          id,
          name,
          weight: weight / 10,
          height: height / 10,
          previous: nextAntPreviousPokemonData.previous,
          next: nextAntPreviousPokemonData.next,
          abilities: ( a => a.filter(( f, i ) => i <= 1 ).map( o => o.ability.name.replace(/-/g,' ') ) )( abilities ),
          stats: (( [ statHp, statATK, statDEF, statSATK, statSDEF, statSPD ] )=>
            [ 
              { name:'Hit Points', baseStat: statHp.base_stat },
              { name:'Attack', baseStat: statATK.base_stat },
              { name:'Defense', baseStat: statDEF.base_stat },
              { name:'Special Attack', baseStat: statSATK.base_stat },
              { name:'Special Defense', baseStat: statSDEF.base_stat },
              { name:'Speed', baseStat: statSPD.base_stat },
            ]
          )( stats ),
          damageRelations: DamageRelations,
          types: types.map( t => t.type.name ),
          sprites: ( function( s ){
              const news = {...s}
              Object.keys(news).forEach( k => {
                if( typeof news[k] !== 'string' ){
                  delete news[k]
                }
              } )
              return Object.values( news )
          } )( sprites ),
          description: await poekmonDescription( id )
        }

        setPokemon( formattedPokemonData )

      }

    }catch( err ){

      console.log( err )

    }finally{

      setIsLoading( false )

    }

  };

  const poekmonDescription = async ( id ) => {
    const url = `${baseUrl}/pokemon-species/${id}/`
    const { data: pokemonSpecies } = await axios.get(url)
    const desclist = filterAdnFormatDescription( pokemonSpecies.flavor_text_entries )

    return desclist[ Math.floor( Math.random() * desclist.length ) ]

  }

  const filterAdnFormatDescription = ( obj ) => {
    return obj?.filter( t => t.language.name === 'ko' ).map( t => t.flavor_text.replace( /\r|\n|\f/g, ' ' ) )
  }

  const nextAndPreviousPokemon = async ( id ) => {
    
    const url = `${baseUrl}/pokemon/?limit=1&offset=${id-1}`

    try{

      const { data:pokemonData } = await axios.get( url )

      const nextres = pokemonData.next && ( await axios.get( pokemonData.next ) )

      const prevres = pokemonData.previous && ( await axios.get( pokemonData.previous ) )

      return {
        next: findPokemonName( nextres ),
        previous: findPokemonName( prevres )
      }

    }catch( err ){

      console.log( err )

    }

  }

  const findPokemonName = ( pokemondata ) => {
    return pokemondata?.data?.results?.[0]?.name
  }

  if( isLoading ){
    return (
      <div className={`absolute h-auto w-auto top-1/3 -translate-x-1/2 left-1/2 z-5`}>
        <Loading className='w-12 h-12 z-50 animate-spin text-slate-900'/>
      </div> 
    )
  }

  if( !isLoading && !pokemon ){
    return (
      <div>
        ...Not found
      </div>
    )
  }

  const img = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon?.id}.png`
  const bg = `bg-${pokemon?.types?.[0]}`
  const border = `border-${pokemon?.types?.[0]}`
  const text = `text-${pokemon?.types?.[0]}`
  
  return (
    <div>
      <article 
        className='flex items-center gap-1 flex-col w-full'
      >
        <div
          className={`${bg} w-auto h-full flex flex-col z-0 items-center justify-end relative overflow-hidden`}
        >
          {/* 이전 포케몬 정보 */}
          { pokemon.previous && (
            <Link
              className='absolute top-[40%] -translate-y-1/2 z-50 left-1'
              to={`/pokemon/${pokemon.previous}`}
            >
              <LessThan 
                className='w-5 h-8 p-1'
              />
            </Link>
          ) }
          
          {/* 다음 포케몬 정보 */}
          { pokemon.next && (
            <Link
            className='absolute top-[40%] -translate-y-1/2 z-50 right-1'
            to={`/pokemon/${pokemon.next}`}
          >
            <GreaterThan
              className='w-5 h-8 p-1'
            />
          </Link>
          ) }
            {/* 상세 상단 */}
            <section className='w-full flex flex-col z-20 items-center justify-end relative h-full' >
              <div className='absolute z-30 top-6 flex items-center w-full justify-between' >
                <div className='flex items-center gap-1' >
                  <Link to='/'>
                    <ArrowLeft className='w-6 h-8 text-zinc-200' />
                  </Link>
                  <h1 className='text-zinc-200 font-bold text-xl capitalize' >
                    {pokemon.name}
                  </h1>
                </div>               
                <div className='text-zinc-200 font-bold text-md'>
                  #{pokemon.id.toString().padStart(3,'00')}
                </div>
              </div>
              <div className='relative h-auto max-width-[15.5rem] z-20 mt-7 -mb-16' >
                <img 
                  src={img} 
                  className='w-full h-auto object-contain f-full cursor-pointer' 
                  loading='lazy' 
                  alt={pokemon.name}
                  onClick={()=>setIsModalOpen(true)} />
              </div>
            </section>
            {/* 상세 하단 */}
            <section className='w-full min-h-[65%] h-full bg-gray-800 z-10 pt-12 flex-col items-center gap-3 px-5 pb-4'>
              {/* 포케몬 타입 */}
              <div className='flex items-center justify-center gap-4'>
                {pokemon.types.map( ( t ) => (
                  <Type key={t} type={t} />
                ) )}
              </div>
              {/* 포케몬 정보 */}
              <h2 className={`text-base font-semibold ${text}`} >
                정보
              </h2>
              <div className='flex w-full items-center justify-between max-x-[400px] text-center' >
                <div className='w-full '>
                  <h4 className='text-[0.5rem] text-zinc-100'>Weight</h4>
                  <div className='text-sm flex mt-1 gap-2 justify-center text-zinc-200'>
                    <Balance />
                    {pokemon.weight}kg
                  </div>
                </div>

                <div className='w-full '>
                  <h4 className='text-[0.5rem] text-zinc-100'>Height</h4>
                  <div className='text-sm flex mt-1 gap-2 justify-center text-zinc-200'>
                    <Vector />
                    {pokemon.height}m
                  </div>
                </div>

                <div className='w-full '>
                  <h4 className='text-[0.5rem] text-zinc-100'>Abilities</h4>
                    {pokemon.abilities.map( ( a, i ) => ( 
                      <div key={a} className='text-[0.5rem] text-zinc-100 capitalize'>{a}</div>
                    ) )}
                </div>                                
              </div>

              <h2 className={`text-base font-semibold ${text}`} >
                기본 능력치
              </h2>
              <div className='w-full'>
                <table>
                  <tbody>
                    {pokemon.stats.map( s => (
                      <BaseStat 
                        key={s.name}
                        valueStat={s.baseStat}
                        nameStat={s.name}
                        type={pokemon.types[0]}
                      />
                    ) )}
                  </tbody>
                </table>
              </div>

              {/*pokemon.damageRelations && (
                <div className='w-10/20'>
                  <h2 className={`text-base font-semibold ${text}`} >
                    <DamageRelations 
                      damages={pokemon.damageRelations}
                    />
                  </h2>
                </div>
              )*/}

              <h2 className={`text-base font-semibold ${text}`}>
                설명
              </h2>
              <p className={`text-md leading-4 font-sans text-zinc-200 max-w-[30rem] text-center`}>
                {pokemon.description}
              </p>

              <div className='flex my-8 flex-wrap justify-center'>
                {pokemon.sprites.map( (url,index) => {
                  if( index < 4 ){
                    return (
                      <img
                        key={index}
                        src={url}
                        alt='sprite'
                      />
                    )
                  }
                })}
              </div>

            </section>

            {isModalOpen && <DamageModal 
                               damages={pokemon.damageRelations}
                               setIsModalOpen={setIsModalOpen} />}

        </div>

      </article>
    </div>
  )
}

export default DetailPage
