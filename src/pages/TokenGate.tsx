import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { validateToken } from '../config/api'
import Portfolio from '../components/Portfolio'

type LoadingState = 'loading' | 'valid' | 'invalid'

function TokenGate() {
  const { token } = useParams<{ token: string }>()
  const navigate = useNavigate()
  const [state, setState] = useState<LoadingState>('loading')

  useEffect(() => {
    if (!token) {
      navigate('/expired')
      return
    }

    const checkToken = async () => {
      const result = await validateToken(token)
      
      if (result.valid) {
        setState('valid')
      } else {
        setState('invalid')
        // Small delay before redirect for UX
        setTimeout(() => navigate('/expired'), 100)
      }
    }

    checkToken()
  }, [token, navigate])

  if (state === 'loading') {
    return (
      <div className="loading">
        <div className="spinner"></div>
        <p>Loading...</p>
      </div>
    )
  }

  if (state === 'invalid') {
    return (
      <div className="loading">
        <p>Redirecting...</p>
      </div>
    )
  }

  return <Portfolio />
}

export default TokenGate
