

import { FormData } from '../types';
import { WORD_BANK, ADVANCED_COORDINATION, initialFormData, PLANNER_PROPS } from '../constants';

const randomFrom = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];
const nonNone = (arr: string[] | undefined) => (arr || []).filter(i => i !== 'none');

export const getRandomizedForm = (): FormData => {
    const newForm = { ...initialFormData };
    
    const selectedThemeKey = randomFrom(ADVANCED_COORDINATION.themes);
    const themeData = ADVANCED_COORDINATION.perfectCombinations[selectedThemeKey as keyof typeof ADVANCED_COORDINATION.perfectCombinations];

    if (!themeData) {
        // Fallback for themes without detailed combinations (like the old randomizer)
        Object.keys(initialFormData).forEach(key => {
            const typedKey = key as keyof FormData;
            const options = WORD_BANK[typedKey];
            if (options && options.length > 0) {
                (newForm as any)[typedKey] = randomFrom(options);
            }
        });
        return newForm;
    }

    newForm.outfitCategory = themeData.outfitCategory;

    // Handle Detailed Outfit themes
    if ('specificCombos' in themeData) {
        const perfectCombo = randomFrom(themeData.specificCombos);
        Object.assign(newForm, perfectCombo);
        newForm.outfitStyle = perfectCombo.outfit;
        newForm.topDescription = perfectCombo.top;
        newForm.bottomDescription = perfectCombo.bottom;
        newForm.hairDescription = randomFrom(themeData.hairStyles || []);
        newForm.sceneDescription = randomFrom(themeData.scenes || []);
        newForm.skinTone = randomFrom(themeData.skinTones || []);
        
        // Add eyewear for specific themes
        if (['vintage', 'cyberpunk', 'sporty'].includes(selectedThemeKey) && Math.random() < 0.4) {
            newForm.eyeType = randomFrom(nonNone(WORD_BANK.eyeType)) || 'eye glasses';
            newForm.frameShape = randomFrom(nonNone(WORD_BANK.frameShape)) || 'round';
            newForm.frameColor = randomFrom(nonNone(WORD_BANK.frameColor)) || 'black';
        } else {
            newForm.eyeType = 'none';
        }
    }
    
    // Handle Layered Wear Themes (Winter, Autumn)
    if (['winter', 'autumn'].includes(selectedThemeKey) && 'hairColors' in themeData) {
        newForm.hairColor = randomFrom(themeData.hairColors || []);
        if ('eyeColors' in themeData) {
            newForm.eyeColor = randomFrom(themeData.eyeColors || []);
        }
        if ('lipColors' in themeData) {
            newForm.lipColor = randomFrom(themeData.lipColors || []);
        }

        if(selectedThemeKey === 'autumn') {
             newForm.layeredOuterwear = randomFrom(nonNone(WORD_BANK.layeredOuterwear)?.filter(i => i.includes('(Autumn)'))) || 'corduroy jacket (Autumn)';
             newForm.layeredTop = randomFrom(nonNone(WORD_BANK.layeredTop)?.filter(i => i.includes('(Autumn)'))) || 'warm flannel shirt (Autumn)';
        } else { // Winter
            newForm.layeredOuterwear = randomFrom(nonNone(WORD_BANK.layeredOuterwear)?.filter(i => !i.includes('(Autumn)'))) || 'puffer coat';
            newForm.layeredTop = randomFrom(nonNone(WORD_BANK.layeredTop)?.filter(i => !i.includes('(Autumn)'))) || 'cozy knitted sweater';
        }
        newForm.layeredScarf = randomFrom(nonNone(WORD_BANK.layeredScarf)) || 'knitted scarf';
        newForm.layeredHat = randomFrom(nonNone(WORD_BANK.layeredHat)) || 'knitted beanie';
    }

    // Handle Single-Item Outfit Themes (Summer, Christmas, Valentines)
    if (selectedThemeKey === 'summer' && 'hairColors' in themeData) {
        newForm.hairColor = randomFrom(themeData.hairColors || []);
        if ('lipColors' in themeData) {
            newForm.lipColor = randomFrom(themeData.lipColors || []);
        }
        if ('eyeshadowColors' in themeData) {
            newForm.eyeshadowColors = randomFrom(themeData.eyeshadowColors || []);
        }
        newForm.summerOutfit = randomFrom(nonNone(WORD_BANK.summerOutfit)) || 'boho chic sundress';
    }
    if (selectedThemeKey === 'christmas' && 'hairColors' in themeData) {
        newForm.hairColor = randomFrom(themeData.hairColors || []);
        if ('lipColors' in themeData) {
            newForm.lipColor = randomFrom(themeData.lipColors || []);
        }
        if ('eyeshadowColors' in themeData) {
            newForm.eyeshadowColors = randomFrom(themeData.eyeshadowColors || []);
        }
        newForm.christmasOutfit = randomFrom(nonNone(WORD_BANK.christmasOutfit)) || 'ugly Christmas sweater outfit';
    }
     if (selectedThemeKey === 'valentines' && 'hairColors' in themeData) {
        newForm.hairColor = randomFrom(themeData.hairColors || []);
        if ('lipColors' in themeData) {
            newForm.lipColor = randomFrom(themeData.lipColors || []);
        }
        if ('eyeshadowColors' in themeData) {
            newForm.eyeshadowColors = randomFrom(themeData.eyeshadowColors || []);
        }
        newForm.valentinesOutfit = randomFrom(nonNone(WORD_BANK.valentinesOutfit)) || 'romantic cocktail dress';
    }

    // Handle Indian Outfit theme
    if (selectedThemeKey === 'indian' && 'indianOutfits' in themeData) {
        newForm.indianOutfit = randomFrom(themeData.indianOutfits || []);
        newForm.hairColor = randomFrom(themeData.hairColors || []);
        if ('eyeColors' in themeData) newForm.eyeColor = randomFrom(themeData.eyeColors);
        if ('lipColors' in themeData) newForm.lipColor = randomFrom(themeData.lipColors);
        if ('skinTones' in themeData) newForm.skinTone = randomFrom(themeData.skinTones);
        if ('hairStyles' in themeData) newForm.hairDescription = randomFrom(themeData.hairStyles);
        if ('eyeshadowColors' in themeData) newForm.eyeshadowColors = randomFrom(themeData.eyeshadowColors);
        newForm.ethnicity = 'Indian';
    }

    // Handle Themed Costume (Fantasy, Halloween)
    if (['fantasy', 'halloween'].includes(selectedThemeKey) && 'themedCostumes' in themeData) {
        newForm.themedCostume = randomFrom(themeData.themedCostumes || []);
        newForm.hairColor = randomFrom(themeData.hairColors || []);
        if (selectedThemeKey === 'fantasy') {
            newForm.headwear = 'sparkly tiara'; 
        }
    }

    // Handle Formal Gown theme
    if (selectedThemeKey === 'formal' && 'gowns' in themeData) {
        newForm.gownStyle = randomFrom(themeData.gowns || []);
        newForm.hairColor = randomFrom(themeData.hairColors || []);
        newForm.hairDescription = randomFrom(themeData.hairStyles || []);
    }
    
    // Handle Planner Outfit theme
    if (selectedThemeKey === 'planner' && 'categories' in themeData) {
        const randomCategory = randomFrom(themeData.categories || []);
        const propOptions = PLANNER_PROPS[randomCategory] || [];
        const randomProp = randomFrom(propOptions);

        newForm.plannerCategory = randomCategory;
        newForm.plannerPropCombination = randomProp ? randomProp.value : 'none';
        
        newForm.hairColor = randomFrom(themeData.hairColors || []);
        newForm.lipColor = randomFrom(themeData.lipColors || []);
        newForm.hairDescription = randomFrom(themeData.hairStyles || []);
    }

    // Handle Nail Style based on theme
    const themedNails = ['glamorous', 'formal', 'planner', 'valentines', 'indian'];
    if (themedNails.includes(selectedThemeKey)) {
         newForm.nailStyle = randomFrom(nonNone(WORD_BANK.nailStyle)) || 'manicured nude nails';
    } else if (Math.random() < 0.3) { // 30% chance for other themes
         newForm.nailStyle = randomFrom(nonNone(WORD_BANK.nailStyle)) || 'manicured nude nails';
    } else {
         newForm.nailStyle = 'none';
    }

    // Special case: if wearing gloves, no nails needed.
    if (newForm.outfitCategory === 'Winter Wear' && newForm.layeredGloves !== 'none') {
        newForm.nailStyle = 'none';
    }

    newForm.age = randomFrom(['20', '22', '25']);
    return newForm;
};