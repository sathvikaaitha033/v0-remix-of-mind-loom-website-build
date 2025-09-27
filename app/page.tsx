import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Header } from "@/components/header"
import { Upload, Trophy, BookOpen, Brain, Zap, Target, MessageCircle } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen gradient-hero">
      <Header />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className="p-4 gradient-primary rounded-full shadow-2xl ring-4 ring-primary/30">
              <Brain className="h-16 w-16 text-white drop-shadow-lg" />
            </div>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 text-balance drop-shadow-lg">
            Transform Your Notes into
            <span className="text-white"> Interactive Learning</span>
          </h1>
          <p className="text-xl text-gray-200 mb-8 max-w-3xl mx-auto text-pretty drop-shadow-md">
            MindLoom uses AI to convert your handwritten notes into structured mindmaps and flashcards, making learning
            more engaging and effective.
          </p>
        </div>

        {/* Main Action Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Link href="/upload">
            <Card className="h-full hover:shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer border-2 border-primary/30 hover:border-primary bg-gradient-to-br from-card via-primary/10 to-primary/20 backdrop-blur-sm">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 p-3 gradient-primary rounded-full w-fit shadow-lg ring-2 ring-primary/50">
                  <Upload className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl text-white">Upload Image</CardTitle>
                <CardDescription className="text-gray-300">
                  Upload your handwritten notes and let AI transform them into interactive mindmaps
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>

          <Link href="/points">
            <Card className="h-full hover:shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer border-2 border-secondary/30 hover:border-secondary bg-gradient-to-br from-card via-secondary/10 to-secondary/20 backdrop-blur-sm">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 p-3 gradient-secondary rounded-full w-fit shadow-lg ring-2 ring-secondary/50">
                  <Trophy className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl text-white">Your Points</CardTitle>
                <CardDescription className="text-gray-300">
                  Track your learning progress and earn rewards for completing quizzes
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>

          <Link href="/past-learnings">
            <Card className="h-full hover:shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer border-2 border-accent/30 hover:border-accent bg-gradient-to-br from-card via-accent/10 to-accent/20 backdrop-blur-sm">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 p-3 gradient-accent rounded-full w-fit shadow-lg ring-2 ring-accent/50">
                  <BookOpen className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl text-white">Past Learnings</CardTitle>
                <CardDescription className="text-gray-300">
                  Review your previously generated flashcards and access related learning resources
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>
        </div>

        {/* Features Section */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4 drop-shadow-lg">How MindLoom Works</h2>
          <p className="text-lg text-gray-200 mb-12 max-w-2xl mx-auto drop-shadow-md">
            Our AI-powered platform makes learning from your notes effortless and engaging
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="text-center p-6 bg-card/20 rounded-lg backdrop-blur-sm border border-primary/20">
            <div className="mx-auto mb-4 p-3 gradient-primary rounded-full w-fit shadow-lg ring-2 ring-primary/30">
              <Zap className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-white">OCR & NLP Processing</h3>
            <p className="text-gray-300">
              Advanced AI extracts text from your handwritten notes and identifies key concepts and relationships
            </p>
          </div>

          <div className="text-center p-6 bg-card/20 rounded-lg backdrop-blur-sm border border-secondary/20">
            <div className="mx-auto mb-4 p-3 gradient-secondary rounded-full w-fit shadow-lg ring-2 ring-secondary/30">
              <Brain className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-white">Interactive Mindmaps</h3>
            <p className="text-gray-300">
              Your notes are transformed into visual, interactive mindmaps that help you understand connections
            </p>
          </div>

          <div className="text-center p-6 bg-card/20 rounded-lg backdrop-blur-sm border border-accent/20">
            <div className="mx-auto mb-4 p-3 gradient-accent rounded-full w-fit shadow-lg ring-2 ring-accent/30">
              <Target className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-white">Gamified Learning</h3>
            <p className="text-gray-300">
              Take quizzes, earn points, and unlock rewards to make learning fun and motivating
            </p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center gradient-primary rounded-lg p-8 border-2 border-primary/50 shadow-2xl ring-4 ring-primary/20">
          <h2 className="text-2xl font-bold text-white mb-4 drop-shadow-lg">Ready to Transform Your Learning?</h2>
          <p className="text-gray-100 mb-6 drop-shadow-md">
            Join thousands of students and professionals who are already using MindLoom to enhance their learning
            experience.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/signup">
              <Button
                size="lg"
                className="text-lg px-8 py-3 bg-white text-primary hover:bg-gray-100 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
              >
                Get Started Today
              </Button>
            </Link>
            <Link href="/chatbot">
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 py-3 bg-transparent border-2 border-white text-white hover:bg-white hover:text-primary shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 group animate-pulse hover:animate-none"
              >
                <MessageCircle className="h-5 w-5 mr-2 group-hover:rotate-12 transition-transform duration-300" />
                Chat with AI
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}
