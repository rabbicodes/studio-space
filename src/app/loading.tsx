// app/loading.tsx
// Studio loader: camera → studio light → microphone → headphones → clapperboard
// Pure CSS (no extra libraries). Purple theme, supports light & dark mode.

const css = `
.sl-icon {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  transform-origin: 50% 50%;
  animation: sl-morph 1.5s cubic-bezier(.65,0,.35,1) infinite both;
}
.sl-icon:nth-child(1) { animation-delay: 0s; }
.sl-icon:nth-child(2) { animation-delay: .3s; }
.sl-icon:nth-child(3) { animation-delay: .6s; }
.sl-icon:nth-child(4) { animation-delay: .9s; }
.sl-icon:nth-child(5) { animation-delay: 1.2s; }
@keyframes sl-morph {
  0%   { opacity: 0; transform: scale(.6) rotate(-8deg); filter: blur(3px); }
  4%   { opacity: 1; transform: scale(1)  rotate(0deg);  filter: blur(0); }
  16%  { opacity: 1; transform: scale(1)  rotate(0deg);  filter: blur(0); }
  20%  { opacity: 0; transform: scale(1.25) rotate(8deg); filter: blur(3px); }
  100% { opacity: 0; transform: scale(1.25) rotate(8deg); filter: blur(3px); }
}

/* reduced motion: still cycle through the icons, but only with a simple fade */
@keyframes sl-fade {
  0%   { opacity: 0; }
  4%   { opacity: 1; }
  16%  { opacity: 1; }
  20%  { opacity: 0; }
  100% { opacity: 0; }
}
@media (prefers-reduced-motion: reduce) {
  .sl-icon { animation-name: sl-fade; animation-timing-function: linear; }
}
`;

const common = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

// soft tinted fill like the grey fill in the reference video
const tint = { fill: "currentColor", fillOpacity: 0.14 };

export default function Loading() {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-busy="true"
      className="flex min-h-[70vh] w-full flex-col items-center justify-center gap-6 bg-background"
    >
      <style dangerouslySetInnerHTML={{ __html: css }} />

      <div className="relative flex items-center justify-center">
        {/* soft purple glow */}
        <div className="absolute h-44 w-44 animate-pulse rounded-full bg-[rgb(155,42,229)]/20 blur-3xl dark:bg-[rgb(155,42,229)]/30" />

        {/* purple in light mode, lighter purple in dark mode */}
        <div
          aria-hidden="true"
          className="relative h-[120px] w-[120px] text-[rgb(155,42,229)] dark:text-[rgb(196,132,252)]"
        >
          {/* 1. Camera */}
          <svg className="sl-icon" viewBox="0 0 120 120" {...common}>
            <path d="M44 42 L50 30 H70 L76 42" />
            <rect x="18" y="42" width="84" height="52" rx="11" {...tint} />
            <circle cx="60" cy="68" r="16" />
            <circle cx="60" cy="68" r="5" fill="currentColor" stroke="none" />
            <path d="M86 52 H92" />
          </svg>

          {/* 2. Studio light */}
          <svg className="sl-icon" viewBox="0 0 120 120" {...common}>
            <rect x="26" y="14" width="68" height="44" rx="9" {...tint} />
            <rect x="38" y="25" width="44" height="22" rx="5" />
            <path d="M60 58 V92" />
            <path d="M60 92 L40 108 M60 92 L80 108 M60 92 V108" />
          </svg>

          {/* 3. Microphone */}
          <svg className="sl-icon" viewBox="0 0 120 120" {...common}>
            <rect x="44" y="12" width="32" height="50" rx="16" {...tint} />
            <path d="M52 30 H68 M52 40 H68" />
            <path d="M32 52 v6 a28 28 0 0 0 56 0 v-6" />
            <path d="M60 86 V102 M44 102 H76" />
          </svg>

          {/* 4. Headphones */}
          <svg className="sl-icon" viewBox="0 0 120 120" {...common}>
            <path d="M28 70 V58 a32 32 0 0 1 64 0 V70" />
            <rect x="18" y="64" width="18" height="34" rx="8" {...tint} />
            <rect x="84" y="64" width="18" height="34" rx="8" {...tint} />
          </svg>

          {/* 5. Clapperboard */}
          <svg className="sl-icon" viewBox="0 0 120 120" {...common}>
            <rect x="18" y="50" width="84" height="48" rx="7" {...tint} />
            <path d="M18 64 H102" />
            <g transform="rotate(-10 18 44)">
              <rect x="18" y="30" width="84" height="14" rx="4" />
              <path d="M38 30 L30 44 M60 30 L52 44 M82 30 L74 44" />
            </g>
          </svg>
        </div>
      </div>

      <p className="text-sm font-medium tracking-wide text-muted-foreground">
        Loading studio<span className="animate-pulse">...</span>
      </p>
    </div>
  );
}