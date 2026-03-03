export function ZirodeltaLogo({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Outer diamond/delta shape */}
      <path
        d="M20 2L38 20L20 38L2 20L20 2Z"
        stroke="#009B88"
        strokeWidth="2"
        fill="none"
      />
      {/* Inner zero/circle */}
      <circle
        cx="20"
        cy="20"
        r="8"
        stroke="#009B88"
        strokeWidth="1.5"
        fill="none"
      />
      {/* Crosshair lines suggesting precision */}
      <line x1="20" y1="8" x2="20" y2="14" stroke="#009B88" strokeWidth="1.2" />
      <line x1="20" y1="26" x2="20" y2="32" stroke="#009B88" strokeWidth="1.2" />
      <line x1="8" y1="20" x2="14" y2="20" stroke="#009B88" strokeWidth="1.2" />
      <line x1="26" y1="20" x2="32" y2="20" stroke="#009B88" strokeWidth="1.2" />
      {/* Center dot — the zero point */}
      <circle cx="20" cy="20" r="2" fill="#009B88" />
    </svg>
  )
}

export function ZirodeltaLogomark({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M20 2L38 20L20 38L2 20L20 2Z"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
      />
      <circle cx="20" cy="20" r="2" fill="currentColor" />
    </svg>
  )
}
