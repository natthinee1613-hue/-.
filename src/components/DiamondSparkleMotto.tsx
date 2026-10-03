import React, { useMemo } from 'react';

interface DiamondSparkleMottoProps {
  text?: string;
  className?: string;
  isBatman?: boolean;
  isDark?: boolean;
}

export const DiamondSparkleMotto: React.FC<DiamondSparkleMottoProps> = ({
  text = '“มุ่งพัฒนาระบบการบริหารทรัพยากรบุคคลอย่างมืออาชีพ โดยยึดหลักความรู้ คุณธรรม โปร่งใส และตรวจสอบได้”',
  className = '',
  isBatman = false,
  isDark = false,
}) => {
  // Safe Thai grapheme cluster segmenter to prevent separating vowels & tone marks
  const graphemes = useMemo(() => {
    if (typeof Intl !== 'undefined' && 'Segmenter' in Intl) {
      try {
        const segmenter = new (Intl as any).Segmenter('th', { granularity: 'grapheme' });
        return Array.from(segmenter.segment(text), (s: any) => s.segment as string);
      } catch (e) {
        // fallback
      }
    }
    // Thai Unicode regex matching base consonant followed by vowels/tones
    const thaiRegex = /[\u0E00-\u0E7F][\u0E30-\u0E3A\u0E47-\u0E4E]*|[^\u0E00-\u0E7F]/gu;
    const matches = text.match(thaiRegex);
    return matches || text.split('');
  }, [text]);

  const totalChars = graphemes.length;
  // Sweep window: characters light up sequentially over 5.2 seconds within a 7.5s loop
  const sweepDuration = 5.2;

  // Base text color based on theme
  const baseTextColorClass = isBatman
    ? 'text-[#FACC15]/85'
    : isDark
    ? 'text-amber-200/90'
    : 'text-[#78350F]/90';

  return (
    <div className={`relative inline-flex items-center justify-center py-1 px-3 max-w-full overflow-hidden select-none ${className}`}>
      {/* Background Diamond Dust Glow Bar */}
      <div
        className={`absolute inset-x-2 inset-y-1 rounded-full blur-md opacity-25 pointer-events-none ${
          isBatman
            ? 'bg-gradient-to-r from-amber-400 via-yellow-200 to-amber-500'
            : isDark
            ? 'bg-gradient-to-r from-amber-400 via-sky-200 to-amber-400'
            : 'bg-gradient-to-r from-amber-300 via-sky-300 to-amber-300'
        }`}
      />

      {/* Travelling Diamond Glint Star (ประกายเพชรวิ่งนำ) */}
      <div className="animate-diamond-glider z-20 flex items-center justify-center">
        {/* Diamond 4-point sparkle star SVG */}
        <svg
          className="w-5 h-5 drop-shadow-[0_0_8px_rgba(255,255,255,1)] drop-shadow-[0_0_15px_rgba(186,230,253,0.9)]"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 0L14.2 9.8L24 12L14.2 14.2L12 24L9.8 14.2L0 12L9.8 9.8L12 0Z"
            fill="url(#diamondStarGrad)"
          />
          <circle cx="12" cy="12" r="2.5" fill="#FFFFFF" />
          <defs>
            <linearGradient id="diamondStarGrad" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FFFFFF" />
              <stop offset="0.5" stopColor="#E0F2FE" />
              <stop offset="1" stopColor="#FDE68A" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Individual Graphemes with Cascading Diamond Glint Delay - Forced Single Line */}
      <p className={`relative z-10 text-[10px] min-[420px]:text-[11px] sm:text-xs md:text-[13.5px] font-semibold tracking-tight sm:tracking-normal text-center whitespace-nowrap ${baseTextColorClass}`}>
        {graphemes.map((char, index) => {
          // If whitespace, render normal space without animation
          if (char === ' ') {
            return (
              <span key={index} className="inline">
                {' '}
              </span>
            );
          }

          // Calculate delay so the sparkle travels slowly from left to right
          const delay = (index / totalChars) * sweepDuration;

          return (
            <span
              key={index}
              className="animate-diamond-glint inline-block"
              style={{
                animationDelay: `${delay.toFixed(3)}s`,
              }}
            >
              {char}
            </span>
          );
        })}
      </p>
    </div>
  );
};
