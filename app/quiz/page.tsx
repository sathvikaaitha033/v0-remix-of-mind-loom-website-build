"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Header } from "@/components/header"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, XCircle, Trophy, Gift } from "lucide-react"
import { cn } from "@/lib/utils"

interface QuizQuestion {
  id: number
  question: string
  options: string[]
  correctAnswer: number
  concept: string
}

interface QuizResult {
  questionId: number
  selectedAnswer: number
  isCorrect: boolean
}

export default function QuizPage() {
  const [questions, setQuestions] = useState<QuizQuestion[]>([])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [results, setResults] = useState<QuizResult[]>([])
  const [showResult, setShowResult] = useState(false)
  const [quizCompleted, setQuizCompleted] = useState(false)
  const [pointsEarned, setPointsEarned] = useState(0)
  const router = useRouter()

  useEffect(() => {
    // Generate quiz questions from flashcard data
    const mockQuestions: QuizQuestion[] = [
      {
        id: 1,
        question: "What is the primary purpose of the main topic in your notes?",
        options: [
          "To provide specific examples",
          "To serve as the foundation for understanding",
          "To contradict other concepts",
          "To complicate the subject matter",
        ],
        correctAnswer: 1,
        concept: "Main Topic",
      },
      {
        id: 2,
        question: "How does Concept A support the main topic?",
        options: [
          "By providing contradictory information",
          "By offering specific details and examples",
          "By replacing the main topic",
          "By creating confusion",
        ],
        correctAnswer: 1,
        concept: "Concept A",
      },
      {
        id: 3,
        question: "What role does Concept B play in the overall understanding?",
        options: [
          "It provides an alternative perspective",
          "It eliminates other concepts",
          "It has no relation to other concepts",
          "It only creates problems",
        ],
        correctAnswer: 0,
        concept: "Concept B",
      },
      {
        id: 4,
        question: "How do all the concepts work together?",
        options: [
          "They work independently",
          "They contradict each other",
          "They form an interconnected system",
          "They are unrelated",
        ],
        correctAnswer: 2,
        concept: "Integration",
      },
    ]

    setQuestions(mockQuestions)
  }, [])

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex)
  }

  const handleNextQuestion = () => {
    if (selectedAnswer === null) return

    const currentQuestion = questions[currentQuestionIndex]
    const isCorrect = selectedAnswer === currentQuestion.correctAnswer

    const newResult: QuizResult = {
      questionId: currentQuestion.id,
      selectedAnswer,
      isCorrect,
    }

    const updatedResults = [...results, newResult]
    setResults(updatedResults)
    setShowResult(true)

    // Calculate points (10 points per correct answer)
    if (isCorrect) {
      setPointsEarned((prev) => prev + 10)
    }

    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1)
        setSelectedAnswer(null)
        setShowResult(false)
      } else {
        completeQuiz(updatedResults)
      }
    }, 2000)
  }

  const completeQuiz = (finalResults: QuizResult[]) => {
    const correctAnswers = finalResults.filter((r) => r.isCorrect).length
    const totalPoints = correctAnswers * 10

    // Update total points in localStorage
    const currentPoints = Number.parseInt(localStorage.getItem("total-points") || "0")
    const newTotalPoints = currentPoints + totalPoints
    localStorage.setItem("total-points", newTotalPoints.toString())

    // Store quiz completion
    const quizHistory = JSON.parse(localStorage.getItem("quiz-history") || "[]")
    quizHistory.push({
      date: new Date().toISOString(),
      score: correctAnswers,
      total: questions.length,
      pointsEarned: totalPoints,
    })
    localStorage.setItem("quiz-history", JSON.stringify(quizHistory))

    setQuizCompleted(true)
  }

  const restartQuiz = () => {
    setCurrentQuestionIndex(0)
    setSelectedAnswer(null)
    setResults([])
    setShowResult(false)
    setQuizCompleted(false)
    setPointsEarned(0)
  }

  const goToPoints = () => {
    router.push("/points")
  }

  if (questions.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <Trophy className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
            <h1 className="text-2xl font-bold mb-4">No Quiz Available</h1>
            <p className="text-muted-foreground mb-6">Complete some flashcards first to generate a quiz.</p>
            <Button onClick={() => router.push("/flashcards")}>Study Flashcards</Button>
          </div>
        </main>
      </div>
    )
  }

  if (quizCompleted) {
    const correctAnswers = results.filter((r) => r.isCorrect).length
    const percentage = Math.round((correctAnswers / questions.length) * 100)
    const hasEarnedCoupon = pointsEarned >= 30 // Coupon threshold

    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="max-w-2xl mx-auto text-center">
            <div className="mb-8">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Trophy className="h-10 w-10 text-primary" />
              </div>
              <h1 className="text-3xl font-bold mb-4">Quiz Completed!</h1>
              <p className="text-lg text-muted-foreground">Great job on completing the quiz</p>
            </div>

            <Card className="mb-8">
              <CardContent className="pt-6">
                <div className="grid grid-cols-2 gap-6 text-center">
                  <div>
                    <div className="text-3xl font-bold text-primary mb-2">
                      {correctAnswers}/{questions.length}
                    </div>
                    <div className="text-sm text-muted-foreground">Correct Answers</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-secondary mb-2">{pointsEarned}</div>
                    <div className="text-sm text-muted-foreground">Points Earned</div>
                  </div>
                </div>

                <div className="mt-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-muted-foreground">Score</span>
                    <span className="text-sm font-medium">{percentage}%</span>
                  </div>
                  <Progress value={percentage} className="h-2" />
                </div>
              </CardContent>
            </Card>

            {hasEarnedCoupon && (
              <Card className="mb-8 bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20">
                <CardContent className="pt-6">
                  <div className="text-center">
                    <Gift className="h-12 w-12 text-primary mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Congratulations!</h3>
                    <p className="text-muted-foreground mb-4">You've earned enough points for a reward!</p>
                    <div className="bg-background rounded-lg p-4 border-2 border-dashed border-primary/30">
                      <div className="text-lg font-mono font-bold text-primary">LEARN20</div>
                      <div className="text-sm text-muted-foreground">20% off premium features</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="outline" onClick={restartQuiz}>
                Retake Quiz
              </Button>
              <Button onClick={goToPoints}>View All Points</Button>
              <Button variant="secondary" onClick={() => router.push("/")}>
                Back to Home
              </Button>
            </div>
          </div>
        </main>
      </div>
    )
  }

  const currentQuestion = questions[currentQuestionIndex]
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-4">Knowledge Quiz</h1>
            <p className="text-lg text-muted-foreground">Test your understanding of the concepts from your notes</p>
          </div>

          {/* Progress */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-muted-foreground">
                Question {currentQuestionIndex + 1} of {questions.length}
              </span>
              <span className="text-sm text-muted-foreground">{Math.round(progress)}% Complete</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          {/* Question Card */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-xl">{currentQuestion.question}</CardTitle>
              <CardDescription>Concept: {currentQuestion.concept}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {currentQuestion.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswerSelect(index)}
                    disabled={showResult}
                    className={cn(
                      "w-full p-4 text-left rounded-lg border-2 transition-all",
                      "hover:border-primary/50 hover:bg-primary/5",
                      selectedAnswer === index && !showResult && "border-primary bg-primary/10",
                      showResult &&
                        selectedAnswer === index &&
                        currentQuestion.correctAnswer === index &&
                        "border-green-500 bg-green-50 text-green-700",
                      showResult &&
                        selectedAnswer === index &&
                        currentQuestion.correctAnswer !== index &&
                        "border-red-500 bg-red-50 text-red-700",
                      showResult &&
                        selectedAnswer !== index &&
                        currentQuestion.correctAnswer === index &&
                        "border-green-500 bg-green-50 text-green-700",
                    )}
                  >
                    <div className="flex items-center justify-between">
                      <span>{option}</span>
                      {showResult && (
                        <div>
                          {currentQuestion.correctAnswer === index && (
                            <CheckCircle className="h-5 w-5 text-green-500" />
                          )}
                          {selectedAnswer === index && currentQuestion.correctAnswer !== index && (
                            <XCircle className="h-5 w-5 text-red-500" />
                          )}
                        </div>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Action Button */}
          <div className="text-center">
            {!showResult ? (
              <Button onClick={handleNextQuestion} disabled={selectedAnswer === null} size="lg">
                {currentQuestionIndex === questions.length - 1 ? "Finish Quiz" : "Next Question"}
              </Button>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-center gap-2">
                  {results[results.length - 1]?.isCorrect ? (
                    <>
                      <CheckCircle className="h-6 w-6 text-green-500" />
                      <span className="text-green-600 font-medium">Correct! +10 points</span>
                    </>
                  ) : (
                    <>
                      <XCircle className="h-6 w-6 text-red-500" />
                      <span className="text-red-600 font-medium">Incorrect</span>
                    </>
                  )}
                </div>
                <div className="text-sm text-muted-foreground">
                  {currentQuestionIndex === questions.length - 1
                    ? "Calculating final score..."
                    : "Moving to next question..."}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
