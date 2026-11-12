
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

      // Validate time

      // Separate studio ID
      const { _id, ...studioData } = studio;

      const user = session.user;

      // Prepare booking data
      const bookingData = {
        data,
        ...studioData,
        userName: user.name,
        email: user.email,
        status: "Pending",
      };

      console.log("Booking Data:", bookingData);
  const token = await getTokenFromClient();
      // Send booking request
      const res = await fetch("http://localhost:8000/mybooking", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization:`Bearer ${token}`
        },
        body: JSON.stringify(bookingData),
      });

      const result = await res.json();

      // Handle backend validation errors
      if (!res.ok) {
        toast.error(result.message || "Booking failed");
        return;
      }

      // Success
      console.log("Booking Result:", result);
      toast.success("Booking submitted successfully!");

      form.reset();
    } catch (error) {
      console.error("Booking Error:", error);
      toast.error("Failed to submit booking");
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
