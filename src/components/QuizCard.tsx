import React from 'react';
import { Question } from '../data/questions';
import { CheckCircle2, XCircle } from 'lucide-react';

interface QuizCardProps {
  question: Question;
  selectedAnswer: number | null;
  onSelectAnswer: (index: number) => void;
  showExplanation: boolean;
}

export default function QuizCard({ 
  question, 
  selectedAnswer, 
  onSelectAnswer,
  showExplanation 
}: QuizCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 max-w-3xl w-full mx-auto mb-8">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">{question.question}</h3>
      
      <div className="space-y-3">
        {question.options.map((option, index) => (
          <button
            key={index}
            onClick={() => onSelectAnswer(index)}
            disabled={showExplanation}
            className={`w-full text-left p-4 rounded-lg transition-all ${
              selectedAnswer === index
                ? selectedAnswer === question.correctAnswer
                  ? 'bg-green-100 border-2 border-green-500'
                  : 'bg-red-100 border-2 border-red-500'
                : 'bg-gray-50 hover:bg-gray-100 border-2 border-transparent'
            } ${showExplanation ? 'cursor-default' : 'cursor-pointer'}`}
          >
            <div className="flex items-center justify-between">
              <span>{option}</span>
              {showExplanation && index === question.correctAnswer && (
                <CheckCircle2 className="text-green-500 h-5 w-5" />
              )}
              {showExplanation && selectedAnswer === index && index !== question.correctAnswer && (
                <XCircle className="text-red-500 h-5 w-5" />
              )}
            </div>
          </button>
        ))}
      </div>

      {showExplanation && (
        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <h4 className="font-semibold text-blue-900 mb-2">Explanation:</h4>
          <p className="text-blue-800">{question.explanation}</p>
        </div>
      )}
    </div>
  );
}