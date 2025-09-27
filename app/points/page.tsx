"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Header } from "@/components/header"
import { Progress } from "@/components/ui/progress"
import { Trophy, Star, Gift, Calendar, TrendingUp, Award, Zap } from "lucide-react"

interface QuizHistory {
  date: string
  score: number
  total: number
  pointsEarned: number
}

interface Achievement {
  id: string
  title: string
  description: string
  icon: React.ReactNode
  unlocked: boolean
  pointsRequired: number
}

export default function PointsPage() {
  const [totalPoints, setTotalPoints] = useState(0)
  const [quizHistory, setQuizHistory] = useState<QuizHistory[]>([])
  const [achievements, setAchievements] = useState<Achievement[]>([])
  const [nextRewardProgress, setNextRewardProgress] = useState(0)
  const router = useRouter()

  useEffect(() => {
    // Load points and history from localStorage
    const points = Number.parseInt(localStorage.getItem("total-points") || "0")
    const history = JSON.parse(localStorage.getItem("quiz-history") || "[]")

    setTotalPoints(points)
    setQuizHistory(history)

    // Define achievements
    const achievementsList: Achievement[] = [
      {
        id: "first-quiz",
        title: "First Steps",
        description: "Complete your first quiz",
        icon: <Star className="h-6 w-6" />,
        unlocked: history.length > 0,
        pointsRequired: 0,
      },
      {
        id: "perfect-score",
        title: "Perfect Score",
        description: "Get 100% on a quiz",
        icon: <Trophy className="h-6 w-6" />,
        unlocked: history.some((h: QuizHistory) => h.score === h.total),
        pointsRequired: 0,
      },
      {
        id: "points-50",
        title: "Point Collector",
        description: "Earn 50 total points",
        icon: <Zap className="h-6 w-6" />,
        unlocked: points >= 50,
        pointsRequired: 50,
      },
      {
        id: "points-100",
        title: "Learning Master",
        description: "Earn 100 total points",
        icon: <Award className="h-6 w-6" />,
        unlocked: points >= 100,
        pointsRequired: 100,
      },
      {
        id: "streak-5",
        title: "Consistent Learner",
        description: "Complete 5 quizzes",
        icon: <TrendingUp className="h-6 w-6" />,
        unlocked: history.length >= 5,
        pointsRequired: 0,
      },
    ]

    setAchievements(achievementsList)

    // Calculate progress to next reward (every 50 points)
    const nextRewardThreshold = Math.ceil((points + 1) / 50) * 50
    const progress = (points / nextRewardThreshold) * 100
    setNextRewardProgress(progress)
  }, [])

  const getRewardCoupons = () => {
    const coupons = []
    const rewardTiers = [50, 100, 150, 200]

    rewardTiers.forEach((tier, index) => {
      if (totalPoints >= tier) {
        coupons.push({
          code: `LEARN${10 + index * 5}`,
          discount: `${10 + index * 5}%`,
          tier: tier,
          unlocked: true,
        })
      }
    })

    return coupons
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  const rewardCoupons = getRewardCoupons()
  const nextRewardThreshold = Math.ceil((totalPoints + 1) / 50) * 50
  const pointsToNextReward = nextRewardThreshold - totalPoints

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-4">Your Learning Progress</h1>
            <p className="text-lg text-muted-foreground">Track your points, achievements, and unlock rewards</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Points Overview */}
            <div className="lg:col-span-2 space-y-6">
              {/* Total Points Card */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Trophy className="h-6 w-6 text-primary" />
                    Total Points
                  </CardTitle>
                  <CardDescription>Points earned from completing quizzes</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className="text-5xl font-bold text-primary mb-4">{totalPoints}</div>
                    <div className="text-muted-foreground">
                      From {quizHistory.length} completed quiz{quizHistory.length !== 1 ? "es" : ""}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Next Reward Progress */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Gift className="h-6 w-6 text-secondary" />
                    Next Reward Progress
                  </CardTitle>
                  <CardDescription>{pointsToNextReward} more points to unlock your next reward</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">
                        {totalPoints} / {nextRewardThreshold} points
                      </span>
                      <span className="text-sm font-medium">{Math.round(nextRewardProgress)}%</span>
                    </div>
                    <Progress value={nextRewardProgress} className="h-3" />
                    <div className="text-center text-sm text-muted-foreground">
                      Next reward: {10 + Math.floor(nextRewardThreshold / 50) * 5}% discount coupon
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quiz History */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-6 w-6" />
                    Recent Quiz History
                  </CardTitle>
                  <CardDescription>Your latest quiz performances</CardDescription>
                </CardHeader>
                <CardContent>
                  {quizHistory.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      <Trophy className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>No quizzes completed yet</p>
                      <Button className="mt-4" onClick={() => router.push("/upload")}>
                        Start Learning
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {quizHistory
                        .slice(-5)
                        .reverse()
                        .map((quiz, index) => (
                          <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                                <Trophy className="h-5 w-5 text-primary" />
                              </div>
                              <div>
                                <div className="font-medium">
                                  {quiz.score}/{quiz.total} correct
                                </div>
                                <div className="text-sm text-muted-foreground">{formatDate(quiz.date)}</div>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="font-semibold text-secondary">+{quiz.pointsEarned}</div>
                              <div className="text-sm text-muted-foreground">points</div>
                            </div>
                          </div>
                        ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Achievements */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="h-6 w-6 text-accent" />
                    Achievements
                  </CardTitle>
                  <CardDescription>Unlock badges as you learn</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {achievements.map((achievement) => (
                      <div
                        key={achievement.id}
                        className={`flex items-center gap-3 p-3 rounded-lg ${
                          achievement.unlocked ? "bg-primary/10 border border-primary/20" : "bg-muted/50 opacity-60"
                        }`}
                      >
                        <div className={`${achievement.unlocked ? "text-primary" : "text-muted-foreground"}`}>
                          {achievement.icon}
                        </div>
                        <div className="flex-1">
                          <div className="font-medium text-sm">{achievement.title}</div>
                          <div className="text-xs text-muted-foreground">{achievement.description}</div>
                        </div>
                        {achievement.unlocked && (
                          <div className="text-primary">
                            <Star className="h-4 w-4 fill-current" />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Reward Coupons */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Gift className="h-6 w-6 text-secondary" />
                    Reward Coupons
                  </CardTitle>
                  <CardDescription>Coupons you've unlocked</CardDescription>
                </CardHeader>
                <CardContent>
                  {rewardCoupons.length === 0 ? (
                    <div className="text-center py-6 text-muted-foreground">
                      <Gift className="h-8 w-8 mx-auto mb-2 opacity-50" />
                      <p className="text-sm">No coupons unlocked yet</p>
                      <p className="text-xs">Earn 50 points for your first coupon</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {rewardCoupons.map((coupon, index) => (
                        <div
                          key={index}
                          className="bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 rounded-lg p-3"
                        >
                          <div className="text-center">
                            <div className="font-mono font-bold text-primary text-lg">{coupon.code}</div>
                            <div className="text-sm text-muted-foreground">{coupon.discount} off premium features</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
