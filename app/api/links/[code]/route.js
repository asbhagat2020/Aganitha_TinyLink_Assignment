

// app/api/links/[code]/route.js  

import { db } from '@/lib/db'

export async function GET(request, { params }) {
  const code = (await params).code  

  const link = await db.link.findUnique({
    where: { code },
  })

  if (!link) {
    return new Response(null, { status: 404 })
  }

  return Response.json(link)
}

export async function DELETE(request, { params }) {
  const code = (await params).code  

  try {
    const link = await db.link.findUnique({
      where: { code }
    })

    if (!link) {
      return new Response(JSON.stringify({ error: 'Link not found' }), { 
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      })
    }

    await db.link.delete({
      where: { code },
    })

    return new Response(null, { status: 204 })
  } catch (error) {
    console.error('Delete error:', error)
    return new Response(JSON.stringify({ error: error.message }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    })
  }
}