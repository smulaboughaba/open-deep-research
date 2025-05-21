'use client';

import { useEffect, useRef } from 'react';

export function StarryBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<any[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clase para las estrellas
    class Star {
      x: number;
      y: number;
      size: number;
      speed: number;
      canvasWidth: number;
      canvasHeight: number;

      constructor(canvasWidth: number, canvasHeight: number) {
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.x = Math.random() * this.canvasWidth;
        this.y = Math.random() * this.canvasHeight;
        this.size = 2 + Math.random() * 4.5; // Más grandes
        this.speed = 0.2 + Math.random() * 0.6;
      }

      update() {
        this.y += this.speed;
        if (this.y > this.canvasHeight) {
          this.y = 0;
          this.x = Math.random() * this.canvasWidth;
        }
      }

      draw(ctx: CanvasRenderingContext2D) {
        // Halo exterior
        ctx.save();
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size * 1.7, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255,255,255,0.25)';
        ctx.shadowColor = '#fff';
        ctx.shadowBlur = 60;
        ctx.fill();
        ctx.restore();
        // Núcleo brillante
        ctx.save();
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255,255,255,1)';
        ctx.shadowColor = '#fff';
        ctx.shadowBlur = 30;
        ctx.fill();
        ctx.restore();
      }
    }

    // Función para crear estrellas
    const createStars = () => {
      starsRef.current = Array.from({ length: 250 }, () => new Star(canvas.width, canvas.height));
    };

    // Configurar el canvas para que ocupe toda la pantalla y regenerar estrellas
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      createStars();
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Animación
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      starsRef.current.forEach(star => {
        star.update();
        star.draw(ctx);
      });
      requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none"
      style={{
        background: 'transparent',
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: -10
      }}
    />
  );
} 