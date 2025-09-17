import React, { useRef, useEffect } from "react";
const PURPLE_GRADIENTS = [
    "rgba(103, 58, 183, 0.7)",   // Deep Purple
    "rgba(156, 39, 176, 0.6)",   // Purple
    "rgba(123, 31, 162, 0.5)",   // Dark Purple
    "rgba(74, 20, 140,   0.4)",    // Indigo
    "rgba(40, 30, 60, 0.8)",     // Near Black
];

const NUM_CIRCLES = 20;
const HOVER_COLOR = "#FAEB92";

function randomBetween(a: number, b: number) {
    return a + Math.random() * (b - a);
}

type Circle = {
    x: number;
    y: number;
    r: number;
    dx: number;
    dy: number;
    color: string;
    isHovered?: boolean;
};

function createCircles(width: number, height: number): Circle[] {
    return Array.from({ length: NUM_CIRCLES }, () => ({
        x: randomBetween(0, width),
        y: randomBetween(0, height),
        r: randomBetween(80, 220),
        dx: randomBetween(-0.3, 0.3),
        dy: randomBetween(-0.3, 0.3),
        color: PURPLE_GRADIENTS[Math.floor(Math.random() * PURPLE_GRADIENTS.length)],
        isHovered: false,
    }));
}

const Background: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const animationRef = useRef<number | null>(null);
    const circlesRef = useRef<Circle[]>([]);
    const mouseRef = useRef<{ x: number; y: number } | null>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let width = window.innerWidth;
        let height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;

        circlesRef.current = createCircles(width, height);

        function animate() {
            if (!ctx) return;

            ctx.clearRect(0, 0, width, height);

            // Draw background gradient
            const gradient = ctx.createLinearGradient(0, 0, width, height);
            gradient.addColorStop(0, "#1a1333");
            gradient.addColorStop(1, "#2d0b4e");
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, width, height);

            // Draw animated circles
            for (const c of circlesRef.current) {
                // Check hover
                if (mouseRef.current) {
                    const dist = Math.sqrt(
                        Math.pow(mouseRef.current.x - c.x, 2) +
                        Math.pow(mouseRef.current.y - c.y, 2)
                    );
                    c.isHovered = dist < c.r;
                } else {
                    c.isHovered = false;
                }

                ctx.beginPath();
                ctx.arc(c.x, c.y, c.r, 0, 2 * Math.PI);
                ctx.fillStyle = c.isHovered ? HOVER_COLOR : c.color;
                ctx.shadowColor = c.isHovered ? HOVER_COLOR : c.color;
                ctx.shadowBlur = 60;
                ctx.fill();
                ctx.shadowBlur = 0;

                // Move
                c.x += c.dx;
                c.y += c.dy;

                // Bounce off edges
                if (c.x - c.r < 0 || c.x + c.r > width) c.dx *= -1;
                if (c.y - c.r < 0 || c.y + c.r > height) c.dy *= -1;
            }

            animationRef.current = requestAnimationFrame(animate);
        }

        animate();

        function handleResize() {
            width = window.innerWidth;
            height = window.innerHeight;
            if (canvas) {
                canvas.width = width;
                canvas.height = height;
            }
            circlesRef.current = createCircles(width, height);
        }

        function handleMouseMove(e: MouseEvent) {
            if (!canvas) return;
            const rect = canvas.getBoundingClientRect();
            mouseRef.current = {
                x: e.clientX - rect.left,
                y: e.clientY - rect.top,
            };
        }

        function handleMouseLeave() {
            mouseRef.current = null;
        }

        window.addEventListener("resize", handleResize);
        canvas.addEventListener("mousemove", handleMouseMove);
        canvas.addEventListener("mouseleave", handleMouseLeave);

        return () => {
            if (animationRef.current) cancelAnimationFrame(animationRef.current);
            window.removeEventListener("resize", handleResize);
            canvas.removeEventListener("mousemove", handleMouseMove);
            canvas.removeEventListener("mouseleave", handleMouseLeave);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            style={{
                opacity: 0.5,
                position: "fixed",
                top: 0,
                left: 0,
                width: "100vw",
                height: "100vh",
                zIndex: -1,
                pointerEvents: "auto", // Cambiato per permettere l'hover
            }}
        />
    );
};

export default Background;