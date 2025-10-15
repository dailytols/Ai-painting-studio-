
import React from 'react';
import { ArtStyle } from '../types';

interface StyleSelectorProps {
  styles: ArtStyle[];
  selectedStyle: ArtStyle;
  onSelectStyle: (style: ArtStyle) => void;
}

export const StyleSelector: React.FC<StyleSelectorProps> = ({ styles, selectedStyle, onSelectStyle }) => {
  return (
    <div className="w-full">
        <div className="flex space-x-3 overflow-x-auto pb-4 -mx-4 px-4">
            {styles.map((style) => (
                <button
                    key={style.id}
                    onClick={() => onSelectStyle(style)}
                    className={`
                        px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 whitespace-nowrap
                        flex-shrink-0 border-2
                        ${selectedStyle.id === style.id 
                            ? 'bg-indigo-600 text-white border-indigo-600 shadow-lg' 
                            : 'bg-white text-gray-700 border-gray-200 hover:border-indigo-500 hover:text-indigo-600'
                        }
                    `}
                >
                    {style.name}
                </button>
            ))}
        </div>
    </div>
  );
};
