"use client";

import { cn } from "@/lib/utils";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getAuth, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "@/firebase";
import { useRouter } from "next/navigation";

export function SignupForm({ className, ...props }) {
  const router = useRouter();
  const provider = new GoogleAuthProvider();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Function to handle Google Signup
  const handleGoogleSignup = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log("User signed up:", user);
      router.push("/dashboard"); // Redirect to dashboard
    } catch (error) {
      console.error("Error signing up with Google:", error);
      setError("Failed to sign up with Google.");
    }
  };

  // Function to handle Email/Password Signup
  const handleEmailSignup = async (e) => {
    e.preventDefault(); // Prevent form submission
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      const user = result.user;
      
      router.push("/dashboard" ); // Redirect to dashboard
    } catch (error) {
      console.error("Error signing up with email/password:", error);
      setError("Failed to create account. Please try again.");
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Signup</CardTitle>
          <CardDescription>
            Enter your email and password below to create your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleEmailSignup}>
            <div className="flex flex-col gap-6">
              {/* Email Field */}
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              {/* Password Field */}
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              {/* Error Message */}
              {error && <p className="text-red-500 text-sm">{error}</p>}
              {/* Signup Button */}
              <Button type="submit" className="w-full">
                Create Account
              </Button>
              {/* Google Signup Button */}
              <Button
                variant="outline"
                className="w-full"
                onClick={handleGoogleSignup}
              >
                Signup with Google
              </Button>
            </div>
            {/* Login Link */}
            <div className="mt-4 text-center text-sm">
              Already have an account?{" "}
              <a href="/login" className="underline underline-offset-4">
                Login Now
              </a>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
