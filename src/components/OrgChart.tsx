import React, { useState } from 'react';
import { PoliceOfficer } from '../types/personnel';
import { AppTheme } from '../data/themes';
import { PoliceEmblem } from './PoliceEmblem';
import { SubDivisionPersonnelModal } from './SubDivisionPersonnelModal';
import {
  Shield,
  ChevronDown,
  ChevronRight,
  User,
  Building2,
  Award,
  Users,
  Briefcase,
  FileCheck,
  HeartHandshake,
  Layers,
  Network,
  Sparkles,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  Search,
  X,
  Printer,
  SlidersHorizontal,
  Flame,
  Radio,
  Zap,
  Eye,
  EyeOff
} from 'lucide-react';

interface OrgChartProps {
  officers: PoliceOfficer[];
  onSelectSubDivision: (division: string, subDiv: string) => void;
  onViewOfficer: (officer: PoliceOfficer) => void;
  onEditOfficer?: (officer: PoliceOfficer) => void;
  onDeleteOfficer?: (officer: PoliceOfficer) => void;
  onAddOfficerToSubDiv?: (division: string, subDiv: string) => void;
  currentTheme: AppTheme;
}

// Exact match helper function ensuring count in OrgChart matches modal 100%
export const getSubDivisionOfficers = (
  allOfficers: PoliceOfficer[],
  divisionId: string,
  subDivName: string
): PoliceOfficer[] => {
  if (subDivName === '__ALL__') {
    return allOfficers.filter((o) => o.division === divisionId);
  }
  return allOfficers.filter(
    (o) => o.division === divisionId && o.subDivision.trim() === subDivName.trim()
  );
};

