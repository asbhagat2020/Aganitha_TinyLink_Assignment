// app/code/[code]/page.js
import { db } from '@/lib/db'

export default async function StatsPage({ params }) {
  const { code } = await params

  const link = await db.link.findUnique({
    where: { code },
  })

  if (!link) {
    return <div className="p-8 text-center text-2xl">404 - Link not found</div>
  }

  return (
    <div className="max-w-2xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Link Statistics</h1>
      <div className="bg-white rounded-lg shadow p-6 space-y-4">
        <div>
          <strong>Short Code:</strong> {link.code}
        </div>
        <div>
          <strong>Target URL:</strong>{' '}
          <a href={link.targetUrl} target="_blank" className="text-blue-600 underline">
            {link.targetUrl}
          </a>
        </div>
        <div>
          <strong>Total Clicks:</strong> {link.clicks}
        </div>
        <div>
          <strong>Last Clicked:</strong>{' '}
          {link.lastClicked ? new Date(link.lastClicked).toLocaleString() : 'Never'}
        </div>
        <div>
          <strong>Created At:</strong> {new Date(link.createdAt).toLocaleString()}
        </div>
      </div>
    </div>
  )
}