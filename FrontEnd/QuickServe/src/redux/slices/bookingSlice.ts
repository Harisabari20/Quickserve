import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface BookingItem {
  id: string;
  serviceName: string;
  servicePrice: number;
  date: string;
  time: string;
  address: string;
  notes?: string;
  status: 'Confirmed' | 'Pending' | 'Completed' | 'Cancelled';
}

interface BookingState {
  bookings: BookingItem[];
  currentBooking: BookingItem | null;
  loading: boolean;
}

const initialState: BookingState = {
  bookings: [
    {
      id: 'b1',
      serviceName: 'AC Service',
      servicePrice: 1299,
      date: '2026-09-18',
      time: '10:00 AM',
      address: '12 Green Park Lane',
      notes: 'Please check the indoor unit',
      status: 'Confirmed',
    },
    {
      id: 'b2',
      serviceName: 'Home Cleaning',
      servicePrice: 899,
      date: '2026-09-20',
      time: '2:30 PM',
      address: '9 Lake View Apartments',
      status: 'Pending',
    },
  ],
  currentBooking: {
    id: 'b1',
    serviceName: 'AC Service',
    servicePrice: 1299,
    date: '2026-09-18',
    time: '10:00 AM',
    address: '12 Green Park Lane',
    notes: 'Please check the indoor unit',
    status: 'Confirmed',
  },
  loading: false,
};

const bookingSlice = createSlice({
  name: 'booking',
  initialState,
  reducers: {
    setBookings: (state, action: PayloadAction<BookingItem[]>) => {
      state.bookings = action.payload;
    },
    addBooking: (state, action: PayloadAction<BookingItem>) => {
      state.bookings = [action.payload, ...state.bookings];
      state.currentBooking = action.payload;
    },
    setCurrentBooking: (state, action: PayloadAction<BookingItem | null>) => {
      state.currentBooking = action.payload;
    },
    setBookingLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const { setBookings, addBooking, setCurrentBooking, setBookingLoading } = bookingSlice.actions;
export default bookingSlice.reducer;
