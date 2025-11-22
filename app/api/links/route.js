// app/api/links/route.js
import { db } from '@/lib/db'
import { z } from 'zod'

const linkSchema = z.object({
  targetUrl: z.string().url(),
  code: z.string().optional(),
})

export async function POST(request) {
  try {
    const body = await request.json()
    const { targetUrl, code } = linkSchema.parse(body)

    const newLink = await db.link.create({
      data: {
        targetUrl,
        code: code || Math.random().toString(36).substring(2, 10),
      },
    })

    return Response.json(newLink, { status: 201 })
  } catch (error) {
    if (error.code === 'P2002') {
      return Response.json({ error: 'Custom code already taken' }, { status: 409 })
    }
    return Response.json({ error: 'Invalid data' }, { status: 400 })
  }
}

export async function GET() {
  const links = await db.link.findMany({
    orderBy: { createdAt: 'desc' },
  })
  return Response.json(links)
}