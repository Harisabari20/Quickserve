export interface ServiceItem {
  id: string;
  name: string;
  icon: string;
  price: number;
  duration: string;
  category: string;
  description: string;
  features: string[];
  rating: number;
  eta: string;
}

export const serviceCatalog: ServiceItem[] = [
  {
    id: 'plumber',
    name: 'Plumber',
    icon: 'construct-outline',
    price: 699,
    duration: '45 mins',
    category: 'Home Repair',
    description: 'Certified plumbers for leak fixes, pipe repairs, bathroom fittings, and regular maintenance.',
    features: ['Leak repair', 'Pipe fitting', 'Bathroom plumbing', 'Emergency support'],
    rating: 4.8,
    eta: 'Within 45 mins',
  },
  {
    id: 'electrician',
    name: 'Electrician',
    icon: 'flash-outline',
    price: 799,
    duration: '60 mins',
    category: 'Electrical',
    description: 'Skilled electricians for repairs, wiring, fan installation, and power issue troubleshooting.',
    features: ['Wiring check', 'Fan installation', 'Short-circuit fix', 'Power backup'],
    rating: 4.9,
    eta: 'Within 1 hour',
  },
  {
    id: 'cleaning',
    name: 'Home Cleaning',
    icon: 'sparkles-outline',
    price: 899,
    duration: '90 mins',
    category: 'House Care',
    description: 'Deep cleaning and regular housekeeping to keep your home spotless and stress-free.',
    features: ['Kitchen deep clean', 'Bathroom sanitizing', 'Floor mopping', 'Window cleaning'],
    rating: 4.7,
    eta: 'Within 90 mins',
  },
  {
    id: 'carwash',
    name: 'Car Wash',
    icon: 'car-outline',
    price: 599,
    duration: '40 mins',
    category: 'Vehicle Care',
    description: 'Exterior and interior car cleaning with quality detailing for a fresh, polished finish.',
    features: ['Interior vacuum', 'Exterior wash', 'Dashboard polish', 'Wax finish'],
    rating: 4.6,
    eta: 'Within 40 mins',
  },
  {
    id: 'ac',
    name: 'AC Service',
    icon: 'snow-outline',
    price: 1299,
    duration: '75 mins',
    category: 'Appliance Care',
    description: 'Cooling system inspection, gas refill, filter cleaning, and general AC maintenance services.',
    features: ['AC cleaning', 'Gas top-up', 'Filter replacement', 'Performance check'],
    rating: 4.9,
    eta: 'Within 75 mins',
  },
  {
    id: 'pest',
    name: 'Pest Control',
    icon: 'shield-checkmark-outline',
    price: 1099,
    duration: '50 mins',
    category: 'Safety',
    description: 'Safe pest treatment for homes and offices with long-lasting protection and inspection.',
    features: ['Cockroach control', 'Termite check', 'Mosquito treatment', 'Home sanitization'],
    rating: 4.8,
    eta: 'Within 50 mins',
  },
];
