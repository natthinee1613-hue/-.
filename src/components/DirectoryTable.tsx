import React, { useState, useMemo } from 'react';
import { PoliceOfficer } from '../types/personnel';
import {
  Search,
  Filter,
  Plus,
  Edit2,
  Trash2,
  Download,
  Upload,
  UserCheck,
  UserX,
  Eye,
  ArrowUpDown,
  RotateCcw,
  CheckSquare,
  Square,
  Building,
  Briefcase
} from 'lucide-react';

interface DirectoryTableProps {
  officers: PoliceOfficer[];
  onAddOfficer: () => void;
  onEditOfficer: (officer: PoliceOfficer) => void;
  onDeleteOfficer: (officer: PoliceOfficer) => void;
  onDeleteMultiple: (ids: string[]) => void;
  onOpenImportExport: () => void;
  onViewOfficer: (officer: PoliceOfficer) => void;
  initialDivisionFilter?: string;
  initialSubDivisionFilter?: string;
  onClearFilters?: () => void;
  isPastelTheme?: boolean;
}

export const DirectoryTable: React.FC<DirectoryTableProps> = ({
  officers,
  onAddOfficer,
  onEditOfficer,
  onDeleteOfficer,
  onDeleteMultiple,
  onOpenImportExport,
  onViewOfficer,
  initialDivisionFilter = 'all',
  initialSubDivisionFilter = 'all',
  onClearFilters,
  isPastelTheme = true,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [divisionFilter, setDivisionFilter] = useState(initialDivisionFilter);
  const [subDivisionFilter, setSubDivisionFilter] = useState(initialSubDivisionFilter);

  // Sync filters cleanly when props change from OrgChart or Cover without affecting internal state
  React.useEffect(() => {
    setDivisionFilter(initialDivisionFilter || 'all');
  }, [initialDivisionFilter]);

  React.useEffect(() => {
    setSubDivisionFilter(initialSubDivisionFilter || 'all');
  }, [initialSubDivisionFilter]);
  const [levelFilter, setLevelFilter] = useState('all');
  const [commissionFilter, setCommissionFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all'); // all, occupied, vacant
  const [genderFilter, setGenderFilter] = useState('all');
  const [sortBy, setSortBy] = useState<'pos' | 'name' | 'rank' | 'level'>('pos');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(25);

  // Extract unique filter options
  const divisions = useMemo(() => {
    const set = new Set<string>();
    officers.forEach((o) => {
      if (o.division) set.add(o.division);
    });
    return Array.from(set).sort();
  }, [officers]);

  const subDivisions = useMemo(() => {
    const set = new Set<string>();
    officers
      .filter((o) => divisionFilter === 'all' || o.division === divisionFilter)
      .forEach((o) => {
        if (o.subDivision) set.add(o.subDivision);
      });
    return Array.from(set).sort();
  }, [officers, divisionFilter]);

  const levels = useMemo(() => {
    const rankOrder = ['ผบช.', 'รอง ผบช.', 'ผบก.', 'รอง ผบก.', 'ผกก.', 'รอง ผกก.', 'สว.', 'รอง สว.', 'ผบ.หมู่', 'ผบ.หมู่-รอง สว.'];
    const set = new Set<string>();
    officers.forEach((o) => {
      if (o.positionLevel) set.add(o.positionLevel);
    });
    return rankOrder.filter((r) => set.has(r)).concat(Array.from(set).filter((r) => !rankOrder.includes(r)));
  }, [officers]);

  // Filtering & Sorting
  const filteredOfficers = useMemo(() => {
    return officers
      .filter((o) => {
        // Search
        if (searchTerm.trim()) {
          const q = searchTerm.toLowerCase().trim();
          const fullName = `${o.rank} ${o.firstName} ${o.lastName}`.toLowerCase();
          const match =
            fullName.includes(q) ||
            o.positionNumber.toLowerCase().includes(q) ||
            o.positionTitle.toLowerCase().includes(q) ||
            o.duty.toLowerCase().includes(q) ||
            o.subDivision.toLowerCase().includes(q) ||
            o.jobLine.toLowerCase().includes(q);
          if (!match) return false;
        }

        // Division
        if (divisionFilter !== 'all' && o.division !== divisionFilter) return false;

        // Sub-Division
        if (subDivisionFilter !== 'all' && o.subDivision !== subDivisionFilter) return false;

        // Level
        if (levelFilter !== 'all' && o.positionLevel !== levelFilter) return false;

        // Commission
        if (commissionFilter !== 'all' && o.commissionType !== commissionFilter) return false;

        // Status
        if (statusFilter === 'occupied' && o.isVacant) return false;
        if (statusFilter === 'vacant' && !o.isVacant) return false;

        // Gender
        if (genderFilter !== 'all' && o.gender !== genderFilter) return false;

        return true;
      })
      .sort((a, b) => {
        let cmp = 0;
        if (sortBy === 'pos') {
          cmp = a.positionNumber.localeCompare(b.positionNumber, 'th');
        } else if (sortBy === 'name') {
          const nameA = `${a.firstName} ${a.lastName}`;
          const nameB = `${b.firstName} ${b.lastName}`;
          cmp = nameA.localeCompare(nameB, 'th');
        } else if (sortBy === 'rank') {
          cmp = a.rank.localeCompare(b.rank, 'th');
        } else if (sortBy === 'level') {
          cmp = a.positionLevel.localeCompare(b.positionLevel, 'th');
        }
        return sortOrder === 'asc' ? cmp : -cmp;
      });
  }, [
    officers,
    searchTerm,
    divisionFilter,
    subDivisionFilter,
    levelFilter,
    commissionFilter,
    statusFilter,
    genderFilter,
    sortBy,
    sortOrder,
  ]);

  // Pagination
  const totalPages = Math.ceil(filteredOfficers.length / pageSize) || 1;
  const paginatedOfficers = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filteredOfficers.slice(start, start + pageSize);
  }, [filteredOfficers, page, pageSize]);

  // Selection handlers
  const handleSelectAll = () => {
    if (selectedIds.length === paginatedOfficers.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(paginatedOfficers.map((o) => o.id));
    }
  };

  const handleToggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleResetFilters = () => {
    setSearchTerm('');
    setDivisionFilter('all');
    setSubDivisionFilter('all');
    setLevelFilter('all');
    setCommissionFilter('all');
    setStatusFilter('all');
    setGenderFilter('all');
    setPage(1);
  };

  return (
    <div className="space-y-4">
      {/* Top Action Ribbon */}
      <div
        className={`flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl border shadow-sm ${
          isPastelTheme
            ? 'bg-white border-slate-200 text-slate-800'
            : 'bg-slate-900 border-slate-800 text-slate-100'
        }`}
      >
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setPage(1);
              }}
              placeholder="ค้นหาเลขตำแหน่ง, ชื่อ-สกุล, ตำแหน่ง, สายงาน..."
              className={`w-72 md:w-96 pl-9 pr-3 py-2 text-xs rounded-xl border focus:outline-none transition-colors ${
                isPastelTheme
                  ? 'bg-slate-50 border-slate-200 text-slate-800 placeholder-slate-400 focus:border-blue-500 focus:bg-white'
                  : 'bg-slate-950 border-slate-800 text-slate-200 placeholder-slate-500 focus:border-amber-400'
              }`}
            />
          </div>

          {(searchTerm ||
            divisionFilter !== 'all' ||
            subDivisionFilter !== 'all' ||
            levelFilter !== 'all' ||
            commissionFilter !== 'all' ||
            statusFilter !== 'all' ||
            genderFilter !== 'all') && (
            <button
              onClick={handleResetFilters}
              className={`flex items-center gap-1 px-2.5 py-2 text-xs rounded-xl border transition-colors cursor-pointer ${
                isPastelTheme
                  ? 'text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 border-slate-200'
                  : 'text-slate-400 hover:text-slate-200 bg-slate-800 hover:bg-slate-750 border-transparent'
              }`}
              title="ล้างตัวกรองทั้งหมด"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              ล้างตัวกรอง
            </button>
          )}
        </div>

        {/* Action Buttons: Add, Upload/Import, Export */}
        <div className="flex flex-wrap items-center gap-2">
          {selectedIds.length > 0 && (
            <button
              onClick={() => {
                if (window.confirm(`ต้องการลบรายการที่เลือกจำนวน ${selectedIds.length} รายการหรือไม่?`)) {
                  onDeleteMultiple(selectedIds);
                  setSelectedIds([]);
                }
              }}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 rounded-xl transition-colors cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
              ลบที่เลือก ({selectedIds.length})
            </button>
          )}

          <button
            onClick={onOpenImportExport}
            className={`flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-xl border transition-colors cursor-pointer shadow-2xs ${
              isPastelTheme
                ? 'text-slate-700 bg-white hover:bg-slate-50 border-slate-300'
                : 'text-slate-200 bg-slate-800 hover:bg-slate-750 border-slate-700'
            }`}
          >
            <Upload className="w-3.5 h-3.5 text-blue-600" />
            อัปโหลด / ดาวน์โหลด
          </button>

          <button
            onClick={onAddOfficer}
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-slate-950 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 rounded-xl shadow-xs transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            เพิ่มกำลังพลใหม่
          </button>
        </div>
      </div>

      {/* Breakdown Filters Row */}
      <div
        className={`p-3.5 rounded-2xl border text-xs flex flex-wrap items-center gap-2 shadow-2xs ${
          isPastelTheme
            ? 'bg-white/95 border-slate-200 text-slate-700'
            : 'bg-slate-900/80 border-slate-800 text-slate-300'
        }`}
      >
        <span className="font-bold flex items-center gap-1.5 mr-1 text-slate-800">
          <Filter className="w-3.5 h-3.5 text-amber-600" />
          ตัวกรอง:
        </span>

        {/* Division Filter */}
        <select
          value={divisionFilter}
          onChange={(e) => {
            setDivisionFilter(e.target.value);
            setSubDivisionFilter('all');
            setPage(1);
          }}
          className={`px-2.5 py-1.5 rounded-lg border focus:outline-none ${
            isPastelTheme
              ? 'bg-[#F8FAFC] border-slate-300 text-slate-800 focus:border-blue-500'
              : 'bg-slate-950 border-slate-800 text-slate-200 focus:border-amber-400'
          }`}
        >
          <option value="all">ทุก บก. / ส่วนบังคับบัญชา</option>
          {divisions.map((div) => (
            <option key={div} value={div}>
              {div}
            </option>
          ))}
        </select>

        {/* Sub-division Filter */}
        <select
          value={subDivisionFilter}
          onChange={(e) => {
            setSubDivisionFilter(e.target.value);
            setPage(1);
          }}
          className={`px-2.5 py-1.5 rounded-lg border focus:outline-none max-w-[200px] ${
            isPastelTheme
              ? 'bg-[#F8FAFC] border-slate-300 text-slate-800 focus:border-blue-500'
              : 'bg-slate-950 border-slate-800 text-slate-200 focus:border-amber-400'
          }`}
        >
          <option value="all">ทุก กก. / ฝ่าย / กลุ่มงาน</option>
          {subDivisions.map((sub) => (
            <option key={sub} value={sub}>
              {sub}
            </option>
          ))}
        </select>

        {/* Level Filter */}
        <select
          value={levelFilter}
          onChange={(e) => {
            setLevelFilter(e.target.value);
            setPage(1);
          }}
          className={`px-2.5 py-1.5 rounded-lg border focus:outline-none ${
            isPastelTheme
              ? 'bg-[#F8FAFC] border-slate-300 text-slate-800 focus:border-blue-500'
              : 'bg-slate-950 border-slate-800 text-slate-200 focus:border-amber-400'
          }`}
        >
          <option value="all">ทุกระดับตำแหน่ง</option>
          {levels.map((lvl) => (
            <option key={lvl} value={lvl}>
              {lvl}
            </option>
          ))}
        </select>

        {/* Commission Filter */}
        <select
          value={commissionFilter}
          onChange={(e) => {
            setCommissionFilter(e.target.value);
            setPage(1);
          }}
          className={`px-2.5 py-1.5 rounded-lg border focus:outline-none ${
            isPastelTheme
              ? 'bg-[#F8FAFC] border-slate-300 text-slate-800 focus:border-blue-500'
              : 'bg-slate-950 border-slate-800 text-slate-200 focus:border-amber-400'
          }`}
        >
          <option value="all">สัญญาบัตร / ประทวน (ทั้งหมด)</option>
          <option value="สัญญาบัตร">ชั้นสัญญาบัตร</option>
          <option value="ประทวน">ชั้นประทวน</option>
        </select>

        {/* Status Filter */}
        <select
          value={statusFilter}
          onChange={(e) => {
            setStatusFilter(e.target.value);
            setPage(1);
          }}
          className={`px-2.5 py-1.5 rounded-lg border focus:outline-none ${
            isPastelTheme
              ? 'bg-[#F8FAFC] border-slate-300 text-slate-800 focus:border-blue-500'
              : 'bg-slate-950 border-slate-800 text-slate-200 focus:border-amber-400'
          }`}
        >
          <option value="all">สถานะตำแหน่ง (ทั้งหมด)</option>
          <option value="occupied">มีผู้ครองตำแหน่ง</option>
          <option value="vacant">ตำแหน่งว่าง</option>
        </select>

        {/* Gender Filter */}
        <select
          value={genderFilter}
          onChange={(e) => {
            setGenderFilter(e.target.value);
            setPage(1);
          }}
          className={`px-2.5 py-1.5 rounded-lg border focus:outline-none ${
            isPastelTheme
              ? 'bg-[#F8FAFC] border-slate-300 text-slate-800 focus:border-blue-500'
              : 'bg-slate-950 border-slate-800 text-slate-200 focus:border-amber-400'
          }`}
        >
          <option value="all">เพศ (ทั้งหมด)</option>
          <option value="ชาย">ชาย</option>
          <option value="หญิง">หญิง</option>
        </select>

        {/* Sort Column & Order */}
        <div className="ml-auto flex items-center gap-1.5 text-slate-500">
          <ArrowUpDown className="w-3.5 h-3.5" />
          <span>เรียง:</span>
          <button
            onClick={() => {
              if (sortBy === 'pos') setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
              else { setSortBy('pos'); setSortOrder('asc'); }
            }}
            className={`px-2 py-1 rounded transition-colors ${
              sortBy === 'pos'
                ? isPastelTheme
                  ? 'bg-blue-100 text-blue-800 font-bold'
                  : 'bg-amber-500/20 text-amber-300 font-medium'
                : 'hover:bg-slate-100'
            }`}
          >
            เลขตำแหน่ง {sortBy === 'pos' && (sortOrder === 'asc' ? '↑' : '↓')}
          </button>
          <button
            onClick={() => {
              if (sortBy === 'name') setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
              else { setSortBy('name'); setSortOrder('asc'); }
            }}
            className={`px-2 py-1 rounded transition-colors ${
              sortBy === 'name'
                ? isPastelTheme
                  ? 'bg-blue-100 text-blue-800 font-bold'
                  : 'bg-amber-500/20 text-amber-300 font-medium'
                : 'hover:bg-slate-100'
            }`}
          >
            ชื่อ {sortBy === 'name' && (sortOrder === 'asc' ? '↑' : '↓')}
          </button>
          <button
            onClick={() => {
              if (sortBy === 'level') setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
              else { setSortBy('level'); setSortOrder('asc'); }
            }}
            className={`px-2 py-1 rounded transition-colors ${
              sortBy === 'level'
                ? isPastelTheme
                  ? 'bg-blue-100 text-blue-800 font-bold'
                  : 'bg-amber-500/20 text-amber-300 font-medium'
                : 'hover:bg-slate-100'
            }`}
          >
            ระดับ {sortBy === 'level' && (sortOrder === 'asc' ? '↑' : '↓')}
          </button>
        </div>
      </div>

      {/* Active Filter Notification Ribbon */}
      {(divisionFilter !== 'all' || subDivisionFilter !== 'all' || searchTerm.trim() || levelFilter !== 'all' || commissionFilter !== 'all' || statusFilter !== 'all' || genderFilter !== 'all') && (
        <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-2.5 rounded-xl border bg-blue-50/80 dark:bg-blue-950/40 border-blue-200 dark:border-blue-800 text-xs">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-bold text-blue-900 dark:text-blue-300 flex items-center gap-1.5">
              <Filter className="w-3.5 h-3.5 text-blue-600" />
              กำลังกรองแสดง:
            </span>
            {divisionFilter !== 'all' && (
              <span className="px-2 py-0.5 rounded-md bg-white dark:bg-slate-900 border border-blue-200 dark:border-blue-700 text-blue-800 dark:text-blue-300 font-semibold">
                สังกัด: {divisionFilter}
              </span>
            )}
            {subDivisionFilter !== 'all' && (
              <span className="px-2 py-0.5 rounded-md bg-white dark:bg-slate-900 border border-blue-200 dark:border-blue-700 text-blue-800 dark:text-blue-300 font-semibold">
                ฝ่าย: {subDivisionFilter}
              </span>
            )}
            {searchTerm.trim() && (
              <span className="px-2 py-0.5 rounded-md bg-white dark:bg-slate-900 border border-blue-200 text-slate-700 font-semibold">
                ค้นหา: "{searchTerm}"
              </span>
            )}
            <span className="text-slate-500 font-medium">
              (พบ {filteredOfficers.length} จาก {officers.length} รายการ)
            </span>
          </div>

          <button
            onClick={() => {
              setSearchTerm('');
              setDivisionFilter('all');
              setSubDivisionFilter('all');
              setLevelFilter('all');
              setCommissionFilter('all');
              setStatusFilter('all');
              setGenderFilter('all');
              setPage(1);
              onClearFilters?.();
            }}
            className="flex items-center gap-1 px-2.5 py-1 text-[11px] font-bold text-rose-700 dark:text-rose-300 bg-white dark:bg-slate-900 border border-rose-200 dark:border-rose-800 rounded-lg hover:bg-rose-50 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3 h-3" />
            ล้างตัวกรอง (แสดงทั้งหมด {officers.length} รายการ)
          </button>
        </div>
      )}

      {/* Main Table Container */}
      <div
        className={`rounded-2xl border overflow-hidden shadow-sm ${
          isPastelTheme
            ? 'border-slate-200 bg-white text-slate-800'
            : 'border-slate-800 bg-slate-900/90 text-slate-100'
        }`}
      >
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr
                className={`border-b font-bold font-['Chakra_Petch',sans-serif] ${
                  isPastelTheme
                    ? 'bg-[#F8FAFC] border-slate-200 text-slate-700'
                    : 'bg-slate-950/80 border-slate-800 text-slate-300 font-medium'
                }`}
              >
                <th className="py-3 px-3 w-10 text-center">
                  <button onClick={handleSelectAll} className="text-slate-400 hover:text-blue-600">
                    {selectedIds.length === paginatedOfficers.length && paginatedOfficers.length > 0 ? (
                      <CheckSquare className="w-4 h-4 text-blue-600" />
                    ) : (
                      <Square className="w-4 h-4" />
                    )}
                  </button>
                </th>
                <th className="py-3 px-3 min-w-[130px]">เลขตำแหน่ง</th>
                <th className="py-3 px-2 min-w-[60px]">บช.</th>
                <th className="py-3 px-3 min-w-[120px]">บก.</th>
                <th className="py-3 px-3 min-w-[140px]">กก. / ฝ่าย</th>
                <th className="py-3 px-3 min-w-[130px]">สายงาน / หน้าที่</th>
                <th className="py-3 px-2 min-w-[80px]">ระดับ</th>
                <th className="py-3 px-2 min-w-[80px]">ตำแหน่ง</th>
                <th className="py-3 px-2 min-w-[70px]">สัญญาบัตร</th>
                <th className="py-3 px-3 min-w-[180px]">ยศ - ชื่อ - สกุล</th>
                <th className="py-3 px-2 min-w-[50px] text-center">เพศ</th>
                <th className="py-3 px-3 min-w-[100px] text-center">จัดการ</th>
              </tr>
            </thead>
            <tbody className={`divide-y ${isPastelTheme ? 'divide-slate-100' : 'divide-slate-800/60'}`}>
              {paginatedOfficers.length === 0 ? (
                <tr>
                  <td colSpan={12} className="py-12 text-center text-slate-400">
                    <UserX className="w-8 h-8 mx-auto mb-2 text-slate-400" />
                    <p className="text-sm font-medium">ไม่พบข้อมูลกำลังพลที่ตรงกับเงื่อนไขการค้นหา</p>
                    <button
                      onClick={handleResetFilters}
                      className="mt-2 text-xs text-blue-600 font-semibold hover:underline inline-block"
                    >
                      ล้างตัวกรองทั้งหมด
                    </button>
                  </td>
                </tr>
              ) : (
                paginatedOfficers.map((officer) => {
                  const isSelected = selectedIds.includes(officer.id);
                  return (
                    <tr
                      key={officer.id}
                      className={`transition-colors ${
                        isPastelTheme
                          ? officer.isVacant
                            ? 'bg-[#FFFBEB]/70 hover:bg-[#FEF3C7]/60'
                            : isSelected
                            ? 'bg-blue-50/80'
                            : 'hover:bg-slate-50/80'
                          : officer.isVacant
                          ? 'bg-amber-950/10 hover:bg-slate-800/50'
                          : isSelected
                          ? 'bg-amber-500/10 hover:bg-slate-800/50'
                          : 'hover:bg-slate-800/50'
                      }`}
                    >
                      {/* Checkbox */}
                      <td className="py-2.5 px-3 text-center">
                        <button
                          onClick={() => handleToggleSelect(officer.id)}
                          className="text-slate-400 hover:text-blue-600"
                        >
                          {isSelected ? (
                            <CheckSquare className="w-4 h-4 text-blue-600" />
                          ) : (
                            <Square className="w-4 h-4" />
                          )}
                        </button>
                      </td>

                      {/* เลขตำแหน่ง */}
                      <td className={`py-2.5 px-3 font-mono font-bold whitespace-nowrap ${isPastelTheme ? 'text-[#1E3A8A]' : 'text-amber-300'}`}>
                        {officer.positionNumber}
                      </td>

                      {/* บช. */}
                      <td className={`py-2.5 px-2 whitespace-nowrap ${isPastelTheme ? 'text-slate-500' : 'text-slate-400'}`}>
                        {officer.bureau}
                      </td>

                      {/* บก. */}
                      <td className={`py-2.5 px-3 font-semibold ${isPastelTheme ? 'text-slate-800' : 'text-slate-300'}`}>
                        {officer.division.replace(' สกพ.', '')}
                      </td>

                      {/* กก. / ฝ่าย */}
                      <td className={`py-2.5 px-3 ${isPastelTheme ? 'text-slate-700' : 'text-slate-300'}`}>
                        {officer.subDivision}
                      </td>

                      {/* สายงาน / หน้าที่ */}
                      <td className={`py-2.5 px-3 leading-tight ${isPastelTheme ? 'text-slate-600' : 'text-slate-400'}`}>
                        <div className="truncate max-w-[160px]" title={officer.jobLine}>
                          {officer.jobLine}
                        </div>
                        {officer.duty && officer.duty !== officer.jobLine && (
                          <div className={`text-[11px] truncate max-w-[160px] ${isPastelTheme ? 'text-slate-400' : 'text-slate-500'}`} title={officer.duty}>
                            {officer.duty}
                          </div>
                        )}
                      </td>

                      {/* ระดับตำแหน่ง */}
                      <td className="py-2.5 px-2 font-medium">
                        <span
                          className={`px-1.5 py-0.5 rounded text-[11px] font-bold ${
                            isPastelTheme
                              ? 'bg-slate-100 border border-slate-200 text-slate-800'
                              : 'bg-slate-800 border border-slate-700 text-slate-200'
                          }`}
                        >
                          {officer.positionLevel}
                        </span>
                      </td>

                      {/* ตำแหน่ง */}
                      <td className={`py-2.5 px-2 text-[11px] ${isPastelTheme ? 'text-slate-700 font-medium' : 'text-slate-300'}`}>
                        {officer.positionTitle}
                      </td>

                      {/* สัญญาบัตร / ประทวน */}
                      <td className="py-2.5 px-2">
                        <span
                          className={`inline-block px-1.5 py-0.5 rounded text-[10px] font-bold ${
                            officer.commissionType === 'สัญญาบัตร'
                              ? isPastelTheme
                                ? 'bg-[#EFF6FF] text-[#1D4ED8] border border-[#BFDBFE]'
                                : 'bg-blue-950/80 text-blue-300 border border-blue-800/60'
                              : isPastelTheme
                              ? 'bg-slate-100 text-slate-600 border border-slate-200'
                              : 'bg-slate-800 text-slate-300 border border-slate-700'
                          }`}
                        >
                          {officer.commissionType}
                        </span>
                      </td>

                      {/* ยศ ชื่อ สกุล */}
                      <td className="py-2.5 px-3 font-medium whitespace-nowrap">
                        {officer.isVacant ? (
                          <span className={`italic flex items-center gap-1 font-semibold ${isPastelTheme ? 'text-amber-700' : 'text-amber-500'}`}>
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                            ตำแหน่งว่าง
                          </span>
                        ) : (
                          <div className={`flex items-center gap-1.5 ${isPastelTheme ? 'text-slate-900' : 'text-slate-100'}`}>
                            <span className={`font-bold ${isPastelTheme ? 'text-[#854D0E]' : 'text-amber-400'}`}>
                              {officer.rank}
                            </span>
                            <span className="font-semibold">{officer.firstName}</span>
                            <span>{officer.lastName}</span>
                          </div>
                        )}
                      </td>

                      {/* เพศ */}
                      <td className="py-2.5 px-2 text-center text-[11px] font-semibold">
                        {officer.gender === 'ชาย' ? (
                          <span className="text-sky-600">ชาย</span>
                        ) : officer.gender === 'หญิง' ? (
                          <span className="text-pink-600">หญิง</span>
                        ) : (
                          <span className="text-slate-400">-</span>
                        )}
                      </td>

                      {/* Action buttons: View, Edit, Delete */}
                      <td className="py-2.5 px-3 text-center whitespace-nowrap">
                        <div className="flex items-center justify-center gap-1">
                          <button
                            onClick={() => onViewOfficer(officer)}
                            className={`p-1 rounded transition-colors ${
                              isPastelTheme
                                ? 'text-slate-500 hover:text-blue-700 hover:bg-blue-50'
                                : 'text-slate-400 hover:text-amber-300 hover:bg-slate-800'
                            }`}
                            title="ดูรายละเอียดข้อมูลกำลังพล"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => onEditOfficer(officer)}
                            className={`p-1 rounded transition-colors ${
                              isPastelTheme
                                ? 'text-slate-500 hover:text-amber-700 hover:bg-amber-50'
                                : 'text-slate-400 hover:text-blue-400 hover:bg-slate-800'
                            }`}
                            title="แก้ไขข้อมูล (Edit)"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => onDeleteOfficer(officer)}
                            className={`p-1 rounded transition-colors ${
                              isPastelTheme
                                ? 'text-slate-500 hover:text-rose-700 hover:bg-rose-50'
                                : 'text-slate-400 hover:text-rose-400 hover:bg-slate-800'
                            }`}
                            title="ลบข้อมูล (Delete)"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Bar */}
        <div
          className={`flex flex-wrap items-center justify-between gap-3 p-3.5 border-t text-xs ${
            isPastelTheme
              ? 'bg-[#F8FAFC] border-slate-200 text-slate-600'
              : 'bg-slate-950/90 border-slate-800 text-slate-400'
          }`}
        >
          <div className="flex items-center gap-2">
            <span>แสดง</span>
            <select
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
                setPage(1);
              }}
              className={`px-2 py-1 rounded-lg border focus:outline-none ${
                isPastelTheme
                  ? 'bg-white border-slate-300 text-slate-800'
                  : 'bg-slate-900 border-slate-800 text-slate-300'
              }`}
            >
              <option value={25}>25 รายการ</option>
              <option value={50}>50 รายการ</option>
              <option value={100}>100 รายการ</option>
              <option value={500}>ทั้งหมด</option>
            </select>
            <span>
              จากทั้งหมด <strong className="font-mono text-slate-900">{filteredOfficers.length}</strong> รายการ
              {filteredOfficers.length !== officers.length && ` (จากกรอบรวม ${officers.length})`}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page <= 1}
              className={`px-2.5 py-1 rounded-lg border disabled:opacity-40 disabled:cursor-not-allowed transition-colors ${
                isPastelTheme
                  ? 'bg-white border-slate-300 text-slate-700 hover:bg-slate-50'
                  : 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800'
              }`}
            >
              &larr; ก่อนหน้า
            </button>
            <span className="px-2 py-1 font-mono font-bold text-slate-800">
              หน้า {page} / {totalPages}
            </span>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page >= totalPages}
              className={`px-2.5 py-1 rounded-lg border disabled:opacity-40 disabled:cursor-not-allowed transition-colors ${
                isPastelTheme
                  ? 'bg-white border-slate-300 text-slate-700 hover:bg-slate-50'
                  : 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800'
              }`}
            >
              ถัดไป &rarr;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
