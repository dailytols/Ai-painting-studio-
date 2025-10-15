import React from 'react';
import { HeartIcon, StarIcon } from './Icons';

const mockGalleryData = [
  {
    id: 1,
    originalImageUrl: 'https://images.pexels.com/photos/167699/pexels-photo-167699.jpeg?auto=compress&cs=tinysrgb&w=600',
    generatedImageUrl: 'https://images.pexels.com/photos/3408744/pexels-photo-3408744.jpeg?auto=compress&cs=tinysrgb&w=600',
    styleName: 'Oil Painting',
    likes: 132,
    rating: 4.8,
  },
  {
    id: 2,
    originalImageUrl: 'https://images.pexels.com/photos/3225517/pexels-photo-3225517.jpeg?auto=compress&cs=tinysrgb&w=600',
    generatedImageUrl: 'https://images.pexels.com/photos/2387873/pexels-photo-2387873.jpeg?auto=compress&cs=tinysrgb&w=600',
    styleName: 'Watercolor',
    likes: 254,
    rating: 4.9,
  },
  {
    id: 3,
    originalImageUrl: 'https://images.pexels.com/photos/7919/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=600',
    generatedImageUrl: 'https://images.pexels.com/photos/1528640/pexels-photo-1528640.jpeg?auto=compress&cs=tinysrgb&w=600',
    styleName: 'Cyberpunk',
    likes: 512,
    rating: 4.7,
  },
   {
    id: 4,
    originalImageUrl: 'https://images.pexels.com/photos/531880/pexels-photo-531880.jpeg?auto=compress&cs=tinysrgb&w=600',
    generatedImageUrl: 'https://images.pexels.com/photos/1547813/pexels-photo-1547813.jpeg?auto=compress&cs=tinysrgb&w=600',
    styleName: 'Digital Art',
    likes: 89,
    rating: 4.5,
  },
   {
    id: 5,
    originalImageUrl: 'https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&w=600',
    generatedImageUrl: 'https://images.pexels.com/photos/1624496/pexels-photo-1624496.jpeg?auto=compress&cs=tinysrgb&w=600',
    styleName: '3D Render',
    likes: 301,
    rating: 4.8,
  },
  {
    id: 6,
    originalImageUrl: 'https://images.pexels.com/photos/33109/fall-autumn-red-season.jpg?auto=compress&cs=tinysrgb&w=600',
    generatedImageUrl: 'https://images.pexels.com/photos/210186/pexels-photo-210186.jpeg?auto=compress&cs=tinysrgb&w=600',
    styleName: 'Pencil Sketch',
    likes: 198,
    rating: 4.6,
  },
];

export const Gallery: React.FC = () => {
  return (
    <section className="bg-white py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900">Featured Creations</h2>
          <p className="mt-2 text-lg text-gray-600">See what others have created with the AI Painting Studio.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {mockGalleryData.map((item) => (
            <div key={item.id} className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform transform hover:scale-105 hover:shadow-2xl">
              <div className="grid grid-cols-2">
                <img src={item.originalImageUrl} alt="Original" className="object-cover w-full h-48" />
                <img src={item.generatedImageUrl} alt="Generated" className="object-cover w-full h-48" />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800">{item.styleName}</h3>
                <div className="mt-3 flex items-center justify-between text-gray-500">
                  <div className="flex items-center space-x-1">
                    <HeartIcon className="w-5 h-5 text-red-500" />
                    <span className="font-medium text-sm">{item.likes}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                     <StarIcon className="w-5 h-5 text-yellow-500" />
                     <span className="font-medium text-sm">{item.rating} / 5.0</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};