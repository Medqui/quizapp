import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { departments } from '../../data/questions';
import toast from 'react-hot-toast';
import { PlusCircle } from 'lucide-react';

interface QuestionFormData {
  departmentId: string;
  courseId: string;
  subCourse?: string;
  year: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export default function QuestionForm() {
  const { register, handleSubmit, reset, watch } = useForm<QuestionFormData>();
  const selectedDept = watch('departmentId');
  const selectedCourse = watch('courseId');
  const [showSubCourse, setShowSubCourse] = useState(false);

  const hasSubCourses = (courseId: string) => {
    const course = departments
      .find(d => d.id === selectedDept)
      ?.courses.find(c => c.id === courseId);
    return course?.subCourses && course.subCourses.length > 0;
  };

  const onSubmit = async (data: QuestionFormData) => {
    try {
      await addDoc(collection(db, 'questions'), {
        ...data,
        options: [data.options[0], data.options[1], data.options[2], data.options[3]],
        correctAnswer: parseInt(data.correctAnswer.toString()),
        year: parseInt(data.year.toString())
      });
      toast.success('Question added successfully');
      reset();
    } catch (error) {
      toast.error('Failed to add question');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-lg font-medium text-gray-900 mb-6">Add New Question</h2>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-gray-700">Department</label>
            <select
              {...register('departmentId', { required: true })}
              onChange={(e) => {
                register('departmentId').onChange(e);
                setShowSubCourse(false);
              }}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              <option value="">Select Department</option>
              {departments.map(dept => (
                <option key={dept.id} value={dept.id}>{dept.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Course</label>
            <select
              {...register('courseId', { required: true })}
              onChange={(e) => {
                register('courseId').onChange(e);
                setShowSubCourse(hasSubCourses(e.target.value));
              }}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              <option value="">Select Course</option>
              {departments
                .find(d => d.id === selectedDept)
                ?.courses.map(course => (
                  <option key={course.id} value={course.id}>{course.name}</option>
                ))}
            </select>
          </div>

          {showSubCourse && (
            <div>
              <label className="block text-sm font-medium text-gray-700">Sub Course</label>
              <select
                {...register('subCourse', { required: showSubCourse })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              >
                <option value="">Select Sub Course</option>
                {departments
                  .find(d => d.id === selectedDept)
                  ?.courses.find(c => c.id === selectedCourse)
                  ?.subCourses?.map(sub => (
                    <option key={sub.id} value={sub.id}>{sub.name}</option>
                  ))}
              </select>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700">Year</label>
            <input
              type="number"
              min="2000"
              max={new Date().getFullYear()}
              {...register('year', { required: true })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Question</label>
          <textarea
            {...register('question', { required: true })}
            rows={3}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        <div className="space-y-4">
          <label className="block text-sm font-medium text-gray-700">Options</label>
          {[0, 1, 2, 3].map(index => (
            <div key={index}>
              <input
                {...register(`options.${index}` as const, { required: true })}
                placeholder={`Option ${index + 1}`}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
          ))}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Correct Answer</label>
          <select
            {...register('correctAnswer', { required: true })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="">Select Correct Answer</option>
            {[0, 1, 2, 3].map(index => (
              <option key={index} value={index}>Option {index + 1}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Explanation</label>
          <textarea
            {...register('explanation', { required: true })}
            rows={3}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <PlusCircle className="h-5 w-5 mr-2" />
            Add Question
          </button>
        </div>
      </form>
    </div>
  );
}