import { Product } from '@/types/products';

export interface ProductTranslations {
  name_es: string;
  name_en: string;
  description_es: string[];
  description_en: string[];
}

export const products: (Product & ProductTranslations)[] = [
  {
    id: '1',
    name: 'Aliados de Marca',
    name_es: 'Aliados de Marca',
    name_en: 'Brand Allies',
    slug: 'aliados-de-marca',
    price: 13562,
    description: [
      'Scouting y selección de 1-2 micro influencers',
      'Negociación básica y creación de 1 publicación + 1 historia cada uno',
      'Monitoreo de métricas básicas (alcance, engagement) + reporte básico'
    ],
    description_es: [
      'Scouting y selección de 1-2 micro influencers',
      'Negociación básica y creación de 1 publicación + 1 historia cada uno',
      'Monitoreo de métricas básicas (alcance, engagement) + reporte básico'
    ],
    description_en: [
      'Scouting and selection of 1-2 micro influencers',
      'Basic negotiation and creation of 1 post + 1 story each',
      'Basic metrics monitoring (reach, engagement) + basic report'
    ],
    image: '/images/products/aliados-de-marca.jpg',
    featured: true
  },
  {
    id: '2',
    name: 'Brújula Estratégica',
    name_es: 'Brújula Estratégica',
    name_en: 'Strategic Compass',
    slug: 'brujula-estrategica',
    price: 12792,
    description: [
      'Evaluación de estrategia de marketing digital actual.',
      'Análisis de táctica de marketing.',
      'Identificación de oportunidades de integración entre canales digitales y tradicionales.',
      'Informe detallado con diagnóstico, análisis competitivo y recomendaciones estratégicas.'
    ],
    description_es: [
      'Evaluación de estrategia de marketing digital actual.',
      'Análisis de táctica de marketing.',
      'Identificación de oportunidades de integración entre canales digitales y tradicionales.',
      'Informe detallado con diagnóstico, análisis competitivo y recomendaciones estratégicas.'
    ],
    description_en: [
      'Evaluation of current digital marketing strategy.',
      'Marketing tactics analysis.',
      'Identification of integration opportunities between digital and traditional channels.',
      'Detailed report with diagnosis, competitive analysis, and strategic recommendations.'
    ],
    image: '/images/products/brujula-estrategica.jpg'
  },
  {
    id: '3',
    name: 'Contenido que Impacta',
    name_es: 'Contenido que Impacta',
    name_en: 'Impactful Content',
    slug: 'contenido-que-impacta',
    price: 10254,
    description: [
      'Segmentación avanzada',
      'Análisis y segmentación de la base de contactos según: Comportamiento de compra, Interacción con correos anteriores, Datos demográficos y ubicación.',
      'Implementación de etiqueta y flujo personalizados según intereses.',
      'Inserción automática de nombre, preferencias y recomendaciones.',
      'Contenido dinámico según historial del cliente.',
      'Recomendaciones de productos o servicios según comportamiento.'
    ],
    description_es: [
      'Segmentación avanzada',
      'Análisis y segmentación de la base de contactos según: Comportamiento de compra, Interacción con correos anteriores, Datos demográficos y ubicación.',
      'Implementación de etiqueta y flujo personalizados según intereses.',
      'Inserción automática de nombre, preferencias y recomendaciones.',
      'Contenido dinámico según historial del cliente.',
      'Recomendaciones de productos o servicios según comportamiento.'
    ],
    description_en: [
      'Advanced segmentation',
      'Analysis and segmentation of contact base according to: Purchase behavior, Interaction with previous emails, Demographics and location.',
      'Implementation of personalized tags and flows according to interests.',
      'Automatic insertion of name, preferences, and recommendations.',
      'Dynamic content according to customer history.',
      'Product or service recommendations according to behavior.'
    ],
    image: '/images/products/contenido-que-impacta.jpg'
  },
  {
    id: '4',
    name: 'Esencia de Marca',
    name_es: 'Esencia de Marca',
    name_en: 'Brand Essence',
    slug: 'esencia-de-marca',
    price: 23458,
    description: [
      'Análisis de elementos visuales y percepción del público.',
      'Creación de 2 planes para fortalecer la identidad y coherencia de la marca.',
      'Revisión de métricas clave para evaluar la efectividad de las estrategias implementadas.',
      'Propuesta para optimizar la presencia y rendimiento de la marca.',
      'Aplicación de cambios necesarios para mejorar la percepción y posicionamiento de la marca.'
    ],
    description_es: [
      'Análisis de elementos visuales y percepción del público.',
      'Creación de 2 planes para fortalecer la identidad y coherencia de la marca.',
      'Revisión de métricas clave para evaluar la efectividad de las estrategias implementadas.',
      'Propuesta para optimizar la presencia y rendimiento de la marca.',
      'Aplicación de cambios necesarios para mejorar la percepción y posicionamiento de la marca.'
    ],
    description_en: [
      'Analysis of visual elements and public perception.',
      'Creation of 2 plans to strengthen brand identity and coherence.',
      'Review of key metrics to evaluate the effectiveness of implemented strategies.',
      'Proposal to optimize brand presence and performance.',
      'Application of necessary changes to improve brand perception and positioning.'
    ],
    image: '/images/products/esencia-de-marca.jpg',
    featured: true
  },
  {
    id: '5',
    name: 'Huella de Marca',
    name_es: 'Huella de Marca',
    name_en: 'Brand Footprint',
    slug: 'huella-de-marca',
    price: 9450,
    description: [
      'Diseño básico de logotipo',
      'Manual simple con logo, paleta de color, tipografía y reglas de uso básico.',
      'Tarjeta de presentación corporativa',
      'Hoja membretada'
    ],
    description_es: [
      'Diseño básico de logotipo',
      'Manual simple con logo, paleta de color, tipografía y reglas de uso básico.',
      'Tarjeta de presentación corporativa',
      'Hoja membretada'
    ],
    description_en: [
      'Basic logo design',
      'Simple manual with logo, color palette, typography, and basic usage rules.',
      'Corporate business card',
      'Letterhead'
    ],
    image: '/images/products/huella-de-marca.jpg'
  },
  {
    id: '6',
    name: 'Impacto Digital',
    name_es: 'Impacto Digital',
    name_en: 'Digital Impact',
    slug: 'impacto-digital',
    price: 5642,
    description: [
      'Campaña de publicidad para redes sociales básica. (Definición del objetivo de la campaña, Identificación del público meta, Selección de plataforma, Creación de una estructura sencilla de campaña con 2 anuncios)'
    ],
    description_es: [
      'Campaña de publicidad para redes sociales básica. (Definición del objetivo de la campaña, Identificación del público meta, Selección de plataforma, Creación de una estructura sencilla de campaña con 2 anuncios)'
    ],
    description_en: [
      'Basic social media advertising campaign. (Definition of campaign objective, Identification of target audience, Platform selection, Creation of a simple campaign structure with 2 ads)'
    ],
    image: '/images/products/impacto-digital.jpg'
  },
  {
    id: '7',
    name: 'Lupa Digital',
    name_es: 'Lupa Digital',
    name_en: 'Digital Magnifier',
    slug: 'lupa-digital',
    price: 6985,
    description: [
      'Evaluación de la identidad visual y coherencia de la marca.',
      'Análisis de la presencia en redes sociales y plataformas digitales.',
      'Informe detallado con hallazgos y recomendaciones estratégicas.'
    ],
    description_es: [
      'Evaluación de la identidad visual y coherencia de la marca.',
      'Análisis de la presencia en redes sociales y plataformas digitales.',
      'Informe detallado con hallazgos y recomendaciones estratégicas.'
    ],
    description_en: [
      'Evaluation of visual identity and brand coherence.',
      'Analysis of presence on social media and digital platforms.',
      'Detailed report with findings and strategic recommendations.'
    ],
    image: '/images/products/lupa-digital.jpg'
  },
  {
    id: '8',
    name: 'Mensajes que Venden',
    name_es: 'Mensajes que Venden',
    name_en: 'Messages that Sell',
    slug: 'mensajes-que-venden',
    price: 7639,
    description: [
      'Creación de 2 boletines (promocionales, informativos o de actualización).',
      'Diseño profesional adaptado a la identidad visual de tu marca.',
      'Plantilla responsive (se ven bien en móvil, tablet y escritorio).',
      'Optimización de asunto, imágenes y llamados a la acción (CTAs).'
    ],
    description_es: [
      'Creación de 2 boletines (promocionales, informativos o de actualización).',
      'Diseño profesional adaptado a la identidad visual de tu marca.',
      'Plantilla responsive (se ven bien en móvil, tablet y escritorio).',
      'Optimización de asunto, imágenes y llamados a la acción (CTAs).'
    ],
    description_en: [
      'Creation of 2 newsletters (promotional, informational, or update).',
      'Professional design adapted to your brand\'s visual identity.',
      'Responsive template (looks good on mobile, tablet, and desktop).',
      'Optimization of subject line, images, and calls to action (CTAs).'
    ],
    image: '/images/products/mensajes-que-venden.jpg'
  },
  {
    id: '9',
    name: 'Movimiento Creativo',
    name_es: 'Movimiento Creativo',
    name_en: 'Creative Movement',
    slug: 'movimiento-creativo',
    price: 4863,
    description: [
      'GIF animado para redes sociales',
      'Banner animado simple para web o redes'
    ],
    description_es: [
      'GIF animado para redes sociales',
      'Banner animado simple para web o redes'
    ],
    description_en: [
      'Animated GIF for social media',
      'Simple animated banner for web or social media'
    ],
    image: '/images/products/movimiento-creativo.jpg'
  },
  {
    id: '10',
    name: 'Narrativa Conectiva',
    name_es: 'Narrativa Conectiva',
    name_en: 'Connective Narrative',
    slug: 'narrativa-conectiva',
    price: 18467,
    description: [
      'Evaluación de la coherencia y efectividad de los mensajes de la marca.',
      'Creación de narrativa que conecte emocionalmente con la audiencia.',
      'Aplicación de la narrativa en redes sociales, presentaciones y comunicaciones internas.',
      'Medición de la efectividad de las historias contadas y ajustes necesarios.'
    ],
    description_es: [
      'Evaluación de la coherencia y efectividad de los mensajes de la marca.',
      'Creación de narrativa que conecte emocionalmente con la audiencia.',
      'Aplicación de la narrativa en redes sociales, presentaciones y comunicaciones internas.',
      'Medición de la efectividad de las historias contadas y ajustes necesarios.'
    ],
    description_en: [
      'Evaluation of coherence and effectiveness of brand messages.',
      'Creation of narrative that emotionally connects with the audience.',
      'Application of narrative in social media, presentations, and internal communications.',
      'Measurement of story effectiveness and necessary adjustments.'
    ],
    image: '/images/products/narrativa-conectiva.jpg'
  },
  {
    id: '11',
    name: 'Pluma y Pixel',
    name_es: 'Pluma y Pixel',
    name_en: 'Pen and Pixel',
    slug: 'pluma-y-pixel',
    price: 1652,
    description: [
      'Creación de hasta 3 imágenes o banners adaptados a la identidad visual de la marca.'
    ],
    description_es: [
      'Creación de hasta 3 imágenes o banners adaptados a la identidad visual de la marca.'
    ],
    description_en: [
      'Creation of up to 3 images or banners adapted to the brand\'s visual identity.'
    ],
    image: '/images/products/pluma-y-pixel.jpg',
    featured: true
  },
  {
    id: '12',
    name: 'Redes Vibrantes',
    name_es: 'Redes Vibrantes',
    name_en: 'Vibrant Networks',
    slug: 'redes-vibrantes',
    price: 4723,
    description: [
      'Elaboración de 5 textos persuasivos para publicaciones en redes sociales, blogs o newsletters.',
      'Planificación y agendamiento de contenido en 2 plataformas como Facebook, Instagram o LinkedIn.'
    ],
    description_es: [
      'Elaboración de 5 textos persuasivos para publicaciones en redes sociales, blogs o newsletters.',
      'Planificación y agendamiento de contenido en 2 plataformas como Facebook, Instagram o LinkedIn.'
    ],
    description_en: [
      'Creation of 5 persuasive texts for social media posts, blogs, or newsletters.',
      'Content planning and scheduling on 2 platforms such as Facebook, Instagram, or LinkedIn.'
    ],
    image: '/images/products/redes-vibrantes.jpg'
  },
  {
    id: '13',
    name: 'Tu Proyecto, Tu Fórmula',
    name_es: 'Tu Proyecto, Tu Fórmula',
    name_en: 'Your Project, Your Formula',
    slug: 'producto-de-prueba',
    price: 0,
    description: [
      'Porque entendemos que no todos los negocios son iguales, te ofrecemos la posibilidad de crear tu propia combinación de servicios.',
      'Contáctanos y diseñaremos una cotización personalizada según tus metas y recursos.'
    ],
    description_es: [
      'Porque entendemos que no todos los negocios son iguales, te ofrecemos la posibilidad de crear tu propia combinación de servicios.',
      'Contáctanos y diseñaremos una cotización personalizada según tus metas y recursos.'
    ],
    description_en: [
      'Because we understand that not all businesses are the same, we offer you the possibility to create your own combination of services.',
      'Contact us and we will design a personalized quote according to your goals and resources.'
    ],
    image: '/images/products/producto-de-prueba.jpg',
    custom: true
  }
];

export const getProductBySlug = (slug: string): (Product & ProductTranslations) | undefined => {
  return products.find((product) => product.slug === slug);
};

export const getProductById = (id: string): (Product & ProductTranslations) | undefined => {
  return products.find((product) => product.id === id);
};

export const getRelatedProducts = (slug: string, count: number = 4): (Product & ProductTranslations)[] => {
  const current = getProductBySlug(slug);
  if (!current) return [];
  
  const others = products.filter((product) => product.slug !== slug);
  return others.slice(0, count);
};

export const getLocalizedProduct = (product: Product & ProductTranslations, locale: string) => {
  return {
    ...product,
    name: locale === 'es' ? product.name_es : product.name_en,
    description: locale === 'es' ? product.description_es : product.description_en
  };
};