import React from 'react';
import { THEMES, AppTheme } from '../data/themes';
import { X, Check, Palette, Sparkles, Sun, Moon } from 'lucide-react';

interface ThemeSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentThemeId: string;
  onSelectTheme: (themeId: string) => void;
}

export const ThemeSelectorModal: React.FC<ThemeSelectorModalProps> = ({
  isOpen,
  onClose,
  currentThemeId,
  onSelectTheme,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-[#F8FAFC] dark:bg-slate-950/80">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-400 to-blue-500 flex items-center justify-center text-white shadow-sm">
              <Palette className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-800 dark:text-slate-100 font-['Chakra_Petch',sans-serif]">
                เลือกชุดสีธีมทำเนียบและแผนผังกำลังพล
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                ปรับเปลี่ยนเฉดสีพาสเทลและสีทางการตำรวจได้ตามความต้องการในการใช้งาน
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Theme List Grid */}
        <div className="p-6 overflow-y-auto space-y-3.5 flex-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {THEMES.map((theme) => {
              const isSelected = theme.id === currentThemeId;
              return (
                <div
                  key={theme.id}
                  onClick={() => {
                    onSelectTheme(theme.id);
                  }}
                  className={`relative p-4 rounded-2xl border-2 transition-all cursor-pointer text-left flex flex-col justify-between group ${
                    isSelected
                      ? 'border-blue-600 dark:border-amber-400 bg-blue-50/40 dark:bg-slate-800/80 shadow-md ring-2 ring-blue-500/20'
                      : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-sm'
                  }`}
                >
                  <div>
                    {/* Top Row: Title & Badge */}
                    <div className="flex items-start justify-between gap-2 mb-1.5">
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="font-bold text-sm text-slate-900 dark:text-slate-100 font-['Chakra_Petch',sans-serif]">
                            {theme.name}
                          </span>
                          {theme.isDark ? (
                            <Moon className="w-3 h-3 text-amber-400" />
                          ) : (
                            <Sun className="w-3 h-3 text-amber-500" />
                          )}
                        </div>
                        <span className="text-[10px] text-slate-400 font-medium block">
                          {theme.englishName}
                        </span>
                      </div>

                      {isSelected && (
                        <div className="w-5 h-5 rounded-full bg-blue-600 dark:bg-amber-400 text-white dark:text-slate-950 flex items-center justify-center shrink-0">
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                        </div>
                      )}
                    </div>

                    {/* Description */}
                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-3">
                      {theme.description}
                    </p>
                  </div>

                  {/* Swatch preview bar */}
                  <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
                    <span className="text-[10px] text-slate-400 font-medium">พาเลทสี:</span>
                    <div className="flex items-center gap-1.5">
                      {theme.swatches.map((color, idx) => (
                        <span
                          key={idx}
                          className="w-4 h-4 rounded-full border border-black/10 shadow-2xs inline-block"
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 px-6 border-t border-slate-200 dark:border-slate-800 bg-[#F8FAFC] dark:bg-slate-950/80 flex items-center justify-between text-xs">
          <span className="text-slate-500 dark:text-slate-400">
            ระบบจะบันทึกธีมที่เลือกไว้ใช้งานอัตโนมัติ
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 dark:bg-amber-500 dark:text-slate-950 dark:hover:bg-amber-400 rounded-xl transition-colors cursor-pointer shadow-sm"
          >
            เสร็จสิ้น
          </button>
        </div>
      </div>
    </div>
  );
};
