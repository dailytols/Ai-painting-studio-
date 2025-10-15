import React from 'react';
import { PaintBrushIcon } from './Icons';

export const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2" title="AI Painting Studio">
            <PaintBrushIcon className="h-8 w-8 text-indigo-600" />
            <span className="text-xl font-bold text-gray-800">AI Painting Studio</span>
          </div>
        </div>
      </div>
    </header>
  );
};