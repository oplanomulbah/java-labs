// Utility function to draw hand landmarks on canvas

type Landmark = [number, number, number]
type HandLandmarks = Landmark[]

// Finger connections for drawing
const FINGER_CONNECTIONS = [
  // Thumb
  [0, 1],
  [1, 2],
  [2, 3],
  [3, 4],
  // Index finger
  [0, 5],
  [5, 6],
  [6, 7],
  [7, 8],
  // Middle finger
  [0, 9],
  [9, 10],
  [10, 11],
  [11, 12],
  // Ring finger
  [0, 13],
  [13, 14],
  [14, 15],
  [15, 16],
  // Pinky
  [0, 17],
  [17, 18],
  [18, 19],
  [19, 20],
  // Palm
  [0, 5],
  [5, 9],
  [9, 13],
  [13, 17],
]

export function drawHand(ctx: CanvasRenderingContext2D, landmarks: HandLandmarks): void {
  // Draw connections
  ctx.strokeStyle = "#00FF00"
  ctx.lineWidth = 2

  for (const [start, end] of FINGER_CONNECTIONS) {
    const startPoint = landmarks[start]
    const endPoint = landmarks[end]

    if (startPoint && endPoint) {
      ctx.beginPath()
      ctx.moveTo(startPoint[0], startPoint[1])
      ctx.lineTo(endPoint[0], endPoint[1])
      ctx.stroke()
    }
  }

  // Draw landmarks
  ctx.fillStyle = "#FF0000"

  landmarks.forEach((point) => {
    ctx.beginPath()
    ctx.arc(point[0], point[1], 5, 0, 2 * Math.PI)
    ctx.fill()
  })
}

