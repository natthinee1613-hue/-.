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
  Sparkles,
  ExternalLink,
  CheckCircle2,
  AlertCircle
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
          desc: 'นโยบาย ยุทธศาสตร์ แผนงาน สารบรรณ และการบังคับบัญชา',
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
          desc: 'ธุรการ กำลังพล และการอำนวยการ บก.อต.',
        },
        {
          name: 'ฝ่ายควบคุมอัตรากำลัง อต.',
          label: 'ฝ่ายควบคุมอัตรากำลัง',
          desc: 'บริหาร ควบคุม และจัดสรรกรอบอัตรากำลัง ตร.',
        },
        {
          name: 'ฝ่ายวิเคราะห์ตำแหน่ง 1 อต.',
          label: 'ฝ่ายวิเคราะห์ตำแหน่ง ๑',
          desc: 'วิเคราะห์กำหนดและปรับปรุงโครงสร้างตำแหน่งกลุ่ม ๑',
        },
        {
          name: 'ฝ่ายวิเคราะห์ตำแหน่ง 2 อต.',
          label: 'ฝ่ายวิเคราะห์ตำแหน่ง ๒',
          desc: 'วิเคราะห์กำหนดและปรับปรุงโครงสร้างตำแหน่งกลุ่ม ๒',
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
          desc: 'การเลื่อนขั้นเงินเดือน เครื่องราชอิสริยาภรณ์ และบำเหน็จความชอบ',
        },
        {
          name: 'ฝ่ายประเมินบุคคล ทพ.',
          label: 'ฝ่ายประเมินบุคคล',
          desc: 'การประเมินสมรรถนะ ประเมินผลงาน และคุณลักษณะบุคคล',
        },
        {
          name: 'กลุ่มงานพัฒนาทรัพยากรบุคคล ทพ.',
          label: 'กลุ่มงานพัฒนาทรัพยากรบุคคล',
          desc: 'ฝึกอบรม พัฒนาศักยภาพ และส่งเสริมเส้นทางความก้าวหน้า',
        },
        {
          name: 'สำรองราชการ กองทะเบียนพล',
          label: 'สำรองราชการ กองทะเบียนพล',
          desc: 'อัตราประจำหรือสำรองราชการในสังกัด ทพ.',
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
          desc: 'อำนวยการ ประสานงานสวัสดิการ และบริหารทั่วไป',
        },
        {
          name: 'ฝ่ายการจัดสวัสดิการ สก.',
          label: 'ฝ่ายการจัดสวัสดิการ',
          desc: 'การจัดสวัสดิการข้าราชการตำรวจและครอบครัว',
        },
        {
          name: 'ฝ่ายสวัสดิการการเงิน สก.',
          label: 'ฝ่ายสวัสดิการการเงิน',
          desc: 'กองทุนสวัสดิการ สินเชื่อ และการกู้ยืมเพื่อตำรวจ',
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

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header Banner */}
      <div
        className={`flex flex-wrap items-center justify-between gap-4 p-5 rounded-2xl border shadow-xs transition-colors ${
          currentTheme.isDark
            ? 'bg-slate-900/90 border-slate-800 text-slate-100'
            : 'bg-white/95 border-slate-200 text-slate-800'
        }`}
      >
        <div className="flex items-center gap-3.5">
          <div
            className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-xs border ${
              currentTheme.isDark ? 'bg-slate-950 border-slate-800' : 'bg-white border-slate-200'
            }`}
          >
            <PoliceEmblem size={38} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span
                className={`text-[11px] font-bold tracking-wider px-2.5 py-0.5 rounded-full border ${
                  currentTheme.isDark
                    ? 'bg-amber-950/80 text-amber-300 border-amber-800'
                    : 'bg-blue-50 text-blue-700 border-blue-200'
                }`}
              >
                โครงสร้างการจัดหน่วย
              </span>
              <span className={`text-xs ${currentTheme.textMuted}`}>
                คลิกเลือกฝ่ายไหน จะแสดงข้อมูลเฉพาะฝ่ายนั้นตามจำนวนจริง (ไม่กระทบตารางอื่น)
              </span>
            </div>
            <h2 className={`text-lg md:text-xl font-bold font-['Chakra_Petch',sans-serif] mt-0.5 ${currentTheme.textMain}`}>
              แผนผังสายการบังคับบัญชา และโครงสร้างส่วนราชการ ๔ หน่วยงาน
            </h2>
          </div>
        </div>

        {/* Expand / Collapse Control Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={expandAll}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-xl border transition-colors cursor-pointer shadow-2xs ${
              currentTheme.isDark
                ? 'bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-750'
                : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-50'
            }`}
          >
            <Layers className="w-3.5 h-3.5 text-blue-500" />
            ขยายทั้งหมด
          </button>
          <button
            onClick={collapseAll}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-xl border transition-colors cursor-pointer shadow-2xs ${
              currentTheme.isDark
                ? 'bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-750'
                : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-50'
            }`}
          >
            ย่อทั้งหมด
          </button>
        </div>
      </div>

      {/* Level 1: Commander in Chief (ผบช.สกพ.) */}
      <div className="max-w-xl mx-auto text-center relative">
        {commander && (
          <div
            onClick={() => onViewOfficer(commander)}
            className={`group relative p-5 rounded-3xl ${cmdTheme.bg} border-2 ${cmdTheme.border} shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all cursor-pointer`}
          >
            {/* Crown ornament */}
            <div
              className={`absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full text-[10px] font-bold tracking-wider shadow-sm flex items-center gap-1 font-['Chakra_Petch',sans-serif] ${cmdTheme.badge}`}
            >
              <Sparkles className="w-3 h-3" />
              ผู้บังคับบัญชาสูงสุดของหน่วย
            </div>

            <div className={`flex items-center justify-center gap-2 text-xs font-bold mt-1 mb-1 ${cmdTheme.subtext}`}>
              <Shield className="w-4 h-4" />
              <span>ผู้บัญชาการ สำนักงานกำลังพล (ผบช.สกพ.)</span>
            </div>

            <div className={`text-xl md:text-2xl font-bold ${cmdTheme.text}`}>
              {commander.rank} {commander.firstName} {commander.lastName}
            </div>

            <div className={`text-xs mt-1 font-mono font-medium ${cmdTheme.subtext}`}>
              เลขตำแหน่ง: <span className="font-bold underline">{commander.positionNumber}</span>
            </div>

            <div className={`mt-3 pt-2.5 border-t border-black/10 dark:border-white/10 flex items-center justify-center gap-4 text-[11px] ${cmdTheme.subtext}`}>
              <span>สถานะ: มีผู้ครองตำแหน่ง</span>
              <span>·</span>
              <span className="font-bold group-hover:underline">คลิกดูประวัติเต็ม &rarr;</span>
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
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold border transition-colors shadow-2xs cursor-pointer ${
              currentTheme.isDark
                ? 'bg-amber-950/40 border-amber-800 text-amber-300 hover:bg-amber-900/60'
                : 'bg-amber-50 border-amber-300 text-amber-900 hover:bg-amber-100'
            }`}
          >
            <Users className="w-3 h-3" />
            <span>ดูทำเนียบสำนักงานผู้บังคับบัญชา สกพ. ({cmdOfficeCount} อัตรา)</span>
            <ExternalLink className="w-2.5 h-2.5" />
          </button>
        </div>

        {/* Hierarchy Connector Trunk */}
        <div className="flex flex-col items-center">
          <div className="w-0.5 h-5 bg-amber-500/50" />
          <div className="w-3 h-3 rounded-full bg-amber-500 ring-4 ring-amber-200/50 dark:ring-amber-900/50" />
          <div className="w-0.5 h-5 bg-amber-500/50" />
        </div>

        {/* Level 2: Deputy Commanders (รอง ผบช.สกพ. {deputies.length} ท่าน) */}
        <div
          className={`p-3.5 rounded-2xl border shadow-2xs ${currentTheme.orgChart.deputiesBg} ${currentTheme.orgChart.deputiesBorder}`}
        >
          <div className={`text-[11px] font-bold uppercase tracking-wider mb-2 ${currentTheme.orgChart.deputiesText}`}>
            รองผู้บัญชาการ สำนักงานกำลังพล (รอง ผบช.สกพ. {deputies.length} ท่าน)
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
            {deputies.map((dep, idx) => (
              <div
                key={dep.id}
                onClick={() => onViewOfficer(dep)}
                className={`p-2.5 rounded-xl border transition-all cursor-pointer text-center group ${
                  currentTheme.isDark
                    ? 'bg-slate-900/90 border-slate-700/80 hover:border-amber-400'
                    : 'bg-white border-slate-200 hover:border-blue-400 hover:shadow-2xs'
                }`}
              >
                <div className={`text-[10px] font-bold mb-0.5 ${currentTheme.orgChart.deputiesText}`}>
                  รอง ผบช. ({idx + 1})
                </div>
                <div className={`font-bold text-xs ${currentTheme.textMain}`}>
                  {dep.rank} {dep.firstName}
                </div>
                <div className={`text-[11px] truncate ${currentTheme.textMuted}`}>
                  {dep.lastName}
                </div>
                <div className="text-[10px] text-blue-600 dark:text-amber-400 opacity-0 group-hover:opacity-100 transition-opacity mt-1">
                  คลิกดูประวัติ &rarr;
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Trunk down to divisions */}
        <div className="w-0.5 h-8 bg-slate-300 dark:bg-slate-700 mx-auto" />
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

          return [...orgStructure, ...dynamicDivisions];
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
          const knownSubNames = new Set(branch.subDivisions.map((s) => s.name));
          const dynamicSubs = Array.from(
            new Set(
              officers
                .filter((o) => o.division === branch.id && !knownSubNames.has(o.subDivision))
                .map((o) => o.subDivision)
            )
          ).map((subName) => ({
            name: subName,
            label: subName,
            desc: `หน่วยงานย่อยในสังกัด ${branch.shortName}`,
          }));

          const allSubDivisions = [...branch.subDivisions, ...dynamicSubs];

          return (
            <div
              key={branch.id}
              className={`rounded-2xl ${divTheme.bg} border ${divTheme.border} shadow-xs hover:shadow-md transition-shadow overflow-hidden flex flex-col`}
            >
              {/* Branch Header */}
              <div
                onClick={() => toggleDivision(branch.id)}
                className={`p-4 ${divTheme.header} border-b ${divTheme.border} cursor-pointer transition-colors flex items-start justify-between gap-2`}
              >
                <div className="flex items-start gap-2.5">
                  <div
                    className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 shadow-2xs border ${
                      currentTheme.isDark ? 'bg-slate-900 border-slate-700' : 'bg-white border-slate-200'
                    }`}
                  >
                    <BranchIcon className={`w-4 h-4 ${divTheme.text}`} />
                  </div>
                  <div>
                    <span className={`text-[11px] font-bold font-mono block ${divTheme.text}`}>
                      {branch.shortName}
                    </span>
                    <h3 className={`font-bold text-xs leading-snug mt-0.5 ${divTheme.text}`}>
                      {branch.name}
                    </h3>
                  </div>
                </div>

                <button
                  className={`p-1 rounded-lg text-slate-500 hover:text-slate-800 border ${
                    currentTheme.isDark ? 'bg-slate-800 border-slate-700' : 'bg-white/80 border-slate-200'
                  }`}
                  title={isExpanded ? 'ย่อเนื้อหา' : 'ขยายเนื้อหา'}
                >
                  {isExpanded ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
                </button>
              </div>

              {/* Stats Strip with click-to-view ALL officers of this division */}
              <div
                className={`px-3 py-2 border-b flex items-center justify-between text-[11px] ${
                  currentTheme.isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-white/70 border-slate-200/60'
                }`}
              >
                <div className="flex items-center gap-1.5">
                  <span className={currentTheme.textMuted}>รวมทั้งกอง:</span>
                  <span className={`font-mono font-bold ${currentTheme.textMain}`}>
                    {totalInBranch} อัตรา
                  </span>
                </div>

                {/* Clickable button to view all officers in this division without touching other tables */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedSubDiv({
                      divisionId: branch.id,
                      divisionName: branch.name,
                      subDivName: '__ALL__',
                      subDivLabel: `บุคลากรทั้งหมดในสังกัด ${branch.name}`,
                    });
                  }}
                  className={`flex items-center gap-1 px-2 py-0.5 rounded-lg text-[10px] font-bold border transition-colors cursor-pointer ${
                    currentTheme.isDark
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
                <div className="p-3 space-y-2 flex-1">
                  <div className={`flex items-center justify-between text-[10px] font-bold uppercase tracking-wider px-1 mb-1 ${currentTheme.textMuted}`}>
                    <span>ฝ่าย / กลุ่มงานในสังกัด:</span>
                    <span>คลิกเพื่อดูรายชื่อ</span>
                  </div>

                  {allSubDivisions.map((sub) => {
                    const subOfficers = getSubDivisionOfficers(officers, branch.id, sub.name);
                    const subCount = subOfficers.length;
                    const subOccupied = subOfficers.filter((o) => !o.isVacant).length;
                    const subVacant = subCount - subOccupied;

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
                        className={`p-2.5 rounded-xl border transition-all cursor-pointer flex flex-col justify-between group shadow-2xs hover:scale-[1.01] ${divTheme.subItem}`}
                      >
                        <div className="flex items-start justify-between gap-1.5 mb-1">
                          <span className="font-bold text-xs transition-colors line-clamp-1">
                            {sub.label}
                          </span>
                          <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border ${divTheme.badge} shrink-0`}>
                            {subCount} อัตรา
                          </span>
                        </div>

                        <p className={`text-[10px] line-clamp-1 ${currentTheme.textMuted}`}>
                          {sub.desc}
                        </p>

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
