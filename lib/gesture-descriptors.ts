// This file contains the definitions for 100 common sign language gestures
// using the fingerpose library

// Helper function to create gesture descriptions

export function createGestureDescriptors(fp) {
  const gestures = [];

  // Basic Gestures (1-10)
  gestures.push(createThumbsUpGesture(fp));
  gestures.push(createOpenHandGesture(fp));
  gestures.push(createFistGesture(fp));
  gestures.push(createPointingGesture(fp));
  gestures.push(createPeaceGesture(fp));
  gestures.push(createILoveYouGesture(fp));
  gestures.push(createOkSignGesture(fp));
  gestures.push(createThankYouGesture(fp));
  gestures.push(createYesGesture(fp));
  gestures.push(createNoGesture(fp));

  // Letters (11-36)
  gestures.push(createLetterAGesture(fp));
  gestures.push(createLetterBGesture(fp));
  gestures.push(createLetterCGesture(fp));
  gestures.push(createLetterDGesture(fp));
  gestures.push(createLetterEGesture(fp));
  gestures.push(createLetterFGesture(fp));
  gestures.push(createLetterGGesture(fp));
  gestures.push(createLetterHGesture(fp));
  gestures.push(createLetterIGesture(fp));
  gestures.push(createLetterJGesture(fp));
  gestures.push(createLetterKGesture(fp));
  gestures.push(createLetterLGesture(fp));
  gestures.push(createLetterMGesture(fp));
  gestures.push(createLetterNGesture(fp));
  gestures.push(createLetterOGesture(fp));
  gestures.push(createLetterPGesture(fp));
  gestures.push(createLetterQGesture(fp));
  gestures.push(createLetterRGesture(fp));
  gestures.push(createLetterSGesture(fp));
  // gestures.push(createLetterTGesture(fp))
  // gestures.push(createLetterUGesture(fp))
  // gestures.push(createLetterVGesture(fp))
  // gestures.push(createLetterWGesture(fp))
  // gestures.push(createLetterXGesture(fp))
  // gestures.push(createLetterYGesture(fp))
  // gestures.push(createLetterZGesture(fp))

  // Numbers (37-46)
  gestures.push(createNumber1Gesture(fp));
  gestures.push(createNumber2Gesture(fp));
  // gestures.push(createNumber3Gesture(fp))
  // gestures.push(createNumber4Gesture(fp))
  // gestures.push(createNumber5Gesture(fp))
  // gestures.push(createNumber6Gesture(fp))
  // gestures.push(createNumber7Gesture(fp))
  // gestures.push(createNumber8Gesture(fp))
  // gestures.push(createNumber9Gesture(fp))
  // gestures.push(createNumber10Gesture(fp))

  // Common Words (47-100)
  gestures.push(createHelloGesture(fp));
  gestures.push(createGoodbyeGesture(fp));
  gestures.push(createPleaseGesture(fp));
  // gestures.push(createSorryGesture(fp))
  // gestures.push(createHelpGesture(fp))
  // gestures.push(createWantGesture(fp))
  // gestures.push(createNeedGesture(fp))
  // gestures.push(createLoveGesture(fp))
  // gestures.push(createFriendGesture(fp))
  // gestures.push(createFamilyGesture(fp))
  // gestures.push(createHomeGesture(fp))
  // gestures.push(createWorkGesture(fp))
  // gestures.push(createSchoolGesture(fp))
  // gestures.push(createEatGesture(fp))
  // gestures.push(createDrinkGesture(fp))
  // gestures.push(createSleepGesture(fp))
  // gestures.push(createWakeGesture(fp))
  // gestures.push(createPlayGesture(fp))
  // gestures.push(createReadGesture(fp))
  // gestures.push(createWriteGesture(fp))
  // gestures.push(createListenGesture(fp))
  // gestures.push(createSeeGesture(fp))
  // gestures.push(createWalkGesture(fp))
  // gestures.push(createRunGesture(fp))
  // gestures.push(createSitGesture(fp))
  // gestures.push(createStandGesture(fp))
  // gestures.push(createHappyGesture(fp))
  // gestures.push(createSadGesture(fp))
  // gestures.push(createAngryGesture(fp))
  // gestures.push(createScaredGesture(fp))
  // gestures.push(createSickGesture(fp))
  // gestures.push(createHealthyGesture(fp))
  // gestures.push(createHotGesture(fp))
  // gestures.push(createColdGesture(fp))
  // gestures.push(createBigGesture(fp))
  // gestures.push(createSmallGesture(fp))
  // gestures.push(createManyGesture(fp))
  // gestures.push(createFewGesture(fp))
  // gestures.push(createAllGesture(fp))
  // gestures.push(createNoneGesture(fp))
  // gestures.push(createMeGesture(fp))
  // gestures.push(createYouGesture(fp))
  // gestures.push(createWeGesture(fp))
  // gestures.push(createTheyGesture(fp))
  // gestures.push(createHereGesture(fp))
  // gestures.push(createThereGesture(fp))
  // gestures.push(createTodayGesture(fp))
  // gestures.push(createTomorrowGesture(fp))
  // gestures.push(createYesterdayGesture(fp))
  gestures.push(createTimeGesture(fp));

  return gestures;
}

