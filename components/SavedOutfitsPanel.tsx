/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React from 'react';
import { SavedOutfit } from '../types';
import { Trash2Icon } from './icons';

interface SavedOutfitsPanelProps {
  outfits: SavedOutfit[];
  onApply: (outfit: SavedOutfit) => void;
  onDelete: (outfitId: string) => void;
  isLoading: boolean;
}

const SavedOutfitsPanel: React.FC<SavedOutfitsPanelProps> = ({ outfits, onApply, onDelete, isLoading }) => {
  if (outfits.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-500">You haven't saved any outfits yet.</p>
        <p className="text-sm text-gray-400 mt-2">Click the 'Save Outfit' button on the model to save your creation.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-3">
      {outfits.map(outfit => (
        <div key={outfit.id} className="group relative border rounded-lg overflow-hidden flex flex-col bg-white shadow-sm">
          <div className="aspect-w-1 aspect-h-1 bg-gray-100">
            <img src={outfit.previewUrl} alt={outfit.name} className="object-cover w-full h-full" />
          </div>
          <div className="p-3 flex-grow flex flex-col justify-between">
            <p className="font-semibold text-gray-800 text-sm truncate" title={outfit.name}>{outfit.name}</p>
            <button
              onClick={() => onApply(outfit)}
              disabled={isLoading}
              className="mt-2 w-full text-center bg-gray-900 text-white font-semibold py-2 px-3 rounded-md transition-all duration-200 ease-in-out hover:bg-gray-700 active:scale-95 text-xs disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Apply
            </button>
          </div>
          <button
            onClick={() => onDelete(outfit.id)}
            disabled={isLoading}
            className="absolute top-2 right-2 bg-white/60 backdrop-blur-sm text-gray-600 hover:text-red-600 p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-50"
            aria-label={`Delete ${outfit.name}`}
          >
            <Trash2Icon className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
};

export default SavedOutfitsPanel;
