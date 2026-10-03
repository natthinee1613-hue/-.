import React from 'react';

export type ThaiKanokVariant =
  | 'commander'
  | 'deputies'
  | 'division'
  | 'card'
  | 'watermark';

export type ThaiKanokTone =
  | 'gold'
  | 'emerald'
  | 'sapphire'
  | 'ruby'
  | 'silver';

interface ThaiKanokPatternProps {
  className?: string;
  opacity?: number;
  variant?: ThaiKanokVariant;
  tone?: ThaiKanokTone;
}

export const ThaiKanokPattern: React.FC<ThaiKanokPatternProps> = ({
  className = '',
  opacity = 0.45,
  variant = 'commander',
  tone = 'gold',
}) => {
  // Color tone definition for gradient stops
  const getGradientColors = () => {
    switch (tone) {
      case 'emerald':
        return {
          c1: '#D1FAE5',
          c2: '#34D399',
          c3: '#10B981',
          c4: '#059669',
          c5: '#064E3B',
          glow: '#10B981',
        };
      case 'sapphire':
        return {
          c1: '#E0F2FE',
          c2: '#60A5FA',
          c3: '#3B82F6',
          c4: '#1D4ED8',
          c5: '#172554',
          glow: '#3B82F6',
        };
      case 'ruby':
        return {
          c1: '#FFE4E6',
          c2: '#FB7185',
          c3: '#F43F5E',
          c4: '#BE123C',
          c5: '#881337',
          glow: '#F43F5E',
        };
      case 'silver':
        return {
          c1: '#F8FAFC',
          c2: '#CBD5E1',
          c3: '#94A3B8',
          c4: '#475569',
          c5: '#1E293B',
          glow: '#94A3B8',
        };
      case 'gold':
      default:
        return {
          c1: '#FFF7CC',
          c2: '#FFE066',
          c3: '#F59E0B',
          c4: '#D97706',
          c5: '#92400E',
          glow: '#F59E0B',
        };
    }
  };

  const colors = getGradientColors();
  const gradId1 = `thaiKanokGrad1_${variant}_${tone}`;
  const gradId2 = `thaiKanokGrad2_${variant}_${tone}`;
  const auraId = `thaiKanokAura_${variant}_${tone}`;
  const latticeId = `thaiKanokLattice_${variant}_${tone}`;

  return (
    <div
      className={`absolute inset-0 pointer-events-none overflow-hidden select-none ${className}`}
      style={{ opacity }}
    >
      {/* 1. COMMANDER VARIANT (Large Horizontal Grand Banner) */}
      {variant === 'commander' && (
        <svg
          className="w-full h-full"
          viewBox="0 0 900 260"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id={gradId1} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={colors.c1} />
              <stop offset="20%" stopColor={colors.c2} />
              <stop offset="50%" stopColor={colors.c3} />
              <stop offset="80%" stopColor={colors.c4} />
              <stop offset="100%" stopColor={colors.c5} />
            </linearGradient>

            <linearGradient id={gradId2} x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={colors.c5} />
              <stop offset="40%" stopColor={colors.c4} />
              <stop offset="70%" stopColor={colors.c2} />
              <stop offset="100%" stopColor={colors.c1} />
            </linearGradient>

            <radialGradient id={auraId} cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor={colors.glow} stopOpacity="0.35" />
              <stop offset="50%" stopColor={colors.c4} stopOpacity="0.12" />
              <stop offset="100%" stopColor={colors.c5} stopOpacity="0" />
            </radialGradient>

            <pattern id={latticeId} width="60" height="60" patternUnits="userSpaceOnUse">
              <path
                d="M30 0 L60 30 L30 60 L0 30 Z"
                fill="none"
                stroke={`url(#${gradId1})`}
                strokeWidth="0.75"
                strokeOpacity="0.35"
              />
              <circle cx="30" cy="30" r="3.5" fill={`url(#${gradId1})`} fillOpacity="0.5" />
              <circle cx="30" cy="30" r="1.5" fill="#FFFBEB" />
              <circle cx="0" cy="0" r="2" fill={`url(#${gradId1})`} fillOpacity="0.4" />
              <circle cx="60" cy="0" r="2" fill={`url(#${gradId1})`} fillOpacity="0.4" />
              <circle cx="0" cy="60" r="2" fill={`url(#${gradId1})`} fillOpacity="0.4" />
              <circle cx="60" cy="60" r="2" fill={`url(#${gradId1})`} fillOpacity="0.4" />
            </pattern>

            {/* Master Kanok Flame */}
            <g id="masterKanokFlame">
              <path
                d="M0,0 
                   C35,5 70,25 95,55 
                   C120,85 135,125 140,165
                   C130,140 115,120 95,105
                   C115,130 120,165 110,195
                   C100,165 82,142 60,125
                   C75,150 78,180 68,208
                   C52,170 30,140 5,120
                   C18,140 22,168 15,195
                   C6,145 1,95 0,45 Z"
                fill={`url(#${gradId1})`}
              />
              <path
                d="M8,8
                   C30,14 55,30 75,52
                   C92,72 102,100 105,128
                   C96,108 85,92 70,80
                   C85,100 88,126 80,148
                   C68,125 52,108 35,96
                   C45,114 46,136 40,155
                   C28,125 16,100 5,82
                   C10,95 12,112 8,128
                   C3,90 2,50 8,8 Z"
                fill={`url(#${gradId2})`}
                stroke="#FFFBEB"
                strokeWidth="0.5"
              />
              <circle cx="42" cy="42" r="3.5" fill="#FFFBEB" />
              <circle cx="72" cy="68" r="2.8" fill="#FFFBEB" />
              <circle cx="100" cy="105" r="2.2" fill="#FFFBEB" />
            </g>

            {/* Phum Khao Bin Motif */}
            <g id="royalPhumKhaoBin">
              <path
                d="M-45,75 C-30,68 30,68 45,75 C35,82 -35,82 -45,75 Z"
                fill={`url(#${gradId2})`}
              />
              <path
                d="M0,-85
                   C15,-55 45,-25 45,15
                   C45,45 25,65 0,65
                   C-25,65 -45,45 -45,15
                   C-45,-25 -15,-55 0,-85 Z"
                fill={`url(#${gradId1})`}
                stroke="#FFFBEB"
                strokeWidth="1"
              />
              <circle cx="0" cy="15" r="6" fill="#FFFBEB" />
              <path
                d="M0,-85 L0,-115 L-3,-98 L0,-122 L3,-98 L0,-115 Z"
                fill={`url(#${gradId1})`}
              />
              <circle cx="0" cy="-122" r="2.5" fill="#FFFBEB" />
            </g>

            <g id="kraJangBorderUnit">
              <path
                d="M0,16 L12,0 L24,16 L18,16 C15,10 9,10 6,16 Z"
                fill={`url(#${gradId1})`}
                stroke="#FFFBEB"
                strokeWidth="0.5"
              />
            </g>
          </defs>

          <rect x="0" y="0" width="900" height="260" fill={`url(#${latticeId})`} opacity="0.4" />
          <ellipse cx="450" cy="130" rx="380" ry="110" fill={`url(#${auraId})`} />
          <use href="#masterKanokFlame" x="0" y="0" />
          <use href="#masterKanokFlame" x="900" y="0" transform="scale(-1, 1)" />
          <use href="#masterKanokFlame" x="0" y="260" transform="scale(1, -1)" />
          <use href="#masterKanokFlame" x="900" y="260" transform="scale(-1, -1)" />

          <g transform="translate(140, 130) scale(0.7)" opacity="0.75">
            <use href="#royalPhumKhaoBin" />
          </g>
          <g transform="translate(760, 130) scale(0.7)" opacity="0.75">
            <use href="#royalPhumKhaoBin" />
          </g>
          <g transform="translate(450, 130) scale(0.95)" opacity="0.38">
            <use href="#royalPhumKhaoBin" />
          </g>

          <g transform="translate(180, 4) scale(0.8)" opacity="0.65">
            {Array.from({ length: 28 }).map((_, i) => (
              <use key={i} href="#kraJangBorderUnit" x={i * 24} y="0" />
            ))}
          </g>
          <g transform="translate(180, 256) scale(0.8, -0.8)" opacity="0.65">
            {Array.from({ length: 28 }).map((_, i) => (
              <use key={i} href="#kraJangBorderUnit" x={i * 24} y="0" />
            ))}
          </g>
        </svg>
      )}

      {/* 2. DEPUTIES VARIANT (Horizontal Executive Box) */}
      {variant === 'deputies' && (
        <svg
          className="w-full h-full"
          viewBox="0 0 900 180"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id={gradId1} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={colors.c1} />
              <stop offset="30%" stopColor={colors.c2} />
              <stop offset="70%" stopColor={colors.c3} />
              <stop offset="100%" stopColor={colors.c5} />
            </linearGradient>

            <pattern id={latticeId} width="40" height="40" patternUnits="userSpaceOnUse">
              <path
                d="M20 0 L40 20 L20 40 L0 20 Z"
                fill="none"
                stroke={`url(#${gradId1})`}
                strokeWidth="0.6"
                strokeOpacity="0.3"
              />
              <circle cx="20" cy="20" r="2" fill={`url(#${gradId1})`} fillOpacity="0.4" />
            </pattern>

            {/* Corner Kanok Scroll */}
            <g id="deputyKanokCorner">
              <path
                d="M0,0 
                   C25,5 50,20 68,42 
                   C85,65 92,92 90,118
                   C82,100 70,85 55,75
                   C68,92 70,115 62,135
                   C52,112 38,96 22,86
                   C30,102 32,122 25,140
                   C15,112 5,78 0,40 Z"
                fill={`url(#${gradId1})`}
              />
              <circle cx="28" cy="28" r="2.5" fill="#FFFBEB" />
              <circle cx="50" cy="48" r="2" fill="#FFFBEB" />
            </g>

            {/* Royal Lotus Prajumyam (ประจำยาม) */}
            <g id="deputyPrajumyam">
              <circle cx="0" cy="0" r="10" fill={`url(#${gradId1})`} stroke="#FFFBEB" strokeWidth="0.8" />
              <circle cx="0" cy="0" r="4" fill="#FFFBEB" />
              {[0, 90, 180, 270].map((angle) => (
                <path
                  key={angle}
                  d="M 0 -8 C -7 -16, -10 -26, 0 -40 C 10 -26, 7 -16, 0 -8 Z"
                  fill={`url(#${gradId1})`}
                  transform={`rotate(${angle})`}
                />
              ))}
              {[45, 135, 225, 315].map((angle) => (
                <path
                  key={angle}
                  d="M 0 -6 C -5 -12, -7 -20, 0 -30 C 7 -20, 5 -12, 0 -6 Z"
                  fill={`url(#${gradId1})`}
                  opacity="0.8"
                  transform={`rotate(${angle})`}
                />
              ))}
            </g>
          </defs>

          <rect x="0" y="0" width="900" height="180" fill={`url(#${latticeId})`} opacity="0.35" />

          {/* 4 Corner Kanok Scrolls */}
          <use href="#deputyKanokCorner" x="0" y="0" />
          <use href="#deputyKanokCorner" x="900" y="0" transform="scale(-1, 1)" />
          <use href="#deputyKanokCorner" x="0" y="180" transform="scale(1, -1)" />
          <use href="#deputyKanokCorner" x="900" y="180" transform="scale(-1, -1)" />

          {/* Subtle Center Flank Prajumyam Watermarks */}
          <g transform="translate(180, 90) scale(0.65)" opacity="0.4">
            <use href="#deputyPrajumyam" />
          </g>
          <g transform="translate(720, 90) scale(0.65)" opacity="0.4">
            <use href="#deputyPrajumyam" />
          </g>
        </svg>
      )}

      {/* 3. DIVISION VARIANT (Vertical Card for Divisions) */}
      {variant === 'division' && (
        <svg
          className="w-full h-full"
          viewBox="0 0 400 650"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id={gradId1} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={colors.c1} />
              <stop offset="30%" stopColor={colors.c2} />
              <stop offset="70%" stopColor={colors.c3} />
              <stop offset="100%" stopColor={colors.c5} />
            </linearGradient>

            <pattern id={latticeId} width="40" height="40" patternUnits="userSpaceOnUse">
              <path
                d="M20 0 L40 20 L20 40 L0 20 Z"
                fill="none"
                stroke={`url(#${gradId1})`}
                strokeWidth="0.6"
                strokeOpacity="0.25"
              />
              <circle cx="20" cy="20" r="1.8" fill={`url(#${gradId1})`} fillOpacity="0.3" />
            </pattern>

            {/* Division Kanok Corner Flurry */}
            <g id="divKanokCorner">
              <path
                d="M0,0 
                   C22,4 44,16 60,35 
                   C75,54 82,75 80,98
                   C72,82 62,70 50,62
                   C60,76 62,95 55,110
                   C46,92 34,80 20,72
                   C26,85 28,100 22,115
                   C12,92 4,65 0,35 Z"
                fill={`url(#${gradId1})`}
              />
              <circle cx="24" cy="24" r="2.2" fill="#FFFBEB" />
              <circle cx="44" cy="42" r="1.8" fill="#FFFBEB" />
            </g>

            {/* Division Center Prajumyam Flower */}
            <g id="divPrajumyam">
              <circle cx="0" cy="0" r="12" fill={`url(#${gradId1})`} stroke="#FFFBEB" strokeWidth="0.8" />
              <circle cx="0" cy="0" r="5" fill="#FFFBEB" />
              {[0, 90, 180, 270].map((angle) => (
                <path
                  key={angle}
                  d="M 0 -10 C -8 -20, -12 -34, 0 -50 C 12 -34, 8 -20, 0 -10 Z"
                  fill={`url(#${gradId1})`}
                  transform={`rotate(${angle})`}
                />
              ))}
              {[45, 135, 225, 315].map((angle) => (
                <path
                  key={angle}
                  d="M 0 -8 C -6 -15, -8 -25, 0 -36 C 8 -25, 6 -15, 0 -8 Z"
                  fill={`url(#${gradId1})`}
                  opacity="0.8"
                  transform={`rotate(${angle})`}
                />
              ))}
            </g>
          </defs>

          <rect x="0" y="0" width="400" height="650" fill={`url(#${latticeId})`} opacity="0.3" />

          {/* Top-Left & Top-Right Kanok Corners */}
          <use href="#divKanokCorner" x="0" y="0" />
          <use href="#divKanokCorner" x="400" y="0" transform="scale(-1, 1)" />

          {/* Bottom-Left & Bottom-Right Kanok Corners */}
          <use href="#divKanokCorner" x="0" y="650" transform="scale(1, -1)" />
          <use href="#divKanokCorner" x="400" y="650" transform="scale(-1, -1)" />

          {/* Majestic Center Watermark Motif */}
          <g transform="translate(200, 325) scale(0.85)" opacity="0.22">
            <use href="#divPrajumyam" />
          </g>

          {/* Header Watermark Motif */}
          <g transform="translate(200, 60) scale(0.55)" opacity="0.35">
            <use href="#divPrajumyam" />
          </g>
        </svg>
      )}

      {/* 4. CARD / TILE VARIANT (For small cards, deputy officers, sub-division items) */}
      {variant === 'card' && (
        <svg
          className="w-full h-full"
          viewBox="0 0 200 120"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id={gradId1} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={colors.c1} />
              <stop offset="50%" stopColor={colors.c3} />
              <stop offset="100%" stopColor={colors.c5} />
            </linearGradient>

            <g id="miniCorner">
              <path
                d="M0,0 C15,2 30,10 40,24 C34,18 28,15 20,14 C26,20 28,28 25,36 C18,26 12,20 5,16 Z"
                fill={`url(#${gradId1})`}
              />
              <circle cx="12" cy="12" r="1.5" fill="#FFFBEB" />
            </g>
          </defs>

          <use href="#miniCorner" x="0" y="0" />
          <use href="#miniCorner" x="200" y="0" transform="scale(-1, 1)" />
          <use href="#miniCorner" x="0" y="120" transform="scale(1, -1)" />
          <use href="#miniCorner" x="200" y="120" transform="scale(-1, -1)" />
        </svg>
      )}

      {/* 5. WATERMARK VARIANT (Full Page / Canvas Background) */}
      {variant === 'watermark' && (
        <svg
          className="w-full h-full"
          viewBox="0 0 1200 800"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id={gradId1} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={colors.c1} />
              <stop offset="40%" stopColor={colors.c2} />
              <stop offset="80%" stopColor={colors.c3} />
              <stop offset="100%" stopColor={colors.c5} />
            </linearGradient>

            <pattern id={latticeId} width="80" height="80" patternUnits="userSpaceOnUse">
              <path
                d="M40 0 L80 40 L40 80 L0 40 Z"
                fill="none"
                stroke={`url(#${gradId1})`}
                strokeWidth="0.8"
                strokeOpacity="0.25"
              />
              <circle cx="40" cy="40" r="4" fill={`url(#${gradId1})`} fillOpacity="0.3" />
              <circle cx="40" cy="40" r="1.8" fill="#FFFBEB" />
              <circle cx="0" cy="0" r="2.5" fill={`url(#${gradId1})`} fillOpacity="0.2" />
              <circle cx="80" cy="0" r="2.5" fill={`url(#${gradId1})`} fillOpacity="0.2" />
              <circle cx="0" cy="80" r="2.5" fill={`url(#${gradId1})`} fillOpacity="0.2" />
              <circle cx="80" cy="80" r="2.5" fill={`url(#${gradId1})`} fillOpacity="0.2" />
            </pattern>
          </defs>

          <rect x="0" y="0" width="1200" height="800" fill={`url(#${latticeId})`} opacity="0.35" />
        </svg>
      )}
    </div>
  );
};
