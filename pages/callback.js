import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Layout from 'components/layout'

export default function CallbackPage() {
  const router = useRouter()
  const [data, setData] = useState({})
  const [projects, setProjects] = useState()

  useEffect(() => {
    const fetchAccessToken = async (code) => {
      const res = await fetch(`/api/get-access-token?code=${code}`)
      const json = await res.json()

      setData({
        accessToken: json.access_token,
        userId: json.user_id,
        teamId: json.team_id
      })
    }
    console.log(router)

    if (router.isReady && !data.accessToken) {
      const { code } = router.query
      console.log(router.query)
      fetchAccessToken(code)
    }
  }, [router])

  useEffect(() => {
    const fetchProjects = async (accessToken, teamId) => {
      if (accessToken) {
        {/* If we have a teamId, all calls to the Vercel API should have it attached as a query parameter */ }
        const res = await fetch(`https://api.vercel.com/v4/projects${teamId ? `?teamId=${teamId}` : ''}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        const json = await res.json()

        setProjects(json.projects)
      }
    }

    const { accessToken, teamId } = data
    fetchProjects(accessToken, teamId)
  }, [data])

  return (
    <Layout>
      <div className="w-full divide-y">
      <iframe src="http://local.split-stage.io:3000/org/07d0ce10-a89d-11ed-8f6c-42446cfad23b/ws/08fcf200-a89d-11ed-8f6c-42446cfad23b/admin/integrations"  width="1920" height="800px">
      </iframe>
        <section className="py-4 flex items-center space-x-2 justify-center">
          {/* <h1 className="text-lg font-medium">Integration is installed on a</h1> */}

          {data.accessToken && (
            <div className="rounded-md bg-blue-500 text-white text-sm px-2.5 py-0.5">
              {/* If we have a teamId, the installation is made on a team */}
              {data.userId && data.teamId ? 'team' : 'personal account'}
            </div>
          )}
        </section>

        <section className="py-4 flex justify-center">
          {/* This redirect should happen programmatically if you're done with everything on your side */}
          <button
            className="bg-black hover:bg-gray-900 text-white px-6 py-1 rounded-md"
            onClick={() => {
              router.push(router.query.next)
            }}
          >Redirect me back to Vercel</button>
        </section>
      </div>
    </Layout>
  )
}
