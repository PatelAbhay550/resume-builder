"use client";

import { cn } from "@/lib/utils";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { getAuth, signInWithPopup, signInWithEmailAndPassword, GoogleAuthProvider } from "firebase/auth";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { auth } from "@/firebase";
import { useRouter } from "next/navigation";

export function LoginForm({ className, ...props }) {
  const router = useRouter();
  const provider = new GoogleAuthProvider();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Function to handle Google Login
  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log("User signed in:", user);
      router.push("/dashboard"); // Redirect to dashboard
    } catch (error) {
      console.error("Error signing in with Google:", error);
      setError("Failed to log in with Google.");
    }
  };

  // Function to handle Email/Password Login
  const handleEmailLogin = async (e) => {
    e.preventDefault(); // Prevent form submission
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      const user = result.user;
      
      router.push("/dashboard"); // Redirect to dashboard
    } catch (error) {
      console.error("Error signing in with email/password:", error);
      setError("Invalid email or password.");
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to log in to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleEmailLogin}>
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
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
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
              {/* Login Button */}
              <Button type="submit" className="w-full">
                Login
              </Button>
              {/* Google Login Button */}
              <Button
                variant="outline"
                className="w-full"
                onClick={handleGoogleLogin}
              >
                Login with Google
              </Button>
            </div>
            {/* Sign-Up Link */}
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <a href="/signup" className="underline underline-offset-4">
                Sign up
              </a>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
