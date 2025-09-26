/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React, { useState } from 'react';
import type { WardrobeItem } from '../types';
import { UploadCloudIcon, CheckCircleIcon } from './icons';
import { urlToFile } from '../lib/utils';

interface WardrobePanelProps {
  onGarmentSelect: (garmentFile: File, garmentInfo: WardrobeItem) => void;
  activeGarmentIds: string[];
  isLoading: boolean;
  wardrobe: WardrobeItem[];
}

const WardrobePanel: React.FC<WardrobePanelProps> = ({ onGarmentSelect, activeGarmentIds, isLoading, wardrobe }) => {
    const [error, setError] = useState<string | null>(null);

    const handleGarmentClick = async (item: WardrobeItem) => {
        if (isLoading || activeGarmentIds.includes(item.id)) return;
        setError(null);
        try {
            const file = await urlToFile(item.url, item.name);
            onGarmentSelect(file, item);
        } catch (err)
        {
            const detailedError = `Failed to load wardrobe item. Check console for details.`;
            setError(detailedError);
            console.error(`Failed to load and convert wardrobe item from URL: ${item.url}.`, err);
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            if (!file.type.startsWith('image/')) {
                setError('Please select an image file.');
                return;
            }
            const customGarmentInfo: WardrobeItem = {
                id: `custom-${Date.now()}`,
                name: file.name,
                url: URL.createObjectURL(file),
                brand: 'Custom Upload',
            };
            onGarmentSelect(file, customGarmentInfo);
            // Reset file input to allow uploading the same file again
            e.target.value = '';
        }
    };

  return (
    <div>
        <h2 className="text-xl font-serif tracking-wider text-gray-800 mb-3">Wardrobe</h2>
        <div className="grid grid-cols-3 gap-3">
            {wardrobe.map((item) => {
            const isActive = activeGarmentIds.includes(item.id);
            return (
                <div key={item.id} className="relative group aspect-square">
                    <button
                        onClick={() => handleGarmentClick(item)}
                        disabled={isLoading || isActive}
                        className="w-full h-full border rounded-lg overflow-hidden transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 disabled:opacity-60 disabled:cursor-not-allowed"
                        aria-label={`Select ${item.name}`}
                    >
                        <img src={item.url} alt={item.name} className="w-full h-full object-cover" />
                    </button>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none flex flex-col justify-end">
                        <div>
                            <p className="text-white font-bold text-sm truncate">{item.name}</p>
                            <div className="flex justify-between items-end mt-1">
                                <div className="text-gray-200 text-xs truncate max-w-[70%]">
                                    {item.brand && <p className="truncate">{item.brand}</p>}
                                    {item.material && <p className="truncate italic opacity-80">{item.material}</p>}
                                </div>
                                {item.price && <p className="text-white font-semibold text-base">₵{item.price.toFixed(2)}</p>}
                            </div>
                        </div>
                    </div>
                    {isActive && (
                        <div className="absolute inset-0 bg-gray-900/70 flex items-center justify-center rounded-lg pointer-events-none">
                            <CheckCircleIcon className="w-8 h-8 text-white" />
                        </div>
                    )}
                </div>
            );
            })}
            <label htmlFor="custom-garment-upload" className={`relative aspect-square border-2 border-dashed rounded-lg flex flex-col items-center justify-center text-gray-500 transition-colors ${isLoading ? 'cursor-not-allowed bg-gray-100' : 'hover:border-gray-400 hover:text-gray-600 cursor-pointer'}`}>
                <UploadCloudIcon className="w-6 h-6 mb-1"/>
                <span className="text-xs text-center">Upload</span>
                <input id="custom-garment-upload" type="file" className="hidden" accept="image/png, image/jpeg, image/webp, image/avif, image/heic, image/heif" onChange={handleFileChange} disabled={isLoading}/>
            </label>
        </div>
        {wardrobe.length === 0 && (
             <p className="text-center text-sm text-gray-500 mt-4">Your uploaded garments will appear here.</p>
        )}
        {error && <p className="text-red-500 text-sm mt-4">{error}</p>}
    </div>
  );
};

export default WardrobePanel;