import React, { useState, useEffect, useCallback } from 'react';
import { Header } from './components/Header';
import { ImagePanel } from './components/ImagePanel';
import { StyleSelector } from './components/StyleSelector';
import { ActionButtons } from './components/ActionButtons';
import { CreativitySlider } from './components/CreativitySlider';
import { Gallery } from './components/Gallery';
import { CreativeStudio } from './components/CreativeStudio';
import { ArtStyle } from './types';
import { ART_STYLES } from './constants';
import { generateStyledImage } from './services/geminiService';
import { SparklesIcon } from './components/Icons';

const getCreativityPrompt = (level: number): string => {
    if (level < 20) return 'with very low artistic intensity, staying very true to the original photo.';
    if (level < 40) return 'with low artistic intensity.';
    if (level < 60) return 'with medium artistic intensity.';
    if (level < 80) return 'with high artistic intensity and creative freedom.';
    return 'with very high artistic intensity, allowing for significant creative interpretation.';
};

const App: React.FC = () => {
  const [originalImage, setOriginalImage] = useState<File | null>(null);
  const [originalImageUrl, setOriginalImageUrl] = useState<string | null>(null);
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string | null>(null);
  const [selectedStyle, setSelectedStyle] = useState<ArtStyle>(ART_STYLES[0]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [creativity, setCreativity] = useState<number>(50);

  useEffect(() => {
    if (originalImage) {
      const url = URL.createObjectURL(originalImage);
      setOriginalImageUrl(url);
      return () => URL.revokeObjectURL(url);
    } else {
      setOriginalImageUrl(null);
    }
  }, [originalImage]);

  const handleImageGeneration = useCallback(async () => {
    if (!originalImage || !selectedStyle) {
      return;
    }

    setIsLoading(true);
    setError(null);
    setGeneratedImageUrl(null);

    const creativityText = getCreativityPrompt(creativity);
    const fullPrompt = `${selectedStyle.prompt} ${creativityText}`;

    try {
      const generatedImage = await generateStyledImage(originalImage, fullPrompt);
      setGeneratedImageUrl(generatedImage);
    } catch (err) {
      console.error(err);
      setError('Failed to generate image. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [originalImage, selectedStyle, creativity]);


  useEffect(() => {
    if (originalImage && selectedStyle) {
      handleImageGeneration();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [originalImage, selectedStyle]);

  const handleImageUpload = (file: File | null) => {
    setOriginalImage(file);
    setGeneratedImageUrl(null);
    setError(null);
  };

  const handleStyleSelect = (style: ArtStyle) => {
    setSelectedStyle(style);
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 flex flex-col">
      <Header />
      <main className="flex-grow flex flex-col">
        <div className="p-4 md:p-8 space-y-6">
            <div className="text-center">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900">AI Painting Studio</h1>
                <p className="mt-2 text-lg text-gray-600">Transform your photos into masterpieces with a single click.</p>
            </div>

            <StyleSelector
              styles={ART_STYLES}
              selectedStyle={selectedStyle}
              onSelectStyle={handleStyleSelect}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
              <ImagePanel
                title="Original Photo"
                onImageUpload={handleImageUpload}
                imageUrl={originalImageUrl}
              />
              <ImagePanel
                title="AI Generated Art"
                imageUrl={generatedImageUrl}
                originalImageUrl={originalImageUrl}
                isLoading={isLoading}
                error={error}
                originalImageExists={!!originalImage}
              />
            </div>
            
            <div className="flex flex-col items-center justify-center mt-4 space-y-6">
                {originalImage && (
                    <CreativitySlider 
                        value={creativity} 
                        onChange={setCreativity} 
                        disabled={isLoading}
                    />
                )}
                 <div className="flex items-center space-x-4 h-12">
                    {originalImage && (
                        <button
                            onClick={handleImageGeneration}
                            disabled={isLoading}
                            className="flex items-center justify-center gap-2 bg-indigo-600 text-white font-semibold py-3 px-8 rounded-lg shadow-md hover:bg-indigo-700 transition-transform transform hover:scale-105 disabled:bg-indigo-400 disabled:cursor-not-allowed disabled:scale-100"
                        >
                            <SparklesIcon className="w-6 h-6" />
                            {isLoading ? "Generating..." : (generatedImageUrl ? 'Regenerate' : 'Generate Art')}
                        </button>
                    )}

                    {generatedImageUrl && !isLoading && <ActionButtons generatedImageUrl={generatedImageUrl} />}
                </div>
            </div>
        </div>
        
        <CreativeStudio />
        
        <Gallery />
      </main>
    </div>
  );
};

export default App;
