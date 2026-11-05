import { IStudio } from "./StudioType";

export type BookingStatus =
  | "Pending"
  | "Confirmed"
  | "Completed"
  | "Cancelled";

export interface IBooking {
  _id: string;

  data: {
    date: string;
    startTime: string;
    endTime: string;
  };

  title: IStudio["title"];
  category: IStudio["category"];
  hourlyRate: IStudio["hourlyRate"];
  securityDeposit: IStudio["securityDeposit"];
  maxCapacity: IStudio["maxCapacity"];
  location: IStudio["location"];
  imageUrl: IStudio["imageUrl"];
  amenities: IStudio["amenities"];
  overview: IStudio["overview"];

  userName: string;
  email: string;

  status: BookingStatus;
}