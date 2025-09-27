"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Header } from "@/components/header"
import { ChevronLeft, ChevronRight, RotateCcw, CheckCircle, BookOpen } from "lucide-react"

interface Flashcard {
  id: number
  question: string
  answer: string
  concept: string
}

export default function FlashcardsPage() {
  const [flashcards, setFlashcards] = useState<Flashcard[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)
  const [completedCards, setCompletedCards] = useState<Set<number>>(new Set())
  const router = useRouter()

  useEffect(() => {
    // Generate flashcards from the processed mindmap data
    const mockFlashcards: Flashcard[] = [
      {
        id: 1,
        question: "What is the main concept discussed in your notes?",
        answer:
          "The primary topic that connects all other ideas and serves as the foundation for understanding the subject matter.",
        concept: "Main Topic",
      },
      {
        id: 2,
        question: "How does Concept A relate to the main topic?",
        answer:
          "Concept A is a key supporting element that provides specific details and examples to reinforce the main topic.",
        concept: "Concept A",
      },
      {
        id: 3,
        question: "What are the key characteristics of Concept B?",
        answer:
          "Concept B represents a different perspective or approach that complements the main topic through alternative methods.",
        concept: "Concept B",
      },
      {
        id: 4,
        question: "How do all these concepts work together?",
        answer:
          "The concepts form an interconnected system where each element supports and enhances the others to create comprehensive understanding.",
        concept: "Concept C",
      },
    ]

    setFlashcards(mockFlashcards)
  }, [])

  const nextCard = () => {
    if (currentIndex < flashcards.length - 1) {
      setCurrentIndex(currentIndex + 1)
      setIsFlipped(false)
    }
  }

  const prevCard = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
      setIsFlipped(false)
    }
  }

  const flipCard = () => {
    setIsFlipped(!isFlipped)
  }

  const markAsRevised = (cardId: number) => {
    setCompletedCards((prev) => new Set([...prev, cardId]))
    // Store progress in localStorage
    const progress = Array.from(completedCards)
    progress.push(cardId)
    localStorage.setItem("flashcard-progress", JSON.stringify(progress))
  }

  const goToQuiz = () => {
    // Store current flashcard data for quiz generation
    localStorage.setItem("current-flashcards", JSON.stringify(flashcards))
    router.push("/quiz")
  }

  if (flashcards.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <BookOpen className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
            <h1 className="text-2xl font-bold mb-4">No Flashcards Available</h1>
            <p className="text-muted-foreground mb-6">Upload and process your notes first to generate flashcards.</p>
            <Button onClick={() => router.push("/upload")}>Upload Notes</Button>
          </div>
        </main>
      </div>
    )
  }

  const currentCard = flashcards[currentIndex]
  const isCompleted = completedCards.has(currentCard.id)

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-4">Study Flashcards</h1>
            <p className="text-lg text-muted-foreground">
              Review your generated flashcards and test your understanding
            </p>
          </div>

          {/* Progress Indicator */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-muted-foreground">
                Card {currentIndex + 1} of {flashcards.length}
              </span>
              <span className="text-sm text-muted-foreground">{completedCards.size} completed</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div
                className="bg-primary h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentIndex + 1) / flashcards.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Flashcard */}
          <div className="mb-8">
            <Card className="min-h-[400px] cursor-pointer" onClick={flipCard}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-xl mb-2">{currentCard.concept}</CardTitle>
                    <CardDescription>Click to flip the card</CardDescription>
                  </div>
                  {isCompleted && <CheckCircle className="h-6 w-6 text-green-500" />}
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center min-h-[200px] text-center">
                  <div className="space-y-4">
                    <div className="text-sm text-muted-foreground uppercase tracking-wide">
                      {isFlipped ? "Answer" : "Question"}
                    </div>
                    <p className="text-lg leading-relaxed">{isFlipped ? currentCard.answer : currentCard.question}</p>
                    <div className="flex items-center justify-center gap-2 text-muted-foreground">
                      <RotateCcw className="h-4 w-4" />
                      <span className="text-sm">Click to flip</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Navigation and Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
            <div className="flex gap-2">
              <Button variant="outline" onClick={prevCard} disabled={currentIndex === 0}>
                <ChevronLeft className="h-4 w-4 mr-2" />
                Previous
              </Button>
              <Button variant="outline" onClick={nextCard} disabled={currentIndex === flashcards.length - 1}>
                Next
                <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            </div>

            <div className="flex gap-2">
              {!isCompleted && (
                <Button variant="secondary" onClick={() => markAsRevised(currentCard.id)}>
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Mark as Revised
                </Button>
              )}
              <Button onClick={goToQuiz}>Take Quiz</Button>
            </div>
          </div>

          {/* Summary */}
          {completedCards.size === flashcards.length && (
            <Card className="mt-8 bg-primary/5 border-primary/20">
              <CardContent className="pt-6">
                <div className="text-center">
                  <CheckCircle className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">All Cards Completed!</h3>
                  <p className="text-muted-foreground mb-4">
                    Great job! You've reviewed all flashcards. Ready to test your knowledge?
                  </p>
                  <Button onClick={goToQuiz} size="lg">
                    Take the Quiz
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  )
}
