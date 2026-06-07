const skills = [
  'React.js','Next.js','TypeScript','Tailwind CSS','GSAP',
  'Framer Motion','WebSockets','REST APIs','ShadCN UI',
  'Ant Design','Redux','SCSS','Angular','Figma','Git',
  'AI-Assisted Dev','Lenis','WordPress',
]

const Item = ({ s }) => (
  <span className="flex items-center gap-5 shrink-0">
    <span style={{
      fontFamily:'DM Mono,monospace', fontSize:'11px',
      letterSpacing:'0.18em', textTransform:'uppercase', color:'var(--text-muted)'
    }}>{s}</span>
    <span style={{ color:'var(--accent)', fontSize:'14px' }}>✦</span>
  </span>
)

const repeated = [...skills,...skills,...skills,...skills]

export default function Marquee() {
  return (
    <div style={{ borderTop:'1px solid var(--border)', borderBottom:'1px solid var(--border)', background:'var(--bg-2)' }}>
      {/* Row 1 – forward */}
      <div className="marquee-outer py-4">
        <div className="marquee-inner gap-8 px-8">
          {repeated.map((s,i) => <Item key={i} s={s} />)}
        </div>
      </div>
      {/* Row 2 – reverse, accent tinted */}
      <div className="marquee-outer py-4" style={{ borderTop:'1px solid var(--border)', background:'rgba(201,150,12,0.015)' }}>
        <div className="marquee-inner reverse gap-8 px-8">
          {repeated.map((s,i) => <Item key={i} s={s} />)}
        </div>
      </div>
    </div>
  )
}
