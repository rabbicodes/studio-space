
"use client";

import { useState } from "react";

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
import { authClient } from "@/lib/auth-client";
import { redirect } from "next/navigation";
import { getTokenFromClient } from "@/lib/getTokenFromClient";


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

export default function StudioForm() {
      const {data:session,error} = authClient.useSession()
  

  const [category, setCategory] = useState("");
  const [amenities, setAmenities] = useState<string[]>([]);
  

  const toggleAmenity = (name: string, checked: boolean) => {
    setAmenities((prev) =>
      checked
        ? [...prev, name]
        : prev.filter((a) => a !== name)
    );
  };

  const onSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

;
    const user = session?.user
    if(error){
      console.log('user is not valid'); 
    }

    if (!category) {
      toast.error("Please select a category!");
      return;
    }

    const form = e.currentTarget;
    const formData = new FormData(form);

    const datas = {
      title: formData.get("title"),
      category,
      hourlyRate: Number(formData.get("hourlyRate")),
      securityDeposit: Number(formData.get("securityDeposit")),
      maxCapacity: Number(formData.get("maxCapacity")),
      location: formData.get("location"),
      imageUrl: formData.get("imageUrl"),
      amenities,
      overview: formData.get("overview"),
      email:user?.email,
      username:user?.name,
     
    };

    
const token = await getTokenFromClient()

      const res = await fetch("http://localhost:8000/studio", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization:`Bearer ${token}`
        },
        body: JSON.stringify(datas),
      });

      const result = await res.json();

      if (!res.ok) {
        toast.error(result.message || "Failed to add studio!");
        return;
      }

      toast.success("Studio added successfully!");

      form.reset();
      setCategory("");
      setAmenities([]);

      console.log("Studio Data:", result);
      redirect('/my-list')

    
  };

 

  return (
    <form
      onSubmit={onSubmit}
      style={
        {
          "--primary": THEME,
          "--primary-foreground": "#ffffff",
          "--ring": THEME,
        } as React.CSSProperties
      }
      className="mx-auto w-full max-w-2xl space-y-6 overflow-hidden rounded-2xl border border-primary/30 p-6 sm:p-8"
    >
      {/* Header */}
      <div className="-mx-6 -mt-6 mb-2 bg-black px-6 py-6 sm:-mx-8 sm:-mt-8 sm:px-8">
        <h1 className="text-2xl font-semibold text-white">
          List your studio
        </h1>
        <div className="mt-3 h-1 w-14 rounded-full bg-primary" />
      </div>

      {/* Title */}
      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          name="title"
          required
          placeholder="Daylight photo studio with cyclorama wall"
        />
      </div>

      {/* Category */}
      <div className="space-y-2">
        <Label htmlFor="category">Category</Label>

        <Select
          value={category}
          onValueChange={(v) => setCategory(v ?? "")}
        >
          <SelectTrigger id="category" className="w-full">
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
          <Label htmlFor="hourlyRate">Hourly rate ($)</Label>
          <Input
            id="hourlyRate"
            name="hourlyRate"
            type="number"
            min={1}
            step="0.01"
            required
            placeholder="45"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="securityDeposit">
            Security deposit ($)
          </Label>
          <Input
            id="securityDeposit"
            name="securityDeposit"
            type="number"
            min={0}
            step="0.01"
            required
            placeholder="100"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="maxCapacity">Max capacity</Label>
          <Input
            id="maxCapacity"
            name="maxCapacity"
            type="number"
            min={1}
            required
            placeholder="12"
          />
        </div>
      </div>

      {/* Location */}
      <div className="space-y-2">
        <Label htmlFor="location">Location / address</Label>
        <Input
          id="location"
          name="location"
          required
          placeholder="House 12, Road 5, Sonadanga, Khulna"
        />
      </div>

      {/* Image URL */}
      <div className="space-y-2">
        <Label htmlFor="imageUrl">Image URL</Label>
        <Input
          id="imageUrl"
          name="imageUrl"
          type="url"
          required
          placeholder="https://example.com/studio.jpg"
        />
      </div>

      {/* Amenities */}
      <div className="space-y-3">
        <Label>Amenities</Label>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {AMENITIES.map((a) => {
            const checked = amenities.includes(a);

            const id = `amenity-${a
              .toLowerCase()
              .replace(/[^a-z0-9]+/g, "-")}`;

            return (
              <label
                key={a}
                htmlFor={id}
                className={`flex cursor-pointer items-center gap-2 rounded-lg border px-3 py-2.5 text-sm transition-colors ${
                  checked
                    ? "border-primary bg-primary/10"
                    : "border-border hover:border-primary/50"
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

      {/* Detailed Overview */}
      <div className="space-y-2">
        <Label htmlFor="overview">Detailed Overview</Label>
        <Textarea
          id="overview"
          name="overview"
          required
          rows={5}
          placeholder="Describe your studio, facilities and available equipment..."
        />
      </div>

      
    

      {/* Submit */}
      <Button
        type="submit"
       
        className="w-full"
      >
       Submit
      </Button>
    </form>
  );
}
