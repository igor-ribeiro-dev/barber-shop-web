export interface Professional {
  id: string;
  name: string;
  avatar: string;
  specialties: string[];
  services: string[];
  bio: string;
  rating: number;
  availability: {
    start: string;
    end: string;
    daysOff: number[];
  };
}