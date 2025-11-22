'use client'
import { useState } from 'react'
import { toast } from 'react-hot-toast'

export default function CreateForm() {
  const [url, setUrl] = useState('')
  const [custom, setCustom] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await fetch('/api/links', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          targetUrl: url,
          customCode: custom || undefined,
        }),
      })

      const data = await res.json()

      if (res.ok) {
        toast.success('Link created successfully!')
        setUrl('')
        setCustom('')
        window.location.reload() // simple refresh — works 100%
      } else {
        toast.error(data.error || 'Failed')
      }
    } catch (err) {
      toast.error('Network error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-2">Target URL</label>
        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
          placeholder="https://example.com"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Custom Code (optional, 6-8 chars)</label>
        <input
          type="text"
          value={custom}
          onChange={(e) => setCustom(e.target.value.slice(0, 8))}
          placeholder="mycode123"
          pattern="[A-Za-z0-9]{6,8}"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? 'Creating...' : 'Create Short Link'}
      </button>
    </form>
  )
}