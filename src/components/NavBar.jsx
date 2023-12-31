import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut } from "firebase/auth"
import app from '../firebase'
import { Logout } from './../assets/Logout';
import { Login as LoginAssets } from './../assets/Login';
import { Guest } from './../assets/Guest';

const NavBar = () => {

  const navigate = useNavigate()

  const auth = getAuth(app);
  const provider = new GoogleAuthProvider()

  const handleAuth = () => {

    signInWithPopup(auth, provider)
    .then((result) => {
      setUserData( result.user )
      localStorage.setItem( 'userData', JSON.stringify( result.user ) )
      navigate('/')
    }).catch((error) => {
      console.log('# login err ', error )
      navigate('/login')
    });

  }

  const handleGuest = () => {
    setUserData( {name: 'guest', photoURL:imgUrl } )
    localStorage.setItem( 'userData', JSON.stringify( userData ) )
    navigate('/')
  }

  const handleRoot = () => {

    if( userData && userData.name ){
      navigate('/')
    }else{
      navigate('/login')
    }

  }

  const handleLogout = () => {

    if( userData.name === 'guest' ){

      setUserData({})

    }else{

      signOut(auth)
      .then( () => {
        setUserData({})
      } ).catch( ( err ) => {
        alert(err)
      } )

    }

  }

  const [userData, setUserData] = useState(  ( () => {
    const localUserData = localStorage.getItem('userData')
    return localUserData ? JSON.parse( localUserData ) : {}
  } )()  )

  useEffect(() => {

    const unsubscribe = onAuthStateChanged( auth, ( user ) => {
      if( userData.name == 'guest'){
        navigate('/')
      }else if( !user ){
        navigate('/login')
      }else if( user && pathname === '/login' ) {
        navigate('/')
      }
    } )

    return () => {
      unsubscribe()
    }

  },[ userData ])


  const [imgUrl, setImgUrl] = useState("") 
  const [show, setShow] = useState('transparent') 

  useEffect(() => {

    const rcnt = Math.round( Math.random() * ( 1008 - 1 ) + 1 )

    const img = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${rcnt}.png`

    setImgUrl(img)

    //window.addEventListener('scroll', listener )

    return () => {
      //window.removeEventListener('scroll', listener )
    }

  }, [])  

  const { pathname } = useLocation()
/*
  const listener = () => {

    if( window.scrollY > 50 ){

      setShow('orange')

    }else{

      setShow('transparent')

    }

  }
*/
  return (
    <NavWrapper show={show}>
      <Logo>
        <Image
          alt='poke logo'
          src={imgUrl}
          onClick={handleRoot}
        />
      </Logo>

      { pathname === '/login' ? (
          <>
            <GuestButton onClick={handleGuest}>
              <Guest className='w-12 h-12 z-50 animate-spin text-slate-300'/>              
            </GuestButton>
            <LoginButton onClick={handleAuth}>
              <LoginAssets className='w-12 h-12 z-50 animate-spin text-slate-300'/>
            </LoginButton>
          </>
      ) : (
        <SignOut>
          <UserImag 
            src={userData.photoURL ? userData.photoURL : ''}
            alt='user photo'
            loading='lazy'
          />
          <GuestButton onClick={handleLogout}>
            <Logout className='w-12 h-12 z-50 animate-spin text-slate-300'/>
          </GuestButton>
        </SignOut>
      ) }
    </NavWrapper>
  )
}
const UserImag = styled.img`
  border-radius: 50%;
  width: 100%;
  height: 100%;
`

const Dropdown = styled.div`
  position: absolute;
  top: 48px;
  right: 0px;
  background: rgb(19,19,19);
  border: 1px solid rgba(151,151,151,.34);
  border-radius: 4px;
  box-shadow: rgb(0 0 0 / 50%) 0px 0px 18px 0px;
  padding: 10px;
  font-size: 14px;
  letter-spacing: 3px;
  width: 100px;
  opacity: 0;
  color:white;
`

const SignOut = styled.div`
  position: relative;
  height: 48px;
  width: 48px;
  display: flex;
  cursor: pointer;
  align-items: center;
  justify-content: center;

  &:hover {
    ${Dropdown}{
      opacity: 1;
      transition-duration: 1s;
    }
  }
`

const LoginButton = styled.a`
  background-color: rgba(0,0,0,.6);
  padding: 8px 16px;
  text-transform: uppercase;
  letter-spacing: 1.55px;
  border: 1px solid #f9f9f9;
  border-radius: 4px;
  transition: all .2s ease 0s;
  cursor:pointer;
  color: white;
  &:hover {
    background-color: #F9F9F9;
    color: #000;
    border-color: transparent;
  }
`

const GuestButton = styled.a`
  background-color: rgba(0,0,0,.6);
  padding: 8px 16px;
  text-transform: uppercase;
  letter-spacing: 1.55px;
  border: 1px solid #f9f9f9;
  border-radius: 4px;
  transition: all .2s ease 0s;
  cursor:pointer;
  color: white;
  &:hover {
    background-color: #F9F9F9;
    color: #000;
    border-color: transparent;
  }
`

const Image = styled.img`
  cursor: pointer;
  img{
    width: 100%;
  }  
`

const NavWrapper = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 70px;
  display: flex;
  background-color: ${ props => props.show };
  transition-duration: .3s;
  justify-content: space-between;
  align-items: center;
  padding: 0 36px;
  letter-spacing: 16px;
  z-index: 100;
`

const Logo = styled.a`
  padding: 0;
  width: 50px;
  margin-top: 4px;
`

export default NavBar
