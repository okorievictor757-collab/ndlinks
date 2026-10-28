import { useState, useEffect, useRef } from 'react'
import { business as b, waLink } from './config/business.js'
import { services } from './data/services.js'
import { projects, categories } from './data/projects.js'

const quote = waLink('Hello Ndlinks, I would like to request a quote.')
const Wave = ({ flip }) => (
  <div className={'wv' + (flip ? ' flip' : '')} aria-hidden="true">
    {['back', 'mid', ''].map((k) => (
      <svg key={k} className={'wave ' + k} viewBox="0 0 2880 60" preserveAspectRatio="none"><path d="M0 30Q360 0 720 30T1440 30T2160 30T2880 30V60H0Z" /></svg>
    ))}
  </div>
)
const Drop = () => (
  <svg className="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2c3.500 5 6 7.800 6 11a6 6 0 0 1-12 0c0-3.200 2.500-6 6-11z"/><path d="M8 15h8"/></svg>
)
// Shows a photo, or a plain panel if no file is set.
const Img = ({ src, alt, eager }) => src
  ? <img src={src} alt={alt} loading={eager ? 'eager' : 'lazy'} width="1200" height="800" />
  : <div className="ph" role="img" aria-label={alt}><Drop /></div>

function Carousel() {
  const ref = useRef(null)
  const sec = useRef(null)
  const cv = useRef(null)
  const vids = useRef([])
  const [i, setI] = useState(0)
  const [paused, setPaused] = useState(false)
  const slides = projects.slice(0, 5)
  const reduced = useRef(window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  useEffect(() => {
    vids.current.forEach((v, n) => { if (!v) return; if (n === i) { v.muted = true; v.play().catch(() => {}) } else v.pause() })
  }, [i])
  const go = (n) => {
    const t = (n + slides.length) % slides.length
    const el = ref.current
    el.scrollTo({ left: t * el.clientWidth, behavior: reduced.current ? 'auto' : 'smooth' })
  }
  useEffect(() => {
    if (paused || reduced.current) return
    const id = setInterval(() => go(i + 1), 6000)
    return () => clearInterval(id)
  })
  const onScroll = (e) => setI(Math.round(e.target.scrollLeft / e.target.clientWidth))
  return (
    <section id="home" ref={sec} className="carousel" aria-roledescription="carousel" aria-label="Project gallery"
      onPointerDown={() => setPaused(true)} onFocus={() => setPaused(true)} onMouseEnter={() => setPaused(true)}>
      <div className="track" ref={ref} onScroll={onScroll}>
        {slides.map((p, n) => (
          <figure className="slide" key={p.id} aria-label={`${n + 1} of ${slides.length}`}>
            {p.video ? (
              <>
                <div className="vbg" style={{ backgroundImage: `url(${p.poster})` }} />
                {reduced.current
                  ? <img className="vfit" src={p.poster} alt={p.alt} />
                  : <video className="vfit" ref={(el) => (vids.current[n] = el)} src={p.video} poster={p.poster} muted loop playsInline preload={n === 0 ? 'auto' : 'none'} aria-label={p.alt} />}
              </>
            ) : <Img src={p.image} alt={p.alt} eager={n === 0} />}
            <figcaption><small>{p.category}</small><strong>{p.caption}</strong></figcaption>
          </figure>
        ))}
      </div>
      <div className="hero-cta">
        <h1>Borehole drilling, pumps and solar installation in Enugu State</h1>
        <div><a className="btn primary" href={quote} target="_blank" rel="noopener">Request a Quote</a>
        <a className="btn ghost" href="#services">Explore Our Services</a></div>
      </div>
      <button className="arrow prev" aria-label="Previous project" onClick={() => go(i - 1)}>‹</button>
      <button className="arrow next" aria-label="Next project" onClick={() => go(i + 1)}>›</button>
      <div className="dots">{slides.map((_, n) => <button key={n} aria-label={`Go to project ${n + 1}`} aria-current={n === i} onClick={() => go(n)} />)}</div>
    </section>
  )
}

function Nav() {
  const [open, setOpen] = useState(false)
  const links = [['Home','#home'],['Services','#services'],['Projects','#projects'],['About','#about'],['Contact','#contact']]
  return (
    <header className="nav">
      <a href="#home" className="logo"><b>NDLINKS</b><span>ELECTRO MECHANICAL ENGINEERING SERVICES</span></a>
      <button className="burger" aria-expanded={open} aria-controls="menu" aria-label="Menu" onClick={() => setOpen(!open)}>☰</button>
      <nav id="menu" className={open ? 'open' : ''}>
        {links.map(([t, h]) => <a key={t} href={h} onClick={() => setOpen(false)}>{t}</a>)}
        <a className="btn primary" href={quote} target="_blank" rel="noopener">Request a Quote</a>
      </nav>
    </header>
  )
}

function Projects() {
  const [cat, setCat] = useState(categories[0])
  const [open, setOpen] = useState(null)
  const shown = categories.filter((c) => c === categories[0] || projects.some((p) => p.category === c))
  const list = projects.filter((p) => cat === categories[0] || p.category === cat)
  useEffect(() => {
    const k = (e) => e.key === 'Escape' && setOpen(null)
    window.addEventListener('keydown', k); return () => window.removeEventListener('keydown', k)
  }, [])
  return (
    <section id="projects" className="sec">
      <h2>Completed projects</h2>
      <div className="filters" role="group" aria-label="Filter projects">
        {shown.map((c) => <button key={c} aria-pressed={c === cat} onClick={() => setCat(c)}>{c}</button>)}
      </div>
      <div className="grid">
        {list.map((p) => (
          <button key={p.id} className="card photo" onClick={() => setOpen(p)} aria-label={`Open ${p.title}`}>
            <Img src={p.image || p.poster} alt={p.alt} />
            {p.video && <i className="play" aria-hidden="true">▶</i>}
            <span><small>{p.category}</small>{p.title}</span>
          </button>
        ))}
      </div>
      {open && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label={open.title} onClick={() => setOpen(null)}>
          <div onClick={(e) => e.stopPropagation()}>
            {open.video
              ? <video src={open.video} poster={open.poster} controls muted loop playsInline autoPlay aria-label={open.alt} />
              : <Img src={open.image} alt={open.alt} />}
            <p><strong>{open.title}</strong>{open.location ? `, ${open.location}` : ''}<br />{open.caption}</p>
            <button className="btn primary" autoFocus onClick={() => setOpen(null)}>Close</button>
          </div>
        </div>
      )}
    </section>
  )
}

