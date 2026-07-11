import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(req) {

  try {

    const body = await req.json()

    const completion = await openai.chat.completions.create({

      model: 'gpt-4.1-mini',

      messages: [

        {
          role: 'system',
          content: `
          You are an AI fitness recovery coach.
          Give concise, motivational, science-based advice.
          Focus on:
          - hydration
          - sleep
          - nutrition
          - muscle recovery
          - affordable meals
          `
        },

        {
          role: 'user',
          content: body.message
        }

      ]

    })

    return Response.json({

      reply: completion.choices[0].message.content

    })

  } catch (error) {

    console.log(error)

    return Response.json({
      error: 'Chat failed'
    })

  }
}