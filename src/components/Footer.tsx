import React from 'react';

export function Footer() {
  const cols = [
    { title: 'Product', links: ['Overview', 'Specs', 'Features', 'Pricing'] },
    { title: 'Company', links: ['About Us', 'Blog', 'Careers', 'Press'] },
    { title: 'Support', links: ['Documentation', 'Contact', 'Privacy', 'Terms'] },
  ];

  return (
    <footer style={{width: '100%', backgroundColor: '#080808', color: '#ffffff', padding: '5rem 0 2rem', boxSizing: 'border-box', position: 'relative'}}>
      <div style={{position: 'absolute', top: 0, left: '6rem', right: '6rem', height: '1px', background: 'linear-gradient(90deg, transparent, rgba(226,91,45,0.4), transparent)'}} />
      <div style={{maxWidth: '1280px', margin: '0 auto', padding: '0 4rem', boxSizing: 'border-box'}}>
        <div style={{display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr 1fr', gap: '4rem', marginBottom: '4rem'}}>
          <div>
            <div style={{fontFamily: 'sans-serif', fontWeight: 900, fontSize: '1.6rem', letterSpacing: '0.1em', marginBottom: '1rem'}}>
              NEBULA<span style={{color: '#E25B2D'}}>X</span>
            </div>
            <p style={{fontFamily: 'sans-serif', fontSize: '0.85rem', color: 'rgba(255,255,255,0.45)', lineHeight: 1.75, maxWidth: '260px', margin: '0 0 1.5rem'}}>
              Built for the unknown. Engineered to explore where no machine has gone before.
            </p>
            <p style={{fontFamily: 'sans-serif', fontSize: '0.75rem', color: 'rgba(255,255,255,0.25)', margin: 0}}>
              A portfolio piece by <span style={{color: '#E25B2D'}}>Orductive</span>
            </p>
          </div>
          {cols.map((col) => (
            <div key={col.title}>
              <p style={{fontFamily: 'sans-serif', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: '1.5rem'}}>
                {col.title}
              </p>
              {col.links.map((link) => (
                <a key={link} href="#" style={{display: 'block', fontFamily: 'sans-serif', fontSize: '0.875rem', color: 'rgba(255,255,255,0.6)', textDecoration: 'none', marginBottom: '0.75rem'}}
                  onMouseEnter={(e) => { e.currentTarget.style.color = '#E25B2D'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(255,255,255,0.6)'; }}
                >
                  {link}
                </a>
              ))}
            </div>
          ))}
        </div>
        <div style={{borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
          <p style={{fontFamily: 'sans-serif', fontSize: '0.8rem', color: 'rgba(255,255,255,0.25)', margin: 0}}>
            2026 NebulaX. All rights reserved.
          </p>
          <div style={{display: 'flex', gap: '1.5rem'}}>
            {[{name: 'LinkedIn', url: 'https://www.linkedin.com/company/orductive'}, {name: 'Instagram', url: 'https://www.instagram.com/orductive'}, {name: 'GitHub', url: 'https://github.com/Bjay4910'}].map((social) => (
              <a key={social.name} href={social.url} target="_blank" rel="noopener noreferrer" style={{fontFamily: 'sans-serif', fontSize: '0.8rem', color: 'rgba(255,255,255,0.3)', textDecoration: 'none'}}
                onMouseEnter={(e) => { e.currentTarget.style.color = '#E25B2D'; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(255,255,255,0.3)'; }}
              >
                {social.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