function Contact() {
  const [svc, setSvc] = useState('')
  const [msg, setMsg] = useState('')
  const [err, setErr] = useState('')
  const submit = (e) => {
    e.preventDefault()
    if (!svc) return setErr('Choose the service you need.')
    if (msg.trim().length < 10) return setErr('Add a short description (at least 10 characters).')
    setErr('')
    const url = waLink(`Hello Ndlinks, I need: ${svc}.\n${msg.trim()}`)
    const w = window.open(url, '_blank')
    if (!w) window.location.href = url  }
  return (
    <section id="contact" className="sec dark">
      <h2>Discuss your project</h2>
      <p>Service area: {b.serviceArea}. Call <a href={`tel:${b.phoneTel}`}>{b.phoneDisplay}</a> or use the form below.</p>
      <form onSubmit={submit} noValidate>
        <label>Service<select value={svc} onChange={(e) => setSvc(e.target.value)}>
          <option value="">Select a service</option>{services.map((s) => <option key={s.id}>{s.title}</option>)}
        </select></label>
        <label>Message<textarea rows="4" value={msg} onChange={(e) => setMsg(e.target.value)} placeholder="Your location in Enugu State, the problem, and what you need." /></label>
        {err && <p role="alert" className="err">{err}</p>}
        <button className="btn primary">Continue in WhatsApp</button>
        <small>This opens WhatsApp with your message filled in. Your enquiry is not sent until you press send there.</small>
      </form>
    </section>
  )
}

export default function App() {
  const name = b.engineerName || 'The engineer'
  return (
    <>
      <Nav />
      <main>
        <Carousel />
        <section className="sec intro"><p>Ndlinks is an Enugu-based team providing borehole drilling, borehole camera investigation, pump installation and repairs, borehole fishing and solar panel installation across Nigeria.</p></section>
        <Projects />
        <Wave />
        <section id="services" className="sec alt">
          <h2>Services</h2>
          <div className="grid">
            {services.map((s) => (
              <article key={s.id} className="card">
                {s.image && <img src={s.image} alt={s.title} loading="lazy" width="600" height="400" />}
                <h3><Drop />{s.title}</h3><p>{s.text}</p>
                <a className="btn primary" target="_blank" rel="noopener" href={waLink(`Hello Ndlinks, I would like to request: ${s.title}.`)}>Request This Service</a>
              </article>
            ))}
          </div>
        </section>
        <section id="about" className="sec about">
          <figure>{b.portrait ? <img src={b.portrait} alt={name} loading="lazy" width="400" height="500" /> : <div className="ph portrait">Portrait photo placeholder</div>}</figure>
          <div>
            <h2>Decades of practical experience. Engineering solutions you can trust.</h2>
            <p><strong>{b.role}, {b.roleSince}</strong></p>
            <p>{name} is the CEO of Ndlinks. He studied {b.education}, {b.background.toLowerCase()}, and has been involved in the industry since the 1990s, with hands-on work in water systems, boreholes, pumps and electrical equipment.</p>
            <ul className="timeline"><li>{b.education}</li><li>{b.background}</li><li>{b.since}</li><li>{b.role}: {b.roleSince}</li></ul>
            <h3>What Ndlinks does</h3>
            <ul>{b.duties.map((d) => <li key={d}>{d}</li>)}</ul>
            <a className="btn primary" href={quote} target="_blank" rel="noopener">Talk about your project</a>
          </div>
        </section>
        <section className="sec alt">
          <h2>Why choose Ndlinks</h2>
          <ul className="why"><li>Experience since the 1990s</li><li>Electrical engineering education</li><li>Practical borehole and pump knowledge</li><li>Careful troubleshooting</li><li>Clear communication</li><li>Work shaped to each project</li></ul>
        </section>
        <section className="sec">
          <h2>How an enquiry works</h2>
          <ol className="steps"><li>Message us on WhatsApp with the service and your location.</li><li>We discuss the work and what it needs.</li><li>You decide whether to go ahead.</li></ol>
        </section>
        <Wave flip />
        <Contact />
      </main>
      <footer><b>NDLINKS</b> Electro Mechanical Engineering Services · {b.serviceArea} · © {new Date().getFullYear()}</footer>
      <a className="fab" href={quote} target="_blank" rel="noopener" aria-label="Chat on WhatsApp">WhatsApp</a>
    </>
  )
}
