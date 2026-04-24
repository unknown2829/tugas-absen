export type UserRole = 'admin' | 'guru' | 'staff';

export interface UserProfile {
  id: string;
  email: string;
  full_name: string;
  role: UserRole;
  created_at: string;
}

export interface Student {
  id: string;
  nis: string;
  name: string;
  class_name: string;
  created_at: string;
}

export interface Attendance {
  id: string;
  user_id?: string; // for employee
  student_id?: string; // for student
  type: 'employee' | 'student';
  status: 'hadir' | 'izin' | 'sakit' | 'alfa';
  date: string;
  created_at: string;
}

export interface Major {
  id: string;
  name: string;
  code: string;
  description: string;
  subjects: string[];
  prospects: string[];
}
