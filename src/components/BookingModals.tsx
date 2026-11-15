
"use client";

import { CalendarCheck } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { IStudio } from "@/type/StudioType";
import { authClient } from "@/lib/auth-client";
import { usePathname, useRouter } from "next/navigation";
import { getTokenFromClient } from "@/lib/getTokenFromClient";

interface BookingModalsProps {
  studio: IStudio;
}

const BookingModals = ({ studio }: BookingModalsProps) => {
  const router = useRouter();
  const pathname = usePathname();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    try {
      // Get logged-in user session
      const { data: session, error } = await authClient.getSession();

      if (error || !session?.user) {
        toast.error("Please login first");
        router.push(`/login?callbackUrl=${encodeURIComponent(pathname)}`);
        return;
      }

      // Validate booking time
      if (data.startTime >= data.endTime) {
        toast.error("End time must be after start time");
        return;
      }

      // Separate studio ID
      const { _id, ...studioData } = studio;

      if (!_id) {
        toast.error("Studio ID not found");
        return;
      }

      const user = session.user;

      // Prepare booking data
      const bookingData = {
        data,
        studioId: _id,
        ...studioData,
        userName: user.name,
        email: user.email,
        status: "Pending",
      };

      console.log("Booking Data:", bookingData);

      // Get JWT token
      const token = await getTokenFromClient();

      if (!token) {
        toast.error("Authentication token not found. Please login again.");
        return;
      }

      // Send booking request
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/mybooking`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(bookingData),
        }
      );

      const result = await res.json();

      console.log("Booking Response:", result);

      // Handle backend errors
      if (!res.ok) {
        toast.error(result.error || result.message || "Booking failed");
        return;
      }

      // Success
      toast.success("Booking submitted successfully!");
      form.reset();
      router.refresh();

    } catch (error) {
      console.error("Booking Error:", error);
      toast.error(
        error instanceof Error ? error.message : "Failed to submit booking"
      );
    }
  };

  return (
    <Dialog>
      <DialogTrigger
        render={
          <button
            type="button"
            className="mt-8 flex w-full items-center justify-center gap-2 rounded-lg bg-[#9b2ae5] px-5 py-3.5 font-semibold text-white transition hover:bg-[#8120c5]"
          >
            Book Workspace Now
            <CalendarCheck size={18} />
          </button>
        }
      />

      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Reserve Creative Slot</DialogTitle>
          <DialogDescription className="text-[#a947e9]">
            {studio.title}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={onSubmit}>
          <FieldGroup>
            <Field>
              <Label htmlFor="date">Shoot Date</Label>
              <Input
                id="date"
                name="date"
                type="date"
                min={new Date().toLocaleDateString("en-CA")}
                required
              />
            </Field>

            <Field>
              <Label htmlFor="startTime">Start Time</Label>
              <Input
                id="startTime"
                name="startTime"
                type="time"
                required
              />
            </Field>

            <Field>
              <Label htmlFor="endTime">End Time</Label>
              <Input
                id="endTime"
                name="endTime"
                type="time"
                required
              />
            </Field>

            <DialogFooter>
              <DialogClose
                render={
                  <Button type="button" variant="outline">
                    Cancel
                  </Button>
                }
              />
              <Button type="submit">Booking</Button>
            </DialogFooter>
          </FieldGroup>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default BookingModals;
