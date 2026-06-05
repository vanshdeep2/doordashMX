import { useEffect } from 'react'
import '../styles/operations.css'

export default function DrawerShell({ open, onClose, title, subtitle, children }) {
  useEffect(() => {
    if (!open) return undefined
    function onKey(e) {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, onClose])

  if (!open) return null

  return (
    <>
      <div className="drawer-overlay open" onClick={onClose} role="presentation" />
      <div className="drawer open">
        <div className="drawer-header">
          <div className="drawer-title">{title}</div>
          <button type="button" className="drawer-close" onClick={onClose} aria-label="Close">
            ✕
          </button>
        </div>
        {subtitle && <p className="drawer-subtitle">{subtitle}</p>}
        {children}
      </div>
    </>
  )
}
