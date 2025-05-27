import { useState, useEffect } from "react";

const catFrames = {
  eyes: ["o.o", "-.-", "O_O", "^.^"],
  ears: ["/\\_/\\", "/\\^_/\\", "/\\v_/\\"],
  tail: ["~", "-", "≈"],
  pawWave: [">", " "],
};

export function AsciiCat() {
  const [eyeIndex, setEyeIndex] = useState(0);
  const [earIndex, setEarIndex] = useState(0);
  const [tailIndex, setTailIndex] = useState(0);
  const [pawWave, setPawWave] = useState(false);
  const [isBlinking, setIsBlinking] = useState(false);

  useEffect(() => {
    if (isBlinking) return;
    const eyeInterval = setInterval(() => {
      setEyeIndex((prev) => (prev + 1) % catFrames.eyes.length);
    }, 700);
    return () => clearInterval(eyeInterval);
  }, [isBlinking]);

  useEffect(() => {
    const earInterval = setInterval(() => {
      setEarIndex((prev) => (prev + 1) % catFrames.ears.length);
    }, 900);
    return () => clearInterval(earInterval);
  }, []);

  useEffect(() => {
    const tailInterval = setInterval(() => {
      setTailIndex((prev) => (prev + 1) % catFrames.tail.length);
    }, 500);
    return () => clearInterval(tailInterval);
  }, []);

  const handleClick = () => {
    if (isBlinking) return;
    setIsBlinking(true);
    setEyeIndex(1);
    setPawWave(true);
    setTimeout(() => {
      setIsBlinking(false);
      setPawWave(false);
      setEyeIndex(0);
    }, 1200);
  };

  const cat = `
${catFrames.ears[earIndex]}
( ${catFrames.eyes[eyeIndex]} )
 ${pawWave ? catFrames.pawWave[0] : catFrames.pawWave[1]} ^ ^
   ${catFrames.tail[tailIndex]}
`;

  return (
    <pre
      onClick={handleClick}
      style={{
        fontFamily: "monospace",
        fontSize: "0.65em",
        lineHeight: "1",
        margin: 0,
        padding: 0,
        background: "none",
        border: "none",
        userSelect: "none",
        display: "flex",
        alignItems: "center",
        cursor: "pointer",
      }}
      aria-label="Котик"
    >
      {cat}
    </pre>
  );
}
