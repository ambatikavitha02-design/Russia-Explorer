export type CityId = 'moscow' | 'saint-petersburg' | 'sochi' | 'kazan' | 'murmansk' | 'vladivostok';

export interface CityInfo {
  id: CityId;
  name: string;
  russianName: string;
  tagline: string;
  image: string;
  description: string;
  majorAttractions: string[];
  estimatedDailyBudgetInr: number;
  recommendedDuration: string;
  bestTimeToVisit: string;
  climateHighlights: string;
}

export interface TouristAttraction {
  id: string;
  name: string;
  city: string;
  cityId: CityId;
  image: string;
  description: string;
  location: string;
  recommendedVisitingTime: string;
  estimatedEntryPriceInr: number;
  highlights: string[];
  category: 'Palace' | 'Historical' | 'Museum' | 'Nature' | 'Cultural' | 'Architecture';
}

export type HotelCategory = 'Budget' | '3-Star' | '4-Star' | '5-Star';

export interface Hotel {
  id: string;
  name: string;
  city: string;
  cityId: CityId;
  category: HotelCategory;
  starRating: number;
  guestRating: number;
  reviewCount: number;
  location: string;
  distanceToCenter: string;
  roomType: string;
  breakfastIncluded: boolean;
  facilities: string[];
  pricePerNightInr: number;
  image: string;
  taxesAndFeesInr: number;
}

export interface FlightOption {
  id: string;
  airline: string;
  airlineCode: string;
  flightNumber: string;
  fromCity: string;
  fromAirport: string;
  toCity: string;
  toAirport: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  stops: number;
  stopDetails: string;
  baggage: string;
  cabinClass: 'Economy' | 'Premium Economy' | 'Business';
  roundTripPriceInr: number;
  taxesInr: number;
}

export interface CabOption {
  id: string;
  serviceType: 'Airport Pickup' | 'Airport Drop' | 'Intercity Transfer' | 'Private Cab' | 'Shared Cab' | 'Sightseeing Vehicle' | 'Chauffeur Service';
  vehicleName: string;
  vehicleCategory: 'Sedan' | 'Business Class' | 'Luxury SUV' | 'Minivan (Sprinter)';
  capacity: number;
  luggageCapacity: number;
  priceInr: number;
  driverRating: number;
  driverLanguages: string[];
  image: string;
  perDayPrice?: boolean;
}

export interface TourPackage {
  id: string;
  name: string;
  subtitle: string;
  tier: 'Budget' | 'Classic' | 'Premium' | 'Speciality';
  days: number;
  nights: number;
  cities: string[];
  hotelCategory: string;
  flightIncluded: boolean;
  cabIncluded: boolean;
  sightseeingIncluded: boolean;
  mealsIncluded: string;
  pricePerPersonInr: number;
  totalEstimatedPriceInr: number; // for 2 pax standard base
  image: string;
  highlights: string[];
  itinerarySummary: { day: number; title: string; desc: string }[];
  featured?: boolean;
}

export interface TravelerCredentials {
  fullName: string;
  passportNumber: string;
  dateOfBirth: string;
  nationality: string;
  contactNumber: string;
  email: string;
  specialRequests?: string;
  emergencyContactName?: string;
  emergencyContactPhone?: string;
}

export interface CustomItineraryDay {
  id: string;
  dayNumber: number;
  city: string;
  title: string;
  date: string;
  attractionIds: string[];
  hotelId?: string;
  cabId?: string;
  notes: string;
  estimatedCostInr: number;
}

export interface BookingRecord {
  id: string;
  bookingDate: string;
  travelDate: string;
  returnDate: string;
  packageId?: string;
  packageTitle: string;
  travelersCount: number;
  travelers: TravelerCredentials[];
  departureCity: string;
  destinationCity: string;
  flight?: FlightOption;
  hotel?: Hotel;
  cab?: CabOption;
  selectedAttractions: TouristAttraction[];
  totalBasePriceInr: number;
  taxesAndServiceInr: number;
  grandTotalInr: number;
  amountPaidInr: number;
  status: 'Confirmed' | 'Processing' | 'Voucher Issued';
  paymentMethod: string;
}

export interface ContactEnquiry {
  id: string;
  date: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  departureCity: string;
  travellers: number;
  status: 'New' | 'Contacted' | 'Closed';
}