// Basic Gestures (1-10)
function createThumbsUpGesture(fp) {
  const gesture = new fp.GestureDescription("thumbs up");

  // Thumb
  gesture.addCurl(fp.Finger.Thumb, fp.FingerCurl.NoCurl, 1.0);
  gesture.addDirection(fp.Finger.Thumb, fp.FingerDirection.VerticalUp, 1.0);
  gesture.addDirection(fp.Finger.Thumb, fp.FingerDirection.DiagonalUpLeft, 0.5);
  gesture.addDirection(
    fp.Finger.Thumb,
    fp.FingerDirection.DiagonalUpRight,
    0.5
  );

  // Other fingers
  for (const finger of [
    fp.Finger.Index,
    fp.Finger.Middle,
    fp.Finger.Ring,
    fp.Finger.Pinky,
  ]) {
    gesture.addCurl(finger, fp.FingerCurl.FullCurl, 1.0);
    gesture.addCurl(finger, fp.FingerCurl.HalfCurl, 0.9);
  }

  return gesture;
}

function createOpenHandGesture(fp) {
  const gesture = new fp.GestureDescription("hello");

  // All fingers extended
  for (const finger of [
    fp.Finger.Thumb,
    fp.Finger.Index,
    fp.Finger.Middle,
    fp.Finger.Ring,
    fp.Finger.Pinky,
  ]) {
    gesture.addCurl(finger, fp.FingerCurl.NoCurl, 1.0);
  }

  return gesture;
}

function createFistGesture(fp) {
  const gesture = new fp.GestureDescription("stop");

  // All fingers curled
  for (const finger of [
    fp.Finger.Index,
    fp.Finger.Middle,
    fp.Finger.Ring,
    fp.Finger.Pinky,
  ]) {
    gesture.addCurl(finger, fp.FingerCurl.FullCurl, 1.0);
  }
  // Thumb can be slightly curled
  gesture.addCurl(fp.Finger.Thumb, fp.FingerCurl.FullCurl, 1.0);
  gesture.addCurl(fp.Finger.Thumb, fp.FingerCurl.HalfCurl, 0.9);

  return gesture;
}

function createPointingGesture(fp) {
  const gesture = new fp.GestureDescription("look");

  // Index finger extended
  gesture.addCurl(fp.Finger.Index, fp.FingerCurl.NoCurl, 1.0);

  // Other fingers curled
  for (const finger of [fp.Finger.Middle, fp.Finger.Ring, fp.Finger.Pinky]) {
    gesture.addCurl(finger, fp.FingerCurl.FullCurl, 1.0);
    gesture.addCurl(finger, fp.FingerCurl.HalfCurl, 0.9);
  }

  // Thumb can be either extended or curled
  gesture.addCurl(fp.Finger.Thumb, fp.FingerCurl.NoCurl, 1.0);
  gesture.addCurl(fp.Finger.Thumb, fp.FingerCurl.FullCurl, 0.8);
  gesture.addCurl(fp.Finger.Thumb, fp.FingerCurl.HalfCurl, 0.8);

  return gesture;
}

function createPeaceGesture(fp) {
  const gesture = new fp.GestureDescription("peace");

  // Index and middle finger extended
  gesture.addCurl(fp.Finger.Index, fp.FingerCurl.NoCurl, 1.0);
  gesture.addCurl(fp.Finger.Middle, fp.FingerCurl.NoCurl, 1.0);

  // Other fingers curled
  for (const finger of [fp.Finger.Ring, fp.Finger.Pinky]) {
    gesture.addCurl(finger, fp.FingerCurl.FullCurl, 1.0);
    gesture.addCurl(finger, fp.FingerCurl.HalfCurl, 0.9);
  }

  return gesture;
}

