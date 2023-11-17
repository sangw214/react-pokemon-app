import { useEffect, useState } from 'react'
import axios from 'axios'
import PokeCard from '../../components/PokeCard'
import AutoComplete from '../../components/AutoComplete';

const MainPage = () => {

  /* 모든 포켓몬 정보 */
  const [allpokemons, setAllpokemons] = useState([])

  /* 목록으로 노출 되는 포켓몬 정보 */
  const [dsiplayedPokemons, setDsiplayedPokemons] = useState([])

  /* 조회 갯수 목록 */
  const limitNum = 20

  const maxcount = 1016

  const allPokemonUrl = `https://pokeapi.co/api/v2/pokemon/?limit=${maxcount}&offset=0`

  useEffect(() => {
    fetchPokeData(true)
  }, [])

  const fetchPokeData = async () => {
    try{
      const res = await axios.get( allPokemonUrl )
      setAllpokemons( res.data.results )
      setDsiplayedPokemons( filterDisplayedPokemonData( res.data.results ) )
    }catch( err ){
      console.log( err )
    }
  }

  const filterDisplayedPokemonData = ( allpokemonsData, displayedPokemons = [] ) => {

    const limit = displayedPokemons.length + limitNum;

    const array = allpokemonsData.filter( ( p, i ) => i + 1 <= limit )

    return array

  }

  const filterAllDisplayedPokemonData = ( allpokemonsData ) => {

    const array = allpokemonsData.filter( ( p, i ) => i + 1 <= maxcount )

    return array

  }  
  
  return (
    <>
    <article className='pt-6'>
      <header className='flex flex-col gap-2 w-full px-4 z-50'>
        <AutoComplete 
          allpokemons={allpokemons} 
          setDsiplayedPokemons={setDsiplayedPokemons} />
      </header>
      <section className='pt-6 flex flex-col justify-center items-center overflow-auto z-0'>
        <div className='flex flex-row flex-wrap gap-[16px] items-center justify-center px-2 max-w-4xl'>
          {
            dsiplayedPokemons.length > 0 
              ? (
                  /*pokemons.map(({ url, name }, index)=> <div key={name}>{name}</div> )*/
                  dsiplayedPokemons.map(({ url, name }, index)=> 
                    <PokeCard key={name} url={url} name={name} />
                  )
                ) 
              : (
                  <h2 className='font-mediu text-lg text-slate-900 mb-1'>포켓몬이 없습니다.</h2>
                )
          }
        </div>
      </section>
      <div className='text-center'>
        { ( allpokemons.length > dsiplayedPokemons.length ) && ( dsiplayedPokemons.length !== 1 ) && (
          <button 
            className='bg-slate-800 px-6 py-2 my-4 text-base rounded-lg font-bold text-white'
            onClick={ () => setDsiplayedPokemons( filterDisplayedPokemonData( allpokemons, dsiplayedPokemons ) ) }
          >
            더 보기
          </button>
        ) }
        &nbsp;
        { ( dsiplayedPokemons.length != maxcount ) && (        
          <button 
            className='bg-slate-800 px-6 py-2 my-4 text-base rounded-lg font-bold text-white'
            onClick={ () => setDsiplayedPokemons( filterAllDisplayedPokemonData( allpokemons ) ) }
          >
            모두보기
          </button>
        ) }          
      </div>
    </article>
    </>
  )
}

export default MainPage
