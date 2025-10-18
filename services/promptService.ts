
import { FormData } from '../types';

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
        'savings_jar_pen': 'She is dropping a coin into a glass jar labeled "Savings" and holding a pen.',
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
        'Self-Care & Wellness': 'a serene, uncluttered studio backdrop with soft, calming colors and subtle yoga-themed patterns',
        'Mental Health, Gratitude & Faith': 'a peaceful, soft-focus backdrop with delicate botanical line art and warm, gentle colors',
        'Fitness, Health & Meal': 'a bright, energetic backdrop with minimalist gym-themed graphics and bold colors',
        'Beauty, Fashion & Lifestyle': 'a chic, soft-focus backdrop with abstract cosmetic swirls and a glamorous feel',
        'Business, Productivity & Goals': 'a modern, minimalist backdrop with subtle geometric patterns and a professional color palette',
        'Social Media, Content & Marketing': 'a bright, modern backdrop with minimalist social media icons and a vibrant, eye-catching color scheme',
        'Budget, Finance & Business Goals': 'a clean, abstract background with minimalist charts and subtle gold accents',
        'Study, Academic & Homeschool': 'a clean, organized backdrop with faint grid patterns and soft, muted colors',
        'Home, Cleaning & Family': 'a cozy, minimalist backdrop with simple line art of home decor items and a warm color scheme',
        'Event, Holiday & Wedding': 'an elegant, soft-focus backdrop with floral patterns and delicate lace textures',
        'Travel & Vacation': 'an abstract map-themed backdrop with soft pastel colors and whimsical travel icons'
    };
    return backgroundMap[category] || 'a simple, uncluttered backdrop with soft colors';
};

export const buildPrompt = (form: FormData): string => {
    const headwearText = form.headwear !== 'none' ? ` with ${form.headwear}` : '';
    const extra = form.extraDescription ? `, ${form.extraDescription}` : '';

    let outfitText = '';
    let propsText = '';
    let nailText = '';
    
    if (form.nailStyle && form.nailStyle !== 'none') {
        nailText = `Her hands are beautifully manicured with ${form.nailStyle}.`;
    }
    
    // Automatic scene and lighting for themed outfits
    const sceneMap: {[key: string]: { scene: string, lighting: string }} = {
        'Winter Wear': { scene: 'a mystical enchanted forest backdrop', lighting: 'ethereal moonlight' },
        'Autumn Wear': { scene: 'a mystical enchanted forest backdrop', lighting: 'golden hour warmth' },
        'Summer Outfit': { scene: 'a sparkly dance floor backdrop', lighting: 'golden hour warmth' },
        'Christmas Outfit': { scene: 'a festive, yet simple backdrop with artistic snowflakes, stars, or other seasonal patterns in soft-focus', lighting: 'a soft festive glow' },
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
                outfitText = `She wears a cozy layered ${form.outfitCategory === 'Autumn Wear' ? 'autumn' : 'winter'} outfit consisting of ${clothingList}${extra}.`;
            } else {
                outfitText = `She wears a cozy ${form.outfitCategory === 'Autumn Wear' ? 'autumn' : 'winter'} outfit${extra}.`;
            }
            break;

        case 'Summer Outfit':
             outfitText = `She wears a stylish ${form.summerOutfit}${extra}.`;
             break;
        case 'Christmas Outfit':
             outfitText = `She wears a festive ${form.christmasOutfit}${extra}.`;
             break;
        case 'Valentines Outfit':
             outfitText = `She wears a beautiful ${form.valentinesOutfit}${extra}.`;
             break;
        
        case 'Planner Outfit':
            outfitText = `She wears a stylish and professional outfit suitable for planning${extra}.`;
            if (form.plannerPropCombination) {
                propsText = `${getPropsText(form.plannerPropCombination)}`;
            }
            finalBackground = getPlannerBackgroundText(form.plannerCategory);
            break;

        case 'Formal Gown':
            if (form.gownStyle && form.gownStyle !== 'none') {
                outfitText = `She wears a stunning ${form.gownStyle}${extra}.`;
            }
            break;

        case 'Indian Outfit':
            outfitText = `She wears a beautiful ${form.indianOutfit}${extra}.`;
            break;

        case 'Themed Costume':
            if (form.themedCostume && form.themedCostume !== 'none') {
                 const costumeName = form.themedCostume.replace(' (Halloween)', '');
                outfitText = `She is dressed in a beautiful ${costumeName} costume${extra}.`;
            }
            break;

        case 'Detailed Outfit':
        default:
             if (form.outfitStyle === 'Christmas matching pajamas') {
                outfitText = `She wears a cute set of Christmas matching pajamas${extra}.`;
            } else {
                const top = form.topDescription === 'none' ? 'a stylish top' : form.topDescription;
                const bottom = form.bottomDescription === 'none' ? 'fashionable bottoms' : form.bottomDescription;
                outfitText = `She wears ${top} and ${bottom}${extra}.`;
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
        `Stunning digital painting and charming character design of a ${form.age}-year-old beautiful woman of ${form.ethnicity} ethnicity, standing, featuring captivating, beautifully expressive ${form.eyeColor === 'none' ? 'dark brown' : form.eyeColor} eyes, full ${form.lipColor === 'none' ? 'glossy berry-pink' : form.lipColor} lips, and soft, radiant ${form.skinTone} skin with subtle highlights${eyewearText}.`,
        `Her ${form.hairColor} hair is styled in ${form.hairDescription}${headwearText}.`,
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
    
    parts.push(`Art Style: ${artStyle}, children's animated movie aesthetic, centered portrait from the hips up, standing pose, looking at viewer, intricate details, luminous, character design, highly detailed illustration, vibrant colors, soft glow, charming expression.`);

    return parts.join(' ').replace(/\. \./g, '.').replace(/\s\s+/g, ' ').trim();
};
