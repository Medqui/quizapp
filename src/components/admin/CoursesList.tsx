import React, { useState } from 'react';
import { departments } from '../../data/questions';
import { ChevronDown, ChevronRight, BookOpen } from 'lucide-react';

export default function CoursesList() {
  const [expandedDepts, setExpandedDepts] = useState<string[]>([]);
  const [expandedCourses, setExpandedCourses] = useState<string[]>([]);

  const toggleDepartment = (deptId: string) => {
    setExpandedDepts(prev =>
      prev.includes(deptId)
        ? prev.filter(id => id !== deptId)
        : [...prev, deptId]
    );
  };

  const toggleCourse = (courseId: string) => {
    setExpandedCourses(prev =>
      prev.includes(courseId)
        ? prev.filter(id => id !== courseId)
        : [...prev, courseId]
    );
  };

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg font-medium leading-6 text-gray-900">Available Courses</h3>
        <p className="mt-1 text-sm text-gray-500">A list of all departments and their courses.</p>
      </div>
      
      <div className="border-t border-gray-200">
        {departments.map(dept => (
          <div key={dept.id} className="border-b border-gray-200">
            <button
              onClick={() => toggleDepartment(dept.id)}
              className="w-full px-4 py-4 flex items-center justify-between hover:bg-gray-50"
            >
              <div className="flex items-center">
                {expandedDepts.includes(dept.id) ? (
                  <ChevronDown className="h-5 w-5 text-gray-400" />
                ) : (
                  <ChevronRight className="h-5 w-5 text-gray-400" />
                )}
                <span className="ml-2 font-medium text-gray-900">{dept.name}</span>
              </div>
            </button>
            
            {expandedDepts.includes(dept.id) && (
              <div className="pl-8 pr-4 pb-4">
                {dept.courses.map(course => (
                  <div key={course.id} className="mt-2">
                    <button
                      onClick={() => toggleCourse(course.id)}
                      className="w-full flex items-center justify-between py-2 hover:bg-gray-50 rounded-md px-2"
                    >
                      <div className="flex items-center">
                        <BookOpen className="h-4 w-4 text-gray-400" />
                        <span className="ml-2 text-gray-700">{course.name}</span>
                      </div>
                      {course.subCourses && (
                        expandedCourses.includes(course.id) ? (
                          <ChevronDown className="h-4 w-4 text-gray-400" />
                        ) : (
                          <ChevronRight className="h-4 w-4 text-gray-400" />
                        )
                      )}
                    </button>
                    
                    {course.subCourses && expandedCourses.includes(course.id) && (
                      <div className="pl-6 mt-2 space-y-2">
                        {course.subCourses.map(sub => (
                          <div key={sub.id} className="flex items-center py-1 px-2 text-sm text-gray-600">
                            <span className="ml-2">{sub.name}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}