
export interface ExpertRegistrationForm {
  fullName: string;
  country: string;
  expertise: string;
  linkedin: string;
}

export interface SupportRequestForm {
  supportType: string;
  issueSummary: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export interface OrganizationDetail {
  title: string;
  description: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface BranchInfo {
  id: string;
  name: string;
  city: string;
  contact: string;
}
