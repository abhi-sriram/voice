import Link from 'next/link'

function Footer() {
  return (
    <footer className="bg-gradient-to-tr from-gray-900 to-black p-5 px-5 py-14">
      <div
        className="text-center text-5xl text-white
      "
      >
        <h1 className="text-gray-200">Student Governing Council</h1>
      </div>
      <div className="mt-4 flex flex-col items-center justify-center sm:flex-row sm:space-x-2">
        <Link href="/bb">
          <a href="" className="text-gray-400 hover:underline">
            Brew Berry
          </a>
        </Link>
        <div className="h-px w-10 border border-red-600 sm:h-4 sm:w-px "></div>
        <Link href="/mess">
          <a href="" className="text-gray-400 hover:underline">
            Mess
          </a>
        </Link>
        <div className="h-px w-10 border border-red-600 sm:h-4 sm:w-px "></div>

        <Link href="/mart">
          <a href="" className="text-gray-400 hover:underline">
            Super Market
          </a>
        </Link>
        <div className="h-px w-10 border border-red-600 sm:h-4 sm:w-px "></div>
        <Link href="/admin">
          <a href="" className="text-gray-400 hover:underline">
            Admin
          </a>
        </Link>
      </div>
      {/* <div className="flex items-center justify-center">
        <Link href="/admin">
          <a href="" className="text-gray-400 hover:underline">
            Admin
          </a>
        </Link>
      </div> */}
      <div className="mt-10">
        <h1 className="text-center font-semibold text-gray-100">
          &copy;2022 RGUKT - Basar
        </h1>
        <h2 className="text-center font-thin text-gray-400">
          All Rights Reserved
        </h2>
      </div>
    </footer>
  )
}

export default Footer
