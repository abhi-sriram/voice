import Layout from '../components/Layout'
import HeadComponent from '../components/HeadComponent'
import { useState } from 'react'
import { signInWithEmailAndPassword, auth } from '../firebase-app'
import { useRouter } from 'next/router'

function Index() {
  const router = useRouter()

  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [password, setPassword] = useState('')
  const login = async () => {
    setLoading(true)

    try {
      await signInWithEmailAndPassword(auth, email.trim(), password.trim())
    } catch (e) {
      console.log(e)
      setError(e.message)
    }
    if (auth.currentUser) {
      setLoading(false)
      const data = email.split('.')

      router.push(`/${data[1]}`)
    }
    setLoading(false)
  }
  return (
    <div className="mx-auto my-40 flex max-w-xl flex-col space-y-4 bg-white p-1 sm:p-0">
      <HeadComponent title={'Admin'} />
      <input
        type="email"
        placeholder="Email"
        className="rounded-md border border-dashed border-gray-200 p-4 text-gray-800 outline-none  focus:shadow-md"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        className="rounded-md border border-dashed border-gray-200 p-4 text-gray-800 outline-none  focus:shadow-md"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        className={`w-full rounded-md  p-3 ${
          loading
            ? 'cursor-not-allowed border border-dashed border-green-600 bg-white'
            : 'bg-green-600 hover:bg-green-400 '
        }`}
        onClick={login}
      >
        {loading ? (
          <div className="flex items-center justify-center space-x-3">
            <div className="h-3 w-3 animate-ping rounded-full bg-green-600"></div>
            <div className="h-3 w-3 animate-ping rounded-full bg-green-600"></div>

            <div className="h-3 w-3 animate-ping rounded-full bg-green-600"></div>
          </div>
        ) : (
          <p>Sign In</p>
        )}
      </button>
    </div>
  )
}

function Admin() {
  return (
    <div>
      <Layout Component={<Index />} />
    </div>
  )
}

export default Admin
