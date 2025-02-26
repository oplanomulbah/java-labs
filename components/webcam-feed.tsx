"use client";

import type React from "react";

import { useEffect, useState } from "react";

interface WebcamFeedProps {
  videoRef: React.RefObject<HTMLVideoElement>;
}

export default function WebcamFeed({ videoRef }: WebcamFeedProps) {
  const [webcamError, setWebcamError] = useState(false);

  useEffect(() => {
    // this startWebcam function to handle errors
    const startWebcam = async () => {
      try {
        // Check if mediaDevices is supported
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
          throw new Error("Browser doesn't support webcam access");
        }

        const stream = await navigator.mediaDevices.getUserMedia({
          video: {
            width: { ideal: 640 }, // Lower resolution for better performance
            height: { ideal: 480 },
            facingMode: "user",
            frameRate: { ideal: 30 }, // Specify frame rate for better performance
          },
        });

        if (videoRef.current) {
          videoRef.current.srcObject = stream;

          // Add event listener to handle successful video loading
          videoRef.current.onloadedmetadata = () => {
            if (videoRef.current) {
              videoRef.current.play().catch((e) => {
                console.error("Error playing video:", e);
                setWebcamError(true);
              });
            }
          };
        }
      } catch (error) {
        console.error("Error accessing webcam:", error);
        setWebcamError(true);

        // Provide more specific error messages based on the error type
        if (error instanceof DOMException) {
          if (
            error.name === "NotAllowedError" ||
            error.name === "PermissionDeniedError"
          ) {
            alert(
              "Webcam access was denied. Please allow camera access to use this application."
            );
          } else if (
            error.name === "NotFoundError" ||
            error.name === "DevicesNotFoundError"
          ) {
            alert("No webcam detected. Please connect a webcam and try again.");
          } else if (
            error.name === "NotReadableError" ||
            error.name === "TrackStartError"
          ) {
            alert(
              "Your webcam is already in use by another application. Please close other applications using your webcam."
            );
          } else {
            alert(`Webcam error: ${error.message || "Unknown error occurred"}`);
          }
        } else {
          alert(
            `Webcam error: ${
              error instanceof Error ? error.message : "Unknown error occurred"
            }`
          );
        }
      }
    };

    startWebcam();

    return () => {
      // Clean up the video stream when component unmounts
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        const tracks = stream.getTracks();
        tracks.forEach((track) => track.stop());
      }
    };
  }, [videoRef]);

  return (
    <>
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className="object-cover w-full h-full"
      />
      {webcamError && (
        <div className="absolute inset-0 flex items-center justify-center text-white bg-black/50">
          <div className="max-w-md p-4 text-center rounded-lg bg-black/80">
            <p className="mb-2">Unable to access webcam</p>
            <p className="text-sm text-muted-foreground">
              Please ensure your browser has permission to use the camera and
              try again.
            </p>
          </div>
        </div>
      )}
    </>
  );
}
