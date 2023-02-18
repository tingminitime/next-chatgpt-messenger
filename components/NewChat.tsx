'use client'

import { PlusIcon } from '@heroicons/react/24/solid'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { db } from '@/services/firebase'

function NewChat() {
  const router = useRouter()
  const { data: session, status } = useSession()

  const createNewChat = async () => {
    const doc = await addDoc(
      collection(db, 'users', session?.user?.email!, 'chats'),
      {
        userId: session?.user?.email!,
        createdAt: serverTimestamp(),
      }
    )

    router.push(`/chat/${doc.id}`)
  }

  return (
    <button
      type="button"
      className="chatRow border border-my-black"
      onClick={createNewChat}
    >
      <PlusIcon className="h-4 w-4 flex-shrink-0"></PlusIcon>
      <p className="">New Chat</p>
    </button>
  )
}
export default NewChat
