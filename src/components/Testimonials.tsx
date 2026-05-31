import { useState, useRef, useEffect } from 'react';

const testimonials = [
  {
    quote: 'NebulaX completely redefined what we thought was possible for autonomous exploration. Nothing comes close.',
    author: 'Dr. Sarah Chen',
    role: 'Chief Science Officer, AeroVance Labs',
    initials: 'SC',
  },
  {
    quote: 'The telemetry data accuracy is unprecedented. We are operating in conditions that would destroy any other rover.',
    author: 'Marcus Webb',
    role: 'Lead Engineer, Frontier Robotics',
    initials: 'MW',
  },
  {
    quote: 'Three years on the surface. Zero critical failures. NebulaX is simply in a different league.',
    author: 'Dr. Amara Osei',
    role: 'Mission Director, Orbital Dynamics',
    initials: 'AO',
  },
];

interface Testimonial {
  quote: string;
  author: string;
  role: string;
  initials: string;
}

function TestimonialCard({ t, index, visible }: { t: Testimonial; index: number; visible: boolean }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        backgroundColor: hovered ? 'rgba(226,91,45,0.06)' : 'rgba(255,255,255,0.02)',
        border: hovered ? '1px solid rgba(226,91,45,0.3)' : '1px solid rgba(255,255,255,0.06)',
        borderRadius: '1.5rem',
        padding: '2.5rem',
        boxSizing: 'border-box',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(40px)',
        transition: `background-color 0.4s ease, border 0.4s ease, opacity 0.7s ease ${index * 120}ms, transform 0.7s ease ${index * 120}ms`,
        position: 'relative',
        cursor: 'default',
      }}
    >
      {/* Quote mark */}
      <div style={{
        fontSize: '4rem',
        lineHeight: 1,
        color: '#E25B2D',
        fontFamily: 'Georgia, serif',
        marginBottom: '1rem',
        opacity: 0.6,
      }}>
        "
      </div>

      <p style={{
        fontFamily: 'sans-serif',
        fontSize: '0.95rem',
        color: 'rgba(255,255,255,0.75)',
        lineHeight: 1.75,
        margin: '0 0 2rem',
        fontStyle: 'italic',
      }}>
        {t.quote}
      </p>

      {/* Author */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <div style={{
          width: '2.5rem',
          height: '2.5rem',
          borderRadius: '50%',
          backgroundColor: '#E25B2D',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'sans-serif',
          fontWeight: 700,
          fontSize: '0.75rem',
          color: 'white',
          flexShrink: 0,
        }}>
          {t.initials}
        </div>
        <div>
          <p style={{
            fontFamily: 'sans-serif',
            fontWeight: 700,
            fontSize: '0.9rem',
            color: hovered ? '#E25B2D' : 'white',
            margin: '0 0 0.2rem',
          }}>
            {t.author}
          </p>
          <p style={{
            fontFamily: 'sans-serif',
            fontSize: '0.75rem',
            color: 'rgba(255,255,255,0.4)',
            margin: 0,
          }}>
            {t.role}
          </p>
        </div>
      </div>
    </div>
  );
}

export function Testimonials() {
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const check = () => {
      if (!sectionRef.current) return;
      const top = sectionRef.current.getBoundingClientRect().top;
      if (top < window.innerHeight * 0.85) {
        setVisible(true);
        window.removeEventListener('scroll', check);
      }
    };
    check();
    window.addEventListener('scroll', check, { passive: true });
    return () => window.removeEventListener('scroll', check);
  }, []);

  return (
    <section style={{
      width: '100%',
      backgroundColor: '#0B0B0C',
      color: '#ffffff',
      padding: '7rem 0 8rem',
      boxSizing: 'border-box',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Top border */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: '6rem',
        right: '6rem',
        height: '1px',
        background: 'linear-gradient(90deg, transparent, rgba(226,91,45,0.4), transparent)',
      }} />

      {/* Ambient glow */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '700px',
        height: '400px',
        background: 'radial-gradient(ellipse at center, rgba(226,91,45,0.07) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '0 4rem',
        boxSizing: 'border-box',
      }}>
        {/* Header */}
        <div
          ref={sectionRef}
          style={{
            textAlign: 'center',
            marginBottom: '5rem',
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'opacity 0.8s ease, transform 0.8s ease',
          }}
        >
          <p style={{
            color: '#E25B2D',
            fontFamily: 'sans-serif',
            fontSize: '0.75rem',
            fontWeight: 600,
            letterSpacing: '0.35em',
            textTransform: 'uppercase',
            marginBottom: '1rem',
          }}>
            What They Say
          </p>
          <h2 style={{
            fontFamily: 'sans-serif',
            fontSize: 'clamp(2rem, 3.5vw, 3.2rem)',
            fontWeight: 900,
            lineHeight: 1.1,
            margin: '0 auto',
            letterSpacing: '-0.02em',
            maxWidth: '600px',
          }}>
            Trusted by the world's <span style={{ color: '#E25B2D' }}>best explorers</span>
          </h2>
        </div>

        {/* Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '1.5rem',
        }}>
          {testimonials.map((t, i) => (
            <TestimonialCard key={i} t={t} index={i} visible={visible} />
          ))}
        </div>
      </div>
    </section>
  );
}
