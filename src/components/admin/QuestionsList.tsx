import React, { useState, useEffect } from 'react';
import { collection, query, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { Trash2, Edit } from 'lucide-react';
import toast from 'react-hot-toast';

interface Question {
  id: string;
  question: string;
  departmentId: string;
  courseId: string;
  year: number;
}

export default function QuestionsList() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchQuestions();
  }, []);

  async function fetchQuestions() {
    try {
      const q = query(collection(db, 'questions'));
      const snapshot = await getDocs(q);
      const questionsList = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Question[];
      setQuestions(questionsList);
    } catch (error) {
      toast.error('Failed to load questions');
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: string) {
    if (window.confirm('Are you sure you want to delete this question?')) {
      try {
        await deleteDoc(doc(db, 'questions', id));
        setQuestions(questions.filter(q => q.id !== id));
        toast.success('Question deleted successfully');
      } catch (error) {
        toast.error('Failed to delete question');
      }
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg font-medium leading-6 text-gray-900">Questions List</h3>
        <p className="mt-1 text-sm text-gray-500">A list of all questions in the database.</p>
      </div>
      <div className="border-t border-gray-200">
        <ul role="list" className="divide-y divide-gray-200">
          {questions.map((question) => (
            <li key={question.id} className="px-4 py-4 sm:px-6">
              <div className="flex items-center justify-between">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {question.question}
                  </p>
                  <p className="text-sm text-gray-500">
                    {question.departmentId} - {question.courseId} ({question.year})
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => handleDelete(question.id)}
                    className="inline-flex items-center p-2 border border-transparent rounded-full text-red-600 hover:bg-red-50"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}