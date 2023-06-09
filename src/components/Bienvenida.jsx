import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUserByid } from '../slices/userSlice'

const Bienvenida = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state?.user?.user)

  useEffect(() => {
    dispatch(fetchUserByid(user?.id))
  }, [dispatch, user])

  return (
    <section className='saludo flex flex-row items-center justify-center h-auto w-full'>
      {user
        ? (
          <div className='w-full p-2 flex flex-col items-center justify-center gap-5'>
            <h1 className='w-full text-center font-titulo capitalize font-[600] text-xl text-bgSubmenu'>
              Bienvenido {user.username} {user.surname}
            </h1>
            <h2 className='w-full text-center font-parrafo capitalize font-[500] text-md text-bgSubmenu'>Cuenta N° <span className='font-titulo text-colorFuente1Submenu'>{user.account_number} </span></h2>
          </div>
          )
        : (
          <h1>Bienvenido</h1>
          )}
    </section>
  )
}

export default Bienvenida
