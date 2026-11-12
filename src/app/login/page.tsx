
"use client";

import { useState } from "react";
import { Check, X, LockKeyhole } from "lucide-react";
import Link from "next/link";
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
import { useRouter, useSearchParams } from "next/navigation";

const LoginPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Get previous page URL
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  // Prevent external URL redirects
  const safeUrl =
    callbackUrl.startsWith("/") && !callbackUrl.startsWith("//")
      ? callbackUrl
      : "/";

  const [password, setPassword] = useState("");

  const hasMinLength = password.length >= 6;
  const hasUppercase = /[A-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);

  const isPasswordValid =
    hasMinLength && hasUppercase && hasNumber;

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      const { data: resData, error } = await authClient.signIn.email({
        email: data.email as string,
        password: data.password as string,
      });

      console.log(resData);

      if (error) {
        toast.error(error.message);
        return;
      }

      toast.success("Login successful!");
      router.replace(safeUrl);
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  const HandleGoogleSignIn = async () => {
    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: safeUrl,
      });
    } catch (error) {
      console.error(error);
      toast.error("Google login failed");
    }
  };

  return (
    <div className="relative mx-auto mb-10 mt-8 w-full max-w-lg overflow-x-clip px-4 sm:mb-12 sm:mt-10">
      {/* Background Decoration */}
      <div className="pointer-events-none absolute -left-20 top-20 h-64 w-64 rounded-full bg-[#9b2ae5]/10 blur-[100px]" />
      <div className="pointer-events-none absolute -right-20 bottom-10 h-64 w-64 rounded-full bg-purple-500/10 blur-[100px]" />

      <Card className="relative overflow-hidden rounded-3xl border border-gray-200/80 bg-white shadow-xl shadow-purple-900/5 dark:border-white/10 dark:bg-[#15111c] dark:shadow-black/20">
        {/* Top Accent */}
        <div className="h-1.5 w-full bg-gradient-to-r from-[#8120c4] via-[#9b2ae5] to-[#c77aff]" />

        <CardHeader className="space-y-3 px-6 pt-9 text-center sm:px-9">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#9b2ae5]/10 text-[#9b2ae5]">
            <LockKeyhole size={27} />
          </div>

          <div>
            <CardTitle className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-3xl">
              Welcome Back!
            </CardTitle>

            <CardDescription className="mt-2 text-sm leading-6 text-gray-500 dark:text-gray-400">
              Login to your StudioSpace account and continue your journey.
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="px-6 pb-9 sm:px-9">
          <form onSubmit={onSubmit}>
            <FieldGroup className="gap-5">
              {/* Google Login */}
              <Field>
                <Button
                  variant="outline"
                  type="button"
                  onClick={HandleGoogleSignIn}
                  className="h-12 w-full gap-3 rounded-xl border-gray-200 bg-white font-semibold text-gray-700 transition-all hover:border-[#9b2ae5]/40 hover:bg-[#9b2ae5]/5 hover:text-[#9b2ae5] dark:border-white/10 dark:bg-white/[0.04] dark:text-gray-200 dark:hover:border-[#9b2ae5]/50 dark:hover:bg-[#9b2ae5]/10 dark:hover:text-white"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    className="size-5"
                  >
                    <path
                      d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                      fill="currentColor"
                    />
                  </svg>
                  Continue with Google
                </Button>
              </Field>

              <FieldSeparator className="text-xs text-gray-400 [&_[data-slot=field-separator-content]]:bg-white dark:[&_[data-slot=field-separator-content]]:bg-[#15111c]">
                OR CONTINUE WITH EMAIL
              </FieldSeparator>

              {/* Email */}
              <Field>
                <FieldLabel
                  htmlFor="email"
                  className="font-semibold text-gray-700 dark:text-gray-200"
                >
                  Email Address
                </FieldLabel>

                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  className="h-12 rounded-xl border-gray-200 bg-gray-50 px-4 text-gray-900 transition-all placeholder:text-gray-400 focus-visible:border-[#9b2ae5] focus-visible:ring-[#9b2ae5]/20 dark:border-white/10 dark:bg-[#09070e] dark:text-white dark:placeholder:text-gray-500"
                />
              </Field>

              {/* Password */}
              <Field>
                <div className="flex items-center justify-between">
                  <FieldLabel
                    htmlFor="password"
                    className="font-semibold text-gray-700 dark:text-gray-200"
                  >
                    Password
                  </FieldLabel>

                  <Link
                    href="#"
                    className="text-xs font-medium text-[#9b2ae5] transition-colors hover:text-[#8120c4] hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>

                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="h-12 rounded-xl border-gray-200 bg-gray-50 px-4 text-gray-900 transition-all placeholder:text-gray-400 focus-visible:border-[#9b2ae5] focus-visible:ring-[#9b2ae5]/20 dark:border-white/10 dark:bg-[#09070e] dark:text-white dark:placeholder:text-gray-500"
                />

                {/* Password Validation */}
                <div className="mt-3 space-y-2 rounded-xl border border-gray-100 bg-gray-50/80 p-4 dark:border-white/5 dark:bg-white/[0.03]">
                  <p className="mb-2 text-xs font-semibold text-gray-500 dark:text-gray-400">
                    PASSWORD REQUIREMENTS
                  </p>

                  <p className={`flex items-center gap-2 text-xs ${hasMinLength ? "text-green-600 dark:text-green-400" : "text-gray-500 dark:text-gray-400"}`}>
                    {hasMinLength ? <Check size={15} /> : <X size={15} />}
                    At least 6 characters
                  </p>

                  <p className={`flex items-center gap-2 text-xs ${hasUppercase ? "text-green-600 dark:text-green-400" : "text-gray-500 dark:text-gray-400"}`}>
                    {hasUppercase ? <Check size={15} /> : <X size={15} />}
                    At least one uppercase letter
                  </p>

                  <p className={`flex items-center gap-2 text-xs ${hasNumber ? "text-green-600 dark:text-green-400" : "text-gray-500 dark:text-gray-400"}`}>
                    {hasNumber ? <Check size={15} /> : <X size={15} />}
                    At least one number
                  </p>
                </div>
              </Field>

              {/* Login Button */}
              <Field>
                <Button
                  type="submit"
                  disabled={!isPasswordValid}
                  className="h-12 w-full rounded-xl bg-[#9b2ae5] text-base font-semibold text-white shadow-lg shadow-[#9b2ae5]/20 transition-all hover:-translate-y-0.5 hover:bg-[#8120c4] hover:shadow-xl hover:shadow-[#9b2ae5]/25 disabled:translate-y-0 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Login
                </Button>

                <FieldDescription className="pt-2 text-center text-sm text-gray-500 dark:text-gray-400">
                  Don&apos;t have an account?{" "}
                  <Link
                    href="/register"
                    className="font-semibold text-[#9b2ae5] hover:text-[#8120c4] hover:underline"
                  >
                    Create Account
                  </Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>

      <FieldDescription className="mt-6 px-4 text-center text-xs leading-6 text-gray-400 dark:text-gray-500">
        By clicking continue, you agree to our{" "}
        <Link href="#" className="font-medium text-[#9b2ae5] hover:underline">
          Terms of Service
        </Link>{" "}
        and{" "}
        <Link href="#" className="font-medium text-[#9b2ae5] hover:underline">
          Privacy Policy
        </Link>.
      </FieldDescription>
    </div>
  );
};

export default LoginPage;
