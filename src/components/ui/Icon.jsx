const paths = {
  search: <><circle cx="11" cy="11" r="7" /><path d="M20.5 20.5L16.7 16.7" /></>,
  close: <path d="M18 6L6 18M6 6l12 12" />,
  arrowLeft: <><path d="M19 12H5" /><path d="M11 18l-6-6 6-6" /></>,
  arrowRight: <><path d="M5 12h14" /><path d="M13 6l6 6-6 6" /></>,
  bookmark: <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />,
  calendar: <><rect x="3" y="5" width="18" height="16" rx="2.5" /><path d="M16 3v4M8 3v4M3 11h18" /></>,
  clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7.5V12l3 2" /></>,
  pin: <><path d="M20 10c0 6-8 11.5-8 11.5S4 16 4 10a8 8 0 0 1 16 0z" /><circle cx="12" cy="10" r="2.75" /></>,
  users: <><circle cx="9" cy="8.5" r="3.5" /><path d="M2.5 20c0-3.6 2.9-6 6.5-6s6.5 2.4 6.5 6" /><path d="M16 5.2a3.5 3.5 0 0 1 0 6.6M18 14.4c2 .9 3.5 2.8 3.5 5.6" /></>,
  tag: <><path d="M20.6 13.4l-7.2 7.2a2 2 0 0 1-2.8 0l-7.2-7.2a2 2 0 0 1-.6-1.4V4a1 1 0 0 1 1-1h8a2 2 0 0 1 1.4.6l7.4 7.4a2 2 0 0 1 0 2.8z" /><circle cx="7.5" cy="7.5" r="1.2" /></>,
  check: <path d="M5 12.5l4.5 4.5L19 7.5" />,
  alert: <><path d="M12 3L2.5 20h19L12 3z" /><path d="M12 9.5v4.5M12 17.2v.3" /></>,
  refresh: <><path d="M20.5 12a8.5 8.5 0 1 1-2.5-6" /><path d="M20.5 3v5h-5" /></>,
  sun: <><circle cx="12" cy="12" r="4" /><path d="M12 2.5v2M12 19.5v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M2.5 12h2M19.5 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" /></>,
  moon: <path d="M20.5 13.2A8.5 8.5 0 1 1 10.8 3.5a7 7 0 0 0 9.7 9.7z" />,
  code: <><path d="M9 17.5L4 12l5-5.5" /><path d="M15 6.5L20 12l-5 5.5" /></>,
  wrench: <><path d="M14.5 6.5a4.8 4.8 0 0 0 6.2 6.2L12 21.4a2.3 2.3 0 1 1-3.3-3.3l8.7-8.7a4.8 4.8 0 0 0-6.2-6.2l3 3-2.6 2.6-3-3z" /></>,
  trophy: <><path d="M7 4h10v5.5a5 5 0 0 1-10 0V4z" /><path d="M7 6H4.5a2.5 2.5 0 0 0 2.5 5M17 6h2.5A2.5 2.5 0 0 1 17 11" /><path d="M12 14.5V18M8.5 21h7" /></>,
  cube: <><path d="M12 2.8l8 4.4v9.6l-8 4.4-8-4.7V7.2z" /><path d="M12 21V12M20 7.2L12 12 4 7.2" /></>,
  spark: <><path d="M12 2.5l1.8 5.2 5.2 1.8-5.2 1.8L12 16.5l-1.8-5.2-5.2-1.8 5.2-1.8z" /><path d="M18.5 15.5l.9 2.6 2.6.9-2.6.9-.9 2.6-.9-2.6-2.6-.9 2.6-.9z" /></>,
  gamepad: <><rect x="2.5" y="7" width="19" height="11" rx="4" /><path d="M7 10.5v4M5 12.5h4M15.5 11.5v.3M17.8 13.5v.3" /></>,
  external: <><path d="M14 4h6v6" /><path d="M20 4l-9 9" /><path d="M18 14v4.5a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 4 18.5v-11A1.5 1.5 0 0 1 5.5 6H10" /></>,
  compass: <><circle cx="12" cy="12" r="9" /><path d="M15.2 8.8l-1.8 4.6-4.6 1.8 1.8-4.6z" /></>,
}

export default function Icon({ name, className = 'h-5 w-5', fill = 'none' }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill={fill}
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name] ?? paths.spark}
    </svg>
  )
}
