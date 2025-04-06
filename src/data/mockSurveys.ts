
import { Survey } from '@/types/survey';

export const mockSurveys: Survey[] = [
  {
    id: '1',
    title: 'Customer Satisfaction Survey',
    description: 'Help us improve our services by providing your feedback',
    questions: [
      {
        id: 'q1',
        title: 'How satisfied are you with our service?',
        type: 'rating',
        required: true
      },
      {
        id: 'q2',
        title: 'What aspects of our service do you like the most?',
        type: 'multipleChoice',
        required: false,
        options: [
          { id: 'o1', text: 'Quality' },
          { id: 'o2', text: 'Price' },
          { id: 'o3', text: 'Customer Support' },
          { id: 'o4', text: 'Ease of Use' }
        ]
      },
      {
        id: 'q3',
        title: 'Any suggestions for improvement?',
        type: 'text',
        required: false
      }
    ],
    createdAt: new Date('2024-03-15'),
    responses: 127
  },
  {
    id: '2',
    title: 'Product Feedback',
    description: 'Tell us what you think about our new product',
    questions: [
      {
        id: 'q1',
        title: 'Have you used our product before?',
        type: 'multipleChoice',
        required: true,
        options: [
          { id: 'o1', text: 'Yes' },
          { id: 'o2', text: 'No' }
        ]
      },
      {
        id: 'q2',
        title: 'How would you rate the product quality?',
        type: 'rating',
        required: true
      }
    ],
    createdAt: new Date('2024-03-24'),
    responses: 83
  },
  {
    id: '3',
    title: 'Website Usability Survey',
    description: 'Help us improve our website experience',
    questions: [
      {
        id: 'q1',
        title: 'How easy was it to find what you were looking for?',
        type: 'rating',
        required: true
      },
      {
        id: 'q2',
        title: 'Which features do you use most often?',
        type: 'checkbox',
        required: false,
        options: [
          { id: 'o1', text: 'Search' },
          { id: 'o2', text: 'Filters' },
          { id: 'o3', text: 'User Reviews' },
          { id: 'o4', text: 'Product Comparisons' }
        ]
      }
    ],
    createdAt: new Date('2024-04-01'),
    responses: 45
  }
];
