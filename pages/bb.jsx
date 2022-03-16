import Layout from '../components/Layout'
import HeadComponent from '../components/HeadComponent'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import { auth, db, deleteDoc, doc, getDoc } from '../firebase-app'

function FillForm() {
  const [loading, setLoading] = useState(false)
  const [id, setId] = useState('')
  const [email, setEmail] = useState('')
  const [data, setData] = useState('')
  const [type, setType] = useState('')
  const [error, setError] = useState('')
  const [docId, setDocId] = useState('')

  const send = async () => {
    console.log({ id, email, data, type })
    setError('')
    if (id == '' || email == '' || data == '' || type == '') {
      setError('All fields are required')
      return
    }
    if (id.length != 7) {
      setError('ID must be 7 digits')
      return
    }
    console.log(id.slice(0, 1))
    if (id.slice(0, 1) != 'B') {
      setError('ID must start with B')
      return
    }
    if (isNaN(id.slice(1, 7))) {
      setError('Invalid ID')
      return
    }
    const filter =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if (!filter.test(email.trim())) {
      setError('Invalid Email')
      return
    }
    if (type != 'suggestion' && type != 'problem') {
      setError('Invalid Type')
      return
    }
    if (data.trim().length < 20) {
      setError('Data must be atleast 20 characters long')
      return
    }
    if (loading) {
      return
    }
    setLoading(true)

    var myHeaders = new Headers()
    myHeaders.append('Content-Type', 'application/json')

    var raw = JSON.stringify({
      data: data.trim(),
      type: type.trim(),
      id: id.trim(),
      email: email.trim(),
      collection: 'bb',
    })

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    }

    try {
      await fetch('http://localhost:3000/api/sendData', requestOptions)
        .then((response) => response.text())
        .then((result) => {
          setDocId(JSON.parse(result).id)
        })
        .catch((error) => console.log('error', error))
    } catch (error) {
      console.log(error)
      setError('Error sending data')
    }

    setLoading(false)
  }

  return (
    <div className="flex flex-col space-y-4 p-5">
      <div>
        <select
          name="Type"
          className="max-w-xl border-b bg-white p-4 outline-none"
          onChange={(e) => setType(e.target.value)}
        >
          <option value="">Type</option>

          <option
            value="suggestion"
            className="!p-4 text-gray-800 outline-none"
          >
            Suggestion/Feedback
          </option>
          <option value="problem" className="!p-4 text-gray-800 outline-none">
            Complaint
          </option>
        </select>
      </div>

      <input
        type="text"
        placeholder="Student ID"
        className="rounded-md border border-dashed border-gray-200 p-4 text-gray-800 outline-none  focus:shadow-md"
        onChange={(e) => setId(e.target.value.toUpperCase())}
        value={id}
      />
      <div className="flex flex-col space-y-1">
        <input
          type="email"
          placeholder="Email - Prefer College Email"
          className="rounded-md border border-dashed border-gray-200 p-4 text-gray-800 outline-none  focus:shadow-md"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <code className="text-xs text-gray-500">
          <b>NOTE:</b> Recieve email when issue resolved.
        </code>
      </div>

      <textarea
        type="text"
        placeholder="Tell me about it."
        className="rounded-md border border-dashed border-gray-200 p-4 text-gray-800 outline-none  focus:shadow-md"
        onChange={(e) => setData(e.target.value)}
        value={data}
      />
      <button
        className={`w-full rounded-md  p-3 ${
          loading
            ? 'cursor-not-allowed border border-dashed border-green-600 bg-white'
            : 'bg-green-600 hover:bg-green-400 '
        }`}
        onClick={send}
      >
        {loading ? (
          <div className="flex items-center justify-center space-x-3">
            <div className="h-3 w-3 animate-ping rounded-full bg-green-600"></div>
            <div className="h-3 w-3 animate-ping rounded-full bg-green-600"></div>

            <div className="h-3 w-3 animate-ping rounded-full bg-green-600"></div>
          </div>
        ) : (
          <p>Submit</p>
        )}
      </button>
      {error && <code className="text-xs text-red-500">{error}</code>}
      {docId && (
        <h1>
          Reference Number: <code>{docId}</code>
        </h1>
      )}
    </div>
  )
}

