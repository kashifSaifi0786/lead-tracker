"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import api from "@/lib/Axios";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

const schema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  phone: z.string().min(10, "Invalid phone number"),
});

export default function SignupPage() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [success, setSuccess] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    setErrorMsg("");
    setSuccess(false);
    try {
      await api.post("/auth/signup", data);
      setSuccess(true);
      setTimeout(() => router.push("/login"), 1200);
    } catch (err) {
      setErrorMsg(err.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-600 to-indigo-500">
      <Card className="w-[400px] p-6 shadow-2xl backdrop-blur-lg bg-white/90 rounded-2xl">
        <CardContent>
          <h2 className="text-2xl font-bold text-center mb-4 text-gray-800">
            Create an Account 🚀
          </h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Label>Name</Label>
              <Input type="text" {...register("name")} placeholder="John Doe" />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name.message}</p>
              )}
            </div>
            <div>
              <Label>Email</Label>
              <Input
                type="email"
                {...register("email")}
                placeholder="you@example.com"
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>
            <div>
              <Label>Password</Label>
              <Input
                type="password"
                {...register("password")}
                placeholder="••••••••"
              />
              {errors.password && (
                <p className="text-red-500 text-sm">
                  {errors.password.message}
                </p>
              )}
            </div>
            <div>
              <Label>Phone</Label>
              <Input
                type="text"
                {...register("phone")}
                placeholder="9876543210"
              />
              {errors.phone && (
                <p className="text-red-500 text-sm">{errors.phone.message}</p>
              )}
            </div>

            {errorMsg && (
              <p className="text-red-500 text-sm text-center">{errorMsg}</p>
            )}
            {success && (
              <p className="text-green-600 text-sm text-center">
                Signup successful 🎉
              </p>
            )}

            <Button className="w-full mt-2" type="submit" disabled={loading}>
              {loading ? "Creating..." : "Sign Up"}
            </Button>

            <p className="text-sm text-center text-gray-500">
              Already have an account?{" "}
              <span
                className="text-indigo-600 cursor-pointer font-medium"
                onClick={() => router.push("/login")}
              >
                Login
              </span>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