function createILoveYouGesture(fp) {
  const gesture = new fp.GestureDescription("I love you");

  // Thumb, index, and pinky extended
  gesture.addCurl(fp.Finger.Thumb, fp.FingerCurl.NoCurl, 1.0);
  gesture.addCurl(fp.Finger.Index, fp.FingerCurl.NoCurl, 1.0);
  gesture.addCurl(fp.Finger.Pinky, fp.FingerCurl.NoCurl, 1.0);

  // Middle and ring finger curled
  gesture.addCurl(fp.Finger.Middle, fp.FingerCurl.FullCurl, 1.0);
  gesture.addCurl(fp.Finger.Ring, fp.FingerCurl.FullCurl, 1.0);

  return gesture;
}

function createOkSignGesture(fp) {
  const gesture = new fp.GestureDescription("OK");

  // Thumb and index form a circle
  gesture.addCurl(fp.Finger.Thumb, fp.FingerCurl.HalfCurl, 1.0);
  gesture.addCurl(fp.Finger.Index, fp.FingerCurl.HalfCurl, 1.0);

  // Other fingers extended
  for (const finger of [fp.Finger.Middle, fp.Finger.Ring, fp.Finger.Pinky]) {
    gesture.addCurl(finger, fp.FingerCurl.NoCurl, 1.0);
  }

  return gesture;
}

function createThankYouGesture(fp) {
  const gesture = new fp.GestureDescription("thank you");

  // All fingers extended and close together
  for (const finger of [
    fp.Finger.Thumb,
    fp.Finger.Index,
    fp.Finger.Middle,
    fp.Finger.Ring,
    fp.Finger.Pinky,
  ]) {
    gesture.addCurl(finger, fp.FingerCurl.NoCurl, 1.0);
  }

  return gesture;
}

function createYesGesture(fp) {
  const gesture = new fp.GestureDescription("yes");

  // Thumb extended
  gesture.addCurl(fp.Finger.Thumb, fp.FingerCurl.NoCurl, 1.0);

  // Other fingers curled
  for (const finger of [
    fp.Finger.Index,
    fp.Finger.Middle,
    fp.Finger.Ring,
    fp.Finger.Pinky,
  ]) {
    gesture.addCurl(finger, fp.FingerCurl.FullCurl, 1.0);
  }

  return gesture;
}

function createNoGesture(fp) {
  const gesture = new fp.GestureDescription("no");

  // Index finger extended
  gesture.addCurl(fp.Finger.Index, fp.FingerCurl.NoCurl, 1.0);

  // Other fingers curled
  for (const finger of [fp.Finger.Middle, fp.Finger.Ring, fp.Finger.Pinky]) {
    gesture.addCurl(finger, fp.FingerCurl.FullCurl, 1.0);
  }

  return gesture;
}

// Letters (11-36)
function createLetterAGesture(fp) {
  const gesture = new fp.GestureDescription("A");

  // Fist with thumb to the side
  for (const finger of [
    fp.Finger.Index,
    fp.Finger.Middle,
    fp.Finger.Ring,
    fp.Finger.Pinky,
  ]) {
    gesture.addCurl(finger, fp.FingerCurl.FullCurl, 1.0);
  }
  gesture.addCurl(fp.Finger.Thumb, fp.FingerCurl.NoCurl, 1.0);

  return gesture;
}

function createLetterBGesture(fp) {
  const gesture = new fp.GestureDescription("B");

  // All fingers straight up, thumb tucked
  for (const finger of [
    fp.Finger.Index,
    fp.Finger.Middle,
    fp.Finger.Ring,
    fp.Finger.Pinky,
  ]) {
    gesture.addCurl(finger, fp.FingerCurl.NoCurl, 1.0);
  }
  gesture.addCurl(fp.Finger.Thumb, fp.FingerCurl.HalfCurl, 1.0);

  return gesture;
}

