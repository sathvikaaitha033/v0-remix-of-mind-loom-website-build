"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Header } from "@/components/header"
import { Input } from "@/components/ui/input"
import { BookOpen, Search, Play, Calendar, ExternalLink, Brain, FileText } from "lucide-react"

interface PastLearning {
  id: number
  title: string
  concepts: string[]
  createdAt: string
  youtubeLinks: { title: string; url: string; concept: string }[]
}

export default function PastLearningsPage() {
  const [pastLearnings, setPastLearnings] = useState<PastLearning[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredLearnings, setFilteredLearnings] = useState<PastLearning[]>([])
  const router = useRouter()

  useEffect(() => {
    // Load past learnings from localStorage and generate YouTube links
    const mindmaps = JSON.parse(localStorage.getItem("mindmaps") || "[]")

    const learningsWithYouTube = mindmaps.map((mindmap: any) => ({
      ...mindmap,
      youtubeLinks: generateYouTubeLinks(mindmap.concepts),
    }))

    // Add some mock data if no real data exists
    if (learningsWithYouTube.length === 0) {
      const mockLearnings: PastLearning[] = [
        {
          id: 1,
          title: "Introduction to Machine Learning",
          concepts: ["Supervised Learning", "Neural Networks", "Data Preprocessing", "Model Evaluation"],
          createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
          youtubeLinks: [
            {
              title: "Machine Learning Explained",
              url: "https://www.youtube.com/watch?v=ukzFI9rgwfU",
              concept: "Supervised Learning",
            },
            {
              title: "Neural Networks Basics",
              url: "https://www.youtube.com/watch?v=aircAruvnKk",
              concept: "Neural Networks",
            },
            {
              title: "Data Preprocessing Tutorial",
              url: "https://www.youtube.com/watch?v=0xVqLJe9_CY",
              concept: "Data Preprocessing",
            },
            {
              title: "Model Evaluation Techniques",
              url: "https://www.youtube.com/watch?v=LbX4X71-TFI",
              concept: "Model Evaluation",
            },
          ],
        },
        {
          id: 2,
          title: "React Development Fundamentals",
          concepts: ["Components", "State Management", "Props", "Hooks"],
          createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
          youtubeLinks: [
            {
              title: "React Components Tutorial",
              url: "https://www.youtube.com/watch?v=Tn6-PIqc4UM",
              concept: "Components",
            },
            {
              title: "State Management in React",
              url: "https://www.youtube.com/watch?v=35lXWvCuM8o",
              concept: "State Management",
            },
            {
              title: "Understanding Props",
              url: "https://www.youtube.com/watch?v=PHaECbrKgs0",
              concept: "Props",
            },
            {
              title: "React Hooks Explained",
              url: "https://www.youtube.com/watch?v=O6P86uwfdR0",
              concept: "Hooks",
            },
          ],
        },
      ]
      setPastLearnings(mockLearnings)
      setFilteredLearnings(mockLearnings)
    } else {
      setPastLearnings(learningsWithYouTube)
      setFilteredLearnings(learningsWithYouTube)
    }
  }, [])

  useEffect(() => {
    // Filter learnings based on search term
    const filtered = pastLearnings.filter(
      (learning) =>
        learning.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        learning.concepts.some((concept) => concept.toLowerCase().includes(searchTerm.toLowerCase())),
    )
    setFilteredLearnings(filtered)
  }, [searchTerm, pastLearnings])

  const generateYouTubeLinks = (concepts: string[]) => {
    // Generate relevant YouTube links based on concepts
    return concepts.map((concept) => ({
      title: `Learn about ${concept}`,
      url: `https://www.youtube.com/results?search_query=${encodeURIComponent(concept + " tutorial")}`,
      concept: concept,
    }))
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    })
  }

  const openYouTubeLink = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer")
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-4">Past Learnings</h1>
            <p className="text-lg text-muted-foreground">
              Review your previously generated flashcards and access related learning resources
            </p>
          </div>

          {/* Search Bar */}
          <div className="mb-8">
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search your learnings..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {filteredLearnings.length === 0 ? (
            <div className="text-center py-12">
              {pastLearnings.length === 0 ? (
                <>
                  <BookOpen className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                  <h2 className="text-2xl font-bold mb-4">No Past Learnings Yet</h2>
                  <p className="text-muted-foreground mb-6">
                    Start by uploading your notes to create your first learning session
                  </p>
                  <Button onClick={() => router.push("/upload")}>Upload Your First Notes</Button>
                </>
              ) : (
                <>
                  <Search className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                  <h2 className="text-2xl font-bold mb-4">No Results Found</h2>
                  <p className="text-muted-foreground">
                    Try adjusting your search terms to find what you're looking for
                  </p>
                </>
              )}
            </div>
          ) : (
            <div className="grid gap-6">
              {filteredLearnings.map((learning) => (
                <Card key={learning.id} className="overflow-hidden">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="flex items-center gap-2 mb-2">
                          <Brain className="h-5 w-5 text-primary" />
                          {learning.title}
                        </CardTitle>
                        <CardDescription className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          Created on {formatDate(learning.createdAt)}
                        </CardDescription>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          // Store the learning data and navigate to flashcards
                          localStorage.setItem(
                            "current-flashcards",
                            JSON.stringify(
                              learning.concepts.map((concept, index) => ({
                                id: index + 1,
                                question: `What do you know about ${concept}?`,
                                answer: `${concept} is an important concept that was covered in your notes.`,
                                concept: concept,
                              })),
                            ),
                          )
                          router.push("/flashcards")
                        }}
                      >
                        <FileText className="h-4 w-4 mr-2" />
                        Review Flashcards
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {/* Concepts */}
                    <div className="mb-6">
                      <h4 className="font-medium mb-3">Key Concepts</h4>
                      <div className="flex flex-wrap gap-2">
                        {learning.concepts.map((concept, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium"
                          >
                            {concept}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* YouTube Links */}
                    <div>
                      <h4 className="font-medium mb-3 flex items-center gap-2">
                        <Play className="h-4 w-4 text-red-500" />
                        Related Learning Videos
                      </h4>
                      <div className="grid sm:grid-cols-2 gap-3">
                        {learning.youtubeLinks.map((link, index) => (
                          <button
                            key={index}
                            onClick={() => openYouTubeLink(link.url)}
                            className="flex items-center gap-3 p-3 bg-muted/50 hover:bg-muted rounded-lg transition-colors text-left group"
                          >
                            <div className="w-10 h-10 bg-red-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                              <Play className="h-5 w-5 text-red-500" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="font-medium text-sm group-hover:text-primary transition-colors">
                                {link.title}
                              </div>
                              <div className="text-xs text-muted-foreground">Related to: {link.concept}</div>
                            </div>
                            <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" />
                          </button>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
