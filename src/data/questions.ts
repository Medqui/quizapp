export interface SubCourse {
  id: string;
  name: string;
}

export interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface Course {
  id: string;
  name: string;
  subCourses?: SubCourse[];
  years: number[];
  questions: Record<number, Question[]>;
}

export interface Department {
  id: string;
  name: string;
  courses: Course[];
}

export const departments: Department[] = [
  {
    id: 'pre-clinical',
    name: 'Pre-Clinical Sciences',
    courses: [
      {
        id: 'anatomy',
        name: 'Anatomy',
        subCourses: [
          { id: 'gross', name: 'Gross Anatomy' },
          { id: 'histology', name: 'Histology' },
          { id: 'embryology', name: 'Embryology' }
        ],
        years: [2019, 2020, 2021, 2022, 2023],
        questions: {
          2023: [
            // ... existing anatomy questions ...
          ]
        }
      },
      {
        id: 'biochemistry',
        name: 'Medical Biochemistry',
        years: [2019, 2020, 2021, 2022, 2023],
        questions: {
          2023: []
        }
      },
      {
        id: 'physiology',
        name: 'Medical Physiology',
        years: [2019, 2020, 2021, 2022, 2023],
        questions: {
          2023: []
        }
      }
    ]
  },
  {
    id: 'clinical',
    name: 'Clinical Sciences',
    courses: [
      {
        id: 'pharmacology',
        name: 'Pharmacology',
        years: [2019, 2020, 2021, 2022, 2023],
        questions: {
          2023: [
            // ... existing pharmacology questions ...
          ]
        }
      },
      {
        id: 'lab-medicine',
        name: 'Laboratory Medicine',
        subCourses: [
          { id: 'haematology', name: 'Haematology' },
          { id: 'chemical-pathology', name: 'Chemical Pathology' },
          { id: 'microbiology', name: 'Medical Microbiology and Parasitology' },
          { id: 'histopathology', name: 'Histopathology' }
        ],
        years: [2019, 2020, 2021, 2022, 2023],
        questions: {
          2023: []
        }
      },
      {
        id: 'obgyn',
        name: 'Obstetrics and Gynecology',
        years: [2019, 2020, 2021, 2022, 2023],
        questions: {
          2023: []
        }
      },
      {
        id: 'paediatrics',
        name: 'Paediatrics',
        years: [2019, 2020, 2021, 2022, 2023],
        questions: {
          2023: []
        }
      },
      {
        id: 'medicine',
        name: 'Medicine',
        years: [2019, 2020, 2021, 2022, 2023],
        questions: {
          2023: []
        }
      },
      {
        id: 'surgery',
        name: 'Surgery',
        years: [2019, 2020, 2021, 2022, 2023],
        questions: {
          2023: []
        }
      },
      {
        id: 'community-medicine',
        name: 'Community Medicine',
        years: [2019, 2020, 2021, 2022, 2023],
        questions: {
          2023: []
        }
      }
    ]
  }
];