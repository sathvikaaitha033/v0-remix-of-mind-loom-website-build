"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Menu, X } from "lucide-react"
import { Logo } from "@/components/logo"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Logo className="hover:opacity-95 transition-opacity" size="md" animated showText />
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="ghost">About</Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>About MindLoom</DialogTitle>
                  <DialogDescription className="text-left space-y-4 pt-4">
                    <div>
                      We propose MindLoom, an AI-powered platform designed to convert unorganised handwritten notes into
                      structured, interactive mindmaps. Students, educators, and professionals often rely on handwritten
                      notes for quick documentation, but these notes frequently remain cluttered and difficult to
                      revisit, resulting in limited usability. Our application MindLoom helps in closing this gap by
                      transposing unorganised and illegible notes into efficient mindmaps for a better learning
                      experience.
                    </div>
                    <div>
                      Our solution leverages optical character recognition (OCR) combined with natural language
                      processing (NLP) to identify keywords, categorise concepts, detect patterns and connections within
                      the notes. The generated mindmaps are editable, shareable, and exportable, helping users visualise
                      knowledge clearly and retain it better. Unlike generic note-taking apps, MindLoom uniquely bridges
                      handwritten input with dynamic visualisation, saving time and optimising productivity.
                    </div>
                    <div>
                      The platform is scalable, with scope for improved scholastic development and mastering the essence
                      of precise learning.
                    </div>
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
            <Link href="/signup">
              <Button>Sign Up</Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button variant="ghost" size="sm" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="ghost" className="w-full justify-start">
                  About
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>About MindLoom</DialogTitle>
                  <DialogDescription className="text-left space-y-4 pt-4">
                    <div>
                      We propose MindLoom, an AI-powered platform designed to convert unorganised handwritten notes into
                      structured, interactive mindmaps. Students, educators, and professionals often rely on handwritten
                      notes for quick documentation, but these notes frequently remain cluttered and difficult to
                      revisit, resulting in limited usability. Our application MindLoom helps in closing this gap by
                      transposing unorganised and illegible notes into efficient mindmaps for a better learning
                      experience.
                    </div>
                    <div>
                      Our solution leverages optical character recognition (OCR) combined with natural language
                      processing (NLP) to identify keywords, categorise concepts, detect patterns and connections within
                      the notes. The generated mindmaps are editable, shareable, and exportable, helping users visualise
                      knowledge clearly and retain it better. Unlike generic note-taking apps, MindLoom uniquely bridges
                      handwritten input with dynamic visualisation, saving time and optimising productivity.
                    </div>
                    <div>
                      The platform is scalable, with scope for improved scholastic development and mastering the essence
                      of precise learning.
                    </div>
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
            <Link href="/signup" className="block">
              <Button className="w-full">Sign Up</Button>
            </Link>
          </div>
        )}
      </div>
    </header>
  )
}
