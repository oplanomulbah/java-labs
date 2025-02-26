"use client";

import type React from "react";

import { useRef, useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { gestureMap } from "@/data/data";

interface HandTrackerProps {
  videoRef: React.RefObject<HTMLVideoElement>;
  onGestureRecognized: (gesture: string) => void;
  isActive: boolean;
}

export default function HandTracker({
  videoRef,
  onGestureRecognized,
  isActive,
}: HandTrackerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isModelLoaded, setIsModelLoaded] = useState(false);
  const [loadingStatus, setLoadingStatus] = useState(
    "Loading TensorFlow.js..."
  );
  const [error, setError] = useState<string | null>(null);
  const [showNoHandsToast, setShowNoHandsToast] = useState(false);
  const lastGestureTimeRef = useRef<number>(0);
  const gestureBufferRef = useRef<string[]>([]);
  const handposeModelRef = useRef<any>(null);
  const gestureEstimatorRef = useRef<any>(null);
  const requestAnimationFrameRef = useRef<number | null>(null);
  const noHandsTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const { toast } = useToast();

  // Load TensorFlow.js and Handpose model
  useEffect(() => {
    if (!isActive) return;

    const loadModels = async () => {
      try {
        setLoadingStatus("Loading TensorFlow.js...");

        // Dynamically import TensorFlow.js to avoid SSR issues
        const tf = await import("@tensorflow/tfjs");
        // Explicitly set the backend to webgl for better performance
        await tf.setBackend("webgl");
        await tf.ready();

        setLoadingStatus("Loading Handpose model...");

        // Dynamically import handpose to avoid SSR issues
        const handpose = await import("@tensorflow-models/handpose");

        // Load the handpose model
        const handposeModel = await handpose.load({
          detectionConfidence: 0.5, // Lower threshold for better compatibility
          maxContinuousChecks: 5,
          iouThreshold: 0.3,
          scoreThreshold: 0.5,
        });

        setLoadingStatus("Loading gesture datasets...");

        try {
          // Direct implementation of basic gesture recognition without relying on external libraries
          const createSimpleGestureRecognizer = () => {
            // Define finger indices for easier reference
            const THUMB_TIP = 4;
            const INDEX_TIP = 8;
            const MIDDLE_TIP = 12;
            const RING_TIP = 16;
            const PINKY_TIP = 20;

            const THUMB_IP = 3;
            const INDEX_PIP = 6;
            const MIDDLE_PIP = 10;
            const RING_PIP = 14;
            const PINKY_PIP = 18;

            const WRIST = 0;

            // Helper function to calculate distance between two points
            const distance = (
              a: [number, number, number],
              b: [number, number, number]
            ) => {
              return Math.sqrt(
                Math.pow(a[0] - b[0], 2) +
                  Math.pow(a[1] - b[1], 2) +
                  Math.pow(a[2] - b[2], 2)
              );
            };

            // Helper function to check if a finger is extended
            const isFingerExtended = (
              landmarks: [number, number, number][],
              tipIdx: number,
              midIdx: number,
              baseIdx = WRIST
            ) => {
              const tip = landmarks[tipIdx];
              const mid = landmarks[midIdx];
              const base = landmarks[baseIdx];

              // Calculate distances
              const tipToBase = distance(tip, base);
              const midToBase = distance(mid, base);

              // A finger is extended if the tip is further from the base than the mid point
              return tipToBase > midToBase && tip[1] < mid[1];
            };

            // Recognize gestures based on finger positions
            return {
              estimate: (
                landmarks: [number, number, number][],
                minConfidence: number
              ) => {
                const gestures = [];

                // Check for thumbs up
                if (
                  landmarks[THUMB_TIP][1] < landmarks[THUMB_IP][1] && // Thumb pointing up
                  !isFingerExtended(landmarks, INDEX_TIP, INDEX_PIP) &&
                  !isFingerExtended(landmarks, MIDDLE_TIP, MIDDLE_PIP) &&
                  !isFingerExtended(landmarks, RING_TIP, RING_PIP) &&
                  !isFingerExtended(landmarks, PINKY_TIP, PINKY_PIP)
                ) {
                  gestures.push({ name: "thumbs up", score: 0.9 });
                }

                // Check for pointing (index finger extended)
                if (
                  isFingerExtended(landmarks, INDEX_TIP, INDEX_PIP) &&
                  !isFingerExtended(landmarks, MIDDLE_TIP, MIDDLE_PIP) &&
                  !isFingerExtended(landmarks, RING_TIP, RING_PIP) &&
                  !isFingerExtended(landmarks, PINKY_TIP, PINKY_PIP)
                ) {
                  gestures.push({ name: "pointing", score: 0.9 });
                }

                // Check for peace sign (index and middle extended)
                if (
                  isFingerExtended(landmarks, INDEX_TIP, INDEX_PIP) &&
                  isFingerExtended(landmarks, MIDDLE_TIP, MIDDLE_PIP) &&
                  !isFingerExtended(landmarks, RING_TIP, RING_PIP) &&
                  !isFingerExtended(landmarks, PINKY_TIP, PINKY_PIP)
                ) {
                  gestures.push({ name: "peace", score: 0.9 });
                }

                // Check for open hand (all fingers extended)
                if (
                  landmarks[THUMB_TIP][1] < landmarks[THUMB_IP][1] && // Thumb pointing up
                  isFingerExtended(landmarks, INDEX_TIP, INDEX_PIP) &&
                  isFingerExtended(landmarks, MIDDLE_TIP, MIDDLE_PIP) &&
                  isFingerExtended(landmarks, RING_TIP, RING_PIP) &&
                  isFingerExtended(landmarks, PINKY_TIP, PINKY_PIP)
                ) {
                  gestures.push({ name: "open hand", score: 0.9 });
                }

                // Check for fist (all fingers curled)
                if (
                  landmarks[THUMB_TIP][1] > landmarks[THUMB_IP][1] && // Thumb curled
                  !isFingerExtended(landmarks, INDEX_TIP, INDEX_PIP) &&
                  !isFingerExtended(landmarks, MIDDLE_TIP, MIDDLE_PIP) &&
                  !isFingerExtended(landmarks, RING_TIP, RING_PIP) &&
                  !isFingerExtended(landmarks, PINKY_TIP, PINKY_PIP)
                ) {
                  gestures.push({ name: "fist", score: 0.9 });
                }

                // Check for "I love you" sign (thumb, index, and pinky extended)
                if (
                  landmarks[THUMB_TIP][1] < landmarks[THUMB_IP][1] && // Thumb pointing up
                  isFingerExtended(landmarks, INDEX_TIP, INDEX_PIP) &&
                  !isFingerExtended(landmarks, MIDDLE_TIP, MIDDLE_PIP) &&
                  !isFingerExtended(landmarks, RING_TIP, RING_PIP) &&
                  isFingerExtended(landmarks, PINKY_TIP, PINKY_PIP)
                ) {
                  gestures.push({ name: "I love you", score: 0.9 });
                }

                // Check for "thank you" (flat hand with fingers together)
                const fingerSpread = distance(
                  landmarks[INDEX_TIP],
                  landmarks[PINKY_TIP]
                );
                if (
                  isFingerExtended(landmarks, INDEX_TIP, INDEX_PIP) &&
                  isFingerExtended(landmarks, MIDDLE_TIP, MIDDLE_PIP) &&
                  isFingerExtended(landmarks, RING_TIP, RING_PIP) &&
                  isFingerExtended(landmarks, PINKY_TIP, PINKY_PIP) &&
                  fingerSpread < 100 // Fingers close together
                ) {
                  gestures.push({ name: "thank you", score: 0.9 });
                }

                // Return the recognized gestures
                return { gestures };
              },
            };
          };

          // Create the gesture recognizer
          const gestureRecognizer = createSimpleGestureRecognizer();

          // Store references
          handposeModelRef.current = handposeModel;
          gestureEstimatorRef.current = gestureRecognizer;
          setIsModelLoaded(true);
          setLoadingStatus("");
        } catch (fpError) {
          console.error("Error initializing Fingerpose:", fpError);

          // Fall back to an even simpler classifier
          setLoadingStatus("Using basic gesture recognition...");

          // Create a very simple classifier function
          const simpleClassifier = {
            estimate: (
              landmarks: [number, number, number][],
              minConfidence: number
            ) => {
              const gestures = [];

              // Check for thumbs up (very basic)
              if (landmarks[4][1] < landmarks[3][1]) {
                // If thumb tip is higher than thumb IP
                gestures.push({ name: "thumbs up", score: 0.9 });
              }

              // Check for pointing (very basic)
              if (landmarks[8][1] < landmarks[5][1]) {
                // If index tip is higher than index MCP
                gestures.push({ name: "pointing", score: 0.9 });
              }

              return { gestures };
            },
          };

          handposeModelRef.current = handposeModel;
          gestureEstimatorRef.current = simpleClassifier;
          setIsModelLoaded(true);
          setLoadingStatus("");
        }
      } catch (err) {
        console.error("Error loading models:", err);
        // Provide more detailed error information
        let errorMessage = "Unknown error occurred while loading models";

        if (err instanceof Error) {
          errorMessage = `${err.name}: ${err.message}`;

          // Add specific guidance for common errors
          if (err.message.includes("GestureDescription is not a constructor")) {
            errorMessage =
              "Browser compatibility issue with gesture recognition. Try using Chrome or Edge.";
          } else if (
            err.message.includes("Cannot read properties of undefined")
          ) {
            errorMessage =
              "Error initializing hand tracking. Please check your webcam and try again.";
          } else if (err.message.includes("require is not defined")) {
            errorMessage =
              "Module loading error. Please try refreshing the page.";
          } else if (err.message.includes("WebGL")) {
            errorMessage =
              "WebGL not supported. Please try a different browser with WebGL support.";
          }
        }

        setError(
          `Failed to load hand tracking models: ${errorMessage}. Please try refreshing the page.`
        );
      }
    };

    loadModels();

    return () => {
      // Clean up TensorFlow memory when component unmounts
      if (typeof window !== "undefined") {
        // Use dynamic import instead of require
        import("@tensorflow/tfjs")
          .then((tf) => {
            if (tf.getBackend && tf.disposeVariables) {
              try {
                tf.disposeVariables();
              } catch (e) {
                console.error("Error disposing TensorFlow variables:", e);
              }
            }
          })
          .catch((e) => {
            console.error("Error importing TensorFlow for cleanup:", e);
          });
      }

      // Clear any pending timeouts
      if (noHandsTimeoutRef.current) {
        clearTimeout(noHandsTimeoutRef.current);
      }
    };
  }, [isActive]);

  // Handle showing toast when no hands are detected
  useEffect(() => {
    if (showNoHandsToast) {
      toast({
        title: "No hand gestures detected",
        description: "Please position your hand clearly in view of the camera",
        duration: 3000,
      });
      setShowNoHandsToast(false);
    }
  }, [showNoHandsToast, toast]);

  // Run hand detection when model is loaded
  useEffect(() => {
    if (
      !isActive ||
      !isModelLoaded ||
      !videoRef.current ||
      !canvasRef.current ||
      !handposeModelRef.current ||
      !gestureEstimatorRef.current
    )
      return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const handposeModel = handposeModelRef.current;
    const gestureEstimator = gestureEstimatorRef.current;

    if (!ctx) return;

    // Ensure canvas dimensions match video
    const resizeCanvas = () => {
      if (canvas && video) {
        canvas.width = video.videoWidth || 640;
        canvas.height = video.videoHeight || 480;
      }
    };

    video.addEventListener("loadedmetadata", resizeCanvas);
    resizeCanvas();

    // Start no hands timeout
    const startNoHandsTimeout = () => {
      // Clear any existing timeout
      if (noHandsTimeoutRef.current) {
        clearTimeout(noHandsTimeoutRef.current);
      }

      // Set new timeout - if no hands are detected for 5 seconds, show toast
      noHandsTimeoutRef.current = setTimeout(() => {
        setShowNoHandsToast(true);
      }, 5000);
    };

    // Start the initial timeout
    startNoHandsTimeout();

    // Import draw-hand utility
    import("@/lib/draw-hand")
      .then(({ drawHand }) => {
        // Detect hands and predict gestures
        const detectHands = async () => {
          if (!video || !canvas || !ctx || !handposeModel || !gestureEstimator)
            return;

          try {
            // Check if video is ready
            if (video.readyState !== 4) {
              requestAnimationFrameRef.current =
                requestAnimationFrame(detectHands);
              return;
            }

            // Detect hand landmarks
            const predictions = await handposeModel.estimateHands(video);

            // Clear canvas
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Draw video frame
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

            // Process predictions
            if (predictions.length > 0) {
              // Reset no hands timeout since we detected a hand
              startNoHandsTimeout();

              // Draw hand landmarks
              drawHand(ctx, predictions[0].landmarks);

              try {
                // Estimate gestures using the estimator
                const estimatedGestures = gestureEstimator.estimate(
                  predictions[0].landmarks,
                  7.5 // Minimum confidence
                );

                // Classify gesture
                const currentTime = Date.now();
                if (
                  currentTime - lastGestureTimeRef.current > 1000 &&
                  estimatedGestures.gestures &&
                  estimatedGestures.gestures.length > 0
                ) {
                  // Find gesture with highest confidence
                  const gestureResult = estimatedGestures.gestures.reduce(
                    (
                      p: { name: string; score: number },
                      c: { name: string; score: number }
                    ) => {
                      return p.score > c.score ? p : c;
                    }
                  );

                  if (gestureResult && gestureResult.name) {
                    const gesture = gestureResult.name;

                    // Add to buffer and check if we have a consistent gesture
                    gestureBufferRef.current.push(gesture);
                    if (gestureBufferRef.current.length > 3) {
                      gestureBufferRef.current.shift();
                    }

                    // If we have 2 of the same gesture in a row, recognize it
                    const allSame = gestureBufferRef.current.every(
                      (g) => g === gesture
                    );
                    if (allSame && gestureBufferRef.current.length >= 2) {
                      // Map gesture names to more user-friendly text
                      let displayText = gesture;

                      if (gestureMap[gesture as keyof typeof gestureMap]) {
                        displayText =
                          gestureMap[gesture as keyof typeof gestureMap];
                      }

                      onGestureRecognized(displayText);
                      lastGestureTimeRef.current = currentTime;
                      gestureBufferRef.current = [];
                    }
                  }
                }
              } catch (gestureError) {
                console.error("Error in gesture recognition:", gestureError);
                // Continue with hand tracking even if gesture recognition fails
              }
            }

            // Continue detection loop
            requestAnimationFrameRef.current =
              requestAnimationFrame(detectHands);
          } catch (err) {
            console.error("Error in hand detection:", err);
            setError("Error detecting hands. Please try refreshing the page.");
          }
        };

        // Start detection loop
        detectHands();
      })
      .catch((err) => {
        console.error("Error importing draw-hand utility:", err);
        setError(
          "Failed to load hand tracking utilities. Please try refreshing the page."
        );
      });

    // Cleanup function
    return () => {
      video.removeEventListener("loadedmetadata", resizeCanvas);
      if (requestAnimationFrameRef.current) {
        cancelAnimationFrame(requestAnimationFrameRef.current);
      }
      if (noHandsTimeoutRef.current) {
        clearTimeout(noHandsTimeoutRef.current);
      }
    };
  }, [isActive, isModelLoaded, videoRef, onGestureRecognized]);

  return (
    <>
      <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full" />
      {!isModelLoaded && isActive && (
        <div className="absolute inset-0 flex items-center justify-center text-white bg-black/50">
          <div className="text-center">
            <div className="mb-2">{loadingStatus}</div>
            <div className="w-16 h-16 mx-auto border-4 rounded-full border-t-primary border-r-transparent border-b-transparent border-l-transparent animate-spin"></div>
          </div>
        </div>
      )}
      {error && (
        <div className="absolute bottom-0 left-0 right-0 p-2 text-center text-white bg-red-500">
          {error}
        </div>
      )}
    </>
  );
}
