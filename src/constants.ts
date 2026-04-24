import { Major } from './types';

export const MAJORS: Major[] = [
  {
    id: 'tkj',
    name: 'Teknik Komputer dan Jaringan',
    code: 'TKJ',
    description: 'Mempelajari cara merakit komputer, menginstalasi sistem operasi, LAN, WAN, hingga administrasi server.',
    subjects: ['Dasar Desain Grafis', 'Teknologi Jaringan Berbasis Luas', 'Administrasi Infrastruktur Jaringan', 'Administrasi Sistem Jaringan'],
    prospects: ['Network Engineer', 'IT Support', 'System Administrator', 'Cyber Security']
  },
  {
    id: 'dkv',
    name: 'Desain Komunikasi Visual',
    code: 'DKV',
    description: 'Memfokuskan pada pengolahan elemen visual untuk menyampaikan pesan melalui media digital maupun cetak.',
    subjects: ['Dasar Seni Rupa', 'Ilustrasi', 'Fotografi', 'Videografi', 'Desain Grafis Percetakan'],
    prospects: ['Graphic Designer', 'Photographer', 'UI/UX Designer', 'Art Director']
  },
  {
    id: 'ak',
    name: 'Akuntansi dan Keuangan',
    code: 'AK',
    description: 'Mempelajari pencatatan keuangan, perpajakan, perbankan, dan audit dalam lingkup bisnis.',
    subjects: ['Akuntansi Dasar', 'Perbankan Dasar', 'Akuntansi Keuangan', 'Praktikum Akuntansi Perusahaan Jasa & Dagang'],
    prospects: ['Accounting Staff', 'Bank Teller', 'Tax Assistant', 'Financial Auditor']
  },
  {
    id: 'bc',
    name: 'Broadcasting & Pertelevisian',
    code: 'BC',
    description: 'Mempelajari proses produksi program radio dan televisi mulai dari pra-produksi hingga pasca-produksi.',
    subjects: ['Sinematografi', 'Editing Video', 'Manajemen Produksi TV', 'Teknik Pengolahan Audio'],
    prospects: ['Broadcaster', 'Video Editor', 'Scriptwriter', 'Producer Assistant']
  },
  {
    id: 'mplb',
    name: 'Manajemen Perkantoran dan Layanan Bisnis',
    code: 'MPLB',
    description: 'Mempelajari pengelolaan arsip, korespondensi, pelayanan prima, serta administrasi perkantoran modern.',
    subjects: ['Kearsipan', 'Korespondensi', 'Otomatisasi Tata Kelola Kepegawaian', 'Humas dan Keprotokolan'],
    prospects: ['Administrative Assistant', 'Receptionist', 'Human Resource Staff', 'Executive Secretary']
  },
  {
    id: 'bd',
    name: 'Bisnis Digital',
    code: 'BD',
    description: 'Mempelajari strategi pemasaran secara digital, e-commerce, hingga manajemen bisnis online.',
    subjects: ['Pemasaran Digital', 'Bisnis Online', 'Komunikasi Bisnis', 'Perencanaan Bisnis'],
    prospects: ['Digital Marketer', 'E-commerce Manager', 'Social Media Specialist', 'Entrepreneur']
  }
];
