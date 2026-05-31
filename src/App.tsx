import { useEffect, useRef } from 'react';
import { Footer } from "./components/Footer";
import { Testimonials } from "./components/Testimonials";
import { Features } from "./components/Features";
import { Specs } from './components/Specs';

const FRAME_COUNT = 151;
const getFramePath = (index: number) =>
  `/frames/frame-${String(index).padStart(3, '0')}.jpg`;

export default function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const heroUIRef = useRef<HTMLDivElement>(null);
  const images = useRef<HTMLImageElement[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let loaded = 0;
    for (let i = 1; i <= FRAME_COUNT; i++) {
      const img = new Image();
      img.src = getFramePath(i);
      img.onload = () => {
        loaded++;
        if (loaded === 1) drawFrame(0);
      };
      images.current[i - 1] = img;
    }

    const drawFrame = (index: number) => {
      const ctx = canvas.getContext('2d');
      const img = images.current[index];
      if (!ctx || !img) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      const hRatio = window.innerWidth / img.width;
      const vRatio = window.innerHeight / img.height;
      const ratio = Math.max(hRatio, vRatio);
      const x = (window.innerWidth - img.width * ratio) / 2;
      const y = (window.innerHeight - img.height * ratio) / 2;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, img.width, img.height, x, y, img.width * ratio, img.height * ratio);
    };

    const HERO_END = window.innerHeight * 4;

    const handleScroll = () => {
      const pastHero = window.scrollY >= HERO_END;

      // Hide/show canvas and hero UI
      if (canvas) canvas.style.visibility = pastHero ? 'hidden' : 'visible';
      if (heroUIRef.current) heroUIRef.current.style.visibility = pastHero ? 'hidden' : 'visible';

      if (!pastHero) {
        const progress = Math.max(0, Math.min(window.scrollY / HERO_END, 1));
        const index = Math.min(FRAME_COUNT - 1, Math.floor(progress * FRAME_COUNT));
        requestAnimationFrame(() => drawFrame(index));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 0,
          width: '100vw',
          height: '100vh',
        }}
      />

      {/* Nav stays visible at all times */}
      <nav style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        zIndex: 50,
        padding: '1.5rem 3rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        backdropFilter: 'blur(10px)',
        backgroundColor: 'rgba(0,0,0,0.85)',
        boxSizing: 'border-box',
      }}>
        <div style={{ color: 'white', fontFamily: 'sans-serif', fontWeight: 900, fontSize: '1.4rem', letterSpacing: '0.1em' }}>
          NEBULA<span style={{ color: '#E25B2D' }}>X</span>
        </div>
        <div style={{ display: 'flex', gap: '2.5rem', fontFamily: 'sans-serif', fontSize: '0.85rem', fontWeight: 500, letterSpacing: '0.1em' }}>
          {[{name: 'Home', href: '#top'}, {name: 'Specs', href: '#specs'}, {name: 'Features', href: '#features'}, {name: 'About Us', href: '#about'}, {name: 'Blog', href: '#blog'}].map(link => (
            <a key={link.name} href={link.href} style={{ color: 'rgba(255,255,255,0.8)', textDecoration: 'none', textTransform: 'uppercase' }}
              onMouseEnter={e => (e.currentTarget.style.color = '#E25B2D')}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.8)')}
            >{link.name}</a>
          ))}
        </div>
        <button style={{ backgroundColor: '#E25B2D', color: 'white', border: 'none', padding: '0.6rem 1.5rem', borderRadius: '2rem', fontFamily: 'sans-serif', fontWeight: 700, fontSize: '0.85rem', cursor: 'pointer', textTransform: 'uppercase' }}>
          Explore
        </button>
      </nav>

      {/* Hero UI — hidden past hero end */}
      <div ref={heroUIRef}>
        <div style={{ position: 'fixed', bottom: '4rem', left: '4rem', zIndex: 10, pointerEvents: 'none' }}>
          <p style={{ color: '#E25B2D', fontSize: '0.85rem', fontWeight: 600, letterSpacing: '0.3em', textTransform: 'uppercase', fontFamily: 'sans-serif', marginBottom: '0.5rem' }}>Rover</p>
          <h1 style={{ color: 'white', fontSize: '6vw', fontWeight: 900, fontFamily: 'sans-serif', lineHeight: 0.9, margin: 0, textShadow: '0 0 80px rgba(0,0,0,0.5)' }}>NEBULAX</h1>
        </div>

        <div style={{
          position: 'fixed', bottom: '4rem', right: '3rem', zIndex: 20,
          backgroundColor: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(16px)',
          borderRadius: '1.2rem', padding: '1.5rem 2rem', maxWidth: '280px',
          border: '1px solid rgba(255,255,255,0.1)',
        }}>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontFamily: 'sans-serif', fontSize: '0.8rem', marginBottom: '0.5rem' }}>Built for the unknown</p>
          <h3 style={{ color: 'white', fontFamily: 'sans-serif', fontWeight: 700, fontSize: '1rem', lineHeight: 1.4, marginBottom: '1rem' }}>
            Experience <strong style={{ color: '#E25B2D' }}>extreme terrain</strong>, extended range & autonomous navigation
          </h3>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontFamily: 'sans-serif', fontSize: '0.8rem', marginBottom: '1.2rem' }}>
            Starting at <strong style={{ color: 'white' }}>$2,400,000</strong>
          </p>
          <button style={{ backgroundColor: '#E25B2D', color: 'white', border: 'none', padding: '0.65rem 1.5rem', borderRadius: '2rem', fontFamily: 'sans-serif', fontWeight: 700, fontSize: '0.8rem', cursor: 'pointer', textTransform: 'uppercase', width: '100%' }}>
            Learn More
          </button>
        </div>
      </div>

      {/* Specs appears after 400vh — sits in normal flow */}
      <div style={{ marginTop: '400vh', position: 'relative', zIndex: 40 }}>
        <Specs />
        <Features />
        <Testimonials />
        <Footer />
      </div>
    </>
  );
}