export const OrgChart: React.FC<OrgChartProps> = ({
  officers,
  onSelectSubDivision,
  onViewOfficer,
  onEditOfficer = () => {},
  onDeleteOfficer = () => {},
  onAddOfficerToSubDiv = () => {},
  currentTheme,
}) => {
  const [expandedDivisions, setExpandedDivisions] = useState<string[]>([
    'สกพ.',
    'กองอัตรากำลัง สกพ.',
    'กองทะเบียนพล สกพ.',
    'กองสวัสดิการ สกพ.',
  ]);

  // Interactive Feature: Search within OrgChart
  const [searchTerm, setSearchTerm] = useState('');

  // Interactive Feature: Bat-Signal / Aura Glow Toggle
  const [isBatSignalActive, setIsBatSignalActive] = useState(true);

  // Interactive Feature: Compact / Detailed View Mode
  const [isCompactMode, setIsCompactMode] = useState(false);

  // Interactive Feature: Division Filter Focus
  const [focusedDivision, setFocusedDivision] = useState<string>('all');

  // Selected sub-division for dedicated pop-up table view (completely isolated from other tables)
  const [selectedSubDiv, setSelectedSubDiv] = useState<{
    divisionId: string;
    divisionName: string;
    subDivName: string;
    subDivLabel: string;
  } | null>(null);

  const toggleDivision = (div: string) => {
    setExpandedDivisions((prev) =>
      prev.includes(div) ? prev.filter((d) => d !== div) : [...prev, div]
    );
  };

  const expandAll = () => {
    setExpandedDivisions(['สกพ.', 'กองอัตรากำลัง สกพ.', 'กองทะเบียนพล สกพ.', 'กองสวัสดิการ สกพ.']);
  };

  const collapseAll = () => {
    setExpandedDivisions([]);
  };

  const handlePrintOrgChart = () => {
    window.print();
  };

  const commander = officers.find((o) => o.positionLevel === 'ผบช.');
  const deputies = officers.filter((o) => o.positionLevel === 'รอง ผบช.');
  const cmdOfficeOfficers = officers.filter((o) => o.division === 'สกพ.' && o.subDivision === 'สกพ.');
  const cmdOfficeCount = cmdOfficeOfficers.length;

  // Complete official divisions & sub-divisions structure (covering all positions)
  const orgStructure = [
    {
      id: 'สกพ.' as const,
      name: 'ส่วนบังคับบัญชา และส่วนอำนวยการ สกพ.',
      shortName: 'สำนักงานผู้บังคับบัญชา สกพ.',
      code: 'ฝอ.สกพ.',
      icon: Shield,
      commander: deputies[0],
      subDivisions: [
        {
          name: 'สกพ.',
          label: 'สำนักงานผู้บังคับบัญชา สกพ.',
          desc: 'ผบช., รอง ผบช. ๓ ท่าน, และนายเวร (สว.นว. และ ผู้ช่วย นว.)',
        },
        {
          name: 'กอ.รมน.สกพ.',
          label: 'ปฏิบัติงาน กอ.รมน.สกพ.',
          desc: 'ประสานงานและปฏิบัติงานความมั่นคงภายในราชอาณาจักร',
        },
        {
          name: 'ฝ่ายอำนวยการ สกพ.',
          label: 'ฝ่ายอำนวยการ สกพ. (ฝอ.สกพ.)',
          desc: 'ธุรการ การเงิน กำลังพล ยุทธศาสตร์ และอำนวยการส่วนกลาง สกพ.',
        },
      ],
    },
    {
      id: 'กองอัตรากำลัง สกพ.' as const,
      name: 'กองอัตรากำลัง สำนักงานกำลังพล',
      shortName: 'กองอัตรากำลัง (อต.)',
      code: 'อต.',
      icon: Briefcase,
      commander: officers.find((o) => o.positionLevel === 'ผบก.' && o.division === 'กองอัตรากำลัง สกพ.'),
      subDivisions: [
        {
          name: 'กองอัตรากำลัง สกพ.',
          label: 'ผู้บังคับบัญชา กองอัตรากำลัง (อต.)',
          desc: 'ผบก.อต., รอง ผบก.อต., และฝ่ายบริหารงานกองอัตรากำลัง',
        },
        {
          name: 'ฝ่ายอำนวยการ อต.',
          label: 'ฝ่ายอำนวยการ (ฝอ.อต.)',
          desc: 'งานธุรการ สารบรรณ พัสดุ และอำนวยการ บก.อต.',
        },
        {
          name: 'ฝ่ายวางแผนอัตรากำลัง อต.',
          label: 'ฝ่ายวางแผนอัตรากำลัง',
          desc: 'วางแผนและกำหนดกรอบอัตรากำลังระยะยาวของ ตร.',
        },
        {
          name: 'ฝ่ายควบคุมอัตรากำลัง อต.',
          label: 'ฝ่ายควบคุมอัตรากำลัง',
          desc: 'ควบคุม ตรวจสอบ และบริหารการตัดโอนตำแหน่งกำลังพล',
        },
        {
          name: 'ฝ่ายวิเคราะห์ตำแหน่ง อต.',
          label: 'ฝ่ายวิเคราะห์ตำแหน่ง',
          desc: 'วิเคราะห์โครงสร้างหน่วยงานและการจัดตั้งหน่วยใหม่',
        },
        {
          name: 'ฝ่ายมาตรฐานตำแหน่ง อต.',
          label: 'ฝ่ายมาตรฐานตำแหน่ง',
          desc: 'กำหนดมาตรฐานคุณสมบัติและลักษณะงานเฉพาะตำแหน่ง',
        },
        {
          name: 'ฝ่ายเงินเพิ่มและเงินประจำตำแหน่ง อต.',
          label: 'ฝ่ายเงินเพิ่มและเงินประจำตำแหน่ง',
          desc: 'เงินเพิ่มและสิทธิประโยชน์ตามตำแหน่งหน้าที่',
        },
        {
          name: 'กลุ่มงานวิเคราะห์และพัฒนาระบบงาน อต.',
          label: 'กลุ่มงานวิเคราะห์และพัฒนาระบบงาน',
          desc: 'พัฒนาระบบงาน เทคโนโลยีสารสนเทศ และการบริหารทรัพยากรบุคคล',
        },
      ],
    },
    {
      id: 'กองทะเบียนพล สกพ.' as const,
      name: 'กองทะเบียนพล สำนักงานกำลังพล',
      shortName: 'กองทะเบียนพล (ทพ.)',
      code: 'ทพ.',
      icon: FileCheck,
      commander: officers.find((o) => o.positionLevel === 'ผบก.' && o.division === 'กองทะเบียนพล สกพ.'),
      subDivisions: [
        {
          name: 'กองทะเบียนพล สกพ.',
          label: 'ผู้บังคับบัญชา กองทะเบียนพล (ทพ.)',
          desc: 'ผบก.ทพ., รอง ผบก.ทพ., และฝ่ายบริหารงานกองทะเบียนพล',
        },
        {
          name: 'ฝ่ายอำนวยการ ทพ.',
          label: 'ฝ่ายอำนวยการ (ฝอ.ทพ.)',
          desc: 'งานธุรการ การเงิน พัสดุ และอำนวยการ บก.ทพ.',
        },
        {
          name: 'ฝ่ายประวัติบุคคล ทพ.',
          label: 'ฝ่ายประวัติบุคคล',
          desc: 'บันทึกประวัติ ก.พ.๗ ทะเบียนประวัติ และฐานข้อมูล ตร.',
        },
        {
          name: 'ฝ่ายแต่งตั้ง ทพ.',
          label: 'ฝ่ายแต่งตั้ง',
          desc: 'การแต่งตั้ง โยกย้าย และสับเปลี่ยนตำแหน่งข้าราชการตำรวจ',
        },
        {
          name: 'ฝ่ายบรรจุ ทพ.',
          label: 'ฝ่ายบรรจุ',
          desc: 'การบรรจุ คัดเลือก และรับโอนข้าราชการตำรวจ',
        },
        {
          name: 'ฝ่ายความชอบ ทพ.',
          label: 'ฝ่ายความชอบ',
          desc: 'การขอพระราชทานเครื่องราชอิสริยาภรณ์และเหรียญตรา',
        },
        {
          name: 'ฝ่ายประเมินบุคคลและผลงาน ทพ.',
          label: 'ฝ่ายประเมินบุคคลและผลงาน',
          desc: 'การประเมินผลการปฏิบัติราชการและเลื่อนระดับตำแหน่ง',
        },
        {
          name: 'ฝ่ายข้อมูลและสารสนเทศ ทพ.',
          label: 'ฝ่ายข้อมูลและสารสนเทศ',
          desc: 'ระบบสารสนเทศทะเบียนประวัติและฐานข้อมูลกำลังพล ตร.',
        },
        {
          name: 'กลุ่มงานระบบการแต่งตั้ง ทพ.',
          label: 'กลุ่มงานระบบการแต่งตั้ง',
          desc: 'พัฒนาระบบและมาตรฐานการแต่งตั้งโยกย้ายกำลังพล',
        },
      ],
    },
    {
      id: 'กองสวัสดิการ สกพ.' as const,
      name: 'กองสวัสดิการ สำนักงานกำลังพล',
      shortName: 'กองสวัสดิการ (สก.)',
      code: 'สก.',
      icon: HeartHandshake,
      commander: officers.find((o) => o.positionLevel === 'ผบก.' && o.division === 'กองสวัสดิการ สกพ.'),
      subDivisions: [
        {
          name: 'กองสวัสดิการ สกพ.',
          label: 'ผู้บังคับบัญชา กองสวัสดิการ (สก.)',
          desc: 'ผบก.สก., รอง ผบก.สก., และฝ่ายบริหารงานกองสวัสดิการ',
        },
        {
          name: 'ฝ่ายอำนวยการ สก.',
          label: 'ฝ่ายอำนวยการ (ฝอ.สก.)',
          desc: 'งานธุรการ การเงิน สารบรรณ และอำนวยการ บก.สก.',
        },
        {
          name: 'ฝ่ายสงเคราะห์และสิทธิประโยชน์ สก.',
          label: 'ฝ่ายสงเคราะห์และสิทธิประโยชน์',
          desc: 'การสงเคราะห์ข้าราชการตำรวจและครอบครัวผู้ประสบภัย',
        },
        {
          name: 'ฝ่ายสวัสดิการบ้านพัก สก.',
          label: 'ฝ่ายสวัสดิการบ้านพัก',
          desc: 'การจัดสรรและดูแลอาคารที่พักอาศัยข้าราชการตำรวจ',
        },
        {
          name: 'ฝ่ายการฌาปนกิจสงเคราะห์ สก.',
          label: 'ฝ่ายการฌาปนกิจสงเคราะห์',
          desc: 'กองทุนฌาปนกิจสงเคราะห์และการสงเคราะห์ครอบครัว',
        },
        {
          name: 'ฝ่ายสโมสรและสันทนาการ สก.',
          label: 'ฝ่ายสโมสรและสันทนาการ',
          desc: 'สโมสรตำรวจ กิจกรรมสันทนาการ และสถานที่พักฟื้น',
        },
        {
          name: 'ฝ่ายดนตรี สก.',
          label: 'ฝ่ายดนตรี (วงดุริยางค์ตำรวจ)',
          desc: 'วงดุริยางค์ตำรวจ งานพระราชพิธี และงานบรรเลงเกียรติยศ',
        },
        {
          name: 'ฝ่ายกีฬา สก.',
          label: 'ฝ่ายกีฬา',
          desc: 'การส่งเสริมการกีฬา พลศึกษา และนักกีฬาทีมชาติตำรวจ',
        },
        {
          name: 'กลุ่มงานอนุศาสนาจารย์ สก.',
          label: 'กลุ่มงานอนุศาสนาจารย์',
          desc: 'พิธีกรรมทางศาสนา จริยธรรม และการพัฒนาจิตใจ',
        },
      ],
    },
  ];

  const cmdTheme = currentTheme.orgChart.commander;
  const isBatman = currentTheme.id === 'batman-dark-knight';

  // Search match counts
  const cleanSearch = searchTerm.trim().toLowerCase();
  const matchedOfficersCount = cleanSearch
    ? officers.filter(
        (o) =>
          o.firstName.toLowerCase().includes(cleanSearch) ||
          o.lastName.toLowerCase().includes(cleanSearch) ||
          o.rank.toLowerCase().includes(cleanSearch) ||
          o.positionTitle.toLowerCase().includes(cleanSearch) ||
          o.division.toLowerCase().includes(cleanSearch) ||
          o.subDivision.toLowerCase().includes(cleanSearch) ||
          (o.positionNumber && o.positionNumber.toLowerCase().includes(cleanSearch))
      ).length
    : 0;

  return (
    <div className={`space-y-6 animate-fadeIn relative ${isBatman && isBatSignalActive ? 'batman-active-glow' : ''}`}>
      {/* Background Bat-Signal / Aura Glow Effect */}
      {isBatSignalActive && (
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-full max-w-4xl h-96 bg-gradient-to-b from-[#FFE500]/10 via-[#FFE500]/5 to-transparent rounded-full blur-3xl pointer-events-none -z-10 animate-pulse" />
      )}

      {/* Header Banner - Executive Modern Styling */}
      <div
        className={`flex flex-wrap items-center justify-between gap-5 p-6 rounded-3xl border shadow-lg transition-all relative overflow-hidden backdrop-blur-md ${
          isBatman
            ? 'bg-gradient-to-r from-[#0E0E14] via-[#12121A] to-[#0A0A0E] border-[#FFE500]/40 text-slate-100 shadow-[0_4px_25px_rgba(0,0,0,0.6)]'
            : currentTheme.isDark
            ? 'bg-gradient-to-r from-[#0F172A] via-[#1E293B] to-[#0F172A] border-slate-700/80 text-slate-100 shadow-xl'
            : 'bg-gradient-to-r from-white via-[#F8FAFC] to-[#F1F5F9] border-slate-200 text-slate-900 shadow-sm'
        }`}
      >
        {/* Subtle Accent Glow Top Line */}
        <div
          className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${
            isBatman
              ? 'from-[#FFE500] via-[#FACC15] to-[#FFE500]'
              : 'from-blue-600 via-amber-400 to-indigo-600'
          }`}
        />

        {/* Title & Classification Hierarchy */}
        <div className="flex items-center gap-4">
          <div
            className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-md border ${
              isBatman
                ? 'bg-[#181824] border-[#FFE500]/50 text-[#FFE500]'
                : currentTheme.isDark
                ? 'bg-slate-800 border-slate-700 text-amber-400'
                : 'bg-white border-slate-200 text-blue-700 shadow-xs'
            }`}
          >
            <Network className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-0.5">
              <span
                className={`text-[11px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${
                  isBatman
                    ? 'bg-[#FFE500]/15 text-[#FFE500] border-[#FFE500]/40'
                    : currentTheme.isDark
                    ? 'bg-amber-950/60 text-amber-300 border-amber-800/80'
                    : 'bg-blue-50 text-blue-700 border-blue-200'
                }`}
              >
                แผนผังโครงสร้างสายการบังคับบัญชา
              </span>
            </div>
            <h2
              className={`text-2xl sm:text-3xl font-black font-['Chakra_Petch',sans-serif] tracking-tight ${
                isBatman
                  ? 'text-[#FFE500] drop-shadow-[0_2px_10px_rgba(255,229,0,0.35)]'
                  : currentTheme.textMain
              }`}
            >
              สำนักงานกำลังพล (สกพ.)
            </h2>
            <div className={`text-xs sm:text-sm font-semibold tracking-wide flex flex-wrap items-center gap-2 mt-1 ${isBatman ? 'text-slate-300' : currentTheme.textMuted}`}>
              <span className="font-bold">สำนักงานตำรวจแห่งชาติ</span>
              <span className="opacity-40">•</span>
              <span className="font-mono text-[11px] px-2 py-0.5 rounded-full bg-slate-500/10 border border-slate-500/20 font-bold">
                รวม {officers.length} อัตรา
              </span>
            </div>
          </div>
        </div>

        {/* Action Controls & Interactive Tools */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
          {/* Compact vs Detailed Toggle */}
          <button
            type="button"
            onClick={() => setIsCompactMode(!isCompactMode)}
            className={`flex items-center gap-2 px-3.5 py-2 text-xs font-bold rounded-xl border transition-all cursor-pointer shadow-xs ${
              isCompactMode
                ? isBatman
                  ? 'bg-[#FFE500]/20 text-[#FFE500] border-[#FFE500]/60'
                  : currentTheme.isDark
                  ? 'bg-slate-800 text-amber-300 border-amber-500/40'
                  : 'bg-blue-50 text-blue-800 border-blue-300'
                : currentTheme.isDark
                ? 'bg-slate-850 border-slate-700 text-slate-200 hover:bg-slate-750'
                : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-50'
            }`}
          >
            {isCompactMode ? <Eye className="w-4 h-4 text-amber-400" /> : <SlidersHorizontal className="w-4 h-4 text-blue-500" />}
            <span>{isCompactMode ? 'มุมมองกะทัดรัด' : 'มุมมองเต็ม'}</span>
          </button>

          {/* Expand All */}
          <button
            type="button"
            onClick={expandAll}
            className={`flex items-center gap-2 px-3.5 py-2 text-xs font-bold rounded-xl border transition-all cursor-pointer shadow-xs ${
              currentTheme.isDark
                ? 'bg-slate-850 border-slate-700 text-slate-200 hover:bg-slate-750 hover:border-slate-600'
                : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-50 hover:border-slate-400'
            }`}
          >
            <Layers className="w-4 h-4 text-blue-500" />
            <span>ขยายทั้งหมด</span>
          </button>

          {/* Collapse All */}
          <button
            type="button"
            onClick={collapseAll}
            className={`flex items-center gap-2 px-3.5 py-2 text-xs font-bold rounded-xl border transition-all cursor-pointer shadow-xs ${
              currentTheme.isDark
                ? 'bg-slate-850 border-slate-700 text-slate-200 hover:bg-slate-750 hover:border-slate-600'
                : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-50 hover:border-slate-400'
            }`}
          >
            <span>ย่อทั้งหมด</span>
          </button>

          {/* Print button */}
          <button
            type="button"
            onClick={handlePrintOrgChart}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-xl border transition-all cursor-pointer shadow-sm print:hidden ${
              isBatman
                ? 'bg-[#FFE500] text-slate-950 border-[#FFE500] hover:bg-[#FACC15] shadow-[0_0_15px_rgba(255,229,0,0.35)]'
                : currentTheme.isDark
                ? 'bg-emerald-600 hover:bg-emerald-500 text-white border-emerald-500'
                : 'bg-emerald-700 hover:bg-emerald-800 text-white border-emerald-700'
            }`}
          >
            <Printer className="w-4 h-4" />
            <span>พิมพ์ผัง</span>
          </button>
        </div>
      </div>

      {/* Interactive HUD Control & Search Bar */}
      <div
        className={`p-4 rounded-2xl border shadow-xs transition-colors flex flex-wrap items-center justify-between gap-3 ${
          currentTheme.isDark
            ? 'bg-[#12121A]/90 border-[#262638]'
            : 'bg-slate-50 border-slate-200'
        }`}
      >
        {/* Instant Search in Org Chart */}
        <div className="relative flex-1 min-w-[260px] max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="ค้นหาชื่อตำแหน่ง, ยศ, ชื่อ-สกุล หรือฝ่ายในแผนผัง..."
            className={`w-full pl-9 pr-9 py-2 text-xs rounded-xl border transition-all ${
              currentTheme.isDark
                ? 'bg-[#09090D] border-[#2E2E3E] text-slate-100 placeholder-slate-500 focus:border-[#FFE500] focus:ring-1 focus:ring-[#FFE500]'
                : 'bg-white border-slate-300 text-slate-800 placeholder-slate-400 focus:border-blue-500'
            }`}
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-200"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Quick Filter by Division Pill Buttons */}
        <div className="flex flex-wrap items-center gap-1.5 text-xs">
          <span className={`text-[11px] font-bold ${currentTheme.textMuted} mr-1`}>เลือกแสดง:</span>
          {[
            { id: 'all', label: 'ทั้งหมด (๔ กอง)' },
            { id: 'สกพ.', label: 'ส่วนบังคับบัญชา / ฝอ.' },
            { id: 'กองอัตรากำลัง สกพ.', label: 'กองอัตรากำลัง (อต.)' },
            { id: 'กองทะเบียนพล สกพ.', label: 'กองทะเบียนพล (ทพ.)' },
            { id: 'กองสวัสดิการ สกพ.', label: 'กองสวัสดิการ (สก.)' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setFocusedDivision(item.id)}
              className={`px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                focusedDivision === item.id
                  ? isBatman
                    ? 'bg-[#FFE500] text-slate-950 border-[#FFE500] shadow-[0_0_10px_rgba(255,229,0,0.3)]'
                    : 'bg-blue-600 text-white border-blue-600 shadow-xs'
                  : currentTheme.isDark
                  ? 'bg-[#171722] border-[#2A2A3C] text-slate-300 hover:border-[#FFE500]/50'
                  : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-100'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {searchTerm && (
          <div className="w-full text-xs font-semibold text-amber-400 flex items-center gap-1.5 pt-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>พบผลการค้นหา {matchedOfficersCount} รายการในแผนผัง</span>
          </div>
        )}
      </div>

      {/* Level 1: Commander in Chief (ผบช.สกพ.) */}
      <div className="max-w-3xl mx-auto text-center relative">
        {commander && (
          <div
            onClick={() => onViewOfficer(commander)}
            className={`group relative p-5 rounded-3xl ${cmdTheme.bg} border-2 ${cmdTheme.border} shadow-xl hover:scale-[1.02] transition-all cursor-pointer overflow-hidden ${
              isBatman && isBatSignalActive ? 'ring-2 ring-[#FFE500]/50' : ''
            }`}
          >
            {/* Bat-Signal Glow in card */}
            {isBatman && isBatSignalActive && (
              <div className="absolute -top-12 -right-12 w-32 h-32 bg-[#FFE500]/15 rounded-full blur-xl pointer-events-none animate-pulse" />
            )}

            <div className={`text-xs font-bold mb-1.5 ${cmdTheme.subtext}`}>
              ผู้บัญชาการ สำนักงานกำลังพล (ผบช.สกพ.)
            </div>

            <div className={`text-xl md:text-2xl font-bold ${cmdTheme.text}`}>
              {commander.rank} {commander.firstName} {commander.lastName}
            </div>
          </div>
        )}

        {/* Quick Link to Commander Office Personnel (7 officers) */}
        <div className="mt-2 text-center">
          <button
            onClick={() =>
              setSelectedSubDiv({
                divisionId: 'สกพ.',
                divisionName: 'ส่วนบังคับบัญชา และส่วนอำนวยการ สกพ.',
                subDivName: 'สกพ.',
                subDivLabel: 'สำนักงานผู้บังคับบัญชา สกพ. (ผบช., รอง ผบช., และนายเวร)',
              })
            }
            className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold border transition-all shadow-xs cursor-pointer ${
              isBatman
                ? 'bg-[#151520] border-[#FFE500]/50 text-[#FFE500] hover:bg-[#FFE500] hover:text-slate-950'
                : currentTheme.isDark
                ? 'bg-amber-950/40 border-amber-800 text-amber-300 hover:bg-amber-900/60'
                : 'bg-amber-50 border-amber-300 text-amber-900 hover:bg-amber-100'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>สายบังคับบัญชา สำนักงานกำลังพล</span>
            <ExternalLink className="w-3 h-3" />
          </button>
        </div>

        {/* Hierarchy Connector Trunk with Pulsing Energy Stream */}
        <div className="flex flex-col items-center my-1">
          <div className={`w-0.5 h-5 ${isBatman ? 'bg-[#FFE500]' : 'bg-amber-500/50'} relative`}>
            <div className="absolute inset-0 bg-[#FFE500] animate-ping opacity-75" />
          </div>
          <div className={`w-3.5 h-3.5 rounded-full ${isBatman ? 'bg-[#FFE500] shadow-[0_0_10px_#FFE500]' : 'bg-amber-500'} ring-4 ring-amber-200/50 dark:ring-amber-900/50`} />
          <div className={`w-0.5 h-5 ${isBatman ? 'bg-[#FFE500]' : 'bg-amber-500/50'}`} />
        </div>

        {/* Level 2: Deputy Commanders */}
        <div
          className={`p-4 rounded-2xl border shadow-md ${currentTheme.orgChart.deputiesBg} ${currentTheme.orgChart.deputiesBorder}`}
        >
          <div className={`text-xs font-bold uppercase tracking-wider mb-3 flex items-center justify-center gap-2 ${currentTheme.orgChart.deputiesText}`}>
            <span>รองผู้บัญชาการ สำนักงานกำลังพล</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            {deputies.map((dep) => {
              const isMatch = cleanSearch && (
                dep.firstName.toLowerCase().includes(cleanSearch) ||
                dep.lastName.toLowerCase().includes(cleanSearch) ||
                dep.rank.toLowerCase().includes(cleanSearch) ||
                dep.positionTitle.toLowerCase().includes(cleanSearch)
              );
              return (
                <div
                  key={dep.id}
                  onClick={() => onViewOfficer(dep)}
                  className={`p-3.5 rounded-2xl border transition-all cursor-pointer text-center group flex flex-col justify-between hover:scale-[1.02] shadow-xs ${
                    isMatch
                      ? 'border-[#FFE500] bg-[#FFE500]/10 ring-2 ring-[#FFE500] scale-105'
                      : currentTheme.isDark
                      ? 'bg-slate-900/90 border-slate-700/80 hover:border-amber-400'
                      : 'bg-white border-slate-200 hover:border-blue-400 hover:shadow-xs'
                  }`}
                >
                  <div>
                    <div className={`text-[11px] font-bold mb-1 ${currentTheme.orgChart.deputiesText}`}>
                      {dep.positionTitle || 'รองผู้บัญชาการ สำนักงานกำลังพล'}
                    </div>
                    <div className={`font-bold text-sm leading-snug ${currentTheme.textMain}`}>
                      {dep.rank} {dep.firstName} {dep.lastName}
                    </div>
                  </div>
                  <div className="text-[10px] text-blue-600 dark:text-amber-400 opacity-80 group-hover:opacity-100 transition-opacity mt-2 flex items-center justify-center gap-1 font-semibold">
                    <span>คลิกดูประวัติ</span>
                    <span>&rarr;</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Trunk down to divisions */}
        <div className={`w-0.5 h-8 ${isBatman ? 'bg-[#FFE500]/70' : 'bg-slate-300 dark:bg-slate-700'} mx-auto`} />
      </div>

      {/* Level 3: Main Divisions in Theme Palettes */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-start">
        {(() => {
          const knownDivIds = new Set(orgStructure.map((s) => s.id as string));
          const dynamicDivisions = Array.from(
            new Set(officers.map((o) => o.division).filter((div) => div && !knownDivIds.has(div)))
          ).map((customDiv) => {
            const customDivOfficers = officers.filter((o) => o.division === customDiv);
            const distinctSubs = Array.from(new Set(customDivOfficers.map((o) => o.subDivision))).map((sub) => ({
              name: sub,
              label: sub,
              desc: `หน่วยงานในสังกัด ${customDiv}`,
            }));
            return {
              id: customDiv as any,
              name: customDiv,
              shortName: customDiv.replace(' สกพ.', ''),
              code: customDiv.slice(0, 4),
              icon: Building2,
              commander: customDivOfficers.find((o) => o.positionLevel === 'ผบก.' || o.positionLevel === 'ผกก.'),
              subDivisions: distinctSubs,
            };
          });

          const allBranches = [...orgStructure, ...dynamicDivisions];
          if (focusedDivision === 'all') return allBranches;
          return allBranches.filter((b) => b.id === focusedDivision);
        })().map((branch) => {
          const isExpanded = expandedDivisions.includes(branch.id);
          const totalInBranch = officers.filter((o) => o.division === branch.id).length;
          const occupiedInBranch = officers.filter((o) => o.division === branch.id && !o.isVacant).length;
          const vacantInBranch = totalInBranch - occupiedInBranch;
          const BranchIcon = branch.icon;
          const divTheme =
            currentTheme.orgChart.divisions[branch.id as keyof typeof currentTheme.orgChart.divisions] ||
            currentTheme.orgChart.divisions['สกพ.'];

          // Auto-discover any extra sub-divisions if user added or imported customized data
          const knownSubNames = new Set(branch.subDivisions.map((s) => s.name.trim()));
          const dynamicSubs = Array.from(
            new Set(
              officers
                .filter((o) => o.division === branch.id && !knownSubNames.has(o.subDivision.trim()))
                .map((o) => o.subDivision.trim())
            )
          ).map((subName) => ({
            name: subName,
            label: subName,
            desc: `ฝ่ายงานในสังกัด ${branch.name}`,
          }));

          // ลบฝ่ายที่มีอัตราเป็น 0 ออกจากแผนผังทั้งหมด
          const allSubDivisions = [...branch.subDivisions, ...dynamicSubs].filter((sub) => {
            const subOfficers = getSubDivisionOfficers(officers, branch.id, sub.name);
            return subOfficers.length > 0;
          });

          return (
            <div
              key={branch.id}
              className={`rounded-3xl border-2 transition-all shadow-md flex flex-col overflow-hidden relative ${divTheme.bg} ${divTheme.border} ${
                isBatman && isBatSignalActive ? 'hover:shadow-[0_0_20px_rgba(255,229,0,0.2)]' : ''
              }`}
            >
              {/* Top Accent Color Bar */}
              <div className={`h-1.5 w-full bg-gradient-to-r ${divTheme.bar}`} />

              {/* Division Header */}
              <div className={`p-4 border-b border-black/5 dark:border-white/5 flex items-center justify-between ${divTheme.header}`}>
                <div
                  onClick={() => toggleDivision(branch.id)}
                  className="flex items-center gap-2.5 cursor-pointer flex-1 group"
                >
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs shadow-2xs border ${divTheme.badge}`}>
                    <BranchIcon className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className={`font-bold text-sm leading-tight transition-colors ${divTheme.text}`}>
                      {branch.shortName}
                    </h3>
                    <span className={`text-[10px] font-mono ${currentTheme.textMuted}`}>
                      {totalInBranch} อัตรา (ครอง {occupiedInBranch})
                    </span>
                  </div>
                </div>

                {/* View whole division button */}
                <button
                  type="button"
                  onClick={() => {
                    setSelectedSubDiv({
                      divisionId: branch.id,
                      divisionName: branch.name,
                      subDivName: '__ALL__',
                      subDivLabel: `บุคลากรทั้งหมดในสังกัด ${branch.name}`,
                    });
                  }}
                  className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-[10px] font-bold border transition-all cursor-pointer ${
                    isBatman
                      ? 'bg-[#151520] border-[#FFE500]/40 text-[#FFE500] hover:bg-[#FFE500] hover:text-slate-950'
                      : currentTheme.isDark
                      ? 'bg-slate-800 border-slate-700 text-blue-300 hover:bg-slate-700'
                      : 'bg-white border-slate-300 text-blue-700 hover:bg-blue-50'
                  }`}
                  title={`คลิกเพื่อดูรายชื่อทั้งหมด ${totalInBranch} อัตราในกองนี้`}
                >
                  <span>ดูทั้งกอง ({totalInBranch})</span>
                  <ExternalLink className="w-2.5 h-2.5" />
                </button>
              </div>

              {/* Division Commander Pill */}
              {branch.commander && (
                <div
                  onClick={() => onViewOfficer(branch.commander!)}
                  className={`mx-3 my-2.5 p-2.5 rounded-xl border transition-all cursor-pointer text-xs shadow-2xs group ${
                    currentTheme.isDark
                      ? 'bg-slate-950/80 border-slate-800 hover:border-amber-400'
                      : 'bg-white/95 border-slate-200 hover:border-blue-400'
                  }`}
                >
                  <div className="flex items-center justify-between text-[10px] mb-0.5">
                    <span className={`font-bold ${divTheme.text}`}>
                      ผู้บังคับการหน่วย (ผบก.)
                    </span>
                    <span className={`font-mono text-[10px] ${currentTheme.textMuted}`}>
                      {branch.commander.positionTitle}
                    </span>
                  </div>
                  <div className={`font-bold text-xs ${currentTheme.textMain}`}>
                    {branch.commander.rank} {branch.commander.firstName} {branch.commander.lastName}
                  </div>
                  <div className="text-[10px] text-blue-600 dark:text-amber-400 opacity-0 group-hover:opacity-100 transition-opacity mt-1">
                    คลิกดูประวัติเต็ม &rarr;
                  </div>
                </div>
              )}

              {/* Sub-divisions list: Clicking ANY sub-division displays ONLY that sub-division with EXACT count */}
              {isExpanded && (
                <div className={`p-3 space-y-2 flex-1 ${isCompactMode ? 'space-y-1.5' : ''}`}>
                  <div className={`flex items-center justify-between text-[10px] font-bold uppercase tracking-wider px-1 mb-1 ${currentTheme.textMuted}`}>
                    <span>ฝ่าย / กลุ่มงานในสังกัด:</span>
                    <span>คลิกเพื่อดูรายชื่อ</span>
                  </div>

                  {allSubDivisions.map((sub) => {
                    const subOfficers = getSubDivisionOfficers(officers, branch.id, sub.name);
                    const subCount = subOfficers.length;
                    const subOccupied = subOfficers.filter((o) => !o.isVacant).length;
                    const subVacant = subCount - subOccupied;

                    const isMatch = cleanSearch && (
                      sub.label.toLowerCase().includes(cleanSearch) ||
                      sub.name.toLowerCase().includes(cleanSearch) ||
                      subOfficers.some(
                        (o) =>
                          o.firstName.toLowerCase().includes(cleanSearch) ||
                          o.lastName.toLowerCase().includes(cleanSearch) ||
                          o.rank.toLowerCase().includes(cleanSearch) ||
                          o.positionTitle.toLowerCase().includes(cleanSearch)
                      )
                    );

                    return (
                      <div
                        key={sub.name}
                        onClick={() =>
                          setSelectedSubDiv({
                            divisionId: branch.id,
                            divisionName: branch.name,
                            subDivName: sub.name,
                            subDivLabel: sub.label,
                          })
                        }
                        className={`p-2.5 rounded-xl border transition-all cursor-pointer flex flex-col justify-between group shadow-2xs hover:scale-[1.01] ${divTheme.subItem} ${
                          isMatch ? 'border-[#FFE500] ring-2 ring-[#FFE500] bg-[#FFE500]/10 scale-[1.02]' : ''
                        }`}
                      >
                        <div className="flex items-start justify-between gap-1.5 mb-1">
                          <span className="font-bold text-xs transition-colors line-clamp-1">
                            {sub.label}
                          </span>
                          <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border ${divTheme.badge} shrink-0`}>
                            {subCount} อัตรา
                          </span>
                        </div>

                        {!isCompactMode && (
                          <p className={`text-[10px] line-clamp-1 ${currentTheme.textMuted}`}>
                            {sub.desc}
                          </p>
                        )}

                        <div className="mt-1.5 pt-1.5 border-t border-black/5 dark:border-white/5 flex items-center justify-between text-[10px]">
                          <span className={currentTheme.textMuted}>
                            ครอง {subOccupied} {subVacant > 0 && `· ว่าง ${subVacant}`}
                          </span>
                          <span className={`font-bold ${divTheme.text} group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5`}>
                            คลิกดู {subCount} อัตรา &rarr;
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Sub-Division Dedicated Personnel Modal (Self-contained, shows ONLY selected unit without affecting other tables) */}
      {selectedSubDiv && (
        <SubDivisionPersonnelModal
          isOpen={!!selectedSubDiv}
          onClose={() => setSelectedSubDiv(null)}
          divisionId={selectedSubDiv.divisionId}
          divisionName={selectedSubDiv.divisionName}
          subDivName={selectedSubDiv.subDivName}
          subDivLabel={selectedSubDiv.subDivLabel}
          officers={officers}
          onViewOfficer={onViewOfficer}
          onEditOfficer={onEditOfficer}
          onDeleteOfficer={onDeleteOfficer}
          onAddOfficerToSubDiv={(div, sub) => {
            onAddOfficerToSubDiv(div, sub);
          }}
          onOpenInMainTable={(div, sub) => {
            setSelectedSubDiv(null);
            onSelectSubDivision(div, sub);
          }}
          currentTheme={currentTheme}
        />
      )}
    </div>
  );
};
