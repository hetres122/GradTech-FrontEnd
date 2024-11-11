export interface ReservationTable {
  reservationId: number;
  unitId: number;
  userId: number;
  startDate: Date;
  endDate: Date;
  make: string;
  model: string;
  totalCost: number;
}
