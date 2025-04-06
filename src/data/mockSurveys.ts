
import { Survey } from '@/types/survey';

export const mockSurveys: Survey[] = [
  {
    id: '1',
    title: 'استبيان رضا العملاء',
    description: 'ساعدنا في تحسين خدماتنا من خلال تقديم ملاحظاتك',
    questions: [
      {
        id: 'q1',
        title: 'ما مدى رضاك عن خدمتنا؟',
        type: 'rating',
        required: true
      },
      {
        id: 'q2',
        title: 'ما هي جوانب خدمتنا التي تفضلها أكثر؟',
        type: 'multipleChoice',
        required: false,
        options: [
          { id: 'o1', text: 'الجودة' },
          { id: 'o2', text: 'السعر' },
          { id: 'o3', text: 'دعم العملاء' },
          { id: 'o4', text: 'سهولة الاستخدام' }
        ]
      },
      {
        id: 'q3',
        title: 'هل لديك أي اقتراحات للتحسين؟',
        type: 'text',
        required: false
      }
    ],
    createdAt: new Date('2024-03-15'),
    responses: 127
  },
  {
    id: '2',
    title: 'ملاحظات عن المنتج',
    description: 'أخبرنا رأيك عن منتجنا الجديد',
    questions: [
      {
        id: 'q1',
        title: 'هل استخدمت منتجنا من قبل؟',
        type: 'multipleChoice',
        required: true,
        options: [
          { id: 'o1', text: 'نعم' },
          { id: 'o2', text: 'لا' }
        ]
      },
      {
        id: 'q2',
        title: 'كيف تقيم جودة المنتج؟',
        type: 'rating',
        required: true
      }
    ],
    createdAt: new Date('2024-03-24'),
    responses: 83
  },
  {
    id: '3',
    title: 'استبيان سهولة استخدام الموقع',
    description: 'ساعدنا في تحسين تجربة موقعنا الإلكتروني',
    questions: [
      {
        id: 'q1',
        title: 'ما مدى سهولة العثور على ما كنت تبحث عنه؟',
        type: 'rating',
        required: true
      },
      {
        id: 'q2',
        title: 'ما هي الميزات التي تستخدمها في كثير من الأحيان؟',
        type: 'checkbox',
        required: false,
        options: [
          { id: 'o1', text: 'البحث' },
          { id: 'o2', text: 'الفلاتر' },
          { id: 'o3', text: 'تقييمات المستخدمين' },
          { id: 'o4', text: 'مقارنة المنتجات' }
        ]
      }
    ],
    createdAt: new Date('2024-04-01'),
    responses: 45
  }
];
