import { FormData } from '../types';
import { PLANNER_THEMES, PLANNER_COLOR_PALETTES } from '../constants';

const formatListWithAnd = (list: string[]): string => {
    if (!list || list.length === 0) {
        return '';
    }
    if (list.length === 1) {
        return list[0];
    }
    if (list.length === 2) {
        return `${list[0]} and ${list[1]}`;
    }
    const last = list[list.length - 1];
    const rest = list.slice(0, list.length - 1);
    return `${rest.join(', ')}, and ${last}`;
};

const getPropsText = (propCombination: string): string => {
    const propsMap: { [key: string]: string } = {
        // Self-Care & Wellness
        'candle_tea_mug': 'She is cozily holding a warm mug of tea in her hands.',
        'face_mask_blanket': 'She is comfortably wrapped in a cozy blanket while holding a jar of face mask.',
        'skincare_headband': 'Wearing a soft spa headband, she presents a chic bottle of skincare serum.',
        'yoga_mat_water_bottle': 'She holds a rolled-up yoga mat under one arm and a water bottle in her hand.',
        'journal_diffuser': 'She is standing while holding her beautiful journal open, ready to write.',
        'bath_bomb_towel': 'She holds a colorful bath bomb in one hand and a soft, folded towel in the other.',
        'crystal_palo_santo': 'She is holding a glowing healing crystal and a stick of palo santo.',
        'sleep_mask_herbal_tea': 'She holds a luxurious sleep mask and a warm cup of herbal tea.',
        'smoothie_wellness_book': 'She is holding a vibrant, healthy smoothie and a book about wellness.',

        // Mental Health, Gratitude & Faith
        'bible_prayer_journal': 'She holds her bible and a prayer journal close to her heart.',
        'gratitude_jar_pen': 'She holds a gratitude jar in one hand and a pen in the other, ready to add a note.',
        'cross_necklace_coffee': 'She is holding a warm coffee cup, wearing a delicate cross necklace.',
        'affirmation_cards_candle': 'She is looking at a set of affirmation cards she is holding.',
        'book_highlighter': 'She holds an inspiring book open with a highlighter in hand.',
        'feather_journal': 'She holds a single, beautiful feather as if it were a pen, poised over an open journal.',
        'rosary_beads_prayer_book': 'She holds a set of rosary beads which are draped over a small prayer book.',
        'coloring_book_pencils': 'She holds a mindfulness coloring book and a handful of colored pencils.',
        'succulent_quote_card': 'She is holding a small potted succulent and a card with a positive quote.',

        // Fitness, Health & Meal
        'dumbbell_smoothie': 'She holds a dumbbell in one hand and a healthy smoothie in the other.',
        'meal_prep_container_list': 'She proudly holds a freshly made meal prep container and her grocery list.',
        'measuring_tape_water_bottle': 'She holds a water bottle and a measuring tape, tracking her progress.',
        'recipe_book_spoon': 'She holds a recipe book open with a wooden spoon.',
        'salad_bowl_tracker': 'She holds a fresh salad bowl and her nutrition tracker notebook.',
        'jump_rope_stopwatch': 'She has a jump rope looped over her shoulder and holds a stopwatch.',
        'apple_fitness_tracker': 'She holds a crisp apple while checking her fitness tracker watch on her other wrist.',
        'protein_shake_gloves': 'She is holding a protein shake bottle, wearing stylish workout gloves.',
        'chef_knife_cutting_board': 'She expertly holds a chef\'s knife in one hand and a cutting board with freshly chopped vegetables in the other.',

        // Beauty, Fashion & Lifestyle
        'makeup_brush_perfume': 'She delicately holds a makeup brush in one hand and a beautiful bottle of perfume in the other.',
        'compact_mirror_lipstick': 'She is touching up her makeup, holding a compact mirror and a tube of lipstick.',
        'sunglasses_shopping_bag': 'She holds a stylish shopping bag on her arm, holding a pair of sunglasses.',
        'nail_polish_planner': 'She stands holding a bottle of nail polish in one hand and her planner notebook in the other.',
        'hairdryer_phone': 'She holds a hairdryer in one hand and her phone in the other.',
        'measuring_tape_sketchbook': 'She has a clothing measuring tape draped around her neck and is holding a fashion sketchbook.',
        'high_heel_handbag': 'She is holding a single, elegant high heel shoe in one hand and a designer handbag in the other.',
        'eyeshadow_palette_brushes': 'She holds an open eyeshadow palette and a set of makeup brushes.',
        'silk_scarf_earrings': 'She is elegantly holding a beautiful silk scarf, drawing attention to her sparkling earrings.',

        // Business, Productivity & Goals
        'laptop_planner': 'She holds a slim laptop and her planner notebook together.',
        'clipboard_pencil': 'She holds a clipboard and a pencil, ready to take notes.',
        'coffee_cup_smartphone': 'She holds a warm coffee cup and her smartphone.',
        'todo_list_pen': 'She holds a to-do list and a pen, checking off a task.',
        'calendar_sticky_notes': 'She is holding her calendar and some colorful sticky notes.',
        'business_cards_pen': 'She is holding a stack of her professional business cards and an elegant pen.',
        'tablet_charts_stylus': 'She holds a tablet displaying business charts and a stylus.',
        'motivational_book_highlighter': 'She is holding a motivational book with a highlighter, marking an important passage.',
        'headset_open_laptop': 'She wears a professional headset and holds a sleek, open laptop.',

        // Social Media, Content & Marketing
        'phone_ring_light': 'She is holding her phone, which is mounted on a small ring light.',
        'tablet_stylus': 'She is standing, holding a tablet and drawing on it with a stylus pen.',
        'microphone_camera': 'She holds a vlogging camera with a microphone attached.',
        'laptop_coffee_mug': 'She stands, holding a laptop under one arm and a coffee mug in her hand.',
        'social_icon_card_binder': 'She holds her planner binder and a social media icon card.',
        'podcast_mic_headphones': 'She holds a professional podcasting microphone, wearing headphones.',
        'drone_controller_phone': 'She holds a drone controller, looking at the video feed on her phone.',
        'polaroids_content_calendar': 'She holds a content calendar in one hand and a fan of polaroid photos in the other.',
        'storyboard_markers': 'She is holding a storyboard and a handful of colorful markers.',

        // Budget, Finance & Business Goals
        'calculator_dollar_bills': 'She holds a calculator and a fan of dollar bills.',
        'piggy_bank_notepad': 'She holds her piggy bank and a notepad for budgeting.',
        'wallet_receipt': 'She is holding her wallet and checking a receipt.',
        'credit_card_laptop': 'She is standing, holding a laptop in one arm and a credit card in her other hand.',
        'money_bag_tracker': 'She holds a small money bag and her goal tracker board.',
        'savings_jar_pen': 'She is dropping a coin into a glass jar labeled "Savings" and a pen.',
        'checkbook_fountain_pen': 'She is holding a checkbook and a fancy fountain pen.',
        'gold_coins_ledger': 'She holds a stack of gold coins and an old-fashioned ledger book.',
        'stock_chart_tablet_coffee': 'She is analyzing a stock market chart on a tablet while holding a cup of coffee.',

        // Study, Academic & Homeschool
        'stack_of_books_pencil': 'She holds a stack of books and a pencil.',
        'grad_cap_clipboard': 'Wearing a graduation cap, she holds a clipboard.',
        'notebook_highlighter': 'She holds an open notebook and a highlighter.',
        'coffee_mug_textbook': 'She is standing while holding an open textbook and a coffee mug.',
        'backpack_ruler': 'She is holding her backpack and a ruler.',
        'globe_compass': 'She is holding a small globe in one hand and a compass in the other.',
        'protractor_calculator': 'She holds a protractor and a graphing calculator, ready for math class.',
        'science_flask_goggles': 'She wears safety goggles and carefully holds a science flask with colored liquid.',
        'artist_palette_paintbrush': 'She holds an artist\'s palette and a paintbrush, with a dab of paint on her cheek.',

        // Home, Cleaning & Family
        'cleaning_spray_checklist': 'She holds a cleaning spray bottle and a checklist board.',
        'grocery_bag_notepad': 'She holds a grocery bag and a notepad with her list.',
        'plant_pot_planner': 'She holds a small potted plant and her planner.',
        'calendar_pen': 'She holds her calendar and a pen to mark a date.',
        'baby_bottle_diaper_bag': 'She holds a baby bottle and her diaper bag.',
        'folded_towels_laundry_basket': 'She is holding a stack of neatly folded towels over a laundry basket.',
        'feather_duster_gloves': 'She wears cute rubber gloves and holds a fluffy feather duster.',
        'crayons_child_drawing': 'She proudly holds up a child\'s colorful drawing and a box of crayons.',
        'measuring_cups_recipe_card': 'She is holding a set of measuring cups and a recipe card.',

        // Event, Holiday & Wedding
        'wrapped_gift_clipboard': 'She holds a beautifully wrapped gift and a checklist clipboard.',
        'bouquet_calendar': 'She holds a bouquet of flowers and a calendar.',
        'ring_box_planner': 'She holds an open wedding ring box and her planner.',
        'christmas_ornament_mug': 'She holds a festive mug and a shiny Christmas ornament.',
        'party_balloon_notepad': 'She holds a party balloon and a notepad.',
        'invitations_calligraphy_pen': 'She is writing on a stack of elegant invitations with a calligraphy pen.',
        'wedding_cake_fork': 'She holds a plate with a delicious slice of wedding cake and a fork.',
        'champagne_flutes': 'She is holding a bottle of champagne and two elegant champagne flutes.',
        'party_popper_hat': 'She is wearing a festive party hat and holding a party popper.',

        // Travel & Vacation
        'suitcase_passport': 'She holds her passport and the handle of a small suitcase.',
        'ticket_map': 'She holds an airplane ticket and a map.',
        'sunglasses_camera': 'She holds a camera and a pair of sunglasses.',
        'travel_mug_journal': 'She holds a travel mug and her travel journal.',
        'phone_globe': 'She holds her phone and a mini globe.',
        'compass_vintage_map': 'She holds a vintage compass over an old, unfolded map.',
        'seashell_sunscreen': 'She holds up a beautiful seashell and a bottle of sunscreen.',
        'binoculars_guide': 'She has binoculars hanging from her neck and is holding a travel guide book.',
        'sun_hat_tropical_drink': 'She is holding a tropical drink with a little umbrella, wearing a large sun hat.',
    };
    return propsMap[propCombination] || '';
};

