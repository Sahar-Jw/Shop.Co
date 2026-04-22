import React from 'react';
import { useProducts } from '../../contexts/ProductsContext';

export default function Filter({ categories = [], onClose }) {
  const { filters, setFilters } = useProducts();

  const toggleCategory = (category) => {
    setFilters(prev => ({
      ...prev,
      categories: prev.categories.includes(category)
        ? prev.categories.filter(c => c !== category)
        : [...prev.categories, category]
    }));
  };

  const handleStarClick = (star) => {
    setFilters(prev => ({ ...prev, minRating: star }));
  };

  const clearRating = () => {
    setFilters(prev => ({ ...prev, minRating: 0 }));
  };

  const handleMinPriceChange = (e) => {
    const value = parseInt(e.target.value) || 0;
    setFilters(prev => ({
      ...prev,
      minPrice: Math.min(value, prev.maxPrice)
    }));
  };

  const handleMaxPriceChange = (e) => {
    const value = parseInt(e.target.value) || 0;
    setFilters(prev => ({
      ...prev,
      maxPrice: Math.max(value, prev.minPrice)
    }));
  };

  return (
    <div className="bg-white lg:sticky lg:top-4 lg:p-6 p-4 lg:rounded-2xl lg:shadow-lg max-h-[70vh] overflow-y-auto h-full lg:h-auto">
      {onClose ? (
        <div className="flex items-center justify-between mb-6 border-b pb-3 lg:mb-6">
          <h3 className="text-xl font-bold text-gray-800">Filters</h3>
          <button 
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-all lg:hidden"
            aria-label="Close filter"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      ) : (
        <h3 className="text-xl font-bold mb-6 text-gray-800 border-b pb-3">Filters</h3>
      )}
      
      {/* Price Range */}

      <div className="mb-8">
        <label className="block text-sm font-semibold text-black mb-2">Price Range</label>
        <div className="space-y-3">
          <span className="block text-[15px] font-semibold text-gray-600">${filters.minPrice} - ${filters.maxPrice}</span>
          <div className="relative h-2">
            <input
              type="range"
              min="0"
              max="500"
              value={filters.minPrice}
              onChange={handleMinPriceChange}
              className="absolute inset-0 w-full h-2 bg-gray-200 rounded-lg cursor-pointer accent-black hover:accent-gray-800 [&::-webkit-slider-thumb]:w-0 [&::-webkit-slider-thumb]:h-0 [&::-webkit-slider-thumb]:opacity-0 z-10"
            />
            <input
              type="range"
              min="0"
              max="500"
              value={filters.maxPrice}
              onChange={handleMaxPriceChange}
              className="absolute inset-0 w-full h-2 bg-transparent rounded-lg cursor-pointer accent-black hover:accent-gray-800 [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:bg-black [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-md z-20"
            />
            <div className="absolute inset-0 w-full h-full bg-linear-to-r from-transparent via-blue-200/50 to-transparent pointer-events-none z-0 rounded-lg" style={{left: `${(filters.minPrice / 500) * 100}%`, right: `${100 - (filters.maxPrice / 500) * 100}%`}}></div>
          </div>
        </div>
      </div>

      {/* Rating */}
      <div className="mb-8">
        <label className="block text-sm font-semibold text-black mb-3">Rating</label>
        <div className="flex items-center gap-1 mb-2">
          {[1,2,3,4,5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => handleStarClick(star)}
              className={`p-1 transition-all ${filters.minRating >= star ? 'text-yellow-400 scale-110' : 'text-gray-300 hover:text-yellow-300 hover:scale-110'} cursor-pointer`}
              title={`Minimum ${star} stars`}
            >
              <svg className="w-6 h-6 fill-current" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3 .921-.755 1.688-1.54 1.118l-2.8-1.512a1 1 0 00-1.175 0l-2.8 1.512c-.785 .57-1.84-.197-1.54-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81 .588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </button>
          ))}
        </div>
        {filters.minRating > 0 && (
          <button
            onClick={clearRating}
            className="text-xs text-gray-500 underline hover:text-gray-700"
          >
            Clear rating filter
          </button>
        )}
      </div>

      {/* Categories */}
      <div>
        <label className="block text-sm font-semibold text-black mb-3">Category</label>
        <div className="space-y-2">
          {categories.map((category) => (
            <label key={category} className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                value={category}
                checked={filters.categories.includes(category)}
                onChange={() => toggleCategory(category)}
                className="w-4 h-4 accent-black cursor-pointer rounded"
              />
              <span className="text-sm text-gray-700 capitalize">{category}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
