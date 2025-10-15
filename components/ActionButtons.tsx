import React from 'react';
import { DownloadIcon } from './Icons';

interface ActionButtonsProps {
  generatedImageUrl: string;
}

export const ActionButtons: React.FC<ActionButtonsProps> = ({ generatedImageUrl }) => {
  return (
    <div className="flex items-center space-x-4">
      <a
        href={generatedImageUrl}
        download="ai-painting.png"
        className="flex items-center justify-center gap-2 bg-indigo-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-indigo-700 transition-transform transform hover:scale-105"
        title="Download the generated image in high resolution"
      >
        <DownloadIcon className="w-5 h-5" />
        Download HD
      </a>
    </div>
  );
};