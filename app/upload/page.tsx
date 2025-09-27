"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Header } from "@/components/header"
import { Upload, FileImage, Loader2, Brain, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"

export default function UploadPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [mindmapGenerated, setMindmapGenerated] = useState(false)
  const router = useRouter()

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file && file.type.startsWith("image/")) {
      setSelectedFile(file)
      const url = URL.createObjectURL(file)
      setPreviewUrl(url)
      setMindmapGenerated(false)
    }
  }

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    const file = event.dataTransfer.files[0]
    if (file && file.type.startsWith("image/")) {
      setSelectedFile(file)
      const url = URL.createObjectURL(file)
      setPreviewUrl(url)
      setMindmapGenerated(false)
    }
  }

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
  }

  const processImage = async () => {
    if (!selectedFile) return

    setIsProcessing(true)

    // Simulate OCR and NLP processing
    await new Promise((resolve) => setTimeout(resolve, 3000))

    setIsProcessing(false)
    setMindmapGenerated(true)
  }

  const convertToFlashcards = () => {
    // Store the processed data in localStorage for demo purposes
    const mindmapData = {
      id: Date.now(),
      title: "Processed Notes",
      concepts: ["Key Concept 1", "Key Concept 2", "Key Concept 3", "Key Concept 4"],
      createdAt: new Date().toISOString(),
    }

    const existingData = JSON.parse(localStorage.getItem("mindmaps") || "[]")
    existingData.push(mindmapData)
    localStorage.setItem("mindmaps", JSON.stringify(existingData))

    router.push("/flashcards")
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-4">Upload Your Notes</h1>
            <p className="text-lg text-muted-foreground">
              Upload an image of your handwritten notes and let AI transform them into interactive mindmaps
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Upload Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="h-5 w-5" />
                  Upload Image
                </CardTitle>
                <CardDescription>Select or drag and drop an image of your handwritten notes</CardDescription>
              </CardHeader>
              <CardContent>
                <div
                  className={cn(
                    "border-2 border-dashed border-border rounded-lg p-8 text-center transition-colors",
                    "hover:border-primary/50 hover:bg-primary/5",
                  )}
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                >
                  {previewUrl ? (
                    <div className="space-y-4">
                      <img
                        src={previewUrl || "/placeholder.svg"}
                        alt="Preview"
                        className="max-w-full max-h-64 mx-auto rounded-lg shadow-md"
                      />
                      <p className="text-sm text-black font-medium">{selectedFile?.name}</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <FileImage className="h-12 w-12 text-muted-foreground mx-auto" />
                      <div>
                        <p className="text-lg font-medium">Drop your image here</p>
                        <p className="text-sm text-black font-medium">or click to browse files</p>
                      </div>
                    </div>
                  )}

                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileSelect}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                </div>

                {selectedFile && !mindmapGenerated && (
                  <div className="mt-6">
                    <Button onClick={processImage} disabled={isProcessing} className="w-full">
                      {isProcessing ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          Processing with AI...
                        </>
                      ) : (
                        <>
                          <Brain className="h-4 w-4 mr-2" />
                          Generate Mindmap
                        </>
                      )}
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Processing/Results Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5" />
                  AI Processing
                </CardTitle>
                <CardDescription>Your notes will be processed using OCR and NLP</CardDescription>
              </CardHeader>
              <CardContent>
                {!selectedFile && (
                  <div className="text-center py-12 text-muted-foreground">
                    <Brain className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>Upload an image to start processing</p>
                  </div>
                )}

                {selectedFile && !isProcessing && !mindmapGenerated && (
                  <div className="text-center py-12 text-muted-foreground">
                    <Brain className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>Ready to process your notes</p>
                  </div>
                )}

                {isProcessing && (
                  <div className="text-center py-12">
                    <Loader2 className="h-12 w-12 mx-auto mb-4 animate-spin text-primary" />
                    <div className="space-y-2">
                      <p className="font-medium">Processing your notes...</p>
                      <div className="space-y-1 text-sm text-muted-foreground">
                        <p>✓ Extracting text with OCR</p>
                        <p>✓ Analyzing content with NLP</p>
                        <p>⏳ Generating mindmap structure</p>
                      </div>
                    </div>
                  </div>
                )}

                {mindmapGenerated && (
                  <div className="space-y-6">
                    <div className="text-center py-8">
                      <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Brain className="h-8 w-8 text-primary" />
                      </div>
                      <h3 className="text-lg font-semibold mb-2">Mindmap Generated!</h3>
                      <p className="text-muted-foreground mb-4">
                        Your notes have been successfully processed into an interactive mindmap
                      </p>
                    </div>

                    {/* Mock Mindmap Preview */}
                    <div className="bg-muted/50 rounded-lg p-6">
                      <h4 className="font-medium mb-4 text-center">Mindmap Preview</h4>
                      <div className="flex flex-col items-center space-y-4">
                        <div className="bg-primary text-primary-foreground px-4 py-2 rounded-lg font-medium">
                          Main Topic
                        </div>
                        <div className="flex gap-4 flex-wrap justify-center">
                          <div className="bg-secondary text-secondary-foreground px-3 py-1 rounded text-sm">
                            Concept A
                          </div>
                          <div className="bg-secondary text-secondary-foreground px-3 py-1 rounded text-sm">
                            Concept B
                          </div>
                          <div className="bg-secondary text-secondary-foreground px-3 py-1 rounded text-sm">
                            Concept C
                          </div>
                        </div>
                      </div>
                    </div>

                    <Button onClick={convertToFlashcards} className="w-full">
                      Convert to Flashcards
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
