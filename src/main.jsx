import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './styles/main.css'
createRoot(document.getElementById('root')).render(<App />)

document.addEventListener('pointerdown', (e) => {
  const b = e.target.closest('.btn'); if (!b) return
  const r = b.getBoundingClientRect(), d = Math.max(r.width, r.height), s = document.createElement('span')
  s.className = 'rp'
  s.style.cssText = `width:${d}px;height:${d}px;left:${e.clientX - r.left - d / 2}px;top:${e.clientY - r.top - d / 2}px`
  b.appendChild(s); setTimeout(() => s.remove(), 600)
})
