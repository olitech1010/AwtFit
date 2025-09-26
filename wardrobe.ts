/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import { WardrobeItem } from './types';

// Default wardrobe items hosted for easy access
export const defaultWardrobe: WardrobeItem[] = [
  {
    id: 'gemini-sweat',
    name: 'Gemini Sweat',
    url: 'https://raw.githubusercontent.com/ammaarreshi/app-images/refs/heads/main/gemini-sweat-2.png',
    brand: 'Google Store',
    material: '80% Cotton, 20% Polyester',
    price: 59.99,
  },
  {
    id: 'gemini-tee',
    name: 'Gemini Tee',
    url: 'https://raw.githubusercontent.com/ammaarreshi/app-images/refs/heads/main/Gemini-tee.png',
    brand: 'Google Store',
    material: '100% Organic Cotton',
    price: 24.99,
  },
  {
    id: 'google-cloud-jacket',
    name: 'Cloud Jacket',
    url: 'https://raw.githubusercontent.com/ammaarreshi/app-images/main/google-cloud-jacket.png',
    brand: 'Google Cloud',
    material: '100% Recycled Polyester',
    price: 85.50,
  }
];