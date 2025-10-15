import React, { useState, useRef } from 'react';
import { enhancePrompt, generateImageFromText, generateRandomPrompt } from '../services/geminiService';
import { MagicWandIcon, PaintBrushIcon, AlertTriangleIcon, WandSparklesIcon } from './Icons';

const Spinner: React.FC<{ text: string }> = ({ text }) => (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-900 bg-opacity-50 backdrop-blur-sm transition-opacity rounded-lg">
        <div className="w-16 h-16 border-4 border-t-indigo-500 border-gray-200 rounded-full animate-spin"></div>
        <p className="mt-4 text-white font-semibold">{text}</p>
    </div>
);

const examplePrompts = [
    {
      prompt: 'A vibrant, detailed illustration of a futuristic city with flying cars and neon signs, in a classic anime style.',
      imageUrl: 'https://images.pexels.com/photos/2156881/pexels-photo-2156881.jpeg?auto=compress&cs=tinysrgb&w=600'
    },
    {
      prompt: 'A surreal oil painting of a giant astronaut floating in a colorful galaxy made entirely of exotic flowers.',
      imageUrl: 'https://images.pexels.com/photos/1191531/pexels-photo-1191531.jpeg?auto=compress&cs=tinysrgb&w=600'
    },
    {
      prompt: 'A cozy, dimly lit library with towering bookshelves, a crackling fireplace, and a cat sleeping on a stack of books, digital art.',
      imageUrl: 'https://images.pexels.com/photos/33041/antelope-canyon-lower-canyon-arizona.jpg?auto=compress&cs=tinysrgb&w=600'
    }
  ];