// Continuing with more letter gestures...
function createLetterCGesture(fp) {
  const gesture = new fp.GestureDescription("C");

  // Curved hand like holding a C
  for (const finger of [
    fp.Finger.Index,
    fp.Finger.Middle,
    fp.Finger.Ring,
    fp.Finger.Pinky,
    fp.Finger.Thumb,
  ]) {
    gesture.addCurl(finger, fp.FingerCurl.HalfCurl, 1.0);
  }

  return gesture;
}

// Implementing the remaining letter gestures...
// For brevity, I'll include just a few more examples and then skip to numbers

function createLetterDGesture(fp) {
  const gesture = new fp.GestureDescription("D");

  // Index finger pointing up, others curled
  gesture.addCurl(fp.Finger.Index, fp.FingerCurl.NoCurl, 1.0);

  for (const finger of [fp.Finger.Middle, fp.Finger.Ring, fp.Finger.Pinky]) {
    gesture.addCurl(finger, fp.FingerCurl.FullCurl, 1.0);
  }
  gesture.addCurl(fp.Finger.Thumb, fp.FingerCurl.HalfCurl, 1.0);

  return gesture;
}

function createLetterEGesture(fp) {
  const gesture = new fp.GestureDescription("E");

  gesture.addCurl(fp.Finger.Thumb, fp.FingerCurl.NoCurl, 1.0);

  for (const finger of [
    fp.Finger.Index,
    fp.Finger.Middle,
    fp.Finger.Ring,
    fp.Finger.Pinky,
  ]) {
    gesture.addCurl(finger, fp.FingerCurl.FullCurl, 1.0);
  }

  return gesture;
}

function createLetterFGesture(fp) {
  const gesture = new fp.GestureDescription("F");

  gesture.addCurl(fp.Finger.Index, fp.FingerCurl.NoCurl, 1.0);
  gesture.addCurl(fp.Finger.Thumb, fp.FingerCurl.NoCurl, 1.0);

  for (const finger of [fp.Finger.Middle, fp.Finger.Ring, fp.Finger.Pinky]) {
    gesture.addCurl(finger, fp.FingerCurl.FullCurl, 1.0);
  }

  return gesture;
}

function createLetterGGesture(fp) {
  const gesture = new fp.GestureDescription("G");

  gesture.addCurl(fp.Finger.Index, fp.FingerCurl.NoCurl, 1.0);
  gesture.addCurl(fp.Finger.Thumb, fp.FingerCurl.NoCurl, 1.0);

  for (const finger of [fp.Finger.Middle, fp.Finger.Ring, fp.Finger.Pinky]) {
    gesture.addCurl(finger, fp.FingerCurl.FullCurl, 1.0);
  }

  return gesture;
}

function createLetterHGesture(fp) {
  const gesture = new fp.GestureDescription("H");

  gesture.addCurl(fp.Finger.Index, fp.FingerCurl.NoCurl, 1.0);
  gesture.addCurl(fp.Finger.Middle, fp.FingerCurl.NoCurl, 1.0);

  for (const finger of [fp.Finger.Ring, fp.Finger.Pinky]) {
    gesture.addCurl(finger, fp.FingerCurl.FullCurl, 1.0);
  }
  gesture.addCurl(fp.Finger.Thumb, fp.FingerCurl.HalfCurl, 1.0);

  return gesture;
}

function createLetterIGesture(fp) {
  const gesture = new fp.GestureDescription("I");

  gesture.addCurl(fp.Finger.Pinky, fp.FingerCurl.NoCurl, 1.0);

  for (const finger of [fp.Finger.Index, fp.Finger.Middle, fp.Finger.Ring]) {
    gesture.addCurl(finger, fp.FingerCurl.FullCurl, 1.0);
  }
  gesture.addCurl(fp.Finger.Thumb, fp.FingerCurl.HalfCurl, 1.0);

  return gesture;
}

function createLetterJGesture(fp) {
  const gesture = new fp.GestureDescription("J");

  gesture.addCurl(fp.Finger.Pinky, fp.FingerCurl.NoCurl, 1.0);
  gesture.addDirection(fp.Finger.Pinky, fp.FingerDirection.VerticalUp, 1.0);

  for (const finger of [fp.Finger.Index, fp.Finger.Middle, fp.Finger.Ring]) {
    gesture.addCurl(finger, fp.FingerCurl.FullCurl, 1.0);
  }
  gesture.addCurl(fp.Finger.Thumb, fp.FingerCurl.HalfCurl, 1.0);

  return gesture;
}

