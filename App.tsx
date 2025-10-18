import React, { useState, useCallback, ChangeEvent, useEffect } from 'react';
import { FormData, Option } from './types';
import { initialFormData, WORD_BANK, PLANNER_PROPS } from './constants';
import { buildPrompt } from './services/promptService';
import { getRandomizedForm } from './services/randomizerService';
import Header from './components/Header';
import Section from './components/Section';
import SelectInput from './components/SelectInput';
import TextInput from './components/TextInput';
import OutputDisplay from './components/OutputDisplay';
import Notification from './components/Notification';

const App: React.FC = () => {
    const [formData, setFormData] = useState<FormData>(initialFormData);
    const [prompts, setPrompts] = useState<string[]>([]);
    const [notification, setNotification] = useState<string | null>(null);
    const [plannerPropOptions, setPlannerPropOptions] = useState<Option[]>([]);

    useEffect(() => {
        // When plannerCategory changes, update the available prop options
        const categoryKey = formData.plannerCategory as keyof typeof PLANNER_PROPS;
        const newOptions = PLANNER_PROPS[categoryKey] || [];
        setPlannerPropOptions(newOptions);
    }, [formData.plannerCategory]);


    const showNotification = (message: string) => {
        setNotification(message);
        setTimeout(() => setNotification(null), 3000);
    };

    const handleChange = useCallback((e: ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
        const { id, value } = e.target;
        
        if (id === 'plannerCategory') {
            const categoryKey = value as keyof typeof PLANNER_PROPS;
            const firstProp = PLANNER_PROPS[categoryKey]?.[0]?.value || 'none';
            setFormData(prev => ({ 
                ...prev, 
                plannerCategory: value,
                plannerPropCombination: firstProp 
            }));
        } else {
            setFormData(prev => ({ ...prev, [id]: value }));
        }
    }, []);
    
    const generatePrompts = (count: number) => {
        if (count === 1) {
            const newPrompt = buildPrompt(formData);
            setPrompts([newPrompt]);
            return;
        }

        const newPrompts = Array.from({ length: count }, () => {
             const tempForm = { ...formData };
             // simple variation for multiple prompts
             const highlights = WORD_BANK.hairHighlights ?? [];
             if(Math.random() > 0.5 && highlights.length > 0){
                tempForm.hairHighlights = highlights[Math.floor(Math.random() * highlights.length)];
             }
             return buildPrompt(tempForm);
        });
        setPrompts(newPrompts);
    };
    
    const handleRandomize = () => {
        setFormData(getRandomizedForm());
        showNotification('Smart randomized prompt generated! ✨');
    };
    
    const handleClearOutfit = () => {
       setFormData(prev => ({
            ...prev,
            outfitCategory: initialFormData.outfitCategory,
            outfitStyle: initialFormData.outfitStyle,
            topDescription: initialFormData.topDescription,
            bottomDescription: initialFormData.bottomDescription,
            indianOutfit: initialFormData.indianOutfit,
            layeredOuterwear: initialFormData.layeredOuterwear,
            layeredTop: initialFormData.layeredTop,
            layeredScarf: initialFormData.layeredScarf,
            layeredHat: initialFormData.layeredHat,
            layeredGloves: initialFormData.layeredGloves,
            gownStyle: initialFormData.gownStyle,
            themedCostume: initialFormData.themedCostume,
            summerOutfit: initialFormData.summerOutfit,
            christmasOutfit: initialFormData.christmasOutfit,
            valentinesOutfit: initialFormData.valentinesOutfit,
            plannerCategory: initialFormData.plannerCategory,
            plannerPropCombination: initialFormData.plannerPropCombination,
            sceneDescription: initialFormData.sceneDescription,
            lightingDescription: initialFormData.lightingDescription,
            extraDescription: '',
            eyeType: 'none',
       }));
       showNotification('Outfit & Scene cleared.');
    };

    const clearPrompts = () => {
        setPrompts([]);
        showNotification('Prompts cleared! 🧹');
    };

    const toOptions = (key: keyof FormData): Option[] => {
      const values = WORD_BANK[key] || [];
      return values.map(v => ({ value: v, label: v.charAt(0).toUpperCase() + v.slice(1).replace(/_/g, ' ') }));
    };

    return (
        <div className="max-w-7xl mx-auto p-4 sm:p-6">
            <Header />
            <Notification message={notification} />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <main className="lg:col-span-2 space-y-4">
                    <Section title="🎨 Basic Information">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                            <SelectInput label="Skin Tone" id="skinTone" value={formData.skinTone} onChange={handleChange} options={toOptions('skinTone')} />
                            <SelectInput label="Ethnicity" id="ethnicity" value={formData.ethnicity} onChange={handleChange} options={toOptions('ethnicity')} />
                            <SelectInput label="Age" id="age" value={formData.age} onChange={handleChange} options={toOptions('age')} />
                        </div>
                    </Section>

                    <Section title="💄 Facial Features">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                            <SelectInput label="Lip Color" id="lipColor" value={formData.lipColor} onChange={handleChange} options={toOptions('lipColor')} />
                            <SelectInput label="Eye Color" id="eyeColor" value={formData.eyeColor} onChange={handleChange} options={toOptions('eyeColor')} />
                            <SelectInput label="Eyeliner Style" id="eyelinerStyle" value={formData.eyelinerStyle} onChange={handleChange} options={toOptions('eyelinerStyle')} />
                            <SelectInput label="Eyeshadow Colors" id="eyeshadowColors" value={formData.eyeshadowColors} onChange={handleChange} options={toOptions('eyeshadowColors')} />
                        </div>
                    </Section>

                    <Section title="💅 Nails">
                        <div className="grid grid-cols-1">
                            <SelectInput label="Nail Style" id="nailStyle" value={formData.nailStyle} onChange={handleChange} options={toOptions('nailStyle')} />
                        </div>
                    </Section>
                    
                    <Section title="👓 Eyewear">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                            <SelectInput label="Eye Type" id="eyeType" value={formData.eyeType} onChange={handleChange} options={toOptions('eyeType')} />
                            <SelectInput label="Frame Shape" id="frameShape" value={formData.frameShape} onChange={handleChange} options={toOptions('frameShape')} disabled={formData.eyeType === 'none'} />
                            <SelectInput label="Frame Color" id="frameColor" value={formData.frameColor} onChange={handleChange} options={toOptions('frameColor')} disabled={formData.eyeType === 'none'} />
                        </div>
                    </Section>

                    <Section title="💇‍♀️ Hair">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                            <SelectInput label="Hair Color" id="hairColor" value={formData.hairColor} onChange={handleChange} options={toOptions('hairColor')} />
                            <SelectInput label="Hair Style" id="hairDescription" value={formData.hairDescription} onChange={handleChange} options={toOptions('hairDescription')} />
                            <SelectInput label="Hair Highlights" id="hairHighlights" value={formData.hairHighlights} onChange={handleChange} options={toOptions('hairHighlights')} />
                        </div>
                    </Section>

                    <Section title="👗 Outfit">
                        <SelectInput label="Outfit Category" id="outfitCategory" value={formData.outfitCategory} onChange={handleChange} options={toOptions('outfitCategory')} />
                        
                        {formData.outfitCategory === 'Detailed Outfit' && (
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-3">
                               <SelectInput label="Outfit Style" id="outfitStyle" value={formData.outfitStyle} onChange={handleChange} options={toOptions('outfitStyle')} />
                               <SelectInput label="Top Description" id="topDescription" value={formData.topDescription} onChange={handleChange} options={toOptions('topDescription')} />
                               <SelectInput label="Bottom Description" id="bottomDescription" value={formData.bottomDescription} onChange={handleChange} options={toOptions('bottomDescription')} />
                            </div>
                        )}

                        {formData.outfitCategory === 'Indian Outfit' && (
                            <div className="grid grid-cols-1 mt-3">
                                <SelectInput label="Indian Outfit" id="indianOutfit" value={formData.indianOutfit} onChange={handleChange} options={toOptions('indianOutfit')} />
                            </div>
                        )}

                        {formData.outfitCategory === 'Formal Gown' && (
                            <div className="grid grid-cols-1 mt-3">
                                <SelectInput label="Gown Style" id="gownStyle" value={formData.gownStyle} onChange={handleChange} options={toOptions('gownStyle')} />
                            </div>
                        )}

                        {formData.outfitCategory === 'Themed Costume' && (
                            <div className="grid grid-cols-1 mt-3">
                                <SelectInput label="Costume Theme" id="themedCostume" value={formData.themedCostume} onChange={handleChange} options={toOptions('themedCostume')} />
                            </div>
                        )}
                        
                        {['Winter Wear', 'Autumn Wear'].includes(formData.outfitCategory) && (
                            <div className="mt-3">
                                <h3 className="text-sm font-medium text-gray-700 mb-2">Layered Wear</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                                    <SelectInput label="Outerwear" id="layeredOuterwear" value={formData.layeredOuterwear} onChange={handleChange} options={toOptions('layeredOuterwear')} />
                                    <SelectInput label="Top / Sweater" id="layeredTop" value={formData.layeredTop} onChange={handleChange} options={toOptions('layeredTop')} />
                                    <SelectInput label="Scarf" id="layeredScarf" value={formData.layeredScarf} onChange={handleChange} options={toOptions('layeredScarf')} />
                                    <SelectInput label="Hat" id="layeredHat" value={formData.layeredHat} onChange={handleChange} options={toOptions('layeredHat')} />
                                    <SelectInput label="Gloves" id="layeredGloves" value={formData.layeredGloves} onChange={handleChange} options={toOptions('layeredGloves')} />
                                </div>
                            </div>
                        )}

                        {formData.outfitCategory === 'Summer Outfit' && (
                            <div className="grid grid-cols-1 mt-3">
                                <SelectInput label="Summer Outfit" id="summerOutfit" value={formData.summerOutfit} onChange={handleChange} options={toOptions('summerOutfit')} />
                            </div>
                        )}

                        {formData.outfitCategory === 'Christmas Outfit' && (
                            <div className="grid grid-cols-1 mt-3">
                                <SelectInput label="Christmas Outfit" id="christmasOutfit" value={formData.christmasOutfit} onChange={handleChange} options={toOptions('christmasOutfit')} />
                            </div>
                        )}

                        {formData.outfitCategory === 'Valentines Outfit' && (
                            <div className="grid grid-cols-1 mt-3">
                                <SelectInput label="Valentines Outfit" id="valentinesOutfit" value={formData.valentinesOutfit} onChange={handleChange} options={toOptions('valentinesOutfit')} />
                            </div>
                        )}
                        
                        {formData.outfitCategory === 'Planner Outfit' && (
                             <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
                                <SelectInput label="Planner Category" id="plannerCategory" value={formData.plannerCategory} onChange={handleChange} options={toOptions('plannerCategory')} />
                                <SelectInput label="Props in Hands" id="plannerPropCombination" value={formData.plannerPropCombination} onChange={handleChange} options={plannerPropOptions} />
                             </div>
                        )}

                         <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
                           <SelectInput label="Headwear" id="headwear" value={formData.headwear} onChange={handleChange} options={toOptions('headwear')} />
                        </div>
                         <div className="mt-3">
                             <TextInput label="Extra Description" id="extraDescription" value={formData.extraDescription} onChange={handleChange} placeholder="e.g. glittery accessories, magical aura..." />
                         </div>
                    </Section>
                    
                    <Section title="🎨 Style & Rendering">
                        <div className="grid grid-cols-1">
                            <SelectInput label="Art Style" id="style" value={formData.style} onChange={handleChange} options={toOptions('style')} />
                        </div>
                    </Section>

                    <Section title="🎬 Scene & Theme">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                           <SelectInput label="Scene Description" id="sceneDescription" value={formData.sceneDescription} onChange={handleChange} options={toOptions('sceneDescription')} disabled={formData.outfitCategory !== 'Detailed Outfit'} />
                           <SelectInput label="Lighting Description" id="lightingDescription" value={formData.lightingDescription} onChange={handleChange} options={toOptions('lightingDescription')} />
                        </div>
                         {formData.outfitCategory !== 'Detailed Outfit' && (
                            <p className="text-xs text-gray-500 mt-2">Scene is automatically set by the selected Outfit Category.</p>
                        )}
                    </Section>
                    
                     <Section title="🚀 Generation Controls">
                        <div className="flex gap-3 flex-wrap">
                            <button onClick={handleRandomize} className="px-4 py-2 rounded bg-pink-600 text-white hover:bg-pink-700 transition-colors">🎲 Generate Random</button>
                             <button onClick={handleClearOutfit} className="px-4 py-2 rounded bg-gray-500 text-white hover:bg-gray-600 transition-colors">🧹 Clear Outfit & Scene</button>
                            <button onClick={() => generatePrompts(1)} className="px-4 py-2 rounded border bg-white hover:bg-gray-50 transition-colors">Generate Prompt</button>
                            <button onClick={() => generatePrompts(4)} className="px-4 py-2 rounded border bg-white hover:bg-gray-50 transition-colors">Generate 4 Variations</button>
                        </div>
                    </Section>

                </main>
                <aside className="bg-white/80 backdrop-blur-sm p-5 rounded-lg shadow-lg">
                   <OutputDisplay prompts={prompts} onClear={clearPrompts} showNotification={showNotification}/>
                </aside>
            </div>
            
             <footer className="mt-10 text-center text-sm text-gray-500">
                Designed with 💖 by <span className="font-semibold text-pink-600">House of Star Designs</span>
            </footer>
        </div>
    );
};

export default App;