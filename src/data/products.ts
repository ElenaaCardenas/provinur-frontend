export type Product = {
  id: number;
  slug: string;
  name: string;
  brand: string;
  category: string;
  description: string;
  image: string;
  images: string[];
  available: boolean;
  features: string[];
  technicalSheet?: string;
  createdAt: string;
};

export const products: Product[] = [
  {
    id: 1,
    slug: "controlador-siemens-sinamics-g120",
    name: "Controlador Siemens SINAMICS G120",
    brand: "Siemens",
    category: "Automatización",
    description:
      "El controlador Siemens SINAMICS G120 ofrece una solución flexible y eficiente para el control de motores en aplicaciones industriales. Su diseño modular facilita la instalación, configuración y mantenimiento del equipo.",
    image:
      "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=900&q=80",
    images: [
      "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1581092160607-ee22731d8b40?auto=format&fit=crop&w=1200&q=85",
    ],
    available: true,
    features: [
      "Control de velocidad para motores industriales",
      "Diseño modular",
      "Alta eficiencia energética",
      "Configuración flexible",
      "Integración con sistemas de automatización",
    ],
    technicalSheet: "/documents/ficha-sinamics-g120.pdf",
    createdAt: "2026-07-20",
  },
  {
    id: 2,
    slug: "termometro-digital-fluke",
    name: "Termómetro Digital",
    brand: "Fluke",
    category: "Metrología",
    description:
      "Instrumento digital para la medición precisa de temperatura en aplicaciones industriales, mantenimiento y control de procesos.",
    image:
      "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&w=900&q=80",
    images: [
      "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&w=1200&q=85",
    ],
    available: true,
    features: [
      "Lectura digital",
      "Medición precisa",
      "Uso industrial",
      "Diseño portátil",
    ],
    technicalSheet: "/documents/ficha-termometro-fluke.pdf",
    createdAt: "2026-07-18",
  },
  {
    id: 3,
    slug: "guantes-industriales-3m",
    name: "Guantes Industriales",
    brand: "3M",
    category: "Seguridad",
    description:
      "Guantes de protección diseñados para actividades industriales, manejo de herramientas y trabajos que requieren seguridad para las manos.",
    image:
      "https://images.unsplash.com/photo-1586864387967-d02ef85d93e8?auto=format&fit=crop&w=900&q=80",
    images: [
      "https://images.unsplash.com/photo-1586864387967-d02ef85d93e8?auto=format&fit=crop&w=1200&q=85",
    ],
    available: false,
    features: [
      "Protección para manos",
      "Uso industrial",
      "Material resistente",
      "Diseño ergonómico",
    ],
    createdAt: "2026-07-10",
  },
];