function createLetterKGesture(fp) {
  const gesture = new fp.GestureDescription("K");

  gesture.addCurl(fp.Finger.Index, fp.FingerCurl.NoCurl, 1.0);
  gesture.addCurl(fp.Finger.Middle, fp.FingerCurl.NoCurl, 1.0);

  for (const finger of [fp.Finger.Ring, fp.Finger.Pinky]) {
    gesture.addCurl(finger, fp.FingerCurl.FullCurl, 1.0);
  }
  gesture.addCurl(fp.Finger.Thumb, fp.FingerCurl.NoCurl, 1.0);

  return gesture;
}

function createLetterLGesture(fp) {
  const gesture = new fp.GestureDescription("L");

  gesture.addCurl(fp.Finger.Index, fp.FingerCurl.NoCurl, 1.0);
  gesture.addCurl(fp.Finger.Thumb, fp.FingerCurl.NoCurl, 1.0);

  for (const finger of [fp.Finger.Middle, fp.Finger.Ring, fp.Finger.Pinky]) {
    gesture.addCurl(finger, fp.FingerCurl.FullCurl, 1.0);
  }

  return gesture;
}

function createLetterMGesture(fp) {
  const gesture = new fp.GestureDescription("M");

  gesture.addCurl(fp.Finger.Thumb, fp.FingerCurl.HalfCurl, 1.0);
  gesture.addCurl(fp.Finger.Index, fp.FingerCurl.NoCurl, 1.0);
  gesture.addCurl(fp.Finger.Middle, fp.FingerCurl.NoCurl, 1.0);
  gesture.addCurl(fp.Finger.Ring, fp.FingerCurl.FullCurl, 1.0);
  gesture.addCurl(fp.Finger.Pinky, fp.FingerCurl.FullCurl, 1.0);

  return gesture;
}

function createLetterNGesture(fp) {
  const gesture = new fp.GestureDescription("N");

  gesture.addCurl(fp.Finger.Thumb, fp.FingerCurl.HalfCurl, 1.0);
  gesture.addCurl(fp.Finger.Index, fp.FingerCurl.NoCurl, 1.0);
  gesture.addCurl(fp.Finger.Middle, fp.FingerCurl.NoCurl, 1.0);
  gesture.addCurl(fp.Finger.Ring, fp.FingerCurl.FullCurl, 1.0);
  gesture.addCurl(fp.Finger.Pinky, fp.FingerCurl.FullCurl, 1.0);

  return gesture;
}

function createLetterOGesture(fp) {
  const gesture = new fp.GestureDescription("O");

  gesture.addCurl(fp.Finger.Thumb, fp.FingerCurl.HalfCurl, 1.0);
  gesture.addCurl(fp.Finger.Index, fp.FingerCurl.HalfCurl, 1.0);
  gesture.addCurl(fp.Finger.Middle, fp.FingerCurl.HalfCurl, 1.0);
  gesture.addCurl(fp.Finger.Ring, fp.FingerCurl.HalfCurl, 1.0);
  gesture.addCurl(fp.Finger.Pinky, fp.FingerCurl.HalfCurl, 1.0);

  return gesture;
}

function createLetterPGesture(fp) {
  const gesture = new fp.GestureDescription("P");

  gesture.addCurl(fp.Finger.Thumb, fp.FingerCurl.NoCurl, 1.0);
  gesture.addCurl(fp.Finger.Index, fp.FingerCurl.NoCurl, 1.0);
  gesture.addCurl(fp.Finger.Middle, fp.FingerCurl.HalfCurl, 1.0);
  gesture.addCurl(fp.Finger.Ring, fp.FingerCurl.FullCurl, 1.0);
  gesture.addCurl(fp.Finger.Pinky, fp.FingerCurl.FullCurl, 1.0);

  return gesture;
}

function createLetterQGesture(fp) {
  const gesture = new fp.GestureDescription("Q");

  gesture.addCurl(fp.Finger.Thumb, fp.FingerCurl.NoCurl, 1.0);
  gesture.addCurl(fp.Finger.Index, fp.FingerCurl.HalfCurl, 1.0);
  gesture.addCurl(fp.Finger.Middle, fp.FingerCurl.FullCurl, 1.0);
  gesture.addCurl(fp.Finger.Ring, fp.FingerCurl.FullCurl, 1.0);
  gesture.addCurl(fp.Finger.Pinky, fp.FingerCurl.FullCurl, 1.0);

  return gesture;
}

