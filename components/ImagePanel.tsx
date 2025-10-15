import React, { useCallback, useRef } from 'react';
import { UploadIcon, AlertTriangleIcon } from './Icons';
import { CompareSlider } from './CompareSlider';

interface ImagePanelProps {
  title: string;
  imageUrl?: string | null;
  originalImageUrl?: string | null;
  isLoading?: boolean;
  error?: string | null;
  onImageUpload?: (file: File | null) => void;
  originalImageExists?: boolean;
}

const ImagePanelSpinner: React.FC = () => (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-900 bg-opacity-50 backdrop-blur-sm transition-opacity">
        <div className="w-16 h-16 border-4 border-t-indigo-500 border-gray-200 rounded-full animate-spin"></div>
        <p className="mt-4 text-white font-semibold">Generating your masterpiece...</p>
    </div>
);

export const ImagePanel: React.FC<ImagePanelProps> = ({
  title,
  imageUrl,
  originalImageUrl,
  isLoading = false,
  error,
  onImageUpload,
  originalImageExists,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && onImageUpload) {
      onImageUpload(file);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };
  
  const handleDrop = useCallback((event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      event.stopPropagation();
      const file = event.dataTransfer.files?.[0];
      if (file && onImageUpload) {
          onImageUpload(file);
      }
  }, [onImageUpload]);

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      event.stopPropagation();
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow-md flex flex-col items-center justify-center w-full h-full aspect-square md:aspect-auto">
      <h2 className="text-lg font-semibold text-gray-700 mb-4">{title}</h2>
      <div
        className="relative w-full flex-grow bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden transition-all duration-300 hover:border-indigo-500 hover:bg-indigo-50"
        onClick={onImageUpload ? handleClick : undefined}
        onDrop={onImageUpload ? handleDrop : undefined}
        onDragOver={onImageUpload ? handleDragOver : undefined}
        style={{ cursor: onImageUpload ? 'pointer' : 'default' }}
      >
        {imageUrl ? (
            !onImageUpload && originalImageUrl ? (
                <CompareSlider originalImageUrl={originalImageUrl} generatedImageUrl={imageUrl} />
            ) : (
                <img src={imageUrl} alt={title} className="object-contain w-full h-full" />
            )
        ) : (
          <div className="text-center text-gray-500 p-4">
            {onImageUpload ? (
              <>
                <UploadIcon className="w-12 h-12 mx-auto text-gray-400" />
                <p className="mt-2 font-semibold">Click to upload or drag & drop</p>
                <p className="text-sm">PNG, JPG up to 10MB</p>
              </>
            ) : (
              originalImageExists && !error && !isLoading ? (
                 <p>Select a style to start</p>
              ) : !originalImageExists ? (
                  <p>Upload an image to begin</p>
              ) : null
            )}
          </div>
        )}
        {isLoading && <ImagePanelSpinner />}
        {error && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-red-100 bg-opacity-90 p-4">
                <AlertTriangleIcon className="w-12 h-12 text-red-500"/>
                <p className="mt-2 text-red-700 font-semibold text-center">{error}</p>
            </div>
        )}
      </div>
      {onImageUpload && <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/png, image/jpeg" className="hidden" />}
    </div>
  );
};