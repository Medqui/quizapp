import React from 'react';
import { CheckCircle, Circle, HelpCircle } from 'lucide-react';

interface QuestionNavProps {
  totalQuestions: number;
  currentQuestion: number;
  answers: (number | null)[];
  onQuestionSelect: (index: number) => void;
}

export default function QuestionNav({
  totalQuestions,
  currentQuestion,
  answers,
  onQuestionSelect,
}: QuestionNavProps) {
  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h3 className="text-sm font-medium text-gray-700 mb-3">Question Navigator</h3>
      <div className="flex flex-wrap gap-2">
        {Array.from({ length: totalQuestions }, (_, i) => (
          <button
            key={i}
            onClick={() => onQuestionSelect(i)}
            className={`w-10 h-10 flex items-center justify-center rounded-lg transition-all ${
              currentQuestion === i
                ? 'ring-2 ring-indigo-500 ring-offset-2'
                : ''
            } ${
              answers[i] !== null
                ? 'bg-green-100 text-green-800'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {answers[i] !== null ? (
              <CheckCircle className="h-5 w-5" />
            ) : currentQuestion === i ? (
              <Circle className="h-5 w-5" />
            ) : (
              <HelpCircle className="h-5 w-5" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}