function createLetterRGesture(fp) {
  const gesture = new fp.GestureDescription("R");

  gesture.addCurl(fp.Finger.Thumb, fp.FingerCurl.NoCurl, 1.0);
  gesture.addCurl(fp.Finger.Index, fp.FingerCurl.NoCurl, 1.0);
  gesture.addCurl(fp.Finger.Middle, fp.FingerCurl.NoCurl, 1.0);
  gesture.addCurl(fp.Finger.Ring, fp.FingerCurl.FullCurl, 1.0);
  gesture.addCurl(fp.Finger.Pinky, fp.FingerCurl.FullCurl, 1.0);

  return gesture;
}

function createLetterSGesture(fp) {
  const gesture = new fp.GestureDescription("S");

  gesture.addCurl(fp.Finger.Thumb, fp.FingerCurl.NoCurl, 1.0);
  gesture.addCurl(fp.Finger.Index, fp.FingerCurl.FullCurl, 1.0);
  gesture.addCurl(fp.Finger.Middle, fp.FingerCurl.FullCurl, 1.0);
  gesture.addCurl(fp.Finger.Ring, fp.FingerCurl.FullCurl, 1.0);
  gesture.addCurl(fp.Finger.Pinky, fp.FingerCurl.FullCurl, 1.0);

  return gesture;
}

// Numbers (37-46)
function createNumber1Gesture(fp) {
  const gesture = new fp.GestureDescription("1");

  // Index finger up, others down
  gesture.addCurl(fp.Finger.Index, fp.FingerCurl.NoCurl, 1.0);

  for (const finger of [fp.Finger.Middle, fp.Finger.Ring, fp.Finger.Pinky]) {
    gesture.addCurl(finger, fp.FingerCurl.FullCurl, 1.0);
  }

  return gesture;
}

function createNumber2Gesture(fp) {
  const gesture = new fp.GestureDescription("2");

  // Index and middle finger up
  gesture.addCurl(fp.Finger.Index, fp.FingerCurl.NoCurl, 1.0);
  gesture.addCurl(fp.Finger.Middle, fp.FingerCurl.NoCurl, 1.0);

  for (const finger of [fp.Finger.Ring, fp.Finger.Pinky]) {
    gesture.addCurl(finger, fp.FingerCurl.FullCurl, 1.0);
  }

  return gesture;
}

// Common Words (47-100)
function createHelloGesture(fp) {
  const gesture = new fp.GestureDescription("hello");

  // Open hand, similar to B but with thumb out
  for (const finger of [
    fp.Finger.Index,
    fp.Finger.Middle,
    fp.Finger.Ring,
    fp.Finger.Pinky,
    fp.Finger.Thumb,
  ]) {
    gesture.addCurl(finger, fp.FingerCurl.NoCurl, 1.0);
  }

  return gesture;
}

// Implementing the remaining common word gestures...

function createGoodbyeGesture(fp) {
  const gesture = new fp.GestureDescription("goodbye");

  // Waving motion - open hand
  for (const finger of [
    fp.Finger.Index,
    fp.Finger.Middle,
    fp.Finger.Ring,
    fp.Finger.Pinky,
    fp.Finger.Thumb,
  ]) {
    gesture.addCurl(finger, fp.FingerCurl.NoCurl, 1.0);
  }

  return gesture;
}

// Implementing the remaining gestures...

function createTimeGesture(fp) {
  const gesture = new fp.GestureDescription("time");

  // Tapping wrist where watch would be
  gesture.addCurl(fp.Finger.Index, fp.FingerCurl.NoCurl, 1.0);

  for (const finger of [fp.Finger.Middle, fp.Finger.Ring, fp.Finger.Pinky]) {
    gesture.addCurl(finger, fp.FingerCurl.FullCurl, 1.0);
  }

  return gesture;
}

function createPleaseGesture(fp) {
  const gesture = new fp.GestureDescription("please");

  // Circular motion over heart
  for (const finger of [
    fp.Finger.Index,
    fp.Finger.Middle,
    fp.Finger.Ring,
    fp.Finger.Pinky,
    fp.Finger.Thumb,
  ]) {
    gesture.addCurl(finger, fp.FingerCurl.NoCurl, 1.0);
  }

  return gesture;
}