const getPlannerBackgroundText = (category: string): string => {
    const backgroundMap: { [key: string]: string } = {
        'PRODUCTIVITY & ORGANIZATION': 'a modern, minimalist backdrop with subtle geometric patterns and a professional color palette',
        'READING & STUDY': 'a cozy, minimalist backdrop resembling a library or study nook, with soft, warm lighting',
        'BUSINESS & CONTENT CREATION': 'a bright, modern backdrop with minimalist social media icons and a vibrant, eye-catching color scheme',
        'SELF-CARE, HEALTH & WELLNESS': 'a serene, uncluttered studio backdrop with soft, calming colors and subtle yoga-themed patterns',
        'SPIRITUAL & MANIFESTATION': 'a peaceful, soft-focus backdrop with delicate botanical or celestial line art and warm, gentle colors',
        'LIFE & FAMILY': 'a cozy, minimalist backdrop with simple line art of home decor items and a warm color scheme',
        'TRAVEL & LIFESTYLE': 'an abstract map-themed backdrop with soft pastel colors and whimsical travel icons',
        'MONEY & BUSINESS TRACKING': 'a clean, abstract background with minimalist charts and subtle gold accents',
        'FAITH & MINDFULNESS': 'a peaceful, soft-focus backdrop with delicate botanical line art and warm, gentle colors'
    };
    return backgroundMap[category] || 'a simple, uncluttered backdrop with soft colors';
};

