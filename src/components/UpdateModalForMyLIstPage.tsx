
"use client";

import { useState, type FormEvent, type CSSProperties } from "react";
import { redirect, useRouter } from "next/navigation";
import { Pencil } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { IBooking } from "@/type/MyBooking";

const CATEGORIES = [
  "Photo Studio",
  "Film Stage",
  "Podcast Lounge",
  "Music Suite",
  "Workshop",
  "Other",
];

const AMENITIES = [
  "Wi-Fi",
  "Air conditioning",
  "Parking",
  "Restroom",
  "Green screen",
  "Lighting kit",
  "Sound proofing",
  "Microphones",
];

const THEME = "rgb(155,42,229)";

interface Props {
  listing: IBooking;
}

export default function UpdateModalForMyLIstPage({
  listing,
}: Props) {
  

  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState(listing.category);
  const [amenities, setAmenities] = useState<string[]>(
    listing.amenities || []
  );
  const onSubmit =async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

const formDataObject = Object.fromEntries(formData.entries());

const data = {
  ...formDataObject,
  hourlyRate: Number(formDataObject.hourlyRate),
  securityDeposit: Number(formDataObject.securityDeposit),
  maxCapacity: Number(formDataObject.maxCapacity),
  category,
  amenities,
};

const res = await fetch(
  `http://localhost:8000/studios/${listing._id}`,
  {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }
);
const result = await res.json()
console.log(result);
toast.success('Update Succesfully')
redirect('/my-list')
   
  };


  // Toggle Amenities
  const toggleAmenity = (name: string, checked: boolean) => {
    setAmenities((prev) =>
      checked
        ? [...prev, name]
        : prev.filter((a) => a !== name)
    );
  };

  // Update Studio
 
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {/* Trigger */}
      <DialogTrigger
        render={
          <Button
            type="button"
            variant="outline"
            title="Update Studio"
            className="h-9 w-9 border-0 cursor-pointer bg-purple-500/10 p-0 text-purple-500 transition hover:bg-purple-600 hover:text-white"
          >
            <Pencil size={16} />
          </Button>
        }
      />

      <DialogContent
        className="max-h-[90vh] overflow-y-auto sm:max-w-2xl"
      >
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            Update Studio Listing
          </DialogTitle>

          <DialogDescription>
            Update your studio information and save your changes.
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={onSubmit}
          style={
            {
              "--primary": THEME,
              "--primary-foreground": "#ffffff",
              "--ring": THEME,
            } as CSSProperties
          }
          className="space-y-6"
        >
          {/* Header */}
          <div className="rounded-xl bg-black px-5 py-5">
            <h2 className="text-xl font-semibold text-white">
              Edit your studio
            </h2>

            <div className="mt-3 h-1 w-14 rounded-full bg-purple-500" />
          </div>

          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor={`title-${listing._id}`}>
              Title
            </Label>

            <Input
              id={`title-${listing._id}`}
              name="title"
              required
              defaultValue={listing.title}
              placeholder="Enter studio name"
            />
          </div>

          {/* Category */}
          <div className="space-y-2">
            <Label>Category</Label>

            <Select
              value={category}
              onValueChange={(v) => setCategory(v ?? "")}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Choose a category" />
              </SelectTrigger>

              <SelectContent>
                {CATEGORIES.map((c) => (
                  <SelectItem key={c} value={c}>
                    {c}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Rate, Deposit and Capacity */}
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor={`rate-${listing._id}`}>
                Hourly Rate ($)
              </Label>

              <Input
                id={`rate-${listing._id}`}
                name="hourlyRate"
                type="number"
                min={1}
                step="0.01"
                required
                defaultValue={listing.hourlyRate}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor={`deposit-${listing._id}`}>
                Security Deposit ($)
              </Label>

              <Input
                id={`deposit-${listing._id}`}
                name="securityDeposit"
                type="number"
                min={0}
                step="0.01"
                required
                defaultValue={listing.securityDeposit}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor={`capacity-${listing._id}`}>
                Max Capacity
              </Label>

              <Input
                id={`capacity-${listing._id}`}
                name="maxCapacity"
                type="number"
                min={1}
                required
                defaultValue={listing.maxCapacity}
              />
            </div>
          </div>

          {/* Location */}
          <div className="space-y-2">
            <Label htmlFor={`location-${listing._id}`}>
              Location / Address
            </Label>

            <Input
              id={`location-${listing._id}`}
              name="location"
              required
              defaultValue={listing.location}
            />
          </div>

          {/* Image URL */}
          <div className="space-y-2">
            <Label htmlFor={`image-${listing._id}`}>
              Image URL
            </Label>

            <Input
              id={`image-${listing._id}`}
              name="imageUrl"
              type="url"
              required
              defaultValue={listing.imageUrl}
            />
          </div>

          {/* Amenities */}
          <div className="space-y-3">
            <Label>Amenities</Label>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {AMENITIES.map((a) => {
                const checked = amenities.includes(a);

                const id = `amenity-${listing._id}-${a
                  .toLowerCase()
                  .replace(/[^a-z0-9]+/g, "-")}`;

                return (
                  <label
                    key={a}
                    htmlFor={id}
                    className={`flex cursor-pointer items-center gap-2 rounded-lg border px-3 py-2.5 text-sm transition-colors ${
                      checked
                        ? "border-purple-500 bg-purple-500/10"
                        : "border-border hover:border-purple-500/50"
                    }`}
                  >
                    <Checkbox
                      id={id}
                      checked={checked}
                      onCheckedChange={(v) =>
                        toggleAmenity(a, v === true)
                      }
                    />

                    {a}
                  </label>
                );
              })}
            </div>
          </div>

          {/* Overview */}
          <div className="space-y-2">
            <Label htmlFor={`overview-${listing._id}`}>
              Detailed Overview
            </Label>

            <Textarea
              id={`overview-${listing._id}`}
              name="overview"
              required
              rows={5}
              defaultValue={listing.overview}
              placeholder="Describe your studio, facilities and equipment..."
            />
          </div>

          {/* Footer */}
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              
            >
              Cancel
            </Button>

            <Button
              type="submit"
            
              className="bg-purple-600 text-white hover:bg-purple-700"
            >Update
            
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
