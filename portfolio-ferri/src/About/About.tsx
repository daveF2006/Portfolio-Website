import saluto from './saluto.png'
import Background from '../assets/Background';
import './About.css';
import Header from '../Header/Header';
import { useEffect, useState } from 'react';
import lampadina from  './lampadina.png';
import code from './codice.png';

export function About() {  
    const [showBorder, setShowBorder] = useState(false);

    useEffect(() => {
        // Attiva l'animazione al montaggio
        setShowBorder(true);
        // Se vuoi che si resetti ogni volta che entri, puoi aggiungere un reset qui se necessario
    }, []);

    

    return(
    <>

        <Header/>
        <Background />
        
        <div className='about-container'>
            <div className={`hello-container${showBorder ? ' show-border-bottom' : ''}`}>
                <h1 className='hello-title'>Hello, World! </h1>
                <img src={saluto} alt="" className='saluto' />
            </div>

            <div className='second-container'>
                <div className='lampadina-container'>
                    <img src={lampadina} alt="" className='lampadina' />
                </div>

                <div className='about-text-container'>
                    <p className='about-text'>
                        
                            <i>I'm Davide and I turn your ideas into code.</i>
                        
                    </p>
                </div>

                <div className='code-container'>
                    <img src={code} className='code' alt="" />
                </div>
            </div>
        </div>
    </>
    );
}
//My journey in web development started a few years ago, and since then, I've been honing my skills in HTML, CSS, JavaScript, and various frameworks. I love turning ideas into reality through code and am always eager to learn new technologies and improve my craft. When I'm not coding, you can find me exploring the latest tech trends or working on personal projects to expand my portfolio.