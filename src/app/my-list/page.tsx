import { IBooking } from "@/type/MyBooking";


const MyStudioListingPage = async () => {
    const res1 = await fetch("http://localhost:8000/mybooking", {
        cache: "no-store",
      });
    
      if (!res1.ok) {
        throw new Error("Failed to fetch bookings");
      }
    
      const myBookings: IBooking[] = await res1.json()
     const email= myBookings.map(mybooking=>mybooking.email)
    const res2 = await fetch(`http://localhost:8000/mybooking/${email}`)
    console.log(res2);
      
    return (
        <div>
           
        </div>
    );
};

export default MyStudioListingPage;