export const CreativeStudio: React.FC = () => {
    const [prompt, setPrompt] = useState<string>('A majestic lion with a crown of stars, photorealistic, cinematic lighting');
    const [idea, setIdea] = useState<string>('');
    const [isEnhancing, setIsEnhancing] = useState<boolean>(false);
    const [isGenerating, setIsGenerating] = useState<boolean>(false);
    const [isAutoPrompting, setIsAutoPrompting] = useState<boolean>(false);
    const [generatedImageUrl, setGeneratedImageUrl] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const promptTextareaRef = useRef<HTMLTextAreaElement>(null);

    const handleEnhancePrompt = async () => {
        if (!idea) return;
        setIsEnhancing(true);
        setError(null);
        try {
            const enhanced = await enhancePrompt(idea);
            setPrompt(enhanced);
        } catch (err) {
            console.error(err);
            setError('Failed to enhance prompt. Please try again.');
        } finally {
            setIsEnhancing(false);
        }
    };
    
    const handleAutoPrompt = async () => {
        setIsAutoPrompting(true);
        setError(null);
        try {
            const newPrompt = await generateRandomPrompt();
            setPrompt(newPrompt);
        } catch (err) {
            console.error(err);
            setError('Failed to generate prompt. Please try again.');
        } finally {
            setIsAutoPrompting(false);
        }
    };

    const handleGenerateImage = async () => {
        if (!prompt) return;
        setIsGenerating(true);
        setError(null);
        setGeneratedImageUrl(null);
        try {
            const imageUrl = await generateImageFromText(prompt);
            setGeneratedImageUrl(imageUrl);
        } catch (err) {
            console.error(err);
            setError('Failed to generate image. Please try again.');
        } finally {
            setIsGenerating(false);
        }
    };

    const handleUsePrompt = (promptText: string) => {
        setPrompt(promptText);
        promptTextareaRef.current?.focus();
        promptTextareaRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    };


    return (
        <section className="bg-gray-100 py-12 md:py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-10">
                    <h2 className="text-3xl font-bold text-gray-900">Creative Studio</h2>
                    <p className="mt-2 text-lg text-gray-600">Generate stunning art directly from your imagination.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                    {/* Left side: Controls */}
                    <div className="bg-white p-6 rounded-xl shadow-md space-y-6">
                        {/* Prompt Enhancer */}
                        <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-200">
                            <label htmlFor="idea-input" className="block text-md font-semibold text-gray-800 mb-2">
                                Need Inspiration? Enhance an Idea
                            </label>
                            <div className="flex flex-col sm:flex-row gap-2">
                                <input
                                    id="idea-input"
                                    type="text"
                                    value={idea}
                                    onChange={(e) => setIdea(e.target.value)}
                                    placeholder="e.g., a cat in a library"
                                    className="flex-grow p-2 bg-white border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-black placeholder:text-gray-500 disabled:bg-gray-100"
                                    disabled={isEnhancing || isGenerating || isAutoPrompting}
                                />
                                <button
                                    onClick={handleEnhancePrompt}
                                    disabled={!idea || isEnhancing || isGenerating || isAutoPrompting}
                                    className="flex items-center justify-center gap-2 bg-indigo-500 text-white font-semibold py-2 px-4 rounded-lg shadow-sm hover:bg-indigo-600 transition disabled:bg-indigo-300 disabled:cursor-not-allowed"
                                >
                                    <MagicWandIcon className="w-5 h-5" />
                                    {isEnhancing ? 'Enhancing...' : 'Enhance'}
                                </button>
                            </div>
                        </div>

                        {/* Main Prompt Textarea */}
                        <div>
                             <div className="flex justify-between items-center mb-2">
                                <label htmlFor="prompt-textarea" className="block text-md font-semibold text-gray-800">
                                    Your Creative Prompt
                                </label>
                                <button
                                    onClick={handleAutoPrompt}
                                    disabled={isAutoPrompting || isEnhancing || isGenerating}
                                    className="flex items-center justify-center gap-2 bg-purple-100 text-purple-700 font-semibold py-2 px-3 rounded-lg shadow-sm hover:bg-purple-200 transition disabled:bg-gray-200 disabled:text-gray-500 disabled:cursor-not-allowed"
                                >
                                    <WandSparklesIcon className="w-5 h-5" />
                                    {isAutoPrompting ? 'Inspiring...' : 'Surprise Me'}
                                </button>
                            </div>
                            <textarea
                                ref={promptTextareaRef}
                                id="prompt-textarea"
                                value={prompt}
                                onChange={(e) => setPrompt(e.target.value)}
                                placeholder="Describe the image you want to create..."
                                rows={6}
                                className="w-full p-3 bg-white border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-base text-black placeholder:text-gray-500 disabled:bg-gray-100 disabled:opacity-70"
                                disabled={isGenerating || isAutoPrompting}
                            />
                        </div>

                        {/* Generate Button */}
                        <button
                            onClick={handleGenerateImage}
                            disabled={!prompt || isGenerating || isAutoPrompting}
                            className="w-full flex items-center justify-center gap-2 bg-indigo-600 text-white font-bold py-3 px-8 rounded-lg shadow-md hover:bg-indigo-700 transition-transform transform hover:scale-105 disabled:bg-indigo-400 disabled:cursor-not-allowed"
                        >
                            <PaintBrushIcon className="w-6 h-6" />
                            {isGenerating ? 'Creating...' : 'Generate Image'}
                        </button>
                    </div>

                    {/* Right side: Image Display */}
                    <div className="bg-white p-4 rounded-xl shadow-md flex flex-col items-center justify-center w-full h-full aspect-square">
                         <h2 className="text-lg font-semibold text-gray-700 mb-4">Generated Image</h2>
                         <div className="relative w-full flex-grow bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden">
                            {generatedImageUrl ? (
                                <img src={generatedImageUrl} alt="Generated from prompt" className="object-contain w-full h-full" />
                            ) : (
                                <div className="text-center text-gray-500 p-4">
                                     <PaintBrushIcon className="w-12 h-12 mx-auto text-gray-400" />
                                     <p className="mt-2 font-semibold">Your generated art will appear here</p>
                                </div>
                            )}
                            {isGenerating && <Spinner text="Creating your art..." />}
                            {error && (
                                <div className="absolute inset-0 flex flex-col items-center justify-center bg-red-100 bg-opacity-90 p-4">
                                    <AlertTriangleIcon className="w-12 h-12 text-red-500"/>
                                    <p className="mt-2 text-red-700 font-semibold text-center">{error}</p>
                                </div>
                            )}
                         </div>
                    </div>
                </div>

                <div className="mt-16">
                    <div className="text-center mb-8">
                        <h3 className="text-2xl font-bold text-gray-800">Inspiration Gallery</h3>
                        <p className="mt-1 text-md text-gray-600">Click on an example to try the prompt yourself!</p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {examplePrompts.map((example, index) => (
                            <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden group flex flex-col">
                                <img src={example.imageUrl} alt={`Example for prompt: ${example.prompt}`} className="h-48 w-full object-cover"/>
                                <div className="p-4 flex flex-col flex-grow">
                                    <p className="text-sm text-gray-600 italic flex-grow">"{example.prompt}"</p>
                                    <button
                                        onClick={() => handleUsePrompt(example.prompt)}
                                        disabled={isGenerating || isAutoPrompting}
                                        className="w-full mt-3 bg-gray-200 text-gray-800 font-semibold py-2 px-4 rounded-lg hover:bg-indigo-100 hover:text-indigo-700 transition disabled:bg-gray-300 disabled:cursor-not-allowed"
                                    >
                                        Use this Prompt
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};