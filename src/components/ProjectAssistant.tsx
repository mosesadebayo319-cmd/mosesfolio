'use client'

import { useEffect, useRef, useState } from 'react'

export default function ProjectAssistant() {
  const [open, setOpen] = useState(false)
  const [started, setStarted] = useState(false)
  const launcher = useRef<HTMLButtonElement>(null)
  const frame = useRef<HTMLIFrameElement>(null)
  const backdrop = useRef<HTMLDivElement>(null)
  const close = () => { setOpen(false); launcher.current?.focus() }

  useEffect(() => {
    const receive = (event: MessageEvent) => {
      if (event.origin === window.location.origin && event.source === frame.current?.contentWindow && event.data?.type === 'moses:close') close()
    }
    const escape = (event: KeyboardEvent) => { if (event.key === 'Escape') close() }
    const launch = () => { setStarted(true); setOpen(true) }
    window.addEventListener('message', receive)
    window.addEventListener('keydown', escape)
    window.addEventListener('moses:open-assistant', launch)
    return () => { window.removeEventListener('message', receive); window.removeEventListener('keydown', escape); window.removeEventListener('moses:open-assistant', launch) }
  }, [])

  useEffect(() => {
    if (!open) return
    const viewport = window.visualViewport
    const syncViewport = () => {
      const node = backdrop.current
      if (!node || !viewport || window.innerWidth > 800) return
      node.style.setProperty('--assistant-visible-height', `${viewport.height}px`)
      node.style.setProperty('--assistant-keyboard-offset', `${Math.max(0, window.innerHeight - viewport.height - viewport.offsetTop)}px`)
    }
    syncViewport()
    viewport?.addEventListener('resize', syncViewport)
    viewport?.addEventListener('scroll', syncViewport)
    window.addEventListener('resize', syncViewport)
    return () => {
      viewport?.removeEventListener('resize', syncViewport)
      viewport?.removeEventListener('scroll', syncViewport)
      window.removeEventListener('resize', syncViewport)
    }
  }, [open])

  useEffect(() => {
    if (!open) return
    const media = window.matchMedia('(min-width: 801px)')
    const previous = document.body.style.overflow
    const sync = () => { document.body.style.overflow = media.matches ? 'hidden' : previous }
    sync(); media.addEventListener('change', sync)
    return () => { document.body.style.overflow = previous; media.removeEventListener('change', sync) }
  }, [open])

  return <>
    <button ref={launcher} type="button" className="project-assistant-launcher" onClick={() => { setStarted(true); setOpen(v => !v) }} aria-expanded={open} aria-controls="project-assistant-panel" hidden={open}>
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="m12 3 2.5 6.5L21 12l-6.5 2.5L12 21l-2.5-6.5L3 12l6.5-2.5L12 3Z" /></svg>
      Plan your project
    </button>
    <div ref={backdrop} className="project-assistant-backdrop" hidden={!open} onClick={e => { if (e.target === backdrop.current) close() }}>
      <div id="project-assistant-panel" className="project-assistant-frame">
        {started && <iframe ref={frame} src="/project-assistant.html" title="Moses’ project assistant" onLoad={() => { if (open) frame.current?.focus() }} />}
      </div>
    </div>
  </>
}
