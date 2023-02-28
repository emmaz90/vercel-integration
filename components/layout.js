import Head from 'next/head'

export default function Layout(props) {
  return (
    <div className="flex flex-col min-h-screen">
      <Head>
        <title>Example Integration</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex-1 flex items-center justify-center">
        {props.children}
      </div>
    </div>
  )
}