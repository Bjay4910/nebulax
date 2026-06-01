import { useState, useRef, useEffect } from 'react';
import { useIsMobile } from '../hooks/useIsMobile';

const specs = [
  {
    label: 'Top Speed',
    value: '125',
    unit: 'mph',
    description: 'Electronically governed for safety across uneven planetary terrain.',
    icon: '⚡',
  },
  {
    label: 'Range',
    value: '450',
    unit: 'miles',
    description: 'Extended dual-cell battery architecture for long-range exploration.',
    icon: '🔋',
  },
  {
    label: 'Acceleration',
    value: '2.1s',
    unit: '0–60',
    description: 'Instant torque delivery via quad-motor AWD drivetrain.',
    icon: '🚀',
  },
  {
    label: 'Aerodynamics',
    value: '0.21',
    unit: 'Cd',
    description: 'Ultra-low drag coefficient optimised for atmospheric efficiency.',
    icon: '💨',
  },
  {
    label: 'Curb Weight',
    value: '3,850',
    unit: 'lbs',
    description: 'Carbon-titanium composite chassis keeps mass to a minimum.',
    icon: '⚖️',
  },
  {
    label: 'Safety',
    value: '5★',
    unit: 'Rating',
    description: 'Advanced collision avoidance with redundant structural integrity.',
    icon: '🛡️',
  },
];

interface Spec {
  label: string;
  value: string;
  unit: string;
  description: string;
  icon: string;
}

function SpecCard({ spec, index, visible, isMobile }: { spec: Spec; index: number; visible: boolean; isMobile: boolean }) {
  const [hovered, setHovered] = useState(false);
  const active = hovered || isMobile;

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        backgroundColor: active ? 'rgba(226,91,45,0.06)' : 'rgba(255,255,255,0.02)',
        border: active ? '1px solid rgba(226,91,45,0.3)' : '1px solid rgba(255,255,255,0.06)',
        padding: '2.5rem',
        position: 'relative',
        transition: 'background-color 0.4s ease, opacity 0.6s ease, transform 0.6s ease',
        transitionDelay: `${index * 80}ms`,
        cursor: 'default',
        boxSizing: 'border-box',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(28px)',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '2px',
          background: hovered
            ? 'linear-gradient(90deg, transparent, #E25B2D, transparent)'
            : 'transparent',
          transition: 'background 0.4s ease',
        }}
      />
      <div
        style={{
          width: '3rem',
          height: '3rem',
          borderRadius: '0.75rem',
          backgroundColor: active ? 'rgba(226,91,45,0.15)' : 'rgba(255,255,255,0.05)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '1.3rem',
          marginBottom: '1.5rem',
          transition: 'background-color 0.4s ease',
        }}
      >
        {spec.icon}
      </div>
      <p
        style={{
          fontFamily: 'sans-serif',
          fontSize: '0.7rem',
          fontWeight: 600,
          letterSpacing: '0.25em',
          textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.4)',
          margin: '0 0 0.5rem',
        }}
      >
        {spec.label}
      </p>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.4rem', marginBottom: '1rem' }}>
        <span
          style={{
            fontFamily: 'sans-serif',
            fontSize: 'clamp(2rem, 3.5vw, 2.8rem)',
            fontWeight: 900,
            letterSpacing: '-0.03em',
            color: active ? '#E25B2D' : '#ffffff',
            transition: 'color 0.4s ease',
          }}
        >
          {spec.value}
        </span>
        <span
          style={{
            fontFamily: 'sans-serif',
            fontSize: '0.85rem',
            fontWeight: 600,
            color: 'rgba(255,255,255,0.4)',
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
          }}
        >
          {spec.unit}
        </span>
      </div>
      <p
        style={{
          fontFamily: 'sans-serif',
          fontSize: '0.85rem',
          color: 'rgba(255,255,255,0.5)',
          lineHeight: 1.65,
          margin: 0,
        }}
      >
        {spec.description}
      </p>
    </div>
  );
}

