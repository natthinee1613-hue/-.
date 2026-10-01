import React from 'react';
import { PoliceEmblem } from './PoliceEmblem';
import { PoliceOfficer } from '../types/personnel';
import { AppTheme } from '../data/themes';
import { BookOpen, Printer, Shield, Users, Award, ChevronRight, FileSpreadsheet, Building2, Sparkles } from 'lucide-react';

interface DirectoryCoverProps {
  officers: PoliceOfficer[];
  onOpenDirectory: () => void;
  onOpenManagement: () => void;
  onSelectDivision: (division: string) => void;
  isPastelTheme?: boolean;
  currentTheme?: AppTheme;
}

export const DirectoryCover: React.FC<DirectoryCoverProps> = ({
  officers,
  onOpenDirectory,
  onOpenManagement,
  onSelectDivision,
  isPastelTheme = true,
  currentTheme,
}) => {
  // If currentTheme provided, determine pastel vs dark from it
  const isPastel = currentTheme ? !currentTheme.isDark : isPastelTheme;

  // Find key commanders
  const commander = officers.find((o) => o.positionLevel === 'ผบช.');
  const deputyCommanders = officers.filter((o) => o.positionLevel === 'รอง ผบช.');
  const divisionCommanders = officers.filter((o) => o.positionLevel === 'ผบก.');

  const totalPositions = officers.length;
  const occupiedCount = officers.filter((o) => !o.isVacant).length;
  const vacantCount = officers.filter((o) => o.isVacant).length;
  const commissionedCount = officers.filter((o) => o.commissionType === 'สัญญาบัตร').length;
  const nonCommissionedCount = officers.filter((o) => o.commissionType === 'ประทวน').length;

  const handlePrintCover = () => {
    window.print();
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Action Bar for Cover Mode */}
      <div
        className={`flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl border shadow-sm print:hidden ${
          isPastel
            ? 'bg-white/90 border-[#CBD5E1] text-slate-800'
            : 'bg-slate-900/80 border-slate-800 text-slate-100'
        }`}
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-600">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <h2 className={`text-base font-semibold font-['Chakra_Petch',sans-serif] ${isPastel ? 'text-slate-800' : 'text-slate-100'}`}>
              หน้าปกเอกสารทำเนียบกำลังพลทางการ
            </h2>
            <p className={`text-xs ${isPastel ? 'text-slate-500' : 'text-slate-400'}`}>
              สำนักงานกำลังพล สำนักงานตำรวจแห่งชาติ (สกพ.) ประจำปีงบประมาณ พ.ศ. ๒๕๖๙
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handlePrintCover}
            className={`flex items-center gap-2 px-3.5 py-2 text-xs font-medium rounded-lg border transition-colors cursor-pointer ${
              isPastel
                ? 'text-slate-700 bg-white hover:bg-slate-50 border-slate-300'
                : 'text-slate-200 bg-slate-800 hover:bg-slate-700 border-slate-700'
            }`}
          >
            <Printer className="w-4 h-4 text-amber-500" />
            พิมพ์หน้าปก / เอกสาร
          </button>
          <button
            onClick={onOpenDirectory}
            className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-slate-950 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 rounded-lg shadow-sm transition-all cursor-pointer"
          >
            <Users className="w-4 h-4" />
            เปิดดูรายชื่อทั้งหมด ({totalPositions} อัตรา)
          </button>
        </div>
      </div>

      {/* Official Directory Cover Book Page (Formatted for Standard A4 proportions & Print) */}
      <div
        className={`relative mx-auto max-w-[850px] rounded-2xl border-4 p-8 md:p-14 shadow-xl overflow-hidden print:p-8 print:border-amber-600 print:shadow-none print:max-w-none ${
          isPastel
            ? 'bg-gradient-to-b from-[#FFFDF8] via-[#FAF5EA] to-[#F5EEDD] border-[#D4AF37]/50 text-slate-800'
            : 'bg-gradient-to-b from-slate-950 via-[#0a1122] to-slate-950 border-amber-500/30 text-slate-100'
        }`}
      >
        {/* Subtle Ornamental Thai Gold Border */}
        <div
          className={`absolute inset-3 border-2 rounded-xl pointer-events-none ${
            isPastel ? 'border-[#D4AF37]/30' : 'border-amber-500/20'
          }`}
        />
        <div
          className={`absolute inset-5 border border-dashed rounded-lg pointer-events-none ${
            isPastel ? 'border-[#D4AF37]/20' : 'border-amber-500/15'
          }`}
        />

        {/* Four Decorative Corner Accents */}
        <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-amber-500 pointer-events-none" />
        <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-amber-500 pointer-events-none" />
        <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-amber-500 pointer-events-none" />
        <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-amber-500 pointer-events-none" />

        {/* Background radial glow behind emblem */}
        <div className="absolute top-28 left-1/2 -translate-x-1/2 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 text-center flex flex-col items-center">
          {/* Header Institution */}
          <div className="space-y-1 mb-6">
            <span
              className={`text-xs md:text-sm font-bold tracking-widest uppercase font-['Chakra_Petch',sans-serif] ${
                isPastel ? 'text-[#854D0E]' : 'text-amber-400/90'
              }`}
            >
              ROYAL THAI POLICE HEADQUARTERS
            </span>
            <div className="h-0.5 w-16 bg-gradient-to-r from-transparent via-amber-500 to-transparent mx-auto mt-1" />
          </div>

          {/* Golden Police Emblem */}
          <div className="mb-6 transform hover:scale-105 transition-transform duration-300 drop-shadow-[0_10px_25px_rgba(212,175,55,0.25)]">
            <PoliceEmblem size={135} />
          </div>

          {/* Main Book Title */}
          <div className="space-y-3 mb-8">
            <h1
              className={`text-3xl md:text-5xl font-bold tracking-tight font-['Chakra_Petch',sans-serif] ${
                isPastel
                  ? 'text-transparent bg-clip-text bg-gradient-to-r from-[#1E293B] via-[#0F172A] to-[#1E3A8A]'
                  : 'text-transparent bg-clip-text bg-gradient-to-r from-amber-100 via-amber-300 to-amber-100'
              }`}
            >
              ทำเนียบกำลังพลข้าราชการตำรวจ
            </h1>
            <div className="flex items-center justify-center gap-3">
              <span className={`h-px w-12 ${isPastel ? 'bg-[#D4AF37]' : 'bg-amber-500/40'}`} />
              <p
                className={`text-xl md:text-2xl font-bold font-['Sarabun',sans-serif] ${
                  isPastel ? 'text-[#854D0E]' : 'text-amber-400'
                }`}
              >
                สำนักงานกำลังพล
              </p>
              <span className={`h-px w-12 ${isPastel ? 'bg-[#D4AF37]' : 'bg-amber-500/40'}`} />
            </div>
            <p className={`text-sm md:text-base font-semibold ${isPastel ? 'text-slate-600' : 'text-slate-300'}`}>
              สำนักงานตำรวจแห่งชาติ
            </p>
          </div>

          {/* Year Banner */}
          <div
            className={`inline-flex items-center gap-2 px-6 py-2 rounded-full font-['Chakra_Petch',sans-serif] text-sm md:text-base font-bold mb-10 shadow-sm ${
              isPastel
                ? 'bg-[#FEF3C7] border border-[#FCD34D] text-[#78350F]'
                : 'bg-amber-500/10 border border-amber-500/30 text-amber-300 shadow-inner'
            }`}
          >
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>ประจำปีงบประมาณ พ.ศ. ๒๕๖๙</span>
          </div>

          {/* Commander in Chief Spotlight */}
          {commander && (
            <div
              className={`w-full max-w-xl mx-auto mb-10 p-5 rounded-2xl border shadow-md text-center ${
                isPastel
                  ? 'bg-gradient-to-b from-white via-[#FFFDF5] to-[#FEF7E6] border-[#E5C158]'
                  : 'bg-slate-900/90 border-amber-500/30 backdrop-blur-md'
              }`}
            >
              <div
                className={`text-xs uppercase tracking-wider font-bold mb-1.5 ${
                  isPastel ? 'text-[#854D0E]' : 'text-amber-400'
                }`}
              >
                ผู้บัญชาการ สำนักงานกำลังพล
              </div>
              <div
                className={`text-xl md:text-2xl font-bold ${
                  isPastel ? 'text-slate-900' : 'text-slate-100'
                }`}
              >
                {commander.rank} {commander.firstName} {commander.lastName}
              </div>
              <div className={`text-xs mt-1 ${isPastel ? 'text-slate-500' : 'text-slate-400'}`}>
                ตำแหน่งเลขที่: <span className="font-mono font-semibold text-amber-600">{commander.positionNumber}</span>
              </div>
            </div>
          )}

          {/* Deputy Commanders (รอง ผบช.) */}
          <div className="w-full max-w-2xl mb-10">
            <div
              className={`text-xs uppercase tracking-widest font-bold mb-3 ${
                isPastel ? 'text-[#1E3A8A]' : 'text-slate-400'
              }`}
            >
              รองผู้บัญชาการ สำนักงานกำลังพล
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {deputyCommanders.map((dep, idx) => (
                <div
                  key={dep.id}
                  className={`p-3 rounded-xl border text-center transition-all ${
                    isPastel
                      ? 'bg-white/90 border-[#DBEAFE] hover:border-[#60A5FA] shadow-2xs'
                      : 'bg-slate-900/60 border-slate-800 hover:border-amber-500/40'
                  }`}
                >
                  <div className={`text-xs font-bold mb-1 ${isPastel ? 'text-[#2563EB]' : 'text-amber-400'}`}>
                    รอง ผบช.สกพ. ({idx + 1})
                  </div>
                  <div className={`text-sm font-semibold ${isPastel ? 'text-slate-800' : 'text-slate-200'}`}>
                    {dep.rank} {dep.firstName}
                  </div>
                  <div className={`text-xs truncate ${isPastel ? 'text-slate-500' : 'text-slate-400'}`}>
                    {dep.lastName}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Division Heads (ผู้บังคับการกอง 3 หน่วยงานหลัก) */}
          <div className="w-full max-w-2xl mb-10">
            <div
              className={`text-xs uppercase tracking-widest font-bold mb-3 ${
                isPastel ? 'text-slate-700' : 'text-slate-400'
              }`}
            >
              ผู้บังคับการหน่วยงานในสังกัด สกพ.
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {divisionCommanders.map((cmd) => (
                <button
                  key={cmd.id}
                  onClick={() => onSelectDivision(cmd.division)}
                  className={`p-3 rounded-xl border text-center transition-all cursor-pointer group ${
                    isPastel
                      ? 'bg-white/90 border-slate-200 hover:border-amber-500 hover:bg-[#FEF9EE] shadow-2xs'
                      : 'bg-slate-900/60 border-slate-800 hover:border-amber-400 hover:bg-slate-850'
                  }`}
                >
                  <div
                    className={`text-xs font-bold mb-1 group-hover:text-amber-600 ${
                      isPastel ? 'text-[#854D0E]' : 'text-amber-400'
                    }`}
                  >
                    {cmd.division.replace(' สกพ.', '')}
                  </div>
                  <div className={`text-sm font-semibold ${isPastel ? 'text-slate-800' : 'text-slate-100'}`}>
                    {cmd.rank} {cmd.firstName}
                  </div>
                  <div className={`text-xs truncate ${isPastel ? 'text-slate-500' : 'text-slate-400'}`}>
                    {cmd.lastName}
                  </div>
                  <span className="inline-block mt-1 text-[10px] text-amber-600 group-hover:underline">
                    ดูทำเนียบกองนี้ &rarr;
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Key Quick Stats */}
          <div
            className={`grid grid-cols-2 sm:grid-cols-4 gap-3 w-full max-w-2xl border-t border-b py-4 mb-8 ${
              isPastel ? 'border-slate-200' : 'border-slate-800'
            }`}
          >
            <div className="text-center">
              <div className={`text-2xl font-bold font-mono tabular-nums ${isPastel ? 'text-[#854D0E]' : 'text-amber-300'}`}>
                {totalPositions}
              </div>
              <div className={`text-xs ${isPastel ? 'text-slate-500' : 'text-slate-400'}`}>กรอบอัตรากำลังทั้งหมด</div>
            </div>
            <div className="text-center">
              <div className={`text-2xl font-bold font-mono tabular-nums ${isPastel ? 'text-emerald-700' : 'text-emerald-400'}`}>
                {occupiedCount}
              </div>
              <div className={`text-xs ${isPastel ? 'text-slate-500' : 'text-slate-400'}`}>มีผู้ครองตำแหน่ง</div>
            </div>
            <div className="text-center">
              <div className={`text-2xl font-bold font-mono tabular-nums ${isPastel ? 'text-blue-700' : 'text-blue-400'}`}>
                {commissionedCount}
              </div>
              <div className={`text-xs ${isPastel ? 'text-slate-500' : 'text-slate-400'}`}>ชั้นสัญญาบัตร</div>
            </div>
            <div className="text-center">
              <div className={`text-2xl font-bold font-mono tabular-nums ${isPastel ? 'text-indigo-700' : 'text-indigo-400'}`}>
                {nonCommissionedCount}
              </div>
              <div className={`text-xs ${isPastel ? 'text-slate-500' : 'text-slate-400'}`}>ชั้นประทวน</div>
            </div>
          </div>

          {/* Footer Note */}
          <div className={`text-xs font-['Sarabun',sans-serif] space-y-1 ${isPastel ? 'text-slate-500' : 'text-slate-500'}`}>
            <p>ฝ่ายอำนวยการ สำนักงานกำลังพล อาคาร ๕ ชั้น ๗ สำนักงานตำรวจแห่งชาติ</p>
            <p>ถนนพระรามที่ ๑ แขวงปทุมวัน เขตปทุมวัน กรุงเทพมหานคร ๑๐๓๓๐</p>
          </div>
        </div>
      </div>

      {/* Directory Quick Navigation Cards in Police Pastel */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 print:hidden">
        <div
          onClick={() => onSelectDivision('สกพ.')}
          className={`p-5 rounded-2xl border transition-all cursor-pointer group shadow-2xs ${
            isPastel
              ? 'bg-[#F0F7FC] border-[#BAE6FD] hover:border-[#0284C7] hover:shadow-md'
              : 'bg-slate-900 border-slate-800 hover:border-amber-500'
          }`}
        >
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-xl bg-white shadow-2xs flex items-center justify-center text-[#0284C7] border border-[#BAE6FD]">
              <Shield className="w-5 h-5" />
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-[#0284C7] group-hover:translate-x-0.5 transition-all" />
          </div>
          <h3 className="font-bold text-slate-800 text-sm mb-1 group-hover:text-[#0284C7] transition-colors">
            ส่วนอำนวยการ สกพ. & กอ.รมน.
          </h3>
          <p className="text-xs text-slate-500">
            สำนักงานผู้บังคับบัญชา, ฝ่ายอำนวยการ สกพ., ปฏิบัติงาน กอ.รมน.
          </p>
        </div>

        <div
          onClick={() => onSelectDivision('กองอัตรากำลัง สกพ.')}
          className={`p-5 rounded-2xl border transition-all cursor-pointer group shadow-2xs ${
            isPastel
              ? 'bg-[#F2FBF7] border-[#A7F3D0] hover:border-[#059669] hover:shadow-md'
              : 'bg-slate-900 border-slate-800 hover:border-amber-500'
          }`}
        >
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-xl bg-white shadow-2xs flex items-center justify-center text-[#059669] border border-[#A7F3D0]">
              <Building2 className="w-5 h-5" />
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-[#059669] group-hover:translate-x-0.5 transition-all" />
          </div>
          <h3 className="font-bold text-slate-800 text-sm mb-1 group-hover:text-[#059669] transition-colors">
            กองอัตรากำลัง (อต.)
          </h3>
          <p className="text-xs text-slate-500">
            ฝ่ายวิเคราะห์ตำแหน่ง, ควบคุมอัตรากำลัง, มาตรฐานตำแหน่ง
          </p>
        </div>

        <div
          onClick={() => onSelectDivision('กองทะเบียนพล สกพ.')}
          className={`p-5 rounded-2xl border transition-all cursor-pointer group shadow-2xs ${
            isPastel
              ? 'bg-[#F4F6FD] border-[#C7D2FE] hover:border-[#4F46E5] hover:shadow-md'
              : 'bg-slate-900 border-slate-800 hover:border-amber-500'
          }`}
        >
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-xl bg-white shadow-2xs flex items-center justify-center text-[#4F46E5] border border-[#C7D2FE]">
              <Award className="w-5 h-5" />
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-[#4F46E5] group-hover:translate-x-0.5 transition-all" />
          </div>
          <h3 className="font-bold text-slate-800 text-sm mb-1 group-hover:text-[#4F46E5] transition-colors">
            กองทะเบียนพล (ทพ.)
          </h3>
          <p className="text-xs text-slate-500">
            ฝ่ายประวัติบุคคล, แต่งตั้ง, บรรจุ, ความชอบ, ประเมินบุคคล
          </p>
        </div>

        <div
          onClick={() => onSelectDivision('กองสวัสดิการ สกพ.')}
          className={`p-5 rounded-2xl border transition-all cursor-pointer group shadow-2xs ${
            isPastel
              ? 'bg-[#FDF3F5] border-[#FBCFE8] hover:border-[#DB2777] hover:shadow-md'
              : 'bg-slate-900 border-slate-800 hover:border-amber-500'
          }`}
        >
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-xl bg-white shadow-2xs flex items-center justify-center text-[#DB2777] border border-[#FBCFE8]">
              <Users className="w-5 h-5" />
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-[#DB2777] group-hover:translate-x-0.5 transition-all" />
          </div>
          <h3 className="font-bold text-slate-800 text-sm mb-1 group-hover:text-[#DB2777] transition-colors">
            กองสวัสดิการ (สก.)
          </h3>
          <p className="text-xs text-slate-500">
            ฝ่ายดนตรี, การเงิน, บ้านพัก, ฌาปนกิจ, สโมสร, กีฬา, อนุศาสนาจารย์
          </p>
        </div>
      </div>
    </div>
  );
};
