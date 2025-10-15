import React, { useState, useRef, useCallback } from 'react';
import { SliderIcon } from './Icons';

interface CompareSliderProps {
  originalImageUrl: string;
  generatedImageUrl: string;
}

export const CompareSlider: React.FC<CompareSliderProps> = ({ originalImageUrl, generatedImageUrl }) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = (x / rect.width) * 100;
    setSliderPosition(Math.max(0, Math.min(100, percentage)));
  }, []);

  const handleMouseDown = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    handleMove(e.clientX);

    const handleMouseMove = (moveEvent: MouseEvent) => {
      handleMove(moveEvent.clientX);
    };

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  }, [handleMove]);

  const handleTouchStart = useCallback((e: React.TouchEvent<HTMLDivElement>) => {
      handleMove(e.touches[0].clientX);

      const handleTouchMove = (moveEvent: TouchEvent) => {
          handleMove(moveEvent.touches[0].clientX);
      };

      const handleTouchEnd = () => {
          document.removeEventListener('touchmove', handleTouchMove);
          document.removeEventListener('touchend', handleTouchEnd);
      };

      document.addEventListener('touchmove', handleTouchMove);
      document.addEventListener('touchend', handleTouchEnd);
  }, [handleMove]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full select-none overflow-hidden rounded-lg cursor-ew-resize"
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
    >
      <img
        src={generatedImageUrl}
        alt="Generated Art"
        className="absolute top-0 left-0 w-full h-full object-cover pointer-events-none"
      />
      <div
        className="absolute top-0 left-0 w-full h-full object-cover overflow-hidden pointer-events-none"
        style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
      >
        <img
          src={originalImageUrl}
          alt="Original Photo"
          className="absolute top-0 left-0 w-full h-full object-cover pointer-events-none"
        />
      </div>
      <div
        className="absolute top-0 h-full w-1 bg-white/75 pointer-events-none"
        style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
      >
        <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 bg-white rounded-full p-2 shadow-xl pointer-events-none">
          <SliderIcon className="w-8 h-8 text-indigo-600" />
        </div>
      </div>
    </div>
  );
};