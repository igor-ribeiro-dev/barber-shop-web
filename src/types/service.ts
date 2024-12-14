export interface Service {
  id: string;
  name: string;
  description: string;
  duration: number;
  price: number;
  category: 'hair' | 'beard' | 'combo' | 'treatment';
  image: string;
}