type Props = { name: "instagram" | "facebook" | "linkedin"; className?: string };

export function SocialIcon({ name, className }: Props) {
  const common = { className, width: 18, height: 18, viewBox: "0 0 24 24", fill: "none", "aria-hidden": true } as const;
  switch (name) {
    case "instagram":
      return (
        <svg {...common} stroke="currentColor" strokeWidth="1.5">
          <rect x="3" y="3" width="18" height="18" rx="5" />
          <circle cx="12" cy="12" r="4.2" />
          <circle cx="17.4" cy="6.6" r="1" fill="currentColor" stroke="none" />
        </svg>
      );
    case "facebook":
      return (
        <svg {...common} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14.5 21v-7.5h2.6l.4-3h-3V8.6c0-.9.3-1.5 1.6-1.5h1.5V4.4c-.3 0-1.2-.1-2.2-.1-2.2 0-3.7 1.3-3.7 3.8v2.4H9.2v3h2.5V21" />
        </svg>
      );
    case "linkedin":
      return (
        <svg {...common} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="18" height="18" rx="3" />
          <path d="M8 10.5V16M8 7.6v.1M11.5 16v-3.2c0-1.4.9-2.3 2.1-2.3s1.9.9 1.9 2.3V16M11.5 10.5V16" />
        </svg>
      );
  }
}