function View() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [user, setUser] = useState(false)
  const [loadingResolved, setLoadingResolved] = useState(false)
  const getData = async () => {
    if (loading) {
      return
    }
    setLoading(true)
    var myHeaders = new Headers()
    myHeaders.append('Content-Type', 'application/json')
    let l = true
    if (auth.currentUser) {
      l = false
      setUser(true)
    }

    var raw = JSON.stringify({
      collection: 'bb',
      latest: l,
    })

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    }

    await fetch('http://localhost:3000/api/getData', requestOptions)
      .then((response) => response.text())
      .then((result) => {
        const res = JSON.parse(result)
        console.log(res)
        const d = JSON.parse(res.data)
        console.log(d)
        setData(d)
      })
      .catch((error) => {
        console.log('error', error)
        setError('Error getting data')
      })
    setLoading(false)
  }
  useEffect(() => {
    getData()
    console.log(auth.currentUser)
  }, [])

  const resolvedFunc = async (d) => {
    if (loadingResolved) {
      return
    }
    console.log(d.docId)
    setLoadingResolved(true)

    await deleteDoc(doc(db, 'bb', d.docId)).then(async () => {
      const newData = data.filter((e) => e.id !== d.id)
      setData(newData)
      var myHeaders = new Headers()
      myHeaders.append('Content-Type', 'application/json')

      var raw = JSON.stringify({
        data: d.data,
        type: d.type,
        id: d.id,
        email: d.email,
        docId: d.docId,
        colName: 'bb',
      })

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow',
      }

      await fetch('http://localhost:3000/api/sendResolvedMail', requestOptions)
        .then((response) => response.text())
        .then((result) => console.log(result))
        .catch((error) => console.log('error', error))
    })
    setLoadingResolved(false)
  }

  return (
    <div className="my-2 flex flex-col space-y-2 p-1 ">
      <div className="sticky top-10 z-40 bg-white">
        {loadingResolved ? (
          <div className="flex items-center justify-center space-x-3">
            <div className="h-3 w-3 animate-ping rounded-full bg-green-600"></div>
            <div className="h-3 w-3 animate-ping rounded-full bg-green-600"></div>

            <div className="h-3 w-3 animate-ping rounded-full bg-green-600"></div>
          </div>
        ) : (
          <></>
        )}
      </div>
      {loading ? (
        <div className="mt-5 flex items-center justify-center space-x-3">
          <div className="h-3 w-3 animate-ping rounded-full bg-green-600"></div>
          <div className="h-3 w-3 animate-ping rounded-full bg-green-600"></div>

          <div className="h-3 w-3 animate-ping rounded-full bg-green-600"></div>
        </div>
      ) : error != '' ? (
        <code className="text-xs text-red-500">{error}</code>
      ) : (
        <></>
      )}
      {data.length > 0 ? (
        data.map((d, i) => (
          <div
            key={i.toString()}
            className="rounded-md border border-dashed p-4"
          >
            <p className="text-sm text-gray-700">
              {new Date(d.createdAt.seconds * 1000)
                .toString()
                .split(' ')
                .splice(0, 4)
                .join(' ')}
            </p>
            <p className="text-gray-900">{d.data}</p>
            <div className={`mt-5 flex flex-col ${user ? '' : 'hidden'}`}>
              <code className="text-xs text-gray-600">
                Note: Click resolved when you solve the issue. SGC has right to
                ask if you click resolved and the problem still exists
              </code>
              <button
                onClick={() => resolvedFunc(d)}
                className="rounded-md bg-gray-900 px-5 py-2 text-white"
              >
                Resolved
              </button>
            </div>
          </div>
        ))
      ) : loading ? (
        <></>
      ) : (
        <p>No Data Found</p>
      )}
    </div>
  )
}

