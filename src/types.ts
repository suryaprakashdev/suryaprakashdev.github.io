export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  contributions: string[];
  tags: string[];
  metrics: { label: string; value: string }[];
  category: "research" | "applied" | "vision";
  githubUrl?: string;
  paperUrl?: string;
}

export interface SkillGroup {
  category: string;
  skills: { name: string; level: number }[]; // level in percentage
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  readTime: string;
  author: string;
  tags: string[];
  category: "ai" | "engineering" | "research";
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  organization: string;
  content: string;
}

export interface ChatMessage {
  role: "user" | "model";
  content: string;
  timestamp: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  timestamp: string;
}
