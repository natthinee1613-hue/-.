import React from 'react';

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
  const baseTextColorClass = isBatman
    ? 'text-[#FACC15]'
    : isDark
    ? 'text-amber-200'
    : 'text-[#78350F]';

  return (
    <div className={`relative inline-flex items-center justify-center py-1 px-3 max-w-full overflow-hidden select-none ${className}`}>
      <p className={`relative z-10 text-[10px] min-[420px]:text-[11px] sm:text-xs md:text-[13.5px] font-semibold tracking-tight sm:tracking-normal text-center whitespace-nowrap ${baseTextColorClass}`}>
        {text}
      </p>
    </div>
  );
};
