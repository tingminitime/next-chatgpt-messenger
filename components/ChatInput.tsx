'use client'
import type { Message } from 'api-types'
import { PaperAirplaneIcon } from '@heroicons/react/24/solid'
import { useSession } from 'next-auth/react'
import { useState } from 'react'
import useSWR from 'swr'
import { collection, serverTimestamp, addDoc } from 'firebase/firestore'
import { db } from '@/services/firebase'
import { toast } from 'react-hot-toast'
import ModelSelection from './ModelSelection'

type Props = {
  chatId: string
}

function ChatInput({ chatId }: Props) {
  const [prompt, setPrompt] = useState<string>('')
  const { data: session } = useSession()

  const { data: model } = useSWR('model', {
    fallbackData: 'text-davinci-003',
  })

  const sendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!prompt) return

    const input = prompt.trim()
    setPrompt('')

    const message: Message = {
      text: input,
      createdAt: serverTimestamp(),
      user: {
        _id: session?.user?.email!,
        name: session?.user?.name!,
        avatar:
          session?.user?.image! ||
          `https://ui-avatars.com/api/?name=${session?.user?.name}`,
      },
    }

    await addDoc(
      collection(
        db,
        'users',
        session?.user?.email!,
        'chats',
        chatId,
        'messages'
      ),
      message
    )

    // - Toast Notification
    const notification = toast.loading('ChatGPT is thinking...')

    await fetch(`/api/askQuestion`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt: input,
        chatId,
        model,
        session,
      }),
    })
      .then(res => {
        // Toast notification to say successful
        toast.success('ChatGPT has responded!', {
          id: notification,
        })
      })
      .catch(err => {
        toast.error(`Error: ${err.message}`)
      })
  }

  return (
    <>
      <div className="rounded-lg bg-my-black-light text-sm">
        <form
          className="flex flex-grow space-x-5 p-2"
          onSubmit={sendMessage}
        >
          <input
            type="text"
            placeholder="Type your message here..."
            className="flex-grow bg-transparent p-2 text-gray-100 placeholder:px-1 focus:outline-none disabled:cursor-not-allowed disabled:text-gray-300"
            value={prompt}
            onChange={e => setPrompt(e.target.value)}
            autoFocus
            disabled={!session}
          />
          <button
            type="submit"
            className="rounded-lg px-5 text-gray-400 hover:bg-my-black-light hover:text-gray-100 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-gray-400"
            disabled={!prompt || !session}
          >
            <PaperAirplaneIcon className="h-4 w-4 -rotate-45"></PaperAirplaneIcon>
          </button>
        </form>
      </div>
      {/* ModelSelection */}
      <div className="py-2 md:hidden">
        <ModelSelection></ModelSelection>
      </div>
    </>
  )
}
export default ChatInput
