/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { PoliceOfficer } from './types/personnel';
import { INITIAL_PERSONNEL } from './data/initialPersonnel';
import { THEMES, AppTheme } from './data/themes';
import { PoliceEmblem } from './components/PoliceEmblem';
import { DirectoryCover } from './components/DirectoryCover';
import { DirectoryTable } from './components/DirectoryTable';
import { StatsDashboard } from './components/StatsDashboard';
import { OrgChart } from './components/OrgChart';
import { PersonnelModal } from './components/PersonnelModal';
import { ImportExportModal } from './components/ImportExportModal';
import { OfficerDetailModal } from './components/OfficerDetailModal';
import { ThemeSelectorModal } from './components/ThemeSelectorModal';
import {
  BookOpen,
  Users,
  BarChart3,
  Network,
  Plus,
  Upload,
  Download,
  CheckCircle2,
  AlertTriangle,
  Building,
  Shield,
  Palette,
  Sparkles
} from 'lucide-react';

const LOCAL_STORAGE_KEY = 'police_directory_officers_v1';
const THEME_STORAGE_KEY = 'police_directory_theme_id_v2';

export default function App() {
  const [officers, setOfficers] = useState<PoliceOfficer[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.error('Failed to parse saved officers from localStorage', e);
    }
    return INITIAL_PERSONNEL;
  });

  // Active Theme Selection (Default: police-pastel)
  const [themeId, setThemeId] = useState<string>(() => {
    try {
      const saved = localStorage.getItem(THEME_STORAGE_KEY);
      if (saved && THEMES.some((t) => t.id === saved)) {
        return saved;
      }
    } catch (e) {}
    return 'police-pastel';
  });

  const currentTheme: AppTheme = THEMES.find((t) => t.id === themeId) || THEMES[0];
  const isPastelTheme = !currentTheme.isDark;

  const [activeView, setActiveView] = useState<'cover' | 'directory' | 'breakdown' | 'orgChart'>('orgChart');
  const [divisionFilter, setDivisionFilter] = useState('all');
  const [subDivisionFilter, setSubDivisionFilter] = useState('all');

  // Modals state
  const [isPersonnelModalOpen, setIsPersonnelModalOpen] = useState(false);
  const [personnelModalMode, setPersonnelModalMode] = useState<'add' | 'edit'>('add');
  const [selectedOfficerForEdit, setSelectedOfficerForEdit] = useState<PoliceOfficer | null>(null);

  const [isImportExportOpen, setIsImportExportOpen] = useState(false);
  const [isThemeModalOpen, setIsThemeModalOpen] = useState(false);
  const [selectedOfficerForView, setSelectedOfficerForView] = useState<PoliceOfficer | null>(null);

  // Toast feedback state
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // Sync officers to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(officers));
    } catch (e) {
      console.error('Failed to save officers to localStorage', e);
    }
  }, [officers]);

  // Sync theme to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(THEME_STORAGE_KEY, themeId);
    } catch (e) {}
  }, [themeId]);

  // CRUD Operations
  const handleSaveOfficer = (officer: PoliceOfficer) => {
    setOfficers((prev) => {
      const existsIndex = prev.findIndex((o) => o.id === officer.id);
      if (existsIndex >= 0) {
        const updated = [...prev];
        updated[existsIndex] = officer;
        showToast(`บันทึกการแก้ไขตำแหน่งเลขที่ ${officer.positionNumber} สำเร็จ`);
        return updated;
      } else {
        showToast(`เพิ่มข้อมูลกำลังพล ${officer.positionNumber} เรียบร้อยแล้ว`);
        return [officer, ...prev];
      }
    });
  };

  const handleDeleteOfficer = (officer: PoliceOfficer) => {
    if (
      window.confirm(
        `ยืนยันการลบข้อมูลตำแหน่งเลขที่ ${officer.positionNumber} (${
          officer.isVacant ? 'ตำแหน่งว่าง' : `${officer.rank} ${officer.firstName} ${officer.lastName}`
        }) หรือไม่?`
      )
    ) {
      setOfficers((prev) => prev.filter((o) => o.id !== officer.id));
      showToast(`ลบตำแหน่งเลขที่ ${officer.positionNumber} เรียบร้อยแล้ว`);
    }
  };

  const handleDeleteMultiple = (ids: string[]) => {
    setOfficers((prev) => prev.filter((o) => !ids.includes(o.id)));
    showToast(`ลบข้อมูลกำลังพลที่เลือกจำนวน ${ids.length} รายการเรียบร้อยแล้ว`);
  };

  const handleImport = (newOfficers: PoliceOfficer[], mode: 'append' | 'update' | 'replace') => {
    if (mode === 'replace') {
      setOfficers(newOfficers);
      showToast(`แทนที่ข้อมูลทำเนียบกำลังพลด้วย ${newOfficers.length} รายการเรียบร้อย`);
    } else if (mode === 'append') {
      setOfficers((prev) => [...prev, ...newOfficers]);
      showToast(`เพิ่มข้อมูลกำลังพลใหม่ ${newOfficers.length} รายการเรียบร้อย`);
    } else if (mode === 'update') {
      setOfficers((prev) => {
        const map = new Map(prev.map((o) => [o.positionNumber, o]));
        let updatedCount = 0;
        let addedCount = 0;

        newOfficers.forEach((o) => {
          if (map.has(o.positionNumber)) {
            map.set(o.positionNumber, { ...map.get(o.positionNumber)!, ...o });
            updatedCount++;
          } else {
            map.set(o.positionNumber, o);
            addedCount++;
          }
        });

        showToast(`อัปเดตข้อมูล ${updatedCount} รายการ และเพิ่มใหม่ ${addedCount} รายการ สำเร็จ`);
        return Array.from(map.values());
      });
    }
  };

  const handleResetDefault = () => {
    setOfficers(INITIAL_PERSONNEL);
    showToast('คืนค่าข้อมูลทำเนียบกำลังพลเริ่มต้นจากเล่มเอกสารราชการสำเร็จ');
  };

  const handleSelectDivisionFromCover = (div: string) => {
    setDivisionFilter(div);
    setSubDivisionFilter('all');
    setActiveView('directory');
  };

  return (
    <div
      className={`min-h-screen flex flex-col font-['Sarabun',sans-serif] transition-colors duration-200 ${
        currentTheme.bgApp
      } ${currentTheme.textMain}`}
    >
      {/* Toast Notification */}
      {toastMessage && (
        <div
          className={`fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 rounded-2xl shadow-2xl animate-bounce text-xs border ${
            currentTheme.isDark
              ? 'bg-slate-900 border-amber-500/50 text-slate-100'
              : 'bg-white border-amber-500/80 text-slate-900'
          }`}
        >
          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
          <span className="font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* Top Bar Contract (Strict 3-zone layout) */}
      <header
        className={`sticky top-0 z-40 w-full backdrop-blur-md border-b print:hidden transition-colors ${
          currentTheme.headerBg
        } ${currentTheme.headerBorder}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          {/* Zone 1: Single text element wordmark */}
          <div
            onClick={() => setActiveView('orgChart')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <PoliceEmblem size={34} className="group-hover:scale-105 transition-transform" />
            <span
              className={`text-base sm:text-lg font-bold tracking-tight font-['Chakra_Petch',sans-serif] transition-colors ${
                currentTheme.isDark
                  ? 'text-slate-100 group-hover:text-amber-300'
                  : 'text-slate-900 group-hover:text-blue-900'
              }`}
            >
              ทำเนียบกำลังพล สกพ.
            </span>
          </div>

          {/* Zone 2: Navigation Links (แผนผังโครงสร้าง สลับมาอยู่ตำแหน่งแรก, หน้าปกทำเนียบ สลับไปอยู่ตำแหน่งท้าย) */}
          <nav className="hidden md:flex items-center gap-1 sm:gap-2 text-xs font-semibold">
            <button
              onClick={() => setActiveView('orgChart')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-colors cursor-pointer ${
                activeView === 'orgChart' ? currentTheme.navActive : currentTheme.navInactive
              }`}
            >
              <Network className="w-3.5 h-3.5" />
              แผนผังโครงสร้าง
            </button>

            <button
              onClick={() => {
                setDivisionFilter('all');
                setSubDivisionFilter('all');
                setActiveView('directory');
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-colors cursor-pointer ${
                activeView === 'directory' ? currentTheme.navActive : currentTheme.navInactive
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              ทำเนียบกำลังพล
              <span
                className={`ml-1 text-[10px] font-mono px-1.5 py-0.2 rounded-full font-bold ${
                  currentTheme.isDark ? 'bg-slate-800 text-amber-400' : 'bg-blue-100 text-blue-800'
                }`}
              >
                {officers.length}
              </span>
            </button>

            <button
              onClick={() => setActiveView('breakdown')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-colors cursor-pointer ${
                activeView === 'breakdown' ? currentTheme.navActive : currentTheme.navInactive
              }`}
            >
              <BarChart3 className="w-3.5 h-3.5" />
              แยกย่อยองค์ประกอบ
            </button>

            <button
              onClick={() => setActiveView('cover')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-colors cursor-pointer ${
                activeView === 'cover' ? currentTheme.navActive : currentTheme.navInactive
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              หน้าปกทำเนียบ
            </button>
          </nav>

          {/* Zone 3: Primary Action buttons & Theme Switcher */}
          <div className="flex items-center gap-2">
            {/* Theme Selector Trigger Button */}
            <button
              onClick={() => setIsThemeModalOpen(true)}
              className={`flex items-center gap-2 px-3 py-1.5 text-xs font-semibold rounded-xl border transition-all cursor-pointer shadow-2xs ${
                currentTheme.isDark
                  ? 'bg-slate-900 border-slate-700 text-amber-300 hover:bg-slate-850'
                  : 'bg-white border-slate-200 text-slate-800 hover:border-slate-300'
              }`}
              title="เปลี่ยนสีรูปแบบธีมทำเนียบและแผนผัง"
            >
              <Palette className="w-3.5 h-3.5 text-amber-500" />
              <span className="hidden sm:inline font-['Chakra_Petch',sans-serif]">
                ธีม: {currentTheme.name.split(' ')[0]}
              </span>
              <div className="flex items-center gap-1">
                {currentTheme.swatches.slice(0, 3).map((col, i) => (
                  <span
                    key={i}
                    className="w-2.5 h-2.5 rounded-full border border-black/10 inline-block shrink-0"
                    style={{ backgroundColor: col }}
                  />
                ))}
              </div>
            </button>

            <button
              onClick={() => setIsImportExportOpen(true)}
              className={`hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-xl border transition-colors cursor-pointer shadow-2xs ${
                currentTheme.isDark
                  ? 'text-slate-300 bg-slate-900 hover:bg-slate-800 border-slate-700'
                  : 'text-slate-700 bg-white hover:bg-slate-50 border-slate-300'
              }`}
              title="อัปโหลด หรือ ดาวน์โหลดไฟล์ Excel / CSV"
            >
              <Upload className="w-3.5 h-3.5 text-blue-600" />
              <span>อัปเดต / ส่งออก</span>
            </button>

            <button
              onClick={() => {
                setSelectedOfficerForEdit(null);
                setPersonnelModalMode('add');
                setIsPersonnelModalOpen(true);
              }}
              className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold text-slate-950 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 rounded-xl shadow-xs transition-all cursor-pointer whitespace-nowrap"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>เพิ่มกำลังพล</span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation bar */}
        <div
          className={`flex md:hidden border-t px-2 py-1.5 overflow-x-auto gap-1 text-[11px] ${
            currentTheme.isDark ? 'bg-slate-950 border-slate-800' : 'bg-[#F8FAFC] border-slate-200'
          }`}
        >
          <button
            onClick={() => setActiveView('orgChart')}
            className={`px-2.5 py-1 rounded-lg whitespace-nowrap font-medium ${
              activeView === 'orgChart' ? 'font-bold bg-amber-500/20 text-amber-700 dark:text-amber-300' : 'text-slate-500'
            }`}
          >
            แผนผังโครงสร้าง
          </button>
          <button
            onClick={() => {
              setDivisionFilter('all');
              setSubDivisionFilter('all');
              setActiveView('directory');
            }}
            className={`px-2.5 py-1 rounded-lg whitespace-nowrap font-medium ${
              activeView === 'directory' ? 'font-bold bg-amber-500/20 text-amber-700 dark:text-amber-300' : 'text-slate-500'
            }`}
          >
            ทำเนียบกำลังพล ({officers.length})
          </button>
          <button
            onClick={() => setActiveView('breakdown')}
            className={`px-2.5 py-1 rounded-lg whitespace-nowrap font-medium ${
              activeView === 'breakdown' ? 'font-bold bg-amber-500/20 text-amber-700 dark:text-amber-300' : 'text-slate-500'
            }`}
          >
            แยกย่อยองค์ประกอบ
          </button>
          <button
            onClick={() => setActiveView('cover')}
            className={`px-2.5 py-1 rounded-lg whitespace-nowrap font-medium ${
              activeView === 'cover' ? 'font-bold bg-amber-500/20 text-amber-700 dark:text-amber-300' : 'text-slate-500'
            }`}
          >
            หน้าปกทำเนียบ
          </button>
          <button
            onClick={() => setIsThemeModalOpen(true)}
            className="px-2.5 py-1 rounded-lg whitespace-nowrap text-purple-600 font-bold flex items-center gap-1"
          >
            <Palette className="w-3 h-3" />
            ธีม
          </button>
          <button
            onClick={() => setIsImportExportOpen(true)}
            className="px-2.5 py-1 rounded-lg whitespace-nowrap text-blue-600 font-bold"
          >
            อัปเดต/ส่งออก
          </button>
        </div>
      </header>

      {/* Main Viewport Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        {activeView === 'orgChart' && (
          <OrgChart
            officers={officers}
            onSelectSubDivision={(div, sub) => {
              setDivisionFilter(div);
              setSubDivisionFilter(sub);
              setActiveView('directory');
            }}
            onViewOfficer={(officer) => setSelectedOfficerForView(officer)}
            onEditOfficer={(officer) => {
              setSelectedOfficerForEdit(officer);
              setPersonnelModalMode('edit');
              setIsPersonnelModalOpen(true);
            }}
            onDeleteOfficer={handleDeleteOfficer}
            onAddOfficerToSubDiv={(div, sub) => {
              setSelectedOfficerForEdit({
                id: `p-${Date.now()}`,
                positionNumber: '',
                bureau: 'สกพ.',
                division: div,
                subDivision: sub === '__ALL__' ? (div === 'สกพ.' ? 'สกพ.' : div) : sub,
                jobGroup: 'อำนวยการและสนับสนุน',
                jobLine: '',
                duty: '',
                positionLevel: 'สว.',
                positionTitle: '',
                commissionType: 'สัญญาบัตร',
                rank: 'พ.ต.ท.',
                firstName: '',
                lastName: '',
                gender: 'ชาย',
                isVacant: false,
              });
              setPersonnelModalMode('add');
              setIsPersonnelModalOpen(true);
            }}
            currentTheme={currentTheme}
          />
        )}

        {activeView === 'directory' && (
          <div className="space-y-4 animate-fadeIn">
            <div className="flex items-center justify-between">
              <div>
                <h2 className={`text-lg font-bold font-['Chakra_Petch',sans-serif] ${currentTheme.textMain}`}>
                  ระบบทะเบียนและทำเนียบกำลังพล สกพ.
                </h2>
                <p className={`text-xs ${currentTheme.textMuted}`}>
                  ตรวจสอบ ค้นหา แก้ไข ลบ อัปโหลด และส่งออกข้อมูลอัตรากำลังพลครบทุกหน่วยงาน · ธีม: {currentTheme.name}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsImportExportOpen(true)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-xl border transition-colors cursor-pointer shadow-2xs ${
                    currentTheme.isDark
                      ? 'text-slate-300 bg-slate-900 hover:bg-slate-800 border-slate-700'
                      : 'text-slate-700 bg-white hover:bg-slate-50 border-slate-300'
                  }`}
                >
                  <Download className="w-3.5 h-3.5 text-emerald-600" />
                  ดาวน์โหลดรายงาน
                </button>
              </div>
            </div>

            <DirectoryTable
              officers={officers}
              onAddOfficer={() => {
                setSelectedOfficerForEdit(null);
                setPersonnelModalMode('add');
                setIsPersonnelModalOpen(true);
              }}
              onEditOfficer={(officer) => {
                setSelectedOfficerForEdit(officer);
                setPersonnelModalMode('edit');
                setIsPersonnelModalOpen(true);
              }}
              onDeleteOfficer={handleDeleteOfficer}
              onDeleteMultiple={handleDeleteMultiple}
              onOpenImportExport={() => setIsImportExportOpen(true)}
              onViewOfficer={(officer) => setSelectedOfficerForView(officer)}
              initialDivisionFilter={divisionFilter}
              initialSubDivisionFilter={subDivisionFilter}
              onClearFilters={() => {
                setDivisionFilter('all');
                setSubDivisionFilter('all');
              }}
              isPastelTheme={isPastelTheme}
            />
          </div>
        )}

        {activeView === 'breakdown' && (
          <StatsDashboard
            officers={officers}
            onSelectDivisionFilter={(div) => {
              setDivisionFilter(div);
              setActiveView('directory');
            }}
            isPastelTheme={isPastelTheme}
          />
        )}

        {activeView === 'cover' && (
          <DirectoryCover
            officers={officers}
            onOpenDirectory={() => {
              setDivisionFilter('all');
              setActiveView('directory');
            }}
            onOpenManagement={() => setActiveView('directory')}
            onSelectDivision={handleSelectDivisionFromCover}
            isPastelTheme={isPastelTheme}
            currentTheme={currentTheme}
          />
        )}
      </main>

      {/* Modals */}
      <PersonnelModal
        isOpen={isPersonnelModalOpen}
        onClose={() => setIsPersonnelModalOpen(false)}
        onSave={handleSaveOfficer}
        initialOfficer={selectedOfficerForEdit}
        mode={personnelModalMode}
      />

      <ImportExportModal
        isOpen={isImportExportOpen}
        onClose={() => setIsImportExportOpen(false)}
        officers={officers}
        onImport={handleImport}
        onResetDefault={handleResetDefault}
      />

      <ThemeSelectorModal
        isOpen={isThemeModalOpen}
        onClose={() => setIsThemeModalOpen(false)}
        currentThemeId={themeId}
        onSelectTheme={(id) => {
          setThemeId(id);
          const t = THEMES.find((th) => th.id === id);
          if (t) {
            showToast(`เปลี่ยนธีมเป็น "${t.name}" สำเร็จ`);
          }
        }}
      />

      <OfficerDetailModal
        isOpen={!!selectedOfficerForView}
        officer={selectedOfficerForView}
        onClose={() => setSelectedOfficerForView(null)}
        onEdit={(officer) => {
          setSelectedOfficerForEdit(officer);
          setPersonnelModalMode('edit');
          setIsPersonnelModalOpen(true);
        }}
        onDelete={handleDeleteOfficer}
      />

      {/* Footer */}
      <footer
        className={`border-t py-6 text-center text-xs print:hidden ${
          currentTheme.isDark
            ? 'bg-slate-950 border-slate-900 text-slate-500'
            : 'bg-white border-slate-200 text-slate-500'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <PoliceEmblem size={22} />
            <span className={`font-semibold ${currentTheme.textMain}`}>
              ทำเนียบกำลังพล สำนักงานกำลังพล สำนักงานตำรวจแห่งชาติ (สกพ.)
            </span>
          </div>
          <div>
            <span>ประจำปีงบประมาณ พ.ศ. ๒๕๖๙ · ธีม: {currentTheme.name}</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
