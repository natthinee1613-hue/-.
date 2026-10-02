export interface OrgDivisionTheme {
  bg: string;
  header: string;
  border: string;
  text: string;
  badge: string;
  subItem: string;
  bar: string;
}

export interface AppTheme {
  id: string;
  name: string;
  englishName: string;
  description: string;
  isDark: boolean;
  swatches: string[];
  bgApp: string;
  textMain: string;
  textMuted: string;
  headerBg: string;
  headerBorder: string;
  navActive: string;
  navInactive: string;
  cardBg: string;
  cardBorder: string;
  inputBg: string;
  inputBorder: string;
  tableHeaderBg: string;
  tableBorder: string;
  tableRowHover: string;
  vacantRowBg: string;
  orgChart: {
    commander: {
      bg: string;
      border: string;
      text: string;
      subtext: string;
      badge: string;
    };
    deputiesBg: string;
    deputiesBorder: string;
    deputiesText: string;
    divisions: {
      'สกพ.': OrgDivisionTheme;
      'กองอัตรากำลัง สกพ.': OrgDivisionTheme;
      'กองทะเบียนพล สกพ.': OrgDivisionTheme;
      'กองสวัสดิการ สกพ.': OrgDivisionTheme;
    };
  };
}

export const THEMES: AppTheme[] = [
  // 1. แบทแมน / ดาร์กไนท์แห่งก็อตแธม (Batman The Dark Knight)
  {
    id: 'batman-dark-knight',
    name: 'แบทแมน อัศวินรัตติกาล (Batman)',
    englishName: 'Batman / The Dark Knight',
    description: 'โทนสีดำออนิกซ์ ชาร์โคล คาร์บอนแบล็ค ตัดกับสีเหลือง Bat-Signal และไทเทเนียม สไตล์อัศวินรัตติกาล',
    isDark: true,
    swatches: ['#0A0A0C', '#18181F', '#272736', '#FFE500', '#FACC15'],
    bgApp: 'bg-[#08080B]',
    textMain: 'text-[#F4F4F5]',
    textMuted: 'text-[#A1A1AA]',
    headerBg: 'bg-[#0E0E14]/95',
    headerBorder: 'border-[#272733]',
    navActive: 'bg-[#FFE500] text-slate-950 font-black border-[#FFE500] shadow-[0_0_15px_rgba(255,229,0,0.35)]',
    navInactive: 'text-[#A1A1AA] hover:text-[#FFE500] hover:bg-[#181822]',
    cardBg: 'bg-[#111117]',
    cardBorder: 'border-[#262635]',
    inputBg: 'bg-[#09090D]',
    inputBorder: 'border-[#2C2C3C] focus:border-[#FFE500]',
    tableHeaderBg: 'bg-[#15151F]',
    tableBorder: 'border-[#262635]',
    tableRowHover: 'hover:bg-[#1B1B26]',
    vacantRowBg: 'bg-[#FFE500]/5',
    orgChart: {
      commander: {
        bg: 'bg-gradient-to-b from-[#1C1C26] via-[#121219] to-[#0A0A0E]',
        border: 'border-[#FFE500] shadow-[0_0_30px_rgba(255,229,0,0.3)]',
        text: 'text-[#FFE500] drop-shadow-[0_2px_12px_rgba(255,229,0,0.4)]',
        subtext: 'text-[#E4E4E7]',
        badge: 'bg-[#FFE500] text-black font-black border-[#FFE500]',
      },
      deputiesBg: 'bg-gradient-to-r from-[#12121A] via-[#1B1B26] to-[#12121A]',
      deputiesBorder: 'border-[#36364A]',
      deputiesText: 'text-[#FFE500]',
      divisions: {
        'สกพ.': {
          bg: 'bg-[#0F0F15]',
          header: 'bg-gradient-to-r from-[#1C1C28] to-[#12121A]',
          border: 'border-[#FFE500]/60 hover:border-[#FFE500]',
          text: 'text-[#FFE500]',
          badge: 'bg-[#FFE500]/15 text-[#FFE500] border-[#FFE500]/40',
          subItem: 'bg-[#151520]/90 hover:bg-[#20202E] border-[#2A2A3C] text-[#E4E4E7]',
          bar: 'from-[#FFE500] to-[#EAB308]',
        },
        'กองอัตรากำลัง สกพ.': {
          bg: 'bg-[#0F0F15]',
          header: 'bg-gradient-to-r from-[#13221C] to-[#0F0F15]',
          border: 'border-[#10B981]/60 hover:border-[#10B981]',
          text: 'text-[#34D399]',
          badge: 'bg-[#10B981]/15 text-[#34D399] border-[#10B981]/40',
          subItem: 'bg-[#151520]/90 hover:bg-[#182B22] border-[#2A2A3C] text-[#E4E4E7]',
          bar: 'from-[#10B981] to-[#059669]',
        },
        'กองทะเบียนพล สกพ.': {
          bg: 'bg-[#0F0F15]',
          header: 'bg-gradient-to-r from-[#121C2B] to-[#0F0F15]',
          border: 'border-[#38BDF8]/60 hover:border-[#38BDF8]',
          text: 'text-[#38BDF8]',
          badge: 'bg-[#38BDF8]/15 text-[#38BDF8] border-[#38BDF8]/40',
          subItem: 'bg-[#151520]/90 hover:bg-[#17263A] border-[#2A2A3C] text-[#E4E4E7]',
          bar: 'from-[#38BDF8] to-[#0284C7]',
        },
        'กองสวัสดิการ สกพ.': {
          bg: 'bg-[#0F0F15]',
          header: 'bg-gradient-to-r from-[#26131C] to-[#0F0F15]',
          border: 'border-[#F43F5E]/60 hover:border-[#F43F5E]',
          text: 'text-[#FB7185]',
          badge: 'bg-[#F43F5E]/15 text-[#FB7185] border-[#F43F5E]/40',
          subItem: 'bg-[#151520]/90 hover:bg-[#301622] border-[#2A2A3C] text-[#E4E4E7]',
          bar: 'from-[#F43F5E] to-[#E11D48]',
        },
      },
    },
  },

  // 2. พาสเทลราชการตำรวจ (มาตรฐาน)
  {
    id: 'police-pastel',
    name: 'พาสเทลราชการตำรวจ',
    englishName: 'Royal Police Pastel',
    description: 'โทนฟ้าไอซ์บลู ทองนวล เซจมินต์ และชมพูกลีบบัว สบายตาสง่างาม',
    isDark: false,
    swatches: ['#E0F2FE', '#FEF3C7', '#D1FAE5', '#EDE9FE', '#FFE4E6'],
    bgApp: 'bg-[#F4F7FB]',
    textMain: 'text-slate-800',
    textMuted: 'text-slate-500',
    headerBg: 'bg-white/95',
    headerBorder: 'border-[#CBD5E1]',
    navActive: 'bg-[#E0F2FE] text-[#0369A1] border-[#BAE6FD] shadow-2xs font-bold',
    navInactive: 'text-slate-600 hover:text-slate-900 hover:bg-slate-100',
    cardBg: 'bg-white',
    cardBorder: 'border-slate-200',
    inputBg: 'bg-[#F8FAFC]',
    inputBorder: 'border-slate-300 focus:border-blue-500',
    tableHeaderBg: 'bg-[#F8FAFC]',
    tableBorder: 'border-slate-200',
    tableRowHover: 'hover:bg-blue-50/50',
    vacantRowBg: 'bg-[#FFFBEB]/70',
    orgChart: {
      commander: {
        bg: 'bg-gradient-to-b from-[#FFFDF5] via-[#FEF7E6] to-[#FDF0CC]',
        border: 'border-[#E5C158]',
        text: 'text-[#3B2C05]',
        subtext: 'text-[#7A6328]',
        badge: 'bg-[#F5DF97] text-[#7A5308] border-[#DDB640]',
      },
      deputiesBg: 'bg-gradient-to-r from-[#EFF6FF] via-[#F8FAFC] to-[#EFF6FF]',
      deputiesBorder: 'border-[#BFDBFE]',
      deputiesText: 'text-[#1E3A8A]',
      divisions: {
        'สกพ.': {
          bg: 'bg-[#F0F7FC]',
          header: 'bg-gradient-to-r from-[#E1F0FA] to-[#EBF5FB]',
          border: 'border-[#BAE6FD]',
          text: 'text-[#0C4A6E]',
          badge: 'bg-[#E0F2FE] text-[#0284C7] border-[#7DD3FC]',
          subItem: 'bg-white/90 hover:bg-[#E0F2FE]/60 border-[#BAE6FD]/80 text-[#0F172A]',
          bar: 'from-[#0284C7] to-[#38BDF8]',
        },
        'กองอัตรากำลัง สกพ.': {
          bg: 'bg-[#F2FBF7]',
          header: 'bg-gradient-to-r from-[#DCFCE7] to-[#E6FDF0]',
          border: 'border-[#A7F3D0]',
          text: 'text-[#064E3B]',
          badge: 'bg-[#D1FAE5] text-[#059669] border-[#6EE7B7]',
          subItem: 'bg-white/90 hover:bg-[#D1FAE5]/60 border-[#A7F3D0]/80 text-[#0F172A]',
          bar: 'from-[#059669] to-[#34D399]',
        },
        'กองทะเบียนพล สกพ.': {
          bg: 'bg-[#F4F6FD]',
          header: 'bg-gradient-to-r from-[#E0E7FF] to-[#EEF2FF]',
          border: 'border-[#C7D2FE]',
          text: 'text-[#1E1B4B]',
          badge: 'bg-[#E0E7FF] text-[#4F46E5] border-[#A5B4FC]',
          subItem: 'bg-white/90 hover:bg-[#E0E7FF]/60 border-[#C7D2FE]/80 text-[#0F172A]',
          bar: 'from-[#4F46E5] to-[#818CF8]',
        },
        'กองสวัสดิการ สกพ.': {
          bg: 'bg-[#FDF3F5]',
          header: 'bg-gradient-to-r from-[#FCE7F3] to-[#FDF2F8]',
          border: 'border-[#FBCFE8]',
          text: 'text-[#831843]',
          badge: 'bg-[#FCE7F3] text-[#DB2777] border-[#F9A8D4]',
          subItem: 'bg-white/90 hover:bg-[#FCE7F3]/60 border-[#FBCFE8]/80 text-[#0F172A]',
          bar: 'from-[#DB2777] to-[#F472B6]',
        },
      },
    },
  },

  // 2. พาสเทลกากีทองพิธีการ (Khaki Gold Ceremonial Pastel)
  {
    id: 'khaki-gold',
    name: 'พาสเทลกากีทองพิธีการ',
    englishName: 'Ceremonial Khaki Gold',
    description: 'โทนสีกากีอ่อน เบจ และทองคำ ตามแบบฉบับเครื่องแบบข้าราชการตำรวจ',
    isDark: false,
    swatches: ['#FDF8EE', '#F6EBD8', '#E6D2B5', '#B8860B', '#78350F'],
    bgApp: 'bg-[#FAF6EE]',
    textMain: 'text-[#2D241E]',
    textMuted: 'text-[#7C6A5A]',
    headerBg: 'bg-[#FFFDF9]/95',
    headerBorder: 'border-[#EADCC8]',
    navActive: 'bg-[#F4E6D0] text-[#78350F] border-[#DFCAAE] shadow-2xs font-bold',
    navInactive: 'text-[#6B5A4B] hover:text-[#2D241E] hover:bg-[#F7EFE4]',
    cardBg: 'bg-[#FFFDF8]',
    cardBorder: 'border-[#E8DAC5]',
    inputBg: 'bg-[#FAF5EC]',
    inputBorder: 'border-[#DECDB7] focus:border-[#B45309]',
    tableHeaderBg: 'bg-[#F7EFE2]',
    tableBorder: 'border-[#E8DAC5]',
    tableRowHover: 'hover:bg-[#F5ECE0]',
    vacantRowBg: 'bg-[#FFF7ED]/80',
    orgChart: {
      commander: {
        bg: 'bg-gradient-to-b from-[#FFFDF8] via-[#FAF2E1] to-[#F3E5C8]',
        border: 'border-[#C59B27]',
        text: 'text-[#3E2D07]',
        subtext: 'text-[#7C5E13]',
        badge: 'bg-[#EED58D] text-[#694E07] border-[#C59B27]',
      },
      deputiesBg: 'bg-gradient-to-r from-[#F9F1E2] via-[#FFFDF9] to-[#F9F1E2]',
      deputiesBorder: 'border-[#DECDB7]',
      deputiesText: 'text-[#78350F]',
      divisions: {
        'สกพ.': {
          bg: 'bg-[#FAF5EC]',
          header: 'bg-gradient-to-r from-[#F5ECE0] to-[#FAF5EC]',
          border: 'border-[#E3D3BE]',
          text: 'text-[#5C4028]',
          badge: 'bg-[#EEDBC3] text-[#784A22] border-[#D6BC9B]',
          subItem: 'bg-white/95 hover:bg-[#F5ECE0] border-[#E8DAC5] text-[#2D241E]',
          bar: 'from-[#B45309] to-[#D97706]',
        },
        'กองอัตรากำลัง สกพ.': {
          bg: 'bg-[#F7F8F1]',
          header: 'bg-gradient-to-r from-[#EDF2DF] to-[#F7F8F1]',
          border: 'border-[#D4DEC0]',
          text: 'text-[#3E4F28]',
          badge: 'bg-[#DFEAC8] text-[#4A6328] border-[#BDCEA3]',
          subItem: 'bg-white/95 hover:bg-[#EDF2DF] border-[#D4DEC0] text-[#2D241E]',
          bar: 'from-[#4D7C0F] to-[#84CC16]',
        },
        'กองทะเบียนพล สกพ.': {
          bg: 'bg-[#F8F5FA]',
          header: 'bg-gradient-to-r from-[#EFE8F5] to-[#F8F5FA]',
          border: 'border-[#DDD0EA]',
          text: 'text-[#4A3261]',
          badge: 'bg-[#E5D7F0] text-[#5B377D] border-[#C9B3DE]',
          subItem: 'bg-white/95 hover:bg-[#EFE8F5] border-[#DDD0EA] text-[#2D241E]',
          bar: 'from-[#7E22CE] to-[#A855F7]',
        },
        'กองสวัสดิการ สกพ.': {
          bg: 'bg-[#FAF3F1]',
          header: 'bg-gradient-to-r from-[#F5E5E0] to-[#FAF3F1]',
          border: 'border-[#E8CDC4]',
          text: 'text-[#6B3728]',
          badge: 'bg-[#EED2C9] text-[#853D2A] border-[#D8AEA2]',
          subItem: 'bg-white/95 hover:bg-[#F5E5E0] border-[#E8CDC4] text-[#2D241E]',
          bar: 'from-[#C2410C] to-[#F97316]',
        },
      },
    },
  },

  // 3. พาสเทลศิลาดลหยกพิทักษ์ (Celadon Jade / Soft Emerald)
  {
    id: 'celadon-mint',
    name: 'พาสเทลศิลาดลหยกพิทักษ์',
    englishName: 'Celadon Jade Pastel',
    description: 'โทนเขียวศิลาดล มิ้นต์ และมรกต แสดงถึงความเที่ยงธรรม ร่มเย็น สันติสุข',
    isDark: false,
    swatches: ['#E6F4EA', '#CEEAD6', '#A8DAB5', '#0F9D58', '#0B6623'],
    bgApp: 'bg-[#F1F9F4]',
    textMain: 'text-[#132A1C]',
    textMuted: 'text-[#466952]',
    headerBg: 'bg-white/95',
    headerBorder: 'border-[#C3E4CD]',
    navActive: 'bg-[#D5EFE0] text-[#0A5C2C] border-[#A8DBBA] shadow-2xs font-bold',
    navInactive: 'text-[#3E654C] hover:text-[#132A1C] hover:bg-[#EAF5EE]',
    cardBg: 'bg-white',
    cardBorder: 'border-[#CFE5D6]',
    inputBg: 'bg-[#F6FAF7]',
    inputBorder: 'border-[#C2E0CC] focus:border-[#10B981]',
    tableHeaderBg: 'bg-[#E8F5ED]',
    tableBorder: 'border-[#CFE5D6]',
    tableRowHover: 'hover:bg-[#E5F5EB]',
    vacantRowBg: 'bg-[#FEFCE8]/70',
    orgChart: {
      commander: {
        bg: 'bg-gradient-to-b from-[#FAFDFB] via-[#EAF7EE] to-[#DCF0E2]',
        border: 'border-[#2CA561]',
        text: 'text-[#0B4622]',
        subtext: 'text-[#20703C]',
        badge: 'bg-[#C3EBD0] text-[#0D5C2C] border-[#48BF7D]',
      },
      deputiesBg: 'bg-gradient-to-r from-[#EAF6EE] via-[#F8FCFA] to-[#EAF6EE]',
      deputiesBorder: 'border-[#BDE2C8]',
      deputiesText: 'text-[#0D5C2C]',
      divisions: {
        'สกพ.': {
          bg: 'bg-[#EDF7F1]',
          header: 'bg-gradient-to-r from-[#DCF0E4] to-[#EDF7F1]',
          border: 'border-[#B5DECA]',
          text: 'text-[#0F4A2A]',
          badge: 'bg-[#CEEAD9] text-[#12683B] border-[#97D4B2]',
          subItem: 'bg-white/95 hover:bg-[#DCF0E4] border-[#B5DECA] text-[#132A1C]',
          bar: 'from-[#059669] to-[#34D399]',
        },
        'กองอัตรากำลัง สกพ.': {
          bg: 'bg-[#EBF9F7]',
          header: 'bg-gradient-to-r from-[#D7F3EF] to-[#EBF9F7]',
          border: 'border-[#AEE5DC]',
          text: 'text-[#0B4A40]',
          badge: 'bg-[#C5EFE8] text-[#0F6B5C] border-[#89D8CB]',
          subItem: 'bg-white/95 hover:bg-[#D7F3EF] border-[#AEE5DC] text-[#132A1C]',
          bar: 'from-[#0D9488] to-[#2DD4BF]',
        },
        'กองทะเบียนพล สกพ.': {
          bg: 'bg-[#EEF6F8]',
          header: 'bg-gradient-to-r from-[#DAECF0] to-[#EEF6F8]',
          border: 'border-[#B4DAE3]',
          text: 'text-[#12424E]',
          badge: 'bg-[#C7E4EC] text-[#175A6B] border-[#91C7D6]',
          subItem: 'bg-white/95 hover:bg-[#DAECF0] border-[#B4DAE3] text-[#132A1C]',
          bar: 'from-[#0284C7] to-[#38BDF8]',
        },
        'กองสวัสดิการ สกพ.': {
          bg: 'bg-[#F8F8ED]',
          header: 'bg-gradient-to-r from-[#F0F2D8] to-[#F8F8ED]',
          border: 'border-[#D9DEC0]',
          text: 'text-[#485223]',
          badge: 'bg-[#E5E9C5] text-[#5F6D26] border-[#C3CC95]',
          subItem: 'bg-white/95 hover:bg-[#F0F2D8] border-[#D9DEC0] text-[#132A1C]',
          bar: 'from-[#65A30D] to-[#A3E635]',
        },
      },
    },
  },

  // 4. พาสเทลม่วงครามราชาภิเษก (Royal Lavender / Periwinkle)
  {
    id: 'royal-lavender',
    name: 'พาสเทลม่วงครามราชาภิเษก',
    englishName: 'Royal Lavender Pastel',
    description: 'โทนม่วงลาเวนเดอร์ คราม และทอง นุ่มนวล ทรงเกียรติยศชั้นสูง',
    isDark: false,
    swatches: ['#EDE9FE', '#DDD6FE', '#C4B5FD', '#7C3AED', '#4C1D95'],
    bgApp: 'bg-[#F7F5FC]',
    textMain: 'text-[#20163B]',
    textMuted: 'text-[#5E517C]',
    headerBg: 'bg-white/95',
    headerBorder: 'border-[#DDD3ED]',
    navActive: 'bg-[#EDE4FA] text-[#582099] border-[#D3BFF0] shadow-2xs font-bold',
    navInactive: 'text-[#55466F] hover:text-[#20163B] hover:bg-[#F2EDFA]',
    cardBg: 'bg-white',
    cardBorder: 'border-[#E2D8EE]',
    inputBg: 'bg-[#FAF7FD]',
    inputBorder: 'border-[#D9CBE8] focus:border-[#8B5CF6]',
    tableHeaderBg: 'bg-[#F3EDF9]',
    tableBorder: 'border-[#E2D8EE]',
    tableRowHover: 'hover:bg-[#EDE5F7]',
    vacantRowBg: 'bg-[#FFFBEB]/70',
    orgChart: {
      commander: {
        bg: 'bg-gradient-to-b from-[#FDF9FF] via-[#F5EDFD] to-[#E9DCFA]',
        border: 'border-[#8B5CF6]',
        text: 'text-[#2E1065]',
        subtext: 'text-[#581C87]',
        badge: 'bg-[#DDD6FE] text-[#4C1D95] border-[#A78BFA]',
      },
      deputiesBg: 'bg-gradient-to-r from-[#F3EAFD] via-[#FAF7FD] to-[#F3EAFD]',
      deputiesBorder: 'border-[#D1BFE8]',
      deputiesText: 'text-[#4C1D95]',
      divisions: {
        'สกพ.': {
          bg: 'bg-[#F5F2FA]',
          header: 'bg-gradient-to-r from-[#EAE2F4] to-[#F5F2FA]',
          border: 'border-[#D0C2E2]',
          text: 'text-[#3E255B]',
          badge: 'bg-[#DDD0EE] text-[#502E78] border-[#BBA3D8]',
          subItem: 'bg-white/95 hover:bg-[#EAE2F4] border-[#D0C2E2] text-[#20163B]',
          bar: 'from-[#7C3AED] to-[#A78BFA]',
        },
        'กองอัตรากำลัง สกพ.': {
          bg: 'bg-[#F2F5FB]',
          header: 'bg-gradient-to-r from-[#E0E9F5] to-[#F2F5FB]',
          border: 'border-[#BDD0E9]',
          text: 'text-[#203D61]',
          badge: 'bg-[#CFE0F3] text-[#245289] border-[#9EBCE0]',
          subItem: 'bg-white/95 hover:bg-[#E0E9F5] border-[#BDD0E9] text-[#20163B]',
          bar: 'from-[#2563EB] to-[#60A5FA]',
        },
        'กองทะเบียนพล สกพ.': {
          bg: 'bg-[#F8F2FA]',
          header: 'bg-gradient-to-r from-[#EFE0F3] to-[#F8F2FA]',
          border: 'border-[#DAC0E3]',
          text: 'text-[#532163]',
          badge: 'bg-[#E8D1EF] text-[#692580] border-[#CA9ED7]',
          subItem: 'bg-white/95 hover:bg-[#EFE0F3] border-[#DAC0E3] text-[#20163B]',
          bar: 'from-[#9333EA] to-[#C084FC]',
        },
        'กองสวัสดิการ สกพ.': {
          bg: 'bg-[#FAF3F6]',
          header: 'bg-gradient-to-r from-[#F5E2EC] to-[#FAF3F6]',
          border: 'border-[#E5C2D4]',
          text: 'text-[#5E2242]',
          badge: 'bg-[#EED2E2] text-[#7A2955] border-[#D79FB9]',
          subItem: 'bg-white/95 hover:bg-[#F5E2EC] border-[#E5C2D4] text-[#20163B]',
          bar: 'from-[#C026D3] to-[#E879F9]',
        },
      },
    },
  },

  // 5. พาสเทลคอรัลกลีบบัวมงคล (Lotus Rose / Peach Pastel)
  {
    id: 'lotus-rose',
    name: 'พาสเทลคอรัลกลีบบัวมงคล',
    englishName: 'Lotus Blossom Pastel',
    description: 'โทนชมพูกลีบบัว พีชนวล และคอรัล ให้ความอบอุ่น เมตตา และสดใส',
    isDark: false,
    swatches: ['#FCE7F3', '#FBCFE8', '#F9A8D4', '#DB2777', '#831843'],
    bgApp: 'bg-[#FDF7F8]',
    textMain: 'text-[#301620]',
    textMuted: 'text-[#7A5160]',
    headerBg: 'bg-white/95',
    headerBorder: 'border-[#F0D5DF]',
    navActive: 'bg-[#FDE2EC] text-[#9D174D] border-[#F8B4CE] shadow-2xs font-bold',
    navInactive: 'text-[#6A4755] hover:text-[#301620] hover:bg-[#FDF0F4]',
    cardBg: 'bg-white',
    cardBorder: 'border-[#EEDAE1]',
    inputBg: 'bg-[#FDF9FA]',
    inputBorder: 'border-[#E8CED8] focus:border-[#EC4899]',
    tableHeaderBg: 'bg-[#FDF0F4]',
    tableBorder: 'border-[#EEDAE1]',
    tableRowHover: 'hover:bg-[#FCE6EE]',
    vacantRowBg: 'bg-[#FFFBEB]/70',
    orgChart: {
      commander: {
        bg: 'bg-gradient-to-b from-[#FFFDFE] via-[#FDF0F4] to-[#FCE0E9]',
        border: 'border-[#E11D48]',
        text: 'text-[#4C0519]',
        subtext: 'text-[#881337]',
        badge: 'bg-[#FECDD3] text-[#9F1239] border-[#FDA4AF]',
      },
      deputiesBg: 'bg-gradient-to-r from-[#FCEAF0] via-[#FFFDFE] to-[#FCEAF0]',
      deputiesBorder: 'border-[#F3CCD9]',
      deputiesText: 'text-[#9F1239]',
      divisions: {
        'สกพ.': {
          bg: 'bg-[#FAF4F7]',
          header: 'bg-gradient-to-r from-[#F4E3EC] to-[#FAF4F7]',
          border: 'border-[#E4C5D6]',
          text: 'text-[#58203E]',
          badge: 'bg-[#ECD2E0] text-[#742750] border-[#D6A9C2]',
          subItem: 'bg-white/95 hover:bg-[#F4E3EC] border-[#E4C5D6] text-[#301620]',
          bar: 'from-[#DB2777] to-[#F472B6]',
        },
        'กองอัตรากำลัง สกพ.': {
          bg: 'bg-[#FBF6F0]',
          header: 'bg-gradient-to-r from-[#F6E9DA] to-[#FBF6F0]',
          border: 'border-[#E9D1BA]',
          text: 'text-[#5C3A19]',
          badge: 'bg-[#EEDBC5] text-[#7A4B1D] border-[#D8BA97]',
          subItem: 'bg-white/95 hover:bg-[#F6E9DA] border-[#E9D1BA] text-[#301620]',
          bar: 'from-[#EA580C] to-[#FB923C]',
        },
        'กองทะเบียนพล สกพ.': {
          bg: 'bg-[#F9F4FB]',
          header: 'bg-gradient-to-r from-[#F0E4F3] to-[#F9F4FB]',
          border: 'border-[#DEC8E4]',
          text: 'text-[#50245E]',
          badge: 'bg-[#E7D6EC] text-[#69297E] border-[#CCA7D7]',
          subItem: 'bg-white/95 hover:bg-[#F0E4F3] border-[#DEC8E4] text-[#301620]',
          bar: 'from-[#9333EA] to-[#C084FC]',
        },
        'กองสวัสดิการ สกพ.': {
          bg: 'bg-[#FDF2F4]',
          header: 'bg-gradient-to-r from-[#FCE1E6] to-[#FDF2F4]',
          border: 'border-[#F8BCC8]',
          text: 'text-[#731A2E]',
          badge: 'bg-[#F9CDD5] text-[#961F38] border-[#EE9EAE]',
          subItem: 'bg-white/95 hover:bg-[#FCE1E6] border-[#F8BCC8] text-[#301620]',
          bar: 'from-[#E11D48] to-[#FB7185]',
        },
      },
    },
  },

  // 6. กรมท่าพิทักษ์สันติราษฎร์ (Classic Midnight Navy - Dark Mode)
  {
    id: 'midnight-navy',
    name: 'กรมท่าพิทักษ์สันติราษฎร์',
    englishName: 'Royal Police Midnight Navy',
    description: 'โทนสีน้ำเงินกรมท่าเข้มลึกและทองคำแท้ ทรงพลัง สง่างาม เข้มขลัง',
    isDark: true,
    swatches: ['#0B132B', '#1E293B', '#334155', '#D4AF37', '#F5D061'],
    bgApp: 'bg-slate-950',
    textMain: 'text-slate-100',
    textMuted: 'text-slate-400',
    headerBg: 'bg-slate-950/90',
    headerBorder: 'border-slate-800',
    navActive: 'bg-amber-500/15 text-amber-300 border-amber-500/30 font-bold',
    navInactive: 'text-slate-400 hover:text-slate-100 hover:bg-slate-900',
    cardBg: 'bg-slate-900',
    cardBorder: 'border-slate-800',
    inputBg: 'bg-slate-950',
    inputBorder: 'border-slate-800 focus:border-amber-400',
    tableHeaderBg: 'bg-slate-950/80',
    tableBorder: 'border-slate-800',
    tableRowHover: 'hover:bg-slate-800/50',
    vacantRowBg: 'bg-amber-950/10',
    orgChart: {
      commander: {
        bg: 'bg-gradient-to-b from-amber-500/20 via-slate-900 to-slate-950',
        border: 'border-amber-400/80',
        text: 'text-slate-100',
        subtext: 'text-amber-300',
        badge: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
      },
      deputiesBg: 'bg-slate-900/60',
      deputiesBorder: 'border-slate-800',
      deputiesText: 'text-amber-400',
      divisions: {
        'สกพ.': {
          bg: 'bg-slate-900/90',
          header: 'bg-slate-950/80',
          border: 'border-slate-800',
          text: 'text-slate-200',
          badge: 'bg-blue-950/60 text-blue-300 border-blue-800/60',
          subItem: 'bg-slate-950/60 hover:bg-slate-800/60 border-slate-800/80 text-slate-200',
          bar: 'from-blue-600 to-cyan-400',
        },
        'กองอัตรากำลัง สกพ.': {
          bg: 'bg-slate-900/90',
          header: 'bg-slate-950/80',
          border: 'border-slate-800',
          text: 'text-slate-200',
          badge: 'bg-emerald-950/60 text-emerald-300 border-emerald-800/60',
          subItem: 'bg-slate-950/60 hover:bg-slate-800/60 border-slate-800/80 text-slate-200',
          bar: 'from-emerald-600 to-teal-400',
        },
        'กองทะเบียนพล สกพ.': {
          bg: 'bg-slate-900/90',
          header: 'bg-slate-950/80',
          border: 'border-slate-800',
          text: 'text-slate-200',
          badge: 'bg-indigo-950/60 text-indigo-300 border-indigo-800/60',
          subItem: 'bg-slate-950/60 hover:bg-slate-800/60 border-slate-800/80 text-slate-200',
          bar: 'from-indigo-600 to-violet-400',
        },
        'กองสวัสดิการ สกพ.': {
          bg: 'bg-slate-900/90',
          header: 'bg-slate-950/80',
          border: 'border-slate-800',
          text: 'text-slate-200',
          badge: 'bg-rose-950/60 text-rose-300 border-rose-800/60',
          subItem: 'bg-slate-950/60 hover:bg-slate-800/60 border-slate-800/80 text-slate-200',
          bar: 'from-rose-600 to-pink-400',
        },
      },
    },
  },
];
