"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Trash2, Volume2 } from "lucide-react"

interface TextOutputProps {
  text: string
  onClear: () => void
  onSpeak: () => void
}

export default function TextOutput({ text, onClear, onSpeak }: TextOutputProps) {
  return (
    <Card className="p-4">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-semibold">Translated Text</h3>
        <div className="flex space-x-2">
          <Button variant="outline" size="icon" onClick={onSpeak} disabled={!text} title="Speak text">
            <Volume2 className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={onClear} disabled={!text} title="Clear text">
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <div className="min-h-24 p-3 border rounded-md bg-muted/50">
        {text ? (
          <p className="text-lg">{text}</p>
        ) : (
          <p className="text-muted-foreground italic">Translated text will appear here...</p>
        )}
      </div>
    </Card>
  )
}

