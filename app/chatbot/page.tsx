"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Header } from "@/components/header"
import { MessageCircle, Send, Bot, User } from "lucide-react"

interface Message {
  id: number
  text: string
  isUser: boolean
  timestamp: Date
}

export default function ChatbotPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! I'm your MindLoom AI assistant. I can help you with questions about note-taking, learning strategies, and using our platform. How can I assist you today?",
      isUser: false,
      timestamp: new Date(),
    },
  ])
  const [inputMessage, setInputMessage] = useState("")

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return

    const userMessage: Message = {
      id: messages.length + 1,
      text: inputMessage,
      isUser: true,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: messages.length + 2,
        text: "Thanks for your message! This is a demo chatbot. In the full version, I would provide helpful responses about learning techniques, note organization, and MindLoom features.",
        isUser: false,
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, aiResponse])
    }, 1000)

    setInputMessage("")
  }

  return (
    <div className="min-h-screen gradient-hero">
      <Header />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="p-4 gradient-primary rounded-full shadow-2xl ring-4 ring-primary/30 animate-pulse">
                <MessageCircle className="h-12 w-12 text-white" />
              </div>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 drop-shadow-lg">Chat with MindLoom AI</h1>
            <p className="text-lg text-gray-200 drop-shadow-md">Get instant help with your learning journey</p>
          </div>

          <Card className="bg-card/20 backdrop-blur-sm border-2 border-primary/30 shadow-2xl">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Bot className="h-5 w-5" />
                AI Assistant
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-96 overflow-y-auto mb-4 space-y-4 p-4 bg-background/10 rounded-lg">
                {messages.map((message) => (
                  <div key={message.id} className={`flex ${message.isUser ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                        message.isUser ? "bg-primary text-white" : "bg-secondary text-white"
                      } shadow-lg`}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        {message.isUser ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                        <span className="text-xs opacity-75">{message.isUser ? "You" : "AI"}</span>
                      </div>
                      <p className="text-sm">{message.text}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex gap-2">
                <Input
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 bg-background/20 border-primary/30 text-white placeholder:text-gray-400"
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                />
                <Button
                  onClick={handleSendMessage}
                  className="gradient-primary hover:scale-105 transition-transform duration-200"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
