'use client'
import { useSession } from 'next-auth/react'
import { collection, orderBy, query } from 'firebase/firestore'
import { useCollection } from 'react-firebase-hooks/firestore'
import { db } from '@/services/firebase'
import Message from './Message'
import { ArrowDownCircleIcon } from '@heroicons/react/24/outline'

type Props = {
  chatId: string
}

function Chat({ chatId }: Props) {
  const { data: session } = useSession()
  const [messages, loading, status] = useCollection(
    session &&
      query(
        collection(
          db,
          'users',
          session?.user?.email!,
          'chats',
          chatId,
          'messages'
        ),
        orderBy('createdAt', 'asc')
      )
  )

  return (
    <div className="flex-grow overflow-y-auto overflow-x-hidden">
      {messages?.empty && (
        <>
          <p className="mt-10 text-center text-white">
            Type a prompt in below to get started!
          </p>
          <ArrowDownCircleIcon className="mx-auto mt-5 h-10 w-10 animate-bounce text-white"></ArrowDownCircleIcon>
        </>
      )}

      {messages?.docs.map(message => (
        <Message
          key={message.id}
          message={message.data()}
        ></Message>
      ))}
    </div>
  )
}
export default Chat
