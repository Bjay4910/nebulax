import { useState, useRef, useEffect } from 'react';

const features = [
  {
    icon: '🤖',
    title: 'Autonomous Navigation',
    description: 'AI-powered terrain mapping and obstacle avoidance for hands-free exploration across unknown landscapes.',
  },
  {
    icon: '🛡️',
    title: 'Extreme Durability',
    description: 'Built to withstand -120°C to +70°C temperature ranges, radiation exposure, and category 5 dust storms.',
  },
  {
    icon: '📡',
    title: 'Real-time Telemetry',
    description: 'Live data transmission from anywhere on the planet surface with less than 200ms latency.',
  },
];

export function Features() {
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const check = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.85) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };
    window.addEventListener('scroll', check, { passive: true });
    return () => window.removeEventListener('scroll', check);
  }, []);

  return (
    <section
      style={{
        width: '100%',
        backgroundColor: '#0d0d0e',
        color: '#ffffff',
        padding: '7rem 0 8rem',
        boxSizing: 'border-box',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
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
        bottom: '-100px',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '800px',
        height: '500px',
        background: 'radial-gradient(ellipse at center, rgba(226,91,45,0.08) 0%, transparent 70%)',
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
            Core Features
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
            Technology built for <span style={{ color: '#E25B2D' }}>the impossible</span>
          </h2>
        </div>

        {/* Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '1.5rem',
        }}>
          {features.map((feature, i) => (
            <FeatureCard key={i} feature={feature} index={i} visible={visible} />
          ))}
        </div>
      </div>
    </section>
  );
}

interface Feature {
  icon: string;
  title: string;
  description: string;
}

function FeatureCard({ feature, index, visible }: { feature: Feature; index: number; visible: boolean }) {
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
        cursor: 'default',
        transition: 'all 0.4s ease, opacity 0.7s ease, transform 0.7s ease',
        transitionDelay: `${index * 120}ms`,
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(40px)',
        boxSizing: 'border-box',
      }}
    >
      <div style={{
        width: '3.5rem',
        height: '3.5rem',
        borderRadius: '1rem',
        backgroundColor: hovered ? 'rgba(226,91,45,0.15)' : 'rgba(255,255,255,0.05)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '1.5rem',
        marginBottom: '1.5rem',
        transition: 'background-color 0.4s ease',
      }}>
        {feature.icon}
      </div>

      <h3 style={{
        fontFamily: 'sans-serif',
        fontSize: '1.2rem',
        fontWeight: 800,
        color: hovered ? '#E25B2D' : '#ffffff',
        margin: '0 0 1rem',
        transition: 'color 0.4s ease',
        letterSpacing: '-0.01em',
      }}>
        {feature.title}
      </h3>

      <p style={{
        fontFamily: 'sans-serif',
        fontSize: '0.9rem',
        color: 'rgba(255,255,255,0.55)',
        lineHeight: 1.7,
        margin: 0,
      }}>
        {feature.description}
      </p>
    </div>
  );
}
