
import { OrganizationDetail, FaqItem, BranchInfo } from './types';

export const GEMINI_MODEL_TEXT = 'gemini-2.5-flash';
export const SYSTEM_INSTRUCTION_CHATBOT = `أنت مساعد افتراضي ودود ومفيد للمؤسسة السورية الأوروبية للتنمية والتواصل.
مهمتك هي الإجابة على استفسارات المستخدمين حول المؤسسة، رؤيتها، رسالتها، برامجها التنموية، خدمات الجالية، والفروع.
حافظ على لهجة رسمية وداعمة ومحفزة.
- الرؤية: أن نكون المظلة الجامعة والرائدة للسوريين في أوروبا، ومركز التبادل المعرفي الأول.
- الرسالة: توحيد الجهود، تجسير العلاقة مع الوطن، ودعم وحماية مصالح السوريين في القارة.
- برامج تنموية: مشروع الحوكمة البلدية، برنامج الرعاية الصحية الأولية، شبكة الخبراء.
- خدمات الجالية: دعم قانوني (لجوء/إقامة/جنسية)، دعم اجتماعي (اندماج/تعليم)، استشارات مجانية.
- الفروع: ألمانيا (برلين - info.de@syria-eu-foundation.org)، فرنسا (باريس - info.fr@syria-eu-foundation.org)، السويد (ستوكهولم - info.se@syria-eu-foundation.org).
- قيمنا: الشفافية، العدالة، الشراكة، الاستدامة، الابتكار.`;


export const ORGANIZATIONAL_STRUCTURE_DETAILS: OrganizationDetail[] = [
  { title: 'مجلس الأمناء', description: 'السلطة العليا والرقابية.' },
  { title: 'المدير التنفيذي', description: 'التنفيذ والإدارة اليومية.' },
  { title: 'الإدارات المركزية', description: '(شراكات، مشاريع، مالية، قانونية).' },
  { title: 'اللجان التخصصية', description: 'فرق الخبراء (صحة، خدمات، إدارة).' },
  { title: 'الفروع والشبكة', description: 'الذراع الميداني في أوروبا.' },
];

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: 'faq-1',
    question: 'ما هي طبيعة الدعم القانوني المقدم؟',
    answer: 'نقدم استشارات أولية وتوجيه لشبكة محامين متعاونين في قضايا الهجرة واللجوء وحقوق الأسرة والعمل.',
  },
  {
    id: 'faq-2',
    question: 'هل خدماتكم مجانية؟',
    answer: 'الاستشارات الأولية والاجتماعية التي تقدمها المؤسسة مجانية، لكن قد يتم تطبيق رسوم رمزية على برامج العضوية أو الخدمات التخصصية لضمان استدامة عمل المؤسسة.',
  },
  {
    id: 'faq-3',
    question: 'كيف يمكنني الانضمام لشبكة الخبراء؟',
    answer: 'يمكنك الانضمام لشبكة الخبراء من خلال تعبئة النموذج المتاح في قسم "نقل التجارب والخبرات الأوروبية". سنقوم بمراجعة طلبك والتواصل معك.',
  },
];

export const BRANCHES_INFO: BranchInfo[] = [
  { id: 'branch-de', name: 'مكتب ألمانيا (المكتب الرئيسي)', city: 'برلين', contact: 'info.de@syria-eu-foundation.org' },
  { id: 'branch-fr', name: 'فرع فرنسا', city: 'باريس', contact: 'info.fr@syria-eu-foundation.org' },
  { id: 'branch-se', name: 'فرع السويد', city: 'ستوكهولم', contact: 'info.se@syria-eu-foundation.org' },
  { id: 'branch-nl', name: 'فرع هولندا', city: 'أمستردام', contact: 'info.nl@syria-eu-foundation.org' },
];

export const SOCIAL_LINKS = {
  facebook: '#',
  twitter: '#',
  linkedin: '#',
};
