import Layout from '../components/Layout'
import HeadComponent from '../components/HeadComponent'
import Image from 'next/image'
import Link from 'next/link'

function Card({ image, route }) {
  return (
    <Link href={`/${route}`}>
      <div className=" relative h-60 rounded-lg border-dashed border-gray-200 bg-white shadow-md">
        <Image
          src={image}
          objectFit="cover"
          layout="fill"
          className="cursor-pointer !rounded-lg transition delay-150 ease-in-out hover:scale-110 "
        />
      </div>
    </Link>
  )
}

function Index() {
  return (
    <div className="mx-auto mt-5 max-w-6xl bg-white">
      <HeadComponent title={'SGC - Student Governing Council'} />
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-4 p-5 md:grid-cols-2 xl:grid-cols-3">
        <Card image={'/bb.jpg'} route={'bb'} />
        <Card image={'/mart.jpg'} route={'mart'} />
        <Card image={'/mess.jpg'} route={'mess'} />
      </div>
    </div>
  )
}

function Home() {
  return (
    <div>
      <Layout Component={<Index />} />
    </div>
  )
}

export default Home
