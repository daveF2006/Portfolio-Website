import React, { useState, useEffect, useRef } from "react";
import "./Welcome.css";
import Header from "../Header/Header";
import Background from "../assets/Background";
import progetto from "./progetto.png";
import libro from "./libro.png";
import { useNavigate } from "react-router-dom";

const Welcome: React.FC = () => {
  const fullTitle = "Welcome to my Portfolio";
  const baseTitle = "Welcome";
  const part1 = ", I'm";
  const part2 = " Davide Ferri";
  const part3 = " - Software and Web Developer";

  const [typedTitle, setTypedTitle] = useState("");
  const [typed1, setTyped1] = useState("");
  const [typed2, setTyped2] = useState("");
  const [typed3, setTyped3] = useState("");
  const [phase, setPhase] = useState(0);
  const [, setShowCursor] = useState(true);
  const cursorIntervalRef = useRef<number | null>(null);
  const [showButtons, setShowButtons] = useState(false);

  const navigate = useNavigate();

  // Controlla se l'animazione è già stata vista
  const [alreadyAnimated] = useState(
    localStorage.getItem("welcomeAnimated") === "true"
  );

  useEffect(() => {
    if (alreadyAnimated) {
      // Mostra subito tutto
      setTypedTitle("");
      setTyped1(part1);
      setTyped2(part2);
      setTyped3(part3);
      setPhase(5);
      setShowButtons(true);
    } else {
      // Animazione normale
      cursorIntervalRef.current = window.setInterval(() => {
        setShowCursor((v) => !v);
      }, 600);
      return () => {
        if (cursorIntervalRef.current) clearInterval(cursorIntervalRef.current);
      };
    }
  }, [alreadyAnimated]);

  useEffect(() => {
    if (alreadyAnimated) return;
    let current = 0;
    let interval: number;

    function typeText(text: string, setter: (val: string) => void, onComplete: () => void, speed = 50) {
      current = 0;
      interval = window.setInterval(() => {
        setter(text.slice(0, current + 1));
        current++;
        if (current === text.length) {
          clearInterval(interval);
          if (phase === 0) {
            setTimeout(onComplete, 1000);
          } else {
            setTimeout(onComplete, 10);
          }
        }
      }, speed);
    }

    function deleteText(from: string, toLength: number, setter: (val: string) => void, onComplete: () => void, speed = 40) {
      current = from.length;
      interval = window.setInterval(() => {
        current--;
        setter(from.slice(0, current));
        if (current === toLength) {
          clearInterval(interval);
          setTimeout(onComplete, 200);
        }
      }, speed);
    }

    if (phase === 0) {
      typeText(fullTitle, setTypedTitle, () => setPhase(1));
    }
    if (phase === 1) {
      deleteText(fullTitle, baseTitle.length, setTypedTitle, () => setPhase(2));
    }
    if (phase === 2) {
      typeText(part1, setTyped1, () => setPhase(3));
    }
    if (phase === 3) {
      typeText(part2, setTyped2, () => setPhase(4));
    }
    if (phase === 4) {
      typeText(part3, setTyped3, () => setPhase(5));
    }
    if (phase === 5) {
      // Salva che l'animazione è stata vista
      localStorage.setItem("welcomeAnimated", "true");
      setShowButtons(true);
    }

    return () => clearInterval(interval);
  }, [phase, alreadyAnimated]);

  return (
    <div className="welcome-container">
      <Background />
      <Header />
      {(phase === 0 || phase === 1) && !alreadyAnimated && (
        <h1 className="title">
          {typedTitle}
          <span className="cursor_white">|</span>
        </h1>
      )}
      {(phase >= 2 || alreadyAnimated) && (
        <h1 className="title">
          <span className="welcome-base">{baseTitle}</span>
          <span className="welcome-part1">
            {typed1}
            {phase === 2 && !alreadyAnimated && <span className="cursor_lightP">|</span>}
          </span>
          <br />
          <span className="welcome-part2">
            {typed2}
            {phase === 3 && !alreadyAnimated && <span className="cursor_purple">|</span>}
          </span>
          <br />
          <span className="welcome-part3">
            {typed3}
            {phase === 4 && !alreadyAnimated && <span className="cursor_orange">|</span>}
          </span>
        </h1>
      )}

      <div className={`button-container${showButtons ? " show" : ""}`}>
        <button className="project-button" onClick={() => navigate("/contatti")} >
          <img src={progetto} alt="" className="progetto-icona" />Have a Project?
        </button>
        <button className="readmore-button" onClick={() => navigate("/about")}>
          <img src={libro} alt="" className="progetto-icona" />Read More
        </button>
      </div>
    </div>
  );
};

export default Welcome;