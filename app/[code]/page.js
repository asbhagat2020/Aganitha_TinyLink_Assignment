// app/[code]/page.js
import { db } from '@/lib/db'
import { redirect } from 'next/navigation'

export default async function RedirectPage({ params }) {
  const { code } = await params  // ← YEH LINE ZAROORI HAI!

  if (!code) {
    return <div>Invalid URL</div>
  }

  const link = await db.link.findUnique({
    where: { code },
  })

  if (!link) {
    return <div>404 - Link not found</div>
  }

  // Click count badhao
  await db.link.update({
    where: { code },
    data: {
      clicks: { increment: 1 },
      lastClicked: new Date(),
    },
  })

  redirect(link.targetUrl)
}