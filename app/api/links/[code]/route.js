// // app/api/links/[code]/route.js
// import { db } from '@/lib/db'

// export async function GET(request, { params }) {
//   const link = await db.link.findUnique({
//     where: { code: params.code },
//   })

//   if (!link) {
//     return Response.json({ error: 'Not found' }, { status: 404 })
//   }

//   return Response.json(link)
// }

// export async function DELETE(request, { params }) {
//   const link = await db.link.findUnique({
//     where: { code: params.code },
//   })

//   if (!link) {
//     return Response.json({ error: 'Not found' }, { status: 404 })
//   }

//   await db.link.delete({
//     where: { code: params.code },
//   })

//   return new Response(null, { status: 204 })
// }




// // app/api/links/[code]/route.js  ← YE POORA FILE REPLACE KAR DE

// import { db } from '@/lib/db'

// export async function GET(request, { params }) {
//   const { code } = params

//   const link = await db.link.findUnique({
//     where: { code },
//   })

//   if (!link) {
//     return new Response(null, { status: 404 })
//   }

//   return Response.json(link)
// }

// export async function DELETE(request, { params }) {
//   const { code } = params   // ← YE LINE THI MISSING YA GALAT!

//   try {
//     await db.link.delete({
//       where: { code },
//     })
//     return new Response(null, { status: 204 })
//   } catch (error) {
//     // Agar link nahi mila ya already delete hai
//     return new Response(null, { status: 404 })
//   }
// }




// app/api/links/[code]/route.js  ← YE SAHI VERSION HAI

import { db } from '@/lib/db'

export async function GET(request, { params }) {
  const code = (await params).code  // ← Next.js 15 me params async hai!

  const link = await db.link.findUnique({
    where: { code },
  })

  if (!link) {
    return new Response(null, { status: 404 })
  }

  return Response.json(link)
}

export async function DELETE(request, { params }) {
  const code = (await params).code  // ← YE IMPORTANT HAI!

  try {
    // Pehle check karo link exist karta hai ya nahi
    const link = await db.link.findUnique({
      where: { code }
    })

    if (!link) {
      return new Response(JSON.stringify({ error: 'Link not found' }), { 
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      })
    }

    // Ab delete karo
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