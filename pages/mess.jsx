import Layout from '../components/Layout'
import HeadComponent from '../components/HeadComponent'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import { auth } from '../firebase-app'

function FillForm() {
  const [loading, setLoading] = useState(false)
  const [id, setId] = useState('')
  const [email, setEmail] = useState('')
  const [data, setData] = useState('')
  const [type, setType] = useState('')
  const [mess, setMess] = useState('')
  const [error, setError] = useState('')
  const [docId, setDocId] = useState('')

  const send = async () => {
    console.log({ id, email, data, type, mess })
    setError('')
    if (id == '' || email == '' || data == '' || type == '' || mess == '') {
      setError('All fields are required')
      return
    }
    if (mess != 'p12' && mess != 'e12' && mess != 'e34') {
      setError('Invalid Mess')
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
    setLoading(true)

    var myHeaders = new Headers()
    myHeaders.append('Content-Type', 'application/json')

    var raw = JSON.stringify({
      data: data.trim(),
      type: type.trim(),
      id: id.trim(),
      email: email.trim(),
      mess: mess.trim(),
      collection: 'mess',
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
          name="Select Mess"
          className="max-w-xl border-b bg-white p-4 outline-none"
          onChange={(e) => setMess(e.target.value)}
        >
          <option value="">Select Mess</option>

          <option value="p12" className="!p-4 text-gray-800 outline-none">
            P1-P2
          </option>
          <option value="e12" className="!p-4 text-gray-800 outline-none">
            E1-E2
          </option>
          <option value="e34" className="!p-4 text-gray-800 outline-none">
            E3-E4
          </option>
        </select>
      </div>

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
  return (
    <div className="my-2 flex flex-col space-y-2">
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
        <div
          key={i.toString()}
          className="flex space-x-4 rounded-md border border-dotted border-gray-200 bg-white p-5"
        >
          <div className="">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Doloribus
            deserunt ullam officia, unde tempora molestiae repellendus quibusdam
            quam reiciendis assumenda corrupti in. Mollitia libero quam odio,
            dolorum quidem similique illum.
          </div>
          {/* <div className="flex flex-col">
            <div>
              <Image src="/upvote.png" height={40} width={40} />
            </div>
            <div>
              <Image src="/down.png" height={40} width={40} />
            </div>
          </div> */}
        </div>
      ))}
    </div>
  )
}

function Index() {
  const [selected, setSelected] = useState(0)
  useEffect(() => {
    console.log('Mess')
    console.log(auth.currentUser)
  }, [])
  return (
    <div className="mx-auto my-5 max-w-6xl bg-white p-1 sm:p-0">
      <HeadComponent title={'Mess'} />
      <div className="mx-auto  max-w-6xl ">
        <h1 className="p-5 text-center text-5xl ">MESS</h1>

        <div className="sticky top-0 z-50 flex w-full rounded-md border border-dashed border-gray-200 shadow-md">
          <div
            className={`w-1/2 cursor-pointer rounded-md p-2 text-center ${
              selected == 0 ? 'bg-green-500' : 'bg-white'
            }`}
            onClick={() => setSelected(0)}
          >
            Fill Form
          </div>
          <div
            className={`w-1/2 cursor-pointer rounded-md p-2 text-center ${
              selected == 1 ? 'bg-green-500' : 'bg-white'
            }`}
            onClick={() => setSelected(1)}
          >
            View
          </div>
        </div>
        {selected == 0 ? <FillForm /> : <View />}
      </div>
    </div>
  )
}

function ComingSoon() {
  return (
    <div className="my-52 text-center text-4xl text-gray-800">
      Coming Soon....
    </div>
  )
}

function Mess() {
  return (
    <div>
      <Layout Component={<ComingSoon />} />
    </div>
  )
}

export default Mess
