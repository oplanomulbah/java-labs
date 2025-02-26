"use client"

import { useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Loader2, Play, Square, Volume2 } from "lucide-react"
import WebcamFeed from "@/components/webcam-feed"
import HandTracker from "@/components/hand-tracker"
import TextOutput from "@/components/text-output"
import { createBasicGestures } from "@/lib/basic-gestures"

export default function SignLanguageTranslator() {
  const [isStarted, setIsStarted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [recognizedText, setRecognizedText] = useState("")
  const [recognizedWords, setRecognizedWords] = useState<string[]>([])
  const [activeTab, setActiveTab] = useState("live")
  const videoRef = useRef<HTMLVideoElement>(null)

  // Get the list of supported gestures for display
  const supportedGestures = createBasicGestures()

  const handleStart = async () => {
    setIsLoading(true)
    try {
      // Check if the browser supports getUserMedia
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error("Your browser doesn't support webcam access")
      }

      // Try to get user media permissions before starting
      await navigator.mediaDevices.getUserMedia({ video: true })

      setIsStarted(true)
      // Reset recognized text when starting
      setRecognizedText("")
      setRecognizedWords([])
    } catch (error) {
      console.error("Error starting the translator:", error)

      // Show appropriate error message
      if (
        error instanceof DOMException &&
        (error.name === "NotAllowedError" || error.name === "PermissionDeniedError")
      ) {
        alert("Camera access denied. Please allow camera access in your browser settings and try again.")
      } else {
        alert(`Failed to start: ${error instanceof Error ? error.message : "Unknown error occurred"}`)
      }
    } finally {
      setIsLoading(false)
    }
  }

  const handleStop = () => {
    setIsStarted(false)
  }

  const handleGestureRecognized = (gesture: string) => {
    // Only add the gesture if it's not the same as the last one
    if (gesture && (!recognizedWords.length || recognizedWords[recognizedWords.length - 1] !== gesture)) {
      setRecognizedWords((prev) => [...prev, gesture])
      setRecognizedText((prev) => (prev ? `${prev} ${gesture}` : gesture))
    }
  }

  const handleClearText = () => {
    setRecognizedText("")
    setRecognizedWords([])
  }

  const handleSpeakText = () => {
    if (recognizedText && typeof window !== "undefined" && window.speechSynthesis) {
      const utterance = new SpeechSynthesisUtterance(recognizedText)
      window.speechSynthesis.speak(utterance)
    }
  }

  return (
    <div className="w-full space-y-6">
      <Tabs defaultValue="live" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="live">Live Translation</TabsTrigger>
          <TabsTrigger value="gestures">Supported Gestures</TabsTrigger>
          <TabsTrigger value="about">How It Works</TabsTrigger>
        </TabsList>
        <TabsContent value="live" className="space-y-4">
          <Card className="relative overflow-hidden rounded-lg aspect-video bg-muted">
            {isStarted ? (
              <div className="relative w-full h-full">
                <WebcamFeed videoRef={videoRef} />
                <HandTracker videoRef={videoRef} onGestureRecognized={handleGestureRecognized} isActive={isStarted} />
              </div>
            ) : (
              <div className="flex items-center justify-center w-full h-full">
                <Volume2 className="w-16 h-16 text-muted-foreground" />
                <p className="absolute bottom-4 text-center w-full text-muted-foreground">
                  Click Start to enable webcam and begin translation
                </p>
              </div>
            )}
          </Card>

          <div className="flex justify-center space-x-4">
            {!isStarted ? (
              <Button onClick={handleStart} disabled={isLoading} className="w-32">
                {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Play className="mr-2 h-4 w-4" />}
                Start
              </Button>
            ) : (
              <Button onClick={handleStop} variant="destructive" className="w-32">
                <Square className="mr-2 h-4 w-4" />
                Stop
              </Button>
            )}
          </div>

          <TextOutput text={recognizedText} onClear={handleClearText} onSpeak={handleSpeakText} />
        </TabsContent>

        <TabsContent value="gestures" className="space-y-4">
          <Card className="p-6">
            <h2 className="text-2xl font-bold mb-4">Supported Sign Language Gestures</h2>
            <p className="text-muted-foreground mb-6">
              This application can recognize the following sign language gestures. Due to technical limitations, we
              currently support a subset of these gestures reliably.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">Basic Gestures</h3>
                <ul className="list-disc pl-5 space-y-1">
                  {supportedGestures
                    .filter((g) => g.category === "basic")
                    .map((gesture) => (
                      <li key={gesture.name} className="text-sm">
                        <span className="font-medium">{gesture.name}</span>: {gesture.description}
                      </li>
                    ))}
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">Common Words</h3>
                <ul className="list-disc pl-5 space-y-1">
                  {supportedGestures
                    .filter((g) => g.category === "common")
                    .slice(0, 10)
                    .map((gesture) => (
                      <li key={gesture.name} className="text-sm">
                        <span className="font-medium">{gesture.name}</span>: {gesture.description}
                      </li>
                    ))}
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">Numbers</h3>
                <ul className="list-disc pl-5 space-y-1">
                  {supportedGestures
                    .filter((g) => g.category === "number")
                    .map((gesture) => (
                      <li key={gesture.name} className="text-sm">
                        <span className="font-medium">{gesture.name}</span>: {gesture.description}
                      </li>
                    ))}
                </ul>
              </div>
            </div>

            <div className="mt-6 p-4 bg-muted rounded-lg">
              <h4 className="font-semibold mb-2">Currently Reliable Gestures</h4>
              <p className="text-sm text-muted-foreground">
                The most reliable gestures in the current implementation are: thumbs up (yes), pointing (look), peace
                sign, open hand (hello), and fist (stop).
              </p>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="about">
          <Card className="p-6">
            <h2 className="text-2xl font-bold mb-4">How This Translator Works</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold">Hand Tracking</h3>
                <p className="text-muted-foreground">
                  We use TensorFlow.js and the Handpose model to detect and track hand landmarks in real-time from your
                  webcam feed. This identifies the positions of 21 key points on your hand.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold">Gesture Recognition</h3>
                <p className="text-muted-foreground">
                  A custom gesture recognition system analyzes the hand positions to identify sign language gestures.
                  The system looks at the relative positions of your fingers to determine which gesture you're making.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold">Text Translation</h3>
                <p className="text-muted-foreground">
                  Recognized gestures are converted to text and displayed in real-time. The system can recognize
                  individual signs and combine them into sentences.
                </p>
              </div>
              <div className="pt-4 border-t">
                <p className="text-sm text-muted-foreground">
                  Note: This translator works best in good lighting conditions with clear hand visibility. For optimal
                  results, position your hand clearly in the frame and make deliberate gestures.
                </p>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

