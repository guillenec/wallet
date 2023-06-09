import { useSelector } from 'react-redux'
import Footer from './Footer'
import NavSecundary from './NavSecundary'
import { useState } from 'react'
import VerticalMenu from './VerticalMenu'
import Navbar from './Navbar'

const Layout = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);


  const isAuthenticated = useSelector((state) => state?.auth?.isAuthenticated)

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className='principal w-full h-auto bg-fondo flex flex-wrap relative overflow-hidden items-center justify-center'>
      
      {isAuthenticated ? <NavSecundary toggleMenu={toggleMenu}/> : null}
      {isAuthenticated ? <VerticalMenu isOpen={isOpen}/> : <Navbar />}
      <div className='main w-full bg-fondo sm:w-full flex justify-center items-center'>
      {children}
      </div>
      <Footer />
    </div>
  )
}

export default Layout
