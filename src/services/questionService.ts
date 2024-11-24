import { collection, getDocs, query, where, addDoc, writeBatch, doc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { departments } from '../data/questions';

export interface FirestoreQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  courseId: string;
  departmentId: string;
  year: number;
}

export async function seedQuestions() {
  try {
    const batch = writeBatch(db);
    const questionsRef = collection(db, 'questions');

    // Check if questions already exist
    const snapshot = await getDocs(questionsRef);
    if (!snapshot.empty) {
      console.log('Questions already seeded');
      return;
    }

    // Prepare questions for batch write
    departments.forEach(dept => {
      dept.courses.forEach(course => {
        Object.entries(course.questions).forEach(([year, questions]) => {
          questions.forEach(question => {
            const docRef = doc(questionsRef);
            batch.set(docRef, {
              ...question,
              courseId: course.id,
              departmentId: dept.id,
              year: parseInt(year),
            });
          });
        });
      });
    });

    await batch.commit();
    console.log('Questions seeded successfully');
  } catch (error) {
    console.error('Error seeding questions:', error);
    throw error;
  }
}

export async function getQuestions(departmentId: string, courseId: string, year: number) {
  try {
    const questionsRef = collection(db, 'questions');
    const q = query(
      questionsRef,
      where('departmentId', '==', departmentId),
      where('courseId', '==', courseId),
      where('year', '==', year)
    );

    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error('Error fetching questions:', error);
    throw error;
  }
}