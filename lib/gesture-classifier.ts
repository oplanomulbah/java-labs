// Sign language gesture classifier based on hand landmarks

type Landmark = [number, number, number]
type HandLandmarks = Landmark[]

// Define sign language gestures
const GESTURES = {
  THUMBS_UP: "thumbs up",
  OPEN_HAND: "hello",
  FIST: "stop",
  POINTING: "look",
  PEACE: "peace",
  I_LOVE_YOU: "I love you",
  OK: "OK",
  THANK_YOU: "thank you",
  YES: "yes",
  NO: "no",
}

// Helper function to calculate distance between two points
function distance(a: Landmark, b: Landmark): number {
  return Math.sqrt(Math.pow(a[0] - b[0], 2) + Math.pow(a[1] - b[1], 2) + Math.pow(a[2] - b[2], 2))
}

// Helper function to calculate angle between three points
function angle(a: Landmark, b: Landmark, c: Landmark): number {
  const ab = [a[0] - b[0], a[1] - b[1], a[2] - b[2]]
  const cb = [c[0] - b[0], c[1] - b[1], c[2] - b[2]]

  // Dot product
  const dot = ab[0] * cb[0] + ab[1] * cb[1] + ab[2] * cb[2]

  // Magnitudes
  const abMag = Math.sqrt(ab[0] * ab[0] + ab[1] * ab[1] + ab[2] * ab[2])
  const cbMag = Math.sqrt(cb[0] * cb[0] + cb[1] * cb[1] + cb[2] * cb[2])

  // Angle in radians
  const angleRad = Math.acos(dot / (abMag * cbMag))

  // Convert to degrees
  return angleRad * (180 / Math.PI)
}

// Helper function to check if a finger is extended
function isFingerExtended(landmarks: HandLandmarks, baseIndex: number, tipIndex: number): boolean {
  const base = landmarks[baseIndex]
  const tip = landmarks[tipIndex]
  const wrist = landmarks[0]

  // Check if tip is further from wrist than base
  const baseToWristDist = distance(base, wrist)
  const tipToWristDist = distance(tip, wrist)

  return tipToWristDist > baseToWristDist
}

export function classifyHandGesture(landmarks: HandLandmarks): string | null {
  if (!landmarks || landmarks.length !== 21) {
    return null
  }

  // Extract key landmarks
  const wrist = landmarks[0]
  const thumbCMC = landmarks[1]
  const thumbMCP = landmarks[2]
  const thumbIP = landmarks[3]
  const thumbTip = landmarks[4]

  const indexMCP = landmarks[5]
  const indexPIP = landmarks[6]
  const indexDIP = landmarks[7]
  const indexTip = landmarks[8]

  const middleMCP = landmarks[9]
  const middlePIP = landmarks[10]
  const middleDIP = landmarks[11]
  const middleTip = landmarks[12]

  const ringMCP = landmarks[13]
  const ringPIP = landmarks[14]
  const ringDIP = landmarks[15]
  const ringTip = landmarks[16]

  const pinkyMCP = landmarks[17]
  const pinkyPIP = landmarks[18]
  const pinkyDIP = landmarks[19]
  const pinkyTip = landmarks[20]

  // Check finger extensions
  const isThumbExtended = isFingerExtended(landmarks, 2, 4)
  const isIndexExtended = isFingerExtended(landmarks, 5, 8)
  const isMiddleExtended = isFingerExtended(landmarks, 9, 12)
  const isRingExtended = isFingerExtended(landmarks, 13, 16)
  const isPinkyExtended = isFingerExtended(landmarks, 17, 20)

  // Calculate distances for specific gestures
  const thumbIndexDist = distance(thumbTip, indexTip)
  const indexMiddleDist = distance(indexTip, middleTip)

  // Check for thumbs up
  if (
    isThumbExtended &&
    !isIndexExtended &&
    !isMiddleExtended &&
    !isRingExtended &&
    !isPinkyExtended &&
    thumbTip[1] < wrist[1] // Thumb is above wrist (y-coordinate is smaller)
  ) {
    return GESTURES.THUMBS_UP
  }

  // Check for open hand / hello
  if (isThumbExtended && isIndexExtended && isMiddleExtended && isRingExtended && isPinkyExtended) {
    return GESTURES.OPEN_HAND
  }

  // Check for fist / stop
  if (!isThumbExtended && !isIndexExtended && !isMiddleExtended && !isRingExtended && !isPinkyExtended) {
    return GESTURES.FIST
  }

  // Check for pointing
  if (!isThumbExtended && isIndexExtended && !isMiddleExtended && !isRingExtended && !isPinkyExtended) {
    return GESTURES.POINTING
  }

  // Check for peace sign
  if (
    !isThumbExtended &&
    isIndexExtended &&
    isMiddleExtended &&
    !isRingExtended &&
    !isPinkyExtended &&
    indexMiddleDist > 30 // Fingers are spread apart
  ) {
    return GESTURES.PEACE
  }

  // Check for "I love you" sign (thumb, index, and pinky extended)
  if (isThumbExtended && isIndexExtended && !isMiddleExtended && !isRingExtended && isPinkyExtended) {
    return GESTURES.I_LOVE_YOU
  }

  // Check for OK sign (thumb and index finger form a circle)
  if (
    thumbIndexDist < 30 && // Thumb and index are close
    isMiddleExtended &&
    isRingExtended &&
    isPinkyExtended
  ) {
    return GESTURES.OK
  }

  // Check for thank you (hand flat, fingers together, moving from chin outward)
  // This is simplified - in real ASL this is a motion
  if (
    isThumbExtended &&
    isIndexExtended &&
    isMiddleExtended &&
    isRingExtended &&
    isPinkyExtended &&
    // Check if fingers are close together
    indexMiddleDist < 20
  ) {
    return GESTURES.THANK_YOU
  }

  // Check for yes (nodding motion - simplified as a fist with thumb extended)
  if (
    isThumbExtended &&
    !isIndexExtended &&
    !isMiddleExtended &&
    !isRingExtended &&
    !isPinkyExtended &&
    thumbTip[1] > wrist[1] // Thumb is below wrist
  ) {
    return GESTURES.YES
  }

  // Check for no (side to side motion - simplified as index finger wagging)
  if (
    !isThumbExtended &&
    isIndexExtended &&
    !isMiddleExtended &&
    !isRingExtended &&
    !isPinkyExtended &&
    indexTip[0] < wrist[0] // Index finger is to the left of wrist
  ) {
    return GESTURES.NO
  }

  // No recognized gesture
  return null
}

