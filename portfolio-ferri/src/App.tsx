import './App.css'
import Progetti from './Progetti/Progetti';
import Welcome from './Welcome/Welcome'
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import { useEffect } from 'react';

function App() {
  useEffect(() => {
    const trailElements: HTMLDivElement[] = [];
    const maxTrail = 20;

    function createTrail(x: number, y: number) {
      const trail = document.createElement("div");
      trail.className = "cursor-trail";
      trail.style.left = `${x - 6}px`;
      trail.style.top = `${y - 6}px`;
      document.body.appendChild(trail);
      trailElements.push(trail);

      setTimeout(() => {
        trail.style.opacity = "0";
        setTimeout(() => {
          trail.remove();
        }, 200);
      }, 300);

      if (trailElements.length > maxTrail) {
        const oldTrail = trailElements.shift();
        if (oldTrail) oldTrail.remove();
      }
    }

    function handleMouseMove(e: MouseEvent) {
      createTrail(e.clientX, e.clientY);
    }

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      trailElements.forEach((el) => el.remove());
    };
  }, []);

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path='/welcome' element={<Welcome/>}/>
          <Route path='/progetti' element={<Progetti/>}/>
        </Routes>
      </Router>
    </>
  )
}

export default App