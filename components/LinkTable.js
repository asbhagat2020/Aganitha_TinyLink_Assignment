
'use client'

import { useState } from 'react'
import { toast } from 'react-hot-toast'

export default function LinkTable({ initialLinks = [] }) {
  const [links, setLinks] = useState(initialLinks)

  const handleDelete = async (code) => {
    if (!confirm('Permanently delete this link?')) return

    setLinks(prev => prev.filter(l => l.code !== code))
    toast.success('Link deleted successfully!')

    try {
      const res = await fetch(`/api/links/${code}`, { method: 'DELETE' })
      if (!res.ok && res.status !== 404) {
        toast.error('Something went wrong, but link removed from list')
      }
    } catch (err) {
      console.log('Delete request failed, but UI updated')
    }
  }

  const copyToShort = (code) => {
    navigator.clipboard.writeText(`${window.location.origin}/${code}`)
    toast.success('Short link copied!')
  }

  if (links.length === 0) {
    return <p className="text-center text-gray-500 py-10">No links yet. Create one!</p>
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full table-auto border-collapse">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="px-6 py-4">Short Code</th>
            <th className="px-6 py-4">Target URL</th>
            <th className="px-6 py-4 text-center">Clicks</th>
            <th className="px-6 py-4 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {links.map((link) => (
            <tr key={link.code} className="border-b hover:bg-gray-50">
              <td className="px-6 py-4 font-mono">
                <a href={`/${link.code}`} target="_blank" rel="noopener" className="text-blue-600 hover:underline">
                  {link.code}
                </a>
              </td>
              <td className="px-6 py-4 max-w-md truncate" title={link.targetUrl}>
                {link.targetUrl}
              </td>
              <td className="px-6 py-4 text-center">{link.clicks}</td>
              <td className="px-6 py-4 text-center space-x-4">
                <button onClick={() => copyToShort(link.code)} className="text-blue-600 hover:underline">
                  Copy
                </button>
                <a href={`/code/${link.code}`} className="text-green-600 hover:underline">
                  Stats
                </a>
                <button onClick={() => handleDelete(link.code)} className="text-red-600 hover:underline font-medium">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}