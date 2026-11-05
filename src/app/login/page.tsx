
"use client"

import { useState } from "react"
import { Check, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { authClient } from "@/lib/auth-client"
import { toast } from "sonner"
import { redirect } from "next/navigation"



const LoginPage = () => {

const onSubmit = async(e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries())
    console.log(data);
    // Convert FormData to plain object
  const { data: resData, error } = await authClient.signIn.email({
  email: data.email as string,
  password: data.password as string,
 

})
console.log(resData);
if(error){
    toast.error(error.message)
}else{
    redirect('/')
}

   
  };

  const [password, setPassword] = useState("")

  const hasMinLength = password.length >= 6
  const hasUppercase = /[A-Z]/.test(password)
  const hasNumber = /[0-7]/.test(password)

  const isPasswordValid = hasMinLength && hasUppercase && hasNumber

  return (
    <div className="max-w-2xl mx-auto mb-9">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Welcome back Login Page</CardTitle>
          <CardDescription>
            Register with your Google account
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={onSubmit}>
            <FieldGroup>
              <Field>
                <Button variant="outline" type="button">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                      fill="currentColor"
                    />
                  </svg>
                  Login with Google
                </Button>
              </Field>

              <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
                Or continue with
              </FieldSeparator>


              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </Field>

             

              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <a
                    href="#"
                    className="ml-auto text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>

                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />

                <div className="space-y-1 text-sm">
                  <p className={hasMinLength ? "text-green-600" : "text-muted-foreground"}>
                    {hasMinLength ? (
                      <Check className="inline size-4 mr-1" />
                    ) : (
                      <X className="inline size-4 mr-1" />
                    )}
                    At least 6 characters
                  </p>

                  <p className={hasUppercase ? "text-green-600" : "text-muted-foreground"}>
                    {hasUppercase ? (
                      <Check className="inline size-4 mr-1" />
                    ) : (
                      <X className="inline size-4 mr-1" />
                    )}
                    At least one uppercase letter
                  </p>

                  <p className={hasNumber ? "text-green-600" : "text-muted-foreground"}>
                    {hasNumber ? (
                      <Check className="inline size-4 mr-1" />
                    ) : (
                      <X className="inline size-4 mr-1" />
                    )}
                    At least one number
                  </p>
                </div>
              </Field>

              <Field>
                <Button
                  type="submit"
                  className="bg-[#9b2ae5]"
                  disabled={!isPasswordValid}
                >
                  Login
                </Button>

                <FieldDescription className="text-center">
                  Don&apos;t have an account? <a href="/register">Register</a>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>

      <FieldDescription className="px-6 text-center">
        By clicking continue, you agree to our{" "}
        <a href="#">Terms of Service</a> and{" "}
        <a href="#">Privacy Policy</a>.
      </FieldDescription>
    </div>
  )
}

export default LoginPage
