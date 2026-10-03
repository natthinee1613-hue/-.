import React from 'react';
import { PoliceOfficer, DivisionStat } from '../types/personnel';
import {
  Shield,
  Users,
  Award,
  CheckCircle2,
  AlertCircle,
  Building2,
  TrendingUp,
  PieChart,
  BarChart3,
  ArrowUpRight
} from 'lucide-react';

interface StatsDashboardProps {
  officers: PoliceOfficer[];
  onSelectDivisionFilter: (division: string) => void;
  isPastelTheme?: boolean;
}

export const StatsDashboard: React.FC<StatsDashboardProps> = ({
  officers,
  onSelectDivisionFilter,
  isPastelTheme = true,
}) => {
  const total = officers.length;
  const occupied = officers.filter((o) => !o.isVacant).length;
  const vacant = officers.filter((o) => o.isVacant).length;
  const commissioned = officers.filter((o) => o.commissionType === 'สัญญาบัตร').length;
  const nonCommissioned = officers.filter((o) => o.commissionType === 'ประทวน').length;
  const male = officers.filter((o) => !o.isVacant && o.gender === 'ชาย').length;
  const female = officers.filter((o) => !o.isVacant && o.gender === 'หญิง').length;

  const occupancyRate = total > 0 ? ((occupied / total) * 100).toFixed(1) : '0';

  // Group by Division (บก.)
  const divisionStats: DivisionStat[] = React.useMemo(() => {
    const map = new Map<string, DivisionStat>();

    officers.forEach((o) => {
      const div = o.division || 'สกพ.';
      if (!map.has(div)) {
        map.set(div, {
          division: div,
          total: 0,
          occupied: 0,
          vacant: 0,
          commissioned: 0,
          nonCommissioned: 0,
          male: 0,
          female: 0,
        });
      }
      const stat = map.get(div)!;
      stat.total++;
      if (o.isVacant) {
        stat.vacant++;
      } else {
        stat.occupied++;
        if (o.gender === 'ชาย') stat.male++;
        if (o.gender === 'หญิง') stat.female++;
      }
      if (o.commissionType === 'สัญญาบัตร') stat.commissioned++;
      if (o.commissionType === 'ประทวน') stat.nonCommissioned++;
    });

    return Array.from(map.values()).sort((a, b) => b.total - a.total);
  }, [officers]);

  // Group by Sub-division (กก./ฝ่าย)
  const subDivisionStats = React.useMemo(() => {
    const map = new Map<string, { subDiv: string; division: string; total: number; occupied: number; vacant: number }>();

    officers.forEach((o) => {
      const key = `${o.division}|||${o.subDivision || 'ส่วนกลาง'}`;
      if (!map.has(key)) {
        map.set(key, {
          subDiv: o.subDivision || 'ส่วนกลาง',
          division: o.division,
          total: 0,
          occupied: 0,
          vacant: 0,
        });
      }
      const stat = map.get(key)!;
      stat.total++;
      if (o.isVacant) stat.vacant++;
      else stat.occupied++;
    });

    return Array.from(map.values()).sort((a, b) => b.total - a.total);
  }, [officers]);

  // Group by Rank
  const rankStats = React.useMemo(() => {
    const map = new Map<string, number>();
    officers
      .filter((o) => !o.isVacant && o.rank && o.rank !== '-')
      .forEach((o) => {
        map.set(o.rank, (map.get(o.rank) || 0) + 1);
      });

    const rankOrder = [
      'พล.ต.ท.',
      'พล.ต.ต.',
      'พ.ต.อ.',
      'พ.ต.ท.',
      'พ.ต.ต.',
      'ร.ต.อ.',
      'ร.ต.ท.',
      'ร.ต.ต.',
      'ด.ต.',
      'จ.ส.ต.',
      'ส.ต.อ.',
      'ส.ต.ท.',
      'ส.ต.ต.',
    ];

    return rankOrder
      .filter((r) => map.has(r))
      .map((r) => ({
        rank: r,
        count: map.get(r) || 0,
      }));
  }, [officers]);

  // Pastel themes for division cards
  const getDivisionTheme = (div: string) => {
    if (div.includes('อัตรากำลัง')) {
      return {
        bg: 'bg-[#F2FBF7]',
        border: 'border-[#A7F3D0]',
        hoverBorder: 'hover:border-[#059669]',
        badge: 'bg-[#D1FAE5] text-[#059669]',
        bar: 'from-[#059669] to-[#34D399]',
      };
    }
    if (div.includes('ทะเบียนพล')) {
      return {
        bg: 'bg-[#F4F6FD]',
        border: 'border-[#C7D2FE]',
        hoverBorder: 'hover:border-[#4F46E5]',
        badge: 'bg-[#E0E7FF] text-[#4F46E5]',
        bar: 'from-[#4F46E5] to-[#818CF8]',
      };
    }
    if (div.includes('สวัสดิการ')) {
      return {
        bg: 'bg-[#FDF3F5]',
        border: 'border-[#FBCFE8]',
        hoverBorder: 'hover:border-[#DB2777]',
        badge: 'bg-[#FCE7F3] text-[#DB2777]',
        bar: 'from-[#DB2777] to-[#F472B6]',
      };
    }
    return {
      bg: 'bg-[#F0F7FC]',
      border: 'border-[#BAE6FD]',
      hoverBorder: 'hover:border-[#0284C7]',
      badge: 'bg-[#E0F2FE] text-[#0284C7]',
      bar: 'from-[#0284C7] to-[#38BDF8]',
    };
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Overview Metric Row */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <div
          className={`p-4 rounded-2xl border shadow-2xs ${
            isPastelTheme
              ? 'bg-[#FEF9EE] border-[#FDE68A] text-slate-800'
              : 'bg-slate-900 border-slate-800 text-slate-100'
          }`}
        >
          <div className={`text-xs mb-1 ${isPastelTheme ? 'text-[#854D0E]' : 'text-slate-400'}`}>กรอบอัตรากำลังรวม</div>
          <div className={`text-2xl font-bold font-mono tabular-nums ${isPastelTheme ? 'text-[#78350F]' : 'text-amber-300'}`}>
            {total}
          </div>
          <div className={`text-[11px] mt-1 ${isPastelTheme ? 'text-[#A16207]' : 'text-slate-500'}`}>สำนักงานกำลังพล</div>
        </div>

        <div
          className={`p-4 rounded-2xl border shadow-2xs ${
            isPastelTheme
              ? 'bg-[#F2FBF7] border-[#A7F3D0] text-slate-800'
              : 'bg-slate-900 border-emerald-900/40 bg-emerald-950/10 text-slate-100'
          }`}
        >
          <div className={`text-xs mb-1 ${isPastelTheme ? 'text-[#065F46]' : 'text-emerald-400'}`}>มีผู้ครองตำแหน่ง</div>
          <div className={`text-2xl font-bold font-mono tabular-nums ${isPastelTheme ? 'text-[#047857]' : 'text-emerald-300'}`}>
            {occupied}
          </div>
          <div className={`text-[11px] mt-1 ${isPastelTheme ? 'text-[#059669]' : 'text-emerald-500'}`}>คิดเป็น {occupancyRate}%</div>
        </div>

        <div
          className={`p-4 rounded-2xl border shadow-2xs ${
            isPastelTheme
              ? 'bg-[#FFFBEB] border-[#FDE68A] text-slate-800'
              : 'bg-slate-900 border-amber-900/40 bg-amber-950/10 text-slate-100'
          }`}
        >
          <div className={`text-xs mb-1 ${isPastelTheme ? 'text-[#92400E]' : 'text-amber-400'}`}>ตำแหน่งว่าง</div>
          <div className={`text-2xl font-bold font-mono tabular-nums ${isPastelTheme ? 'text-[#D97706]' : 'text-amber-300'}`}>
            {vacant}
          </div>
          <div className={`text-[11px] mt-1 ${isPastelTheme ? 'text-[#B45309]' : 'text-amber-500'}`}>รอการบรรจุแต่งตั้ง</div>
        </div>

        <div
          className={`p-4 rounded-2xl border shadow-2xs ${
            isPastelTheme
              ? 'bg-[#F0F7FC] border-[#BAE6FD] text-slate-800'
              : 'bg-slate-900 border-blue-900/40 bg-blue-950/10 text-slate-100'
          }`}
        >
          <div className={`text-xs mb-1 ${isPastelTheme ? 'text-[#0369A1]' : 'text-blue-400'}`}>ชั้นสัญญาบัตร</div>
          <div className={`text-2xl font-bold font-mono tabular-nums ${isPastelTheme ? 'text-[#0284C7]' : 'text-blue-300'}`}>
            {commissioned}
          </div>
          <div className={`text-[11px] mt-1 ${isPastelTheme ? 'text-[#0284C7]' : 'text-blue-500'}`}>ร.ต.ต. ขึ้นไป</div>
        </div>

        <div
          className={`p-4 rounded-2xl border shadow-2xs ${
            isPastelTheme
              ? 'bg-[#F4F6FD] border-[#C7D2FE] text-slate-800'
              : 'bg-slate-900 border-indigo-900/40 bg-indigo-950/10 text-slate-100'
          }`}
        >
          <div className={`text-xs mb-1 ${isPastelTheme ? 'text-[#4338CA]' : 'text-indigo-400'}`}>ชั้นประทวน</div>
          <div className={`text-2xl font-bold font-mono tabular-nums ${isPastelTheme ? 'text-[#4F46E5]' : 'text-indigo-300'}`}>
            {nonCommissioned}
          </div>
          <div className={`text-[11px] mt-1 ${isPastelTheme ? 'text-[#6366F1]' : 'text-indigo-500'}`}>ด.ต. ลงมา</div>
        </div>

        <div
          className={`p-4 rounded-2xl border shadow-2xs ${
            isPastelTheme
              ? 'bg-[#FAF5FF] border-[#E9D5FF] text-slate-800'
              : 'bg-slate-900 border-slate-800 text-slate-100'
          }`}
        >
          <div className={`text-xs mb-1 ${isPastelTheme ? 'text-slate-600' : 'text-slate-400'}`}>สัดส่วน ชาย : หญิง</div>
          <div className="text-xl font-bold font-mono tabular-nums mt-0.5">
            <span className="text-sky-600">{male}</span> : <span className="text-pink-600">{female}</span>
          </div>
          <div className={`text-[11px] mt-1 ${isPastelTheme ? 'text-slate-500' : 'text-slate-500'}`}>
            ชาย {((male / (occupied || 1)) * 100).toFixed(0)}% / หญิง {((female / (occupied || 1)) * 100).toFixed(0)}%
          </div>
        </div>
      </div>

      {/* Main Divisions Breakdown Grid (กองอัตรากำลัง, กองทะเบียนพล, กองสวัสดิการ, สกพ.) */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold flex items-center gap-2 font-['Chakra_Petch',sans-serif] text-slate-800">
            <Building2 className="w-4 h-4 text-amber-600" />
            การแยกย่อยองค์ประกอบตามกองบังคับการ / หน่วยงานหลัก (บก.)
          </h3>
          <span className="text-xs text-slate-500">
            คลิกที่หน่วยงานเพื่อกรองตาราง
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {divisionStats.map((stat) => {
            const fillPercent = stat.total > 0 ? (stat.occupied / stat.total) * 100 : 0;
            const pTheme = getDivisionTheme(stat.division);

            return (
              <div
                key={stat.division}
                onClick={() => onSelectDivisionFilter(stat.division)}
                className={`p-5 rounded-2xl border transition-all cursor-pointer group flex flex-col justify-between shadow-2xs hover:shadow-md ${
                  isPastelTheme
                    ? `${pTheme.bg} ${pTheme.border} ${pTheme.hoverBorder}`
                    : 'bg-slate-900 border-slate-800 hover:border-amber-500'
                }`}
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h4 className="font-bold text-slate-900 text-sm group-hover:text-blue-900 transition-colors">
                      {stat.division}
                    </h4>
                    <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 transition-colors shrink-0" />
                  </div>

                  <div className="flex items-baseline gap-2 mb-3">
                    <span className="text-3xl font-bold font-mono text-slate-900 tabular-nums">
                      {stat.total}
                    </span>
                    <span className="text-xs text-slate-500">อัตรากำลัง</span>
                  </div>

                  {/* Progress bar */}
                  <div className="space-y-1 mb-4">
                    <div className="flex justify-between text-[11px] text-slate-600">
                      <span>ครองตำแหน่ง: {stat.occupied}</span>
                      <span>ว่าง: {stat.vacant}</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-slate-200/80 overflow-hidden">
                      <div
                        className={`h-full bg-gradient-to-r ${pTheme.bar} rounded-full`}
                        style={{ width: `${fillPercent}%` }}
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-200/60 grid grid-cols-2 gap-2 text-xs text-slate-600">
                  <div>
                    <span className="text-[10px] text-slate-500 block">สัญญาบัตร</span>
                    <span className="font-mono text-blue-700 font-bold">{stat.commissioned}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 block">ประทวน</span>
                    <span className="font-mono text-indigo-700 font-bold">{stat.nonCommissioned}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 block">ชาย</span>
                    <span className="font-mono text-sky-700 font-bold">{stat.male}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 block">หญิง</span>
                    <span className="font-mono text-pink-700 font-bold">{stat.female}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Two Column Section: Rank Distribution + Sub-Division Breakdown Table */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Rank Distribution */}
        <div
          className={`p-5 rounded-2xl border shadow-2xs ${
            isPastelTheme
              ? 'bg-white border-[#E2E8F0] text-slate-800'
              : 'bg-slate-900 border-slate-800 text-slate-100'
          }`}
        >
          <h4 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2 font-['Chakra_Petch',sans-serif]">
            <Award className="w-4 h-4 text-amber-600" />
            การกระจายตัวตามชั้นยศข้าราชการตำรวจ
          </h4>

          <div className="space-y-2 text-xs max-h-96 overflow-y-auto pr-1">
            {rankStats.map((item) => {
              const maxRank = Math.max(...rankStats.map((r) => r.count), 1);
              const barWidth = (item.count / maxRank) * 100;
              return (
                <div key={item.rank} className="flex items-center gap-2">
                  <span className="w-16 font-bold text-slate-800 shrink-0">
                    {item.rank}
                  </span>
                  <div className="flex-1 h-3 rounded-full bg-slate-100 overflow-hidden border border-slate-200">
                    <div
                      className="h-full bg-gradient-to-r from-amber-400 to-amber-500 rounded-full"
                      style={{ width: `${barWidth}%` }}
                    />
                  </div>
                  <span className="w-12 text-right font-mono text-slate-600 shrink-0 tabular-nums font-semibold">
                    {item.count} นาย
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Sub-Division Breakdown (กก./ฝ่าย/กลุ่มงาน) with Animated Light Border */}
        <div className="lg:col-span-2 relative rounded-2xl p-[2.5px] overflow-hidden shadow-md">
          {/* Animated Light Beam */}
          <div
            className={`absolute -inset-[250%] animate-spin-beam pointer-events-none ${
              isPastelTheme
                ? 'bg-[conic-gradient(from_0deg,transparent_0deg,transparent_290deg,rgba(59,130,246,0.3)_320deg,#3b82f6_345deg,#93c5fd_355deg,#2563eb_360deg)] opacity-90'
                : 'bg-[conic-gradient(from_0deg,transparent_0deg,transparent_290deg,rgba(245,158,11,0.25)_320deg,#F59E0B_340deg,#FFE500_355deg,#FFE500_360deg)] opacity-95'
            }`}
          />
          <div
            className={`relative z-10 p-5 rounded-[14px] border flex flex-col justify-between ${
              isPastelTheme
                ? 'bg-white border-slate-200/90 text-slate-800'
                : 'bg-slate-900 border-slate-800 text-slate-100'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2 font-['Chakra_Petch',sans-serif]">
                  <BarChart3 className="w-4 h-4 text-blue-600" />
                  สรุปอัตรากำลังแยกตามกองกำกับการ / ฝ่าย / กลุ่มงาน ({subDivisionStats.length} ฝ่าย)
                </h4>
              </div>

              <div className="max-h-96 overflow-y-auto border border-slate-200 rounded-xl overflow-hidden">
                <table className="w-full text-left text-xs border-collapse">
                  <thead className="bg-[#F8FAFC] text-slate-700 sticky top-0 border-b border-slate-200 font-['Chakra_Petch',sans-serif] font-bold">
                    <tr>
                      <th className="p-2.5">สังกัด บก.</th>
                      <th className="p-2.5">กองกำกับการ / ฝ่าย</th>
                      <th className="p-2.5 text-center">อัตราทั้งหมด</th>
                      <th className="p-2.5 text-center text-emerald-700">ครองตำแหน่ง</th>
                      <th className="p-2.5 text-center text-amber-700">ตำแหน่งว่าง</th>
                      <th className="p-2.5 text-right">% บรรจุ</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {subDivisionStats.map((item, idx) => {
                      const percent = item.total > 0 ? ((item.occupied / item.total) * 100).toFixed(0) : '0';
                      return (
                        <tr key={idx} className="hover:bg-blue-50/40 transition-colors">
                          <td className="p-2.5 text-slate-500 text-[11px] font-medium">
                            {item.division.replace(' สกพ.', '')}
                          </td>
                          <td className="p-2.5 font-semibold text-slate-800">
                            {item.subDiv}
                          </td>
                          <td className="p-2.5 text-center font-mono font-bold text-slate-900 tabular-nums">
                            {item.total}
                          </td>
                          <td className="p-2.5 text-center font-mono text-emerald-700 font-bold tabular-nums">
                            {item.occupied}
                          </td>
                          <td className="p-2.5 text-center font-mono text-amber-700 font-bold tabular-nums">
                            {item.vacant}
                          </td>
                          <td className="p-2.5 text-right font-mono text-slate-600 font-semibold tabular-nums">
                            {percent}%
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
