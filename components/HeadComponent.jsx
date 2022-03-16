import Head from 'next/head'

function HeadComponent({ title }) {
  return (
    <Head>
      <meta charSet="utf-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta
        name="viewport"
        content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"
      />
      <meta name="description" content="Student Governing Council" />
      <meta
        name="keywords"
        content="sgc sgcrgukt rguktbasar basar iiitbasar iiitsgc student governing council"
      />
      <title>{title}</title>
    </Head>
  )
}

export default HeadComponent
