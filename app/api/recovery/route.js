
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(req) {

  try {

    const body = await req.json()

    const {
  workout,
  duration,
  intensity,
  fatigue,
  budget
} = body

    const prompt = `

You are MOVO AI, a premium recovery coach inside a modern fitness app.

Generate a SHORT and NATURAL response.

Rules:
- Sound conversational like ChatGPT.
- Keep the response under 120 words.
- No markdown.
- No headings.
- No bullet points.
- No hashtags.
- No emojis.
- Avoid sounding robotic or generic.
- Make the advice feel personalized and realistic.
- Mention hydration, recovery, protein, and workout fatigue naturally.

User workout:
Workout: ${workout}
Duration: ${duration} minutes
Intensity: ${intensity}
Fatigue: ${fatigue}/10
Budget: €${budget}

`

    const response = await openai.chat.completions.create({

      model: 'gpt-4.1-mini',

      temperature: 0.9,

      messages: [
        {
          role: 'user',
          content: prompt
        }
      ]

    })

    return Response.json({
      result: response.choices[0].message.content
    })

  } catch (error) {

    console.log(error)

    return Response.json({
      error: 'AI generation failed'
    })

  }

}