export function Specs() {
  const [imgHovered, setImgHovered] = useState(false);
  const [textVisible, setTextVisible] = useState(false);
  const gridRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    const handleScroll = () => {
      if (!gridRef.current) return;
      const top = gridRef.current.getBoundingClientRect().top;
      setTextVisible(top < window.innerHeight * 0.85);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section
      style={{
        width: '100%',
        backgroundColor: '#0B0B0C',
        color: '#ffffff',
        padding: isMobile ? '4rem 0 5rem' : '7rem 0 8rem',
        boxSizing: 'border-box',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Ambient glow */}
      <div
        style={{
          position: 'absolute',
          top: '-200px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '900px',
          height: '600px',
          background: 'radial-gradient(ellipse at center, rgba(226,91,45,0.1) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      {/* Top border line */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: '6rem',
          right: '6rem',
          height: '1px',
          background: 'linear-gradient(90deg, transparent, rgba(226,91,45,0.4), transparent)',
        }}
      />

      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: isMobile ? '0 1.5rem' : '0 4rem',
          boxSizing: 'border-box',
        }}
      >
        {/* ── Two-column layout ── */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
            gap: isMobile ? '3rem' : '5rem',
            alignItems: 'center',
            marginBottom: '6rem',
          }}
        >
          {/* LEFT — headline + description */}
          <div ref={gridRef} style={{
            opacity: textVisible ? 1 : 0,
            transform: textVisible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'opacity 0.8s ease, transform 0.8s ease',
          }}>
            <p
              style={{
                color: '#E25B2D',
                fontFamily: 'sans-serif',
                fontSize: '0.75rem',
                fontWeight: 600,
                letterSpacing: '0.35em',
                textTransform: 'uppercase',
                margin: '0 0 1.2rem',
              }}
            >
              Technical Specifications
            </p>
            <h2
              style={{
                fontFamily: 'sans-serif',
                fontSize: isMobile ? 'clamp(1.6rem, 5vw, 2.5rem)' : 'clamp(2.2rem, 3.5vw, 3.5rem)',
                fontWeight: 900,
                lineHeight: 1.1,
                margin: '0 0 1.5rem',
                letterSpacing: '-0.02em',
              }}
            >
              Engineered for the{' '}
              <span style={{ color: '#E25B2D' }}>extremes</span>{' '}
              of exploration.
            </h2>
            <p
              style={{
                fontFamily: 'sans-serif',
                fontSize: '1.05rem',
                color: 'rgba(255,255,255,0.55)',
                lineHeight: 1.75,
                margin: 0,
              }}
            >
              Every component has been meticulously designed to withstand the
              harshest environments while delivering uncompromising performance.
              Built to go where nothing else can.
            </p>
          </div>

          {/* RIGHT — rover image with orange glow */}
          <div
            style={{
              position: 'relative',
              marginLeft: 'auto',
              marginRight: isMobile ? '0' : '-2rem',
              overflow: 'hidden',
              borderRadius: '1.25rem',
            }}
          >
            {/* Glow behind image */}
            <div
              style={{
                position: 'absolute',
                inset: '-20px',
                background: 'radial-gradient(ellipse at center, rgba(226,91,45,0.35) 0%, transparent 65%)',
                borderRadius: '1.5rem',
                pointerEvents: 'none',
                zIndex: 0,
              }}
            />
            <img
              src="/rover-specs.jpg"
              alt="NebulaX Rover — Technical View"
              onMouseEnter={() => setImgHovered(true)}
              onMouseLeave={() => setImgHovered(false)}
              style={{
                position: 'relative',
                zIndex: 1,
                width: '100%',
                height: isMobile ? '220px' : '420px',
                objectFit: 'cover',
                borderRadius: '1.25rem',
                border: '1px solid rgba(226,91,45,0.2)',
                display: 'block',
                transform: imgHovered ? 'scale(1.05)' : 'scale(1)',
                transition: 'transform 0.5s ease, box-shadow 0.5s ease',
                boxShadow: imgHovered
                  ? '0 0 60px rgba(226,91,45,0.5)'
                  : '0 0 0px rgba(226,91,45,0)',
              }}
            />
          </div>
        </div>

        {/* ── Specs grid ── */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
            gap: '1.5px',
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.04)',
            borderRadius: '1.5rem',
            overflow: 'hidden',
          }}
        >
          {specs.map((spec, i) => (
            <SpecCard key={i} spec={spec} index={i} visible={true} isMobile={isMobile} />
          ))}
        </div>
      </div>
    </section>
  );
}
