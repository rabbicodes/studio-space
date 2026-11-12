
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import {
  Check,
  X,
  UserRound,
  Mail,
  LockKeyhole,
  Image as ImageIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";

import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";

const RegisterPage = () => {
  const router = useRouter();

  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const hasMinLength = password.length >= 8;
  const hasUppercase = /[A-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);

  const isPasswordValid =
    hasMinLength && hasUppercase && hasNumber;

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isPasswordValid) {
      toast.error("Please enter a valid password");
      return;
    }

    setIsLoading(true);

    try {
      const formData = new FormData(e.currentTarget);
      const data = Object.fromEntries(formData.entries());

      const { data: resData, error } =
        await authClient.signUp.email({
          email: data.email as string,
          password: data.password as string,
          name: data.name as string,
          image: data.image as string,
        });

      console.log(resData);

      if (error) {
        toast.error(error.message);
        return;
      }

      toast.success("Account created successfully!");
      router.push("/login");

    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-[calc(100dvh-80px)] items-center justify-center overflow-hidden px-4 py-8 sm:py-12">

      {/* Background Decoration */}
      <div className="pointer-events-none absolute -left-32 top-10 h-72 w-72 rounded-full bg-[#9b2ae5]/10 blur-[100px]" />
      <div className="pointer-events-none absolute -right-32 bottom-10 h-72 w-72 rounded-full bg-[#c77aff]/10 blur-[100px]" />

      <div className="relative w-full max-w-lg">

        <Card className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-xl shadow-purple-500/5 dark:border-white/10 dark:bg-[#17121d] dark:shadow-purple-950/20">

          {/* Top Gradient */}
          <div className="h-1.5 w-full bg-linear-to-r from-[#8120c4] via-[#9b2ae5] to-[#c77aff]" />

          <CardHeader className="space-y-3 px-5 pt-8 text-center sm:px-8">
            <div className="space-y-1.5">
              <CardTitle className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                Create Your Account
              </CardTitle>

              <CardDescription className="text-sm text-gray-500 dark:text-gray-400">
                Join us today and get started with your journey.
              </CardDescription>
            </div>
          </CardHeader>

          <CardContent className="px-5 pb-8 sm:px-8">

            <form onSubmit={onSubmit}>
              <FieldGroup className="gap-5">

                <FieldSeparator className="text-xs text-gray-400 *:data-[slot=field-separator-content]:bg-white dark:*:data-[slot=field-separator-content]:bg-[#17121d]">
                  REGISTER WITH YOUR INFORMATION
                </FieldSeparator>

                {/* Name */}
                <Field className="gap-2">
                  <FieldLabel
                    htmlFor="name"
                    className="font-medium text-gray-700 dark:text-gray-200"
                  >
                    Full Name
                  </FieldLabel>

                  <div className="relative">
                    <UserRound className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-gray-400" />

                    <Input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="Enter your full name"
                      required
                      className="h-12 rounded-xl border-gray-200 bg-gray-50 pl-10 text-gray-900 transition-all focus-visible:border-[#9b2ae5] focus-visible:ring-[#9b2ae5]/20 dark:border-white/10 dark:bg-white/5 dark:text-white dark:placeholder:text-gray-500"
                    />
                  </div>
                </Field>

                {/* Email */}
                <Field className="gap-2">
                  <FieldLabel
                    htmlFor="email"
                    className="font-medium text-gray-700 dark:text-gray-200"
                  >
                    Email Address
                  </FieldLabel>

                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-gray-400" />

                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="example@email.com"
                      required
                      className="h-12 rounded-xl border-gray-200 bg-gray-50 pl-10 text-gray-900 transition-all focus-visible:border-[#9b2ae5] focus-visible:ring-[#9b2ae5]/20 dark:border-white/10 dark:bg-white/5 dark:text-white dark:placeholder:text-gray-500"
                    />
                  </div>
                </Field>

                {/* Profile Image */}
                <Field className="gap-2">
                  <FieldLabel
                    htmlFor="image"
                    className="font-medium text-gray-700 dark:text-gray-200"
                  >
                    Profile Image URL
                  </FieldLabel>

                  <div className="relative">
                    <ImageIcon className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-gray-400" />

                    <Input
                      id="image"
                      name="image"
                      type="url"
                      placeholder="https://image.com/photo.jpg"
                      required
                      className="h-12 rounded-xl border-gray-200 bg-gray-50 pl-10 text-gray-900 transition-all focus-visible:border-[#9b2ae5] focus-visible:ring-[#9b2ae5]/20 dark:border-white/10 dark:bg-white/5 dark:text-white dark:placeholder:text-gray-500"
                    />
                  </div>
                </Field>

                {/* Password */}
                <Field className="gap-2">
                  <FieldLabel
                    htmlFor="password"
                    className="font-medium text-gray-700 dark:text-gray-200"
                  >
                    Password
                  </FieldLabel>

                  <div className="relative">
                    <LockKeyhole className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-gray-400" />

                    <Input
                      id="password"
                      name="password"
                      type="password"
                      placeholder="Create a strong password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="h-12 rounded-xl border-gray-200 bg-gray-50 pl-10 text-gray-900 transition-all focus-visible:border-[#9b2ae5] focus-visible:ring-[#9b2ae5]/20 dark:border-white/10 dark:bg-white/5 dark:text-white dark:placeholder:text-gray-500"
                    />
                  </div>

                  {/* Password Validation */}
                  <div className="mt-2 space-y-2 rounded-xl border border-gray-100 bg-gray-50/80 p-3 dark:border-white/5 dark:bg-white/3">

                    <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                      Password Requirements
                    </p>

                    <p className={`flex items-center gap-2 text-xs ${hasMinLength ? "text-green-600 dark:text-green-400" : "text-gray-500 dark:text-gray-400"}`}>
                      {hasMinLength ? <Check size={15} /> : <X size={15} />}
                      At least 8 characters
                    </p>

                    <p className={`flex items-center gap-2 text-xs ${hasUppercase ? "text-green-600 dark:text-green-400" : "text-gray-500 dark:text-gray-400"}`}>
                      {hasUppercase ? <Check size={15} /> : <X size={15} />}
                      At least one uppercase letter
                    </p>

                    <p className={`flex items-center gap-2 text-xs ${hasNumber ? "text-green-600 dark:text-green-400" : "text-gray-500 dark:text-gray-400"}`}>
                      {hasNumber ? <Check size={15} /> : <X size={15} />}
                      At least one number (0-9)
                    </p>

                  </div>
                </Field>

                {/* Submit */}
                <Field className="gap-4 pt-1">
                  <Button
                    type="submit"
                    disabled={!isPasswordValid || isLoading}
                    className="h-12 w-full rounded-xl bg-[#9b2ae5] text-sm font-semibold text-white shadow-lg shadow-purple-500/20 transition-all hover:bg-[#8120c4] hover:shadow-purple-500/30 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {isLoading ? "Creating Account..." : "Create Account"}
                  </Button>

                  <FieldDescription className="text-center text-sm text-gray-500 dark:text-gray-400">
                    Already have an account?{" "}

                    <a
                      href="/login"
                      className="font-semibold text-[#9b2ae5] transition-colors hover:text-[#8120c4] hover:underline"
                    >
                      Login
                    </a>
                  </FieldDescription>
                </Field>

              </FieldGroup>
            </form>

          </CardContent>
        </Card>

        <p className="mt-5 px-4 text-center text-xs leading-6 text-gray-500 dark:text-gray-500">
          By creating an account, you agree to our{" "}

          <a href="#" className="font-medium text-[#9b2ae5] hover:underline">
            Terms of Service
          </a>{" "}
          and{" "}

          <a href="#" className="font-medium text-[#9b2ae5] hover:underline">
            Privacy Policy
          </a>.
        </p>

      </div>
    </div>
  );
};

export default RegisterPage;
