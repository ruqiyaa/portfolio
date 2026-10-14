import { useState, useEffect } from "react";

const toRotate = ["Web Developer", "Web Designer", "Frontend Developer"];
const period = 2000;

export const TypingText = () => {
  const [loopNum, setLoopNum] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [text, setText] = useState("");
  const [delta, setDelta] = useState(150);

  useEffect(() => {
    const tick = () => {
      const fullText = toRotate[loopNum % toRotate.length];
      const updatedText = isDeleting
        ? fullText.substring(0, text.length - 1)
        : fullText.substring(0, text.length + 1);

      setText(updatedText);

      if (isDeleting) setDelta(40);

      if (!isDeleting && updatedText === fullText) {
        setIsDeleting(true);
        setDelta(period);
      } else if (isDeleting && updatedText === "") {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
        setDelta(80);
      }
    };

    const ticker = setTimeout(tick, delta);
    return () => clearTimeout(ticker);
  }, [text, delta, isDeleting, loopNum]);

  // a non-breaking space keeps the line height when the text is empty
  return <span className="wrap">{text || "\u00A0"}</span>;
};