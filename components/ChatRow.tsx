'use client'
import Link from 'next/link'
import { ChatBubbleLeftIcon, TrashIcon } from '@heroicons/react/24/outline'
import { usePathname, useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { useCollection } from 'react-firebase-hooks/firestore'
import { collection, orderBy, query, deleteDoc, doc } from 'firebase/firestore'
import { db } from '@/services/firebase'

type Props = {
  id: string
}

function ChatRow({ id }: Props) {
  const pathname = usePathname()
  const router = useRouter()
  const { data: session } = useSession()
  const [active, setActive] = useState<boolean>(false)

  const [messages, loading, error] = useCollection(
    query(
      collection(db, 'users', session?.user?.email!, 'chats', id, 'messages'),
      orderBy('createdAt', 'asc')
    )
  )

  useEffect(() => {
    if (!pathname) return
    setActive(pathname.includes(id))
  }, [id, pathname])

  const removeChat = async () => {
    await deleteDoc(doc(db, 'users', session?.user?.email!, 'chats', id))
    router.replace(`/`)
  }

  return (
    <Link
      href={`/chat/${id}`}
      className={`chatRow justify-center ${active && 'bg-my-black-light'}`}
    >
      <ChatBubbleLeftIcon className="h-5 w-5 flex-shrink-0 text-white"></ChatBubbleLeftIcon>
      <p className="hidden flex-1 truncate md:flex">
        {messages?.docs.at(-1)?.data().text || `New Chat`}
      </p>
      <button
        type="button"
        className="p-1 text-gray-400 hover:text-gray-100"
        onClick={removeChat}
      >
        <TrashIcon className="h-5 w-5"></TrashIcon>
      </button>
    </Link>
  )
}
export default ChatRow
