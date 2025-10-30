import { FormData } from '../types';
import { WORD_BANK, ADVANCED_COORDINATION, initialFormData, PLANNER_THEMES, SKIN_TONES_BY_ETHNICITY, COLOR_PALETTES } from '../constants';

const randomFrom = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];
const nonNone = (arr: string[] | undefined) => (arr || []).filter(i => i !== 'none');

const SKIN_TONE_TO_ETHNICITIES: { [key: string]: string[] } = {};
for (const ethnicity in SKIN_TONES_BY_ETHNICITY) {
    for (const tone of SKIN_TONES_BY_ETHNICITY[ethnicity]) {
        if (!SKIN_TONE_TO_ETHNICITIES[tone]) {
            SKIN_TONE_TO_ETHNICITIES[tone] = [];
        }
        if (!SKIN_TONE_TO_ETHNICITIES[tone].includes(ethnicity)) {
            SKIN_TONE_TO_ETHNICITIES[tone].push(ethnicity);
        }
    }
}

export const getRandomizedForm = (): FormData => {
    const newForm = { ...initialFormData };
    
    const selectedThemeKey = randomFrom(ADVANCED_COORDINATION.themes);
    const themeData = ADVANCED_COORDINATION.perfectCombinations[selectedThemeKey as keyof typeof ADVANCED_COORDINATION.perfectCombinations];

    if (!themeData) {
        // Fallback for themes without detailed combinations
        const palette = randomFrom(COLOR_PALETTES);
        newForm.hairColor = randomFrom(palette.hair);
        newForm.eyeColor = randomFrom(palette.eyes);
        newForm.lipColor = randomFrom(palette.lips);
        newForm.eyeshadowColors = randomFrom(palette.eyeshadow);
        newForm.outfitStyle = randomFrom(palette.outfitStyle);
        newForm.topDescription = randomFrom(palette.tops);
        newForm.bottomDescription = randomFrom(palette.bottoms);

        const randomEthnicity = randomFrom(nonNone(WORD_BANK.ethnicity)) || 'European';
        newForm.ethnicity = randomEthnicity;
        const compatibleTones = SKIN_TONES_BY_ETHNICITY[randomEthnicity] || [];
        if (compatibleTones.length > 0) {
            newForm.skinTone = randomFrom(compatibleTones);
        }
        return newForm;
    }

    newForm.outfitCategory = themeData.outfitCategory;

    // Handle themes with specific, highly-curated character combos
    if ('specificCombos' in themeData) {
        const perfectCombo = randomFrom(themeData.specificCombos);
        Object.assign(newForm, perfectCombo);
        newForm.outfitStyle = perfectCombo.outfit;
        newForm.topDescription = perfectCombo.top;
        newForm.bottomDescription = perfectCombo.bottom;
        newForm.hairDescription = randomFrom(themeData.hairStyles || []);
        newForm.sceneDescription = randomFrom(themeData.scenes || []);
        if (themeData.skinTones && themeData.skinTones.length > 0) {
            newForm.skinTone = randomFrom(themeData.skinTones);
        }
        
        // Add eyewear for specific themes
        if (['vintage', 'cyberpunk', 'sporty'].includes(selectedThemeKey) && Math.random() < 0.4) {
            newForm.eyeType = randomFrom(nonNone(WORD_BANK.eyeType)) || 'eye glasses';
            newForm.frameShape = randomFrom(nonNone(WORD_BANK.frameShape)) || 'round';
            newForm.frameColor = randomFrom(nonNone(WORD_BANK.frameColor)) || 'black';
        } else {
            newForm.eyeType = 'none';
        }
    } else {
        // For all other themes, use a Smart Color Palette for variety and coherence
        const palette = randomFrom(COLOR_PALETTES);
        newForm.hairColor = randomFrom(palette.hair);
        newForm.eyeColor = randomFrom(palette.eyes);
        newForm.lipColor = randomFrom(palette.lips);
        newForm.eyeshadowColors = randomFrom(palette.eyeshadow);

        // Handle theme-specific outfit logic
        if (['winter', 'autumn'].includes(selectedThemeKey)) {
             if(selectedThemeKey === 'autumn') {
                 newForm.layeredOuterwear = randomFrom(nonNone(WORD_BANK.layeredOuterwear)?.filter(i => i.includes('(Autumn)'))) || 'corduroy jacket (Autumn)';
                 newForm.layeredTop = randomFrom(nonNone(WORD_BANK.layeredTop)?.filter(i => i.includes('(Autumn)'))) || 'warm flannel shirt (Autumn)';
             } else { // Winter
                newForm.layeredOuterwear = randomFrom(nonNone(WORD_BANK.layeredOuterwear)?.filter(i => !i.includes('(Autumn)'))) || 'puffer coat';
                newForm.layeredTop = randomFrom(nonNone(WORD_BANK.layeredTop)?.filter(i => !i.includes('(Autumn)'))) || 'cozy knitted sweater';
            }
            newForm.layeredScarf = randomFrom(nonNone(WORD_BANK.layeredScarf)) || 'knitted scarf';
            newForm.layeredHat = randomFrom(nonNone(WORD_BANK.layeredHat)) || 'knitted beanie';
        } else if (selectedThemeKey === 'chicWinter') {
            newForm.outfitCategory = 'Chic Winter Outfit';
            newForm.chicWinterOutfit = 'leather_shearling_combo';
            const monoPalette = COLOR_PALETTES.find(p => p.name === 'Monochrome Chic') || palette;
            newForm.hairColor = randomFrom(['platinum blonde', 'golden blonde', 'white blonde']);
            newForm.hairDescription = randomFrom(['long flowing', 'beach waves', 'side swept']);
            newForm.eyeColor = randomFrom(monoPalette.eyes);
            newForm.lipColor = randomFrom(monoPalette.lips);
            newForm.eyeshadowColors = randomFrom(monoPalette.eyeshadow);
        } else if (selectedThemeKey === 'chicStreet') {
            newForm.outfitCategory = 'Chic Street Style';
            newForm.chicStreetStyle = randomFrom(nonNone(WORD_BANK.chicStreetStyle)) || 'plaid_coat_turtleneck';
            if (Math.random() > 0.5) {
                newForm.headwear = 'classic beret';
            }
        } else if (selectedThemeKey === 'chicAutumn') {
            newForm.chicAutumnOutfit = 'knit_leather_combo';
            const autumnPalette = COLOR_PALETTES.find(p => p.name === 'Earthy Autumn') || palette;
            newForm.hairColor = randomFrom(autumnPalette.hair);
            newForm.eyeColor = randomFrom(autumnPalette.eyes);
            newForm.lipColor = randomFrom(autumnPalette.lips);
            newForm.eyeshadowColors = randomFrom(autumnPalette.eyeshadow);
        } else if (selectedThemeKey === 'summer') {
            newForm.summerOutfit = randomFrom(nonNone(WORD_BANK.summerOutfit)) || 'boho chic sundress';
        } else if (selectedThemeKey === 'christmas') {
            const christmasOutfits = nonNone(WORD_BANK.christmasOutfit).filter(o => o !== 'ugly Christmas sweater outfit' && o !== 'elegant holiday party dress');
            newForm.christmasOutfit = randomFrom(christmasOutfits);
            if (newForm.christmasOutfit === 'stylish Christmas sweater') {
                newForm.headwear = 'Santa hat';
                newForm.hairDescription = randomFrom(['twin pigtails', 'loose curls', 'side swept']);
            } else if (newForm.christmasOutfit === 'cozy Christmas pajama set') {
                newForm.hairDescription = randomFrom(['messy bun', 'high ponytail', 'braided crown']);
            }
             if (newForm.christmasOutfit === 'winter puffer jacket and skirt') {
                newForm.hairColor = randomFrom(['jet black', 'dark brown', 'ash blonde']);
                newForm.hairDescription = randomFrom(['high ponytail', 'long flowing', 'straight with bangs']);
            }
        } else if (selectedThemeKey === 'valentines') {
            newForm.valentinesOutfit = randomFrom(nonNone(WORD_BANK.valentinesOutfit)) || 'romantic cocktail dress';
        } else if (selectedThemeKey === 'indian' && 'indianOutfits' in themeData) {
            newForm.indianOutfit = randomFrom(themeData.indianOutfits || []);
            newForm.skinTone = randomFrom(themeData.skinTones || []);
            newForm.hairDescription = randomFrom(themeData.hairStyles || []);
            newForm.ethnicity = 'Indian'; // Indian outfits should have Indian ethnicity
        } else if (['fantasy', 'halloween'].includes(selectedThemeKey) && 'themedCostumes' in themeData) {
            newForm.themedCostume = randomFrom(themeData.themedCostumes || []);
            if (selectedThemeKey === 'fantasy' && newForm.themedCostume !== 'Ice Princess Gown') newForm.headwear = 'sparkly tiara'; 
            if (newForm.themedCostume === 'Ice Princess Gown') {
                newForm.hairColor = randomFrom(['platinum blonde', 'silver gray', 'sky blue']);
                newForm.hairDescription = randomFrom(['braided crown', 'space buns', 'twisted updo']);
            }
        } else if (selectedThemeKey === 'formal' && 'gowns' in themeData) {
            newForm.gownStyle = randomFrom(themeData.gowns || []);
            newForm.hairDescription = randomFrom(themeData.hairStyles || []);
        } else if (selectedThemeKey === 'planner' && 'categories' in themeData) {
            const randomCategoryKey = randomFrom(Object.keys(PLANNER_THEMES));
            const randomPlannerOptions = PLANNER_THEMES[randomCategoryKey];
            const randomPlanner = randomFrom(randomPlannerOptions);
            newForm.plannerCategory = randomCategoryKey;
            newForm.plannerType = randomPlanner.value;
            newForm.plannerPropCombination = randomPlanner.prop;
            newForm.plannerPalette = randomFrom(nonNone(WORD_BANK.plannerPalette)) || 'main';
            newForm.hairDescription = randomFrom(themeData.hairStyles || []);
        }
    }

    // Final Validation and Correction for Ethnicity/SkinTone
    const isComboValid = (SKIN_TONES_BY_ETHNICITY[newForm.ethnicity] || []).includes(newForm.skinTone);

    if (!isComboValid) {
        const compatibleEthnicities = SKIN_TONE_TO_ETHNICITIES[newForm.skinTone];
        if (compatibleEthnicities && compatibleEthnicities.length > 0) {
            newForm.ethnicity = randomFrom(compatibleEthnicities);
        } else {
            // Fallback if skin tone is somehow invalid for all ethnicities
            const randomEthnicity = randomFrom(nonNone(WORD_BANK.ethnicity)) || 'European';
            newForm.ethnicity = randomEthnicity;
            const compatibleTones = SKIN_TONES_BY_ETHNICITY[randomEthnicity] || [];
            if (compatibleTones.length > 0) {
                newForm.skinTone = randomFrom(compatibleTones);
            }
        }
    }
    
    // For themes that used palettes but didn't set ethnicity, set it now
    if (!('specificCombos' in themeData) && selectedThemeKey !== 'indian') {
        const randomEthnicity = randomFrom(nonNone(WORD_BANK.ethnicity)) || 'European';
        newForm.ethnicity = randomEthnicity;
        const compatibleTones = SKIN_TONES_BY_ETHNICITY[randomEthnicity] || [];
         if (compatibleTones.length > 0) {
            newForm.skinTone = randomFrom(compatibleTones);
        }
    }


    // Handle Nail Style based on theme
    const themedNails = ['glamorous', 'formal', 'planner', 'valentines', 'indian', 'christmas'];
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
    if (newForm.themedCostume === 'Ice Princess Gown' || newForm.christmasOutfit === 'Elegant Winter Gown') {
        newForm.nailStyle = 'none';
    }


    // Add freckles and jewelry randomly
    if (Math.random() < 0.4) {
        newForm.freckles = randomFrom(nonNone(WORD_BANK.freckles)) || 'soft freckles';
    }
    if (Math.random() < 0.3) {
        newForm.jewelry = randomFrom(nonNone(WORD_BANK.jewelry)) || 'a delicate gold necklace';
    }


    newForm.age = randomFrom(['20', '22', '25']);
    return newForm;
};