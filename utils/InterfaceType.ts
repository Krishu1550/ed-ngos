interface Program {
  _id: string | number;
  title: string;
  type: 'Workshop' | 'Summit' | 'Competition' | 'Training' | 'Bootcamp';
  emoji: string;
  status: 'upcoming' | 'ongoing' | 'past';
  seats: number;
  enrolled: number;
  date: string;
  description: string;
  location?: string;
  tags?: string[];
  requirements?: string;
}
interface Post {
  id: string | number;
  title: string;
  category: string;
  excerpt: string;
  content?: string;
  date: string;
  author: string;
  readTime: number;
  emoji: string;
  featured?: boolean;
}


interface Toast {
  msg: string;
  type: 'success' | 'error';
}

interface User {
  id: string;
  name: string;
  role: 'admin' | 'member';
  email: string
}

export type Profile = {
  _id:string|number
  full_name: string;
  headline: string;
  email: string;
  phone: string;
  location: string;

  college: string;
  department: string;
  year_of_study: string;

  linkedin_url: string;
  github_url: string;
  portfolio_url: string;
  photo_url: string;

  summary: string;

  skills: string[];
  education: Education[];
  experience: Experience[];
  projects: any[];
  certifications: any[];
  achievements: any[];
  languages: string[];

  cv_template: string;
  is_public: boolean;
};
type Education = {
  school: string;
  degree: string;
  start_date: string;
  end_date: string;
};

type Experience = {
  company: string;
  role: string;
  start_date: string;
  end_date: string;
  description: string;
};
// Path: /utils/InterfaceType.ts

 interface Enrollment {
  id?: string;             // MongoDB generated ID
  programId: string | number;
  userId: string;
  userName: string;
  programTitle: string;
  enrolledAt?: string;      // Date string from backend
  status?: 'confirmed' | 'waitlist' | 'cancelled';
}

export type { Program, Toast, User, Education, Experience, Post,Enrollment };