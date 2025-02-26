// This file contains definitions for 50 common sign language gestures

// Define the gesture types
export interface GestureDefinition {
  name: string;
  category: "alphabet" | "number" | "common" | "basic";
  description: string;
}

// Create a list of 50 common sign language gestures
export function createBasicGestures(): GestureDefinition[] {
  return [
    // Basic gestures
    {
      name: "thumbs up",
      category: "basic",
      description: "Thumb pointing up, other fingers curled",
    },
    {
      name: "pointing",
      category: "basic",
      description: "Index finger extended, other fingers curled",
    },
    {
      name: "peace",
      category: "basic",
      description: "Index and middle fingers extended in V shape",
    },
    {
      name: "open hand",
      category: "basic",
      description: "All fingers extended and spread",
    },
    {
      name: "fist",
      category: "basic",
      description: "All fingers curled into a fist",
    },
    {
      name: "I love you",
      category: "basic",
      description: "Thumb, index, and pinky extended, others curled",
    },
    {
      name: "thank you",
      category: "basic",
      description: "Flat hand with fingers together, moved from chin outward",
    },
    {
      name: "OK",
      category: "basic",
      description: "Thumb, index, and pinky extended, others curled",
    },
    {
      name: "no",
      category: "basic",
      description: "Thumb, index, and pinky extended, others curled",
    },
    {
      name: "yes",
      category: "basic",
      description: "Thumb, index, and pinky extended, others curled",
    },
    {
      name: "stop",
      category: "basic",
      description: "All fingers curled into a fist",
    },
    {
      name: "hello",
      category: "basic",
      description: "All fingers extended and spread",
    },
    {
      name: "look",
      category: "basic",
      description: "Index finger extended, other fingers curled",
    },

    // Alphabet (ASL)
    {
      name: "A",
      category: "alphabet",
      description: "Fist with thumb resting on the side",
    },
    {
      name: "B",
      category: "alphabet",
      description: "Flat hand with fingers together, thumb tucked",
    },
    { name: "C", category: "alphabet", description: "Curved hand in C shape" },
    {
      name: "D",
      category: "alphabet",
      description:
        "Index finger pointing up, thumb and other fingers forming a circle",
    },
    {
      name: "E",
      category: "alphabet",
      description: "Fingers curled, thumb tucked under fingers",
    },
    {
      name: "F",
      category: "alphabet",
      description:
        "Thumb and index finger form a circle, other fingers extended",
    },
    {
      name: "G",
      category: "alphabet",
      description: "Index finger points forward, thumb extended to side",
    },
    {
      name: "H",
      category: "alphabet",
      description:
        "Index and middle fingers extended together, parallel to ground",
    },
    {
      name: "I",
      category: "alphabet",
      description: "Pinky finger extended, others curled",
    },
    {
      name: "J",
      category: "alphabet",
      description: "Pinky extended and traced in J shape",
    },
    {
      name: "K",
      category: "alphabet",
      description: "Index finger, middle finger and thumb extended upward",
    },
    {
      name: "L",
      category: "alphabet",
      description: "L shape with thumb and index finger",
    },
    {
      name: "M",
      category: "alphabet",
      description: "Three fingers folded over thumb",
    },
    {
      name: "N",
      category: "alphabet",
      description: "Two fingers folded over thumb",
    },
    {
      name: "O",
      category: "alphabet",
      description: "Fingers and thumb form O shape",
    },
    {
      name: "P",
      category: "alphabet",
      description: "Index finger points down, thumb to side",
    },
    {
      name: "Q",
      category: "alphabet",
      description: "Index finger and thumb form downward pointing G",
    },
    {
      name: "R",
      category: "alphabet",
      description: "Crossed index and middle fingers",
    },
    {
      name: "S",
      category: "alphabet",
      description: "Fist with thumb wrapped over fingers",
    },
    {
      name: "T",
      category: "alphabet",
      description: "Index finger tucked under thumb",
    },
    {
      name: "U",
      category: "alphabet",
      description: "Index and middle finger extended together",
    },
    {
      name: "V",
      category: "alphabet",
      description: "Index and middle finger in V shape",
    },
    {
      name: "W",
      category: "alphabet",
      description: "Index, middle, and ring fingers extended",
    },
    {
      name: "X",
      category: "alphabet",
      description: "Index finger bent at middle joint",
    },
    {
      name: "Y",
      category: "alphabet",
      description: "Thumb and pinky extended, other fingers curled",
    },
    {
      name: "Z",
      category: "alphabet",
      description: "Index finger traces Z shape in air",
    },

    // Numbers
    { name: "1", category: "number", description: "Index finger pointing up" },
    {
      name: "2",
      category: "number",
      description: "Index and middle fingers extended",
    },
    {
      name: "3",
      category: "number",
      description: "Thumb, index, and middle fingers extended",
    },
    {
      name: "4",
      category: "number",
      description: "Four fingers extended, thumb tucked",
    },
    { name: "5", category: "number", description: "All five fingers extended" },

    // Common words/phrases
    {
      name: "hello",
      category: "common",
      description: "Flat hand near forehead, moved away in arc",
    },
    {
      name: "goodbye",
      category: "common",
      description: "Open hand waved side to side",
    },
    {
      name: "please",
      category: "common",
      description: "Flat hand circled over heart",
    },
    {
      name: "sorry",
      category: "common",
      description: "Fist circled over heart",
    },
    {
      name: "help",
      category: "common",
      description: "Closed fist with thumb up, placed on open palm",
    },
    {
      name: "want",
      category: "common",
      description: "Hands pulled toward body",
    },
    {
      name: "need",
      category: "common",
      description: "Both hands in claw shape pulled down",
    },
    {
      name: "eat",
      category: "common",
      description: "Fingers bunched, tapped on mouth",
    },
    { name: "drink", category: "common", description: "C hand moved to mouth" },
    {
      name: "friend",
      category: "common",
      description: "Index fingers hooked together",
    },
    {
      name: "family",
      category: "common",
      description: "Both hands circled together",
    },
    {
      name: "love",
      category: "common",
      description: "Arms crossed over chest",
    },
  ];
}

// Map gesture names to display text
export function mapGestureToDisplayText(gesture: string): string {
  const gestureMap: Record<string, string> = {
    "thumbs up": "yes",
    peace: "peace",
    pointing: "look",
    "open hand": "hello",
    fist: "stop",
    "I love you": "I love you",
    "thank you": "thank you",
    ok: "OK",
    no: "no",
    yes: "yes",
    hello: "hello",
    goodbye: "goodbye",
    please: "please",
    sorry: "sorry",
    help: "help",
    want: "want",
    need: "need",
    eat: "eat",
    drink: "drink",
    friend: "friend",
    family: "family",
    love: "love",
    thumbs_up: "yes",
    peace_sign: "peace",
    pointing_up: "look",
    open_hand: "hello",
    i_love_you: "I love you",
    thank_you: "thank you",
    ok_sign: "OK",
  };

  return gestureMap[gesture] || gesture;
}
