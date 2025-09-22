import React, { useState, useEffect, useRef } from "react";
import "./Welcome.css";
import Header from "../Header/Header";
import Background from "../assets/Background";
//COMPONENTE CHE SI ATTIVA ALL'APERTURA DELLA PAGINA


const Welcome: React.FC = () => {

  

  //Titolo completo che parte subito
  const fullTitle = "Welcome to my Portfolio";

  //Viene cancellato il titolo completo fino a qua
  const baseTitle = "Welcome";

  //Poi vengono aggiunti i vari pezzi del titolo
  //Questi pezzi vengono aggiunti uno alla volta con un effetto di scrittura
  const part1 = ", I'm";
  const part2 = " Davide Ferri";
  const part3 = " - Software and Web Developer";

  const [typedTitle, setTypedTitle] = useState("");
  const [typed1, setTyped1] = useState("");
  const [typed2, setTyped2] = useState("");
  const [typed3, setTyped3] = useState("");
  const [phase, setPhase] = useState(0);
  const [, setShowCursor] = useState(true);

  // Cursor blink fluido
  const cursorIntervalRef = useRef<number | null>(null);

    const [showButtons, setShowButtons] = useState(false);

  // Simula la fine della scrittura del testo (sostituisci con la tua logica di typing)
  // Ad esempio, se usi un effetto typing, chiama setShowButtons(true) quando finisce
  useEffect(() => {
    // Supponiamo che la scrittura duri 2.5 secondi
    const timer = setTimeout(() => setShowButtons(true), 5300);
    return () => clearTimeout(timer);
    }, []);
  // Effetto di scrittura del titolo completo
  useEffect(() => {
    cursorIntervalRef.current = window.setInterval(() => {
      setShowCursor((v) => !v);
    }, 600);
    return () => {
      if (cursorIntervalRef.current) clearInterval(cursorIntervalRef.current);
    };
  }, []);

  useEffect(() => {
    let current = 0;
    let interval: number;

    //Funzione che scrive
    function typeText(text: string, setter: (val: string) => void, onComplete: () => void, speed = 50) {
      current = 0;
      interval = window.setInterval(() => {
        setter(text.slice(0, current + 1));
        current++;
        if (current === text.length) {
          clearInterval(interval);
          if(phase === 0) {
          setTimeout(onComplete, 1000);
          } else { 
            setTimeout(onComplete, 10); 
          }
        }
      }, speed);
    }

    //Funzione che cancella
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

    // Gestione delle fasi e chiamate alle funzioni di scrittura e cancellazione
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

    return () => clearInterval(interval);
  }, [phase]);


  //Componente html che viene renderizzato
  return (
    
    //Tutto dentro un div con classe welcome-container
    <div className="welcome-container">
      <Background></Background>
      <Header></Header>
      {(phase === 0 || phase === 1) && (
        <h1 className="title">
          {typedTitle}
          <span className="cursor_white">|</span>
        </h1>
      )}
      {phase >= 2 && (
        <h1 className="title" >
          <span className="welcome-base">{baseTitle}</span>
          <span className="welcome-part1">
            {typed1}
            {phase === 2 && <span className="cursor_lightP">|</span>}
          </span>
          <br />
          <span className="welcome-part2" >
            {typed2}
            {phase === 3 && <span className="cursor_purple">|</span>}
          </span>
          <br />
          <span className="welcome-part3">
            {typed3}
            {phase === 4 && <span className="cursor_orange">|</span>}
          </span>
        </h1>
      )}

      <div className={`button-container${showButtons ? " show" : ""}`}
>

        <button className="project-button">
          Have a Project?
        </button>

        <button className="readmore-button">
          Read More
        </button>

      </div>
    </div>
  );
};

export default Welcome;