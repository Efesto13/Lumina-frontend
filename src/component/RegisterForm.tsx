'use client';

import React, { useState } from "react";
import { register } from "@/service/authService";
import { UsersDots } from "@/type/users";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterForm() {
  const [formData, setFormData] = useState<UsersDots>({
    name: "",
    email: "",
    password: "",
  });


  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const router = useRouter();


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);



    try {

      await register(formData);


      setSuccess(true);

      setFormData({ name: "", email: "", password: "" });
      router.replace("/login")
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

 return (
  <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#090312]">
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,#7C3AED33,transparent_45%)]" />

    <div
      className="absolute inset-0 opacity-20"
      style={{
        backgroundImage: `
          linear-gradient(rgba(124,58,237,.15) 1px, transparent 1px),
          linear-gradient(90deg, rgba(124,58,237,.15) 1px, transparent 1px)
        `,
        backgroundSize: "64px 64px",
      }}
    />

    <div className="absolute right-0 top-0 h-[600px] w-[600px] rounded-full bg-violet-600/20 blur-[180px]" />

    <div className="relative z-10 w-full max-w-md rounded-3xl border border-violet-500/20 bg-[#12091f]/80 p-10 backdrop-blur-xl">
      <div className="mb-8 text-center">
        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-violet-500 text-3xl font-bold text-white">
          ✦
        </div>

        <h1 className="text-4xl font-black text-white">
          Create Account
        </h1>

        <p className="mt-2 text-gray-400">
          Join Lumina and get started today.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="mb-2 block text-sm text-gray-400">
            Full Name
          </label>

          <input
            type="text"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            placeholder="John Doe"
            className="w-full rounded-xl border border-violet-500/20 bg-[#1a1028] px-5 py-4 text-white placeholder:text-gray-500 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-500/30"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm text-gray-400">
            Email Address
          </label>

          <input
            type="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            placeholder="you@example.com"
            className="w-full rounded-xl border border-violet-500/20 bg-[#1a1028] px-5 py-4 text-white placeholder:text-gray-500 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-500/30"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm text-gray-400">
            Password
          </label>

          <input
            type="password"
            name="password"
            required
            value={formData.password}
            onChange={handleChange}
            placeholder="••••••••"
            className="w-full rounded-xl border border-violet-500/20 bg-[#1a1028] px-5 py-4 text-white placeholder:text-gray-500 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-500/30"
          />
        </div>

        {error && (
          <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-3 text-sm text-red-300">
            {error}
          </div>
        )}

        {success && (
          <div className="rounded-xl border border-green-500/20 bg-green-500/10 p-3 text-sm text-green-300">
            Account created successfully.
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-violet-500 py-4 text-lg font-semibold text-white transition duration-300 hover:bg-violet-400 hover:shadow-lg hover:shadow-violet-500/40 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Creating Account..." : "Create Account"}
        </button>

        <div className="flex items-center">
          <div className="h-px flex-1 bg-violet-500/20" />
          <span className="mx-4 text-sm text-gray-500">or</span>
          <div className="h-px flex-1 bg-violet-500/20" />
        </div>

        <button
          type="button"
          className="w-full rounded-xl border border-violet-500/20 bg-[#1a1028] py-4 text-white transition hover:border-violet-500/40 hover:bg-[#241438]"
        >
          Continue with Google
        </button>

        <Link href={"/login"}>
          <p className="text-center text-sm text-gray-400">
            Already have an account?{" "}
            <span className="cursor-pointer font-medium text-violet-400 hover:text-violet-300">
              Sign In
            </span>
          </p>
        </Link>
      </form>
    </div>
  </div>
);
}