export const buildPrompt = (form: FormData): string => {
    const headwearText = form.headwear !== 'none' ? ` with ${form.headwear}` : '';
    const hairAccessoryText = form.hairAccessory && form.hairAccessory !== 'none' ? `, adorned with ${form.hairAccessory}` : '';
    const extra = form.extraDescription ? `, ${form.extraDescription}` : '';
    const colorPrefix = form.outfitColor && form.outfitColor !== 'none' ? `${form.outfitColor} ` : '';
    const frecklesText = form.freckles && form.freckles !== 'none' ? ` with a cute sprinkle of ${form.freckles} across her nose` : '';
    const jewelryText = form.jewelry && form.jewelry !== 'none' ? ` and wears ${form.jewelry}` : '';

    let outfitText = '';
    let propsText = '';
    let nailText = '';
    
    if (form.nailStyle && form.nailStyle !== 'none') {
        nailText = `Her hands are beautifully manicured with ${form.nailStyle}.`;
    }
    
    // Automatic scene and lighting for themed outfits
    const sceneMap: {[key: string]: { scene: string, lighting: string }} = {
        'Winter Wear': { scene: 'a mystical enchanted forest backdrop', lighting: 'ethereal moonlight' },
        'Chic Winter Outfit': { scene: 'a chic, modern interior with minimalist furniture', lighting: 'soft, ambient lighting' },
        'Autumn Wear': { scene: 'a mystical enchanted forest backdrop', lighting: 'golden hour warmth' },
        'Chic Autumn Outfit': { scene: 'a stylish, minimalist city street with autumn leaves', lighting: 'golden hour warmth' },
        'Chic Street Style': { scene: 'a bustling winter city street with bokeh lights', lighting: 'golden hour warmth'},
        'Summer Outfit': { scene: 'a sparkly dance floor backdrop', lighting: 'golden hour warmth' },
        'Valentines Outfit': { scene: 'a soft-focus romantic garden backdrop', lighting: 'soft rainbow glow' },
        'Themed Costume': { scene: 'a mystical enchanted forest backdrop', lighting: 'an ethereal glow' },
        'Formal Gown': { scene: 'a sparkly dance floor backdrop', lighting: 'dramatic spotlight' },
        'Indian Outfit': { scene: 'an ornate, soft-focus palace interior backdrop', lighting: 'golden hour warmth' },
    };

    let finalBackground = form.sceneDescription;
    let finalLighting = form.lightingDescription;

    if (sceneMap[form.outfitCategory]) {
        finalBackground = sceneMap[form.outfitCategory].scene;
        finalLighting = sceneMap[form.outfitCategory].lighting;
    }


    switch (form.outfitCategory) {
        case 'Winter Wear':
        case 'Autumn Wear':
            const layeredItems = [
                form.layeredOuterwear,
                form.layeredTop,
                form.layeredScarf,
                form.layeredHat,
                form.layeredGloves
            ].filter(item => item && item !== 'none');

            if (layeredItems.length > 0) {
                const clothingList = formatListWithAnd(layeredItems.map(item => item.replace(' (Autumn)', '')));
                outfitText = `She wears a cozy layered ${form.outfitCategory === 'Autumn Wear' ? 'autumn' : 'winter'} outfit consisting of ${clothingList}${jewelryText}${extra}.`;
            } else {
                outfitText = `She wears a cozy ${form.outfitCategory === 'Autumn Wear' ? 'autumn' : 'winter'} outfit${jewelryText}${extra}.`;
            }
            break;

        case 'Chic Autumn Outfit':
            outfitText = `She wears a modern, chic autumn ensemble in warm, earthy tones. Her top is a cozy, chunky knit turtleneck sweater in light beige, paired with high-waisted, form-fitting faux leather pants in a rich caramel brown with a distinctive tie-front belt. She wears a chunky gold chain necklace over the turtleneck${jewelryText}${extra}.`;
            propsText = 'She holds a pale blush clutch bag with a large, gold accent.';
            break;

        case 'Chic Winter Outfit':
            outfitText = `She wears a contemporary, high-contrast winter ensemble. Her base layer is a sleek, form-fitting solid black bodysuit. The main focus is an oversized, cropped black faux leather jacket with thick white shearling trim, a dramatic lapel, and wide cuffs, worn stylishly off the shoulders${jewelryText}${extra}.`;
            propsText = 'She carries a black leather shoulder bag with a distinctive curved saddle shape.';
            break;

        case 'Chic Street Style':
            if (form.chicStreetStyle === 'plaid_coat_turtleneck') {
                outfitText = `She wears a chic street style outfit, featuring a cozy white chunky knit turtleneck sweater layered under a stylish pink and beige plaid coat. She wears a classic beret${jewelryText}${extra}.`;
                propsText = 'She is holding a festive coffee cup with whipped cream and a candy cane.';
                finalBackground = 'a bustling winter city street with bokeh lights';
            } else { // camel_coat_trousers
                outfitText = `She wears a sophisticated street style outfit, featuring a cream ribbed turtleneck sweater and smart blue-gray trousers, layered under a classic camel overcoat${jewelryText}${extra}.`;
                propsText = 'She is holding a warm cup of coffee.';
                finalBackground = 'a stylish European city street in winter';
            }
            break;
            
        case 'Summer Outfit':
             outfitText = `She wears a stylish ${colorPrefix}${form.summerOutfit}${jewelryText}${extra}.`;
             break;
        case 'Christmas Outfit':
             switch(form.christmasOutfit) {
                case 'cozy Christmas pajama set':
                    outfitText = `She wears a cute and festive two-piece Christmas pajama set with a long-sleeved crop top and matching skirt, decorated with gingerbread men and snowflakes${jewelryText}${extra}.`;
                    propsText = 'She is holding a plate of delicious chocolate chip cookies and a glass of milk.';
                    finalBackground = 'a cozy indoor Christmas scene with a fireplace';
                    finalLighting = 'a soft festive glow';
                    break;
                case 'stylish Christmas sweater':
                    outfitText = `She wears a stylish blue Christmas sweater with reindeer and snowflake patterns, featuring a cozy white faux fur collar and cuffs${jewelryText}${extra}.`;
                    propsText = 'She is holding a beautifully wrapped festive gift box with a large bow.';
                     finalBackground = 'a snowy outdoor scene with festive string lights';
                    finalLighting = 'a soft festive glow';
                    break;
                case 'winter puffer jacket and skirt':
                    outfitText = `She wears a stylish winter outfit, including a light blue puffer jacket with a fur-trimmed hood, a pink ribbed turtleneck sweater, and a shiny pink pleated skirt${jewelryText}${extra}.`;
                    propsText = 'She holds a small, beautifully wrapped gift box.';
                    finalBackground = 'a winter city street at dusk with bokeh lights';
                    finalLighting = 'ethereal moonlight';
                    break;
                case 'Elegant Winter Gown':
                    outfitText = `She wears an elegant winter gown in a soft, shimmering fabric with a plush faux fur collar and cuffs, accented with a large, sparkling bow at the neck. She wears matching elegant gloves${jewelryText}${extra}.`;
                    propsText = 'She is holding a plate with a small, delicate pastry topped with berries.';
                    finalBackground = 'an elegant, snowy courtyard with warm lights';
                    finalLighting = 'soft rainbow glow';
                    break;
                default:
                    outfitText = `She wears a festive ${colorPrefix}${form.christmasOutfit}${jewelryText}${extra}.`;
                    finalBackground = 'a festive, yet simple backdrop with artistic snowflakes, stars, or other seasonal patterns in soft-focus';
                    finalLighting = 'a soft festive glow';
             }
             break;
        case 'Valentines Outfit':
             outfitText = `She wears a beautiful ${colorPrefix}${form.valentinesOutfit}${jewelryText}${extra}.`;
             break;
        
        case 'Planner Outfit':
            const category = form.plannerCategory as keyof typeof PLANNER_THEMES;
            const plannerDetails = PLANNER_THEMES[category]?.find(p => p.value === form.plannerType);
            
            if (plannerDetails) {
                outfitText = `She wears ${plannerDetails.outfit}${jewelryText}${extra}. Her overall aesthetic is ${plannerDetails.aesthetic}.`;
                propsText = getPropsText(plannerDetails.prop);
            } else {
                // Fallback
                outfitText = `She wears a stylish and professional outfit suitable for planning${jewelryText}${extra}.`;
                if (form.plannerPropCombination) {
                    propsText = `${getPropsText(form.plannerPropCombination)}`;
                }
            }

            let backgroundText = getPlannerBackgroundText(form.plannerCategory);
            
            const paletteKey = form.plannerPalette.toLowerCase();
            const colors = PLANNER_COLOR_PALETTES[category]?.[paletteKey];
            if (colors && colors.length > 0) {
                const colorNames = colors.map(c => c.split(' #')[0]);
                const colorString = formatListWithAnd(colorNames);
                backgroundText += `. The color palette features ${colorString}.`;
            }
            
            finalBackground = backgroundText;
            break;

        case 'Formal Gown':
            if (form.gownStyle && form.gownStyle !== 'none') {
                outfitText = `She wears a stunning ${colorPrefix}${form.gownStyle}${jewelryText}${extra}.`;
            }
            break;

        case 'Indian Outfit':
            outfitText = `She wears a beautiful ${form.indianOutfit}${jewelryText}${extra}.`;
            break;

        case 'Themed Costume':
            if (form.themedCostume === 'Ice Princess Gown') {
                outfitText = `She wears a magnificent ice princess ballgown in shades of periwinkle and silver, featuring a structured bustier, fur-trimmed shoulders, and long sleeves adorned with sparkling ice crystals. She wears a prominent matching crystal necklace and earrings${extra}.`;
                propsText = 'She holds her hands together, showcasing elegant matching gloves with crystal details.';
                finalBackground = 'a grand ice palace ballroom';
                finalLighting = 'shimmering crystal light';
            } else if (form.themedCostume && form.themedCostume !== 'none') {
                 const costumeName = form.themedCostume.replace(' (Halloween)', '');
                outfitText = `She is dressed in a beautiful ${costumeName} costume${jewelryText}${extra}.`;
            }
            break;

        case 'Detailed Outfit':
        default:
             if (form.outfitStyle === 'Christmas matching pajamas') {
                outfitText = `She wears a cute set of ${colorPrefix}Christmas matching pajamas${jewelryText}${extra}.`;
            } else {
                const top = form.topDescription === 'none' ? 'a stylish top' : form.topDescription;
                const bottom = form.bottomDescription === 'none' ? 'fashionable bottoms' : form.bottomDescription;
                outfitText = `She wears a ${colorPrefix}${top} and ${bottom}${jewelryText}${extra}.`;
            }
            break;
    }
    
    const artStyle = form.style === 'semi-realistic airbrushed' ? 'Visual development art' : form.style;
    
    let eyewearText = '';
    if (form.eyeType !== 'none') {
      const shape = form.frameShape === 'rimless' ? 'rimless' : `${form.frameColor} ${form.frameShape}`;
      eyewearText = `, wearing stylish ${shape} ${form.eyeType}`;
    }

    const parts = [
        `Hips-up portrait, stunning digital painting and charming character design of a ${form.age}-year-old beautiful woman of ${form.ethnicity} ethnicity, featuring captivating, beautifully expressive ${form.eyeColor === 'none' ? 'dark brown' : form.eyeColor} eyes, full ${form.lipColor === 'none' ? 'glossy berry-pink' : form.lipColor} lips, and soft, radiant ${form.skinTone} skin${frecklesText} with subtle highlights${eyewearText}.`,
        `Her ${form.hairColor} hair is styled in ${form.hairDescription}${hairAccessoryText}${headwearText}.`,
    ];

    if (outfitText) {
        parts.push(outfitText);
    }
    
    if (nailText) {
        parts.push(nailText);
    }

    if (propsText) {
        parts.push(propsText);
    } else {
        parts.push('She has her hands gently clasped in front of her.');
    }

    const sceneParts = [];
    if (finalBackground && finalBackground !== 'none') {
        sceneParts.push(`Background: ${finalBackground}.`);
    }

    if (finalLighting && finalLighting !== 'none') {
        sceneParts.push(`The scene is illuminated with ${finalLighting}.`);
    }
    
    if (sceneParts.length > 0) {
        parts.push(sceneParts.join(' '));
    }
    
    parts.push(`Art Style: ${artStyle}, children's animated movie aesthetic, hips-up portrait, directly facing the viewer, intricate details, luminous, character design, highly detailed illustration, vibrant colors, soft glow, charming expression.`);

    return parts.join(' ').replace(/\. \./g, '.').replace(/\s\s+/g, ' ').trim();
};