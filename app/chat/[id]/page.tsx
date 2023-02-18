import Chat from '@/components/Chat'
import ChatInput from '@/components/ChatInput'

type Props = {
  params: {
    id: string
  }
}

function ChatPage({ params: { id } }: Props) {
  return (
    <div className="flex h-screen flex-col">
      <Chat chatId={id}></Chat>
      <div className="px-4 py-6">
        <ChatInput chatId={id}></ChatInput>
      </div>
    </div>
  )
}
export default ChatPage
