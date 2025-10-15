import React from 'react';
import { SparklesIcon } from './Icons';

interface CreativitySliderProps {
  value: number;
  onChange: (value: number) => void;
  disabled?: boolean;
}

export const CreativitySlider: React.FC<CreativitySliderProps> = ({ value, onChange, disabled = false }) => {
  return (
    <div className="w-full max-w-md mx-auto p-4 bg-white rounded-lg shadow-md">
      <label htmlFor="creativity-slider" className="flex items-center justify-center text-md font-semibold text-gray-700 mb-3">
        <SparklesIcon className="w-5 h-5 mr-2 text-indigo-500" />
        Creativity Intensity
      </label>
      <div className="flex items-center space-x-4">
        <span className="text-sm font-medium text-gray-500">Low</span>
        <input
          id="creativity-slider"
          type="range"
          min="0"
          max="100"
          value={value}
          onChange={(e) => onChange(parseInt(e.target.value, 10))}
          disabled={disabled}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
          aria-label="Creativity Intensity"
        />
        <span className="text-sm font-medium text-gray-500">High</span>
      </div>
    </div>
  );
};
