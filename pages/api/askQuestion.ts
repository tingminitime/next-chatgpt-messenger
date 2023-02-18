import { NextApiRequest, NextApiResponse } from 'next'
import admin from 'firebase-admin'
import queryOpenai from '@/lib/queryOpenai'
import { adminDb } from '@/services/firebaseAdmin'
import type { Message } from 'api-types'

type Data = {
  answer: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { prompt, chatId, model, session } = req.body

  if (!prompt) {
    res.status(400).json({ answer: 'Please provide a prompt!' })
    return
  }

  if (!chatId) {
    res.status(400).json({ answer: 'Please provide a valid chatId!' })
    return
  }

  // - ChatGPT Query
  const response = await queryOpenai(prompt, chatId, model)

  const message: Message = {
    text: response || 'ChatGPT was unable to find an answer for that!',
    createdAt: admin.firestore.Timestamp.now(),
    user: {
      _id: 'ChatGPT',
      name: 'ChatGPT',
      avatar:
        'https://brandlogovector.com/wp-content/uploads/2023/01/ChatGPT-Icon-Logo-PNG.png',
    },
  }

  await adminDb
    .collection('users')
    .doc(session?.user?.email)
    .collection('chats')
    .doc(chatId)
    .collection('messages')
    .add(message)

  res.status(200).json({ answer: message.text })
}
