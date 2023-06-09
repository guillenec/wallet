
const userRegister = async (credentials) => {
  const response = await fetch('https://rest-api-wallet-no-country-production.up.railway.app/api/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  })

  if (!response.ok) {
    throw new Error('Error al registrarse')
  }

  const data = await response.json()
  return data
}

const userLogin = async (credentials) => {
  const response = await fetch('https://rest-api-wallet-no-country-production.up.railway.app/api/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  })

  if (!response.ok) {
    throw new Error('Error al iniciar sesión')
  }

  const data = await response.json()
  return data
}

export const authService = { userLogin, userRegister }