function Find() {
  const [reference, setReference] = useState('')
  const [data, setData] = useState({})
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const getData = async () => {
    if (loading) {
      return
    }
    setError('')
    if (reference.length < 1) {
      setError('Please enter a reference number')
      return
    }
    setLoading(true)
    const docRef = doc(db, `bb/${reference.trim()}`)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      console.log('Document data:', docSnap.data())
      const doc = docSnap.data()
      const d = {}
      d['createdAt'] = doc['createdAt']
      d['data'] = doc['data']
      d['resolved'] = doc['resolved']
      d['type'] = doc['type']
      d['id'] = doc['id']
      d['email'] = doc['email']
      d['docId'] = doc.id
      // console.log(doc['createdAt'].seconds)
      setData(d)
    } else {
      // doc.data() will be undefined in this case
      console.log('No such document!')
      setError('No such document')
    }
    setLoading(false)
  }
  return (
    <div className="my-40 mx-auto flex max-w-6xl flex-col space-y-2 p-2">
      <input
        type="text"
        placeholder="Reference Number"
        className="w-full rounded-md border border-dashed border-gray-200 p-4 text-gray-800 outline-none  focus:shadow-md"
        onChange={(e) => setReference(e.target.value)}
        value={reference}
      />
      <button
        className={`w-full rounded-md  p-3 ${
          loading
            ? 'cursor-not-allowed border border-dashed border-green-600 bg-white'
            : 'bg-green-600 hover:bg-green-400 '
        }`}
        onClick={getData}
      >
        {loading ? (
          <div className="flex items-center justify-center space-x-3">
            <div className="h-3 w-3 animate-ping rounded-full bg-green-600"></div>
            <div className="h-3 w-3 animate-ping rounded-full bg-green-600"></div>

            <div className="h-3 w-3 animate-ping rounded-full bg-green-600"></div>
          </div>
        ) : (
          <p>Submit</p>
        )}
      </button>
      {data != {} && (
        <div className="space-y-1">
          <p className="text-sm text-gray-700">
            {/* {new Date(data.createdAt.seconds * 1000)
              .toString()
              .split(' ')
              .splice(0, 4)
              .join(' ')} */}
          </p>
          <p className="text-gray-900">
            <b>Student ID: </b>
            {data.id}
          </p>
          <p className="text-gray-900">
            <b>Email: </b>
            {data.email}
          </p>

          <p className="text-gray-900">{data.data}</p>
          <p className="text-gray-900">
            <b>Reference No.: </b>
            {data.docId}
          </p>
          <p className="text-gray-900">
            <b>Resolved: </b>Issue is not yet resolved
          </p>
        </div>
      )}
      {error && <code className="text-xs text-red-500">{error}</code>}
    </div>
  )
}

function Index() {
  const [selected, setSelected] = useState(0)
  return (
    <div className="mx-auto my-5 max-w-6xl bg-white p-1 sm:p-0">
      <HeadComponent title={'Brew Berry'} />

      <div className="mx-auto  max-w-6xl ">
        <h1 className="p-5 text-center text-5xl ">BREW BERRY</h1>
        <div className="sticky top-0 z-50 flex w-full rounded-md border border-dashed border-gray-200 shadow-md">
          <div
            className={`w-1/3 cursor-pointer rounded-md p-2 text-center ${
              selected == 0 ? 'bg-green-500' : 'bg-white'
            }`}
            onClick={() => setSelected(0)}
          >
            Fill Form
          </div>
          <div
            className={`w-1/3 cursor-pointer rounded-md p-2 text-center ${
              selected == 1 ? 'bg-green-500' : 'bg-white'
            }`}
            onClick={() => setSelected(1)}
          >
            View
          </div>
          <div
            className={`w-1/3 cursor-pointer rounded-md p-2 text-center ${
              selected == 2 ? 'bg-green-500' : 'bg-white'
            }`}
            onClick={() => setSelected(2)}
          >
            Find
          </div>
        </div>
        {selected == 0 ? <FillForm /> : selected == 1 ? <View /> : <Find />}
      </div>
    </div>
  )
}

function BB() {
  return (
    <div>
      <Layout Component={<Index />} />
    </div>
  )
}

export default BB
