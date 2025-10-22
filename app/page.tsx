"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Users, BarChart, Zap } from "lucide-react";
import { useRouter } from "next/navigation";

export default function LandingPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 text-white flex flex-col">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-5 backdrop-blur-md bg-white/10">
        <h1 className="text-2xl font-extrabold tracking-tight">
          Lead<span className="text-yellow-300">Flow</span>
        </h1>
        <div className="space-x-4">
          <Button
            variant="ghost"
            className="text-white hover:bg-white/20"
            onClick={() => router.push("/login")}
          >
            Login
          </Button>
          <Button
            className="bg-yellow-400 text-black hover:bg-yellow-300"
            onClick={() => router.push("/signup")}
          >
            Get Started
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="flex-1 flex flex-col items-center justify-center text-center px-6">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl sm:text-6xl font-extrabold mb-4 leading-tight"
        >
          Track Leads. <br />
          <span className="text-yellow-300">Boost Conversions.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="max-w-xl text-lg text-white/80 mb-6"
        >
          A powerful lead tracking platform to capture, assign, and close leads
          faster — built for sales teams that move fast.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Button
            size="lg"
            className="bg-yellow-400 text-black hover:bg-yellow-300"
            onClick={() => router.push("/signup")}
          >
            Start Free Trial
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="bg-white text-gray-800 py-20 px-6 md:px-16">
        <h3 className="text-3xl md:text-4xl font-bold text-center mb-10">
          Why Teams Love Lead<span className="text-indigo-600">Flow</span>
        </h3>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            {
              icon: Users,
              title: "Team Collaboration",
              desc: "Assign leads, track progress, and close deals together with full visibility.",
            },
            {
              icon: BarChart,
              title: "Smart Analytics",
              desc: "Get data-driven insights and performance metrics to optimize your pipeline.",
            },
            {
              icon: Zap,
              title: "Lightning Fast",
              desc: "Streamlined UI and blazing-fast backend built with Next.js & Node.js.",
            },
          ].map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 * idx }}
            >
              <Card className="border-none shadow-xl hover:shadow-2xl transition-all rounded-2xl">
                <CardContent className="p-8 flex flex-col items-center text-center space-y-4">
                  <item.icon className="h-10 w-10 text-indigo-600" />
                  <h4 className="text-xl font-semibold">{item.title}</h4>
                  <p className="text-gray-500 text-sm">{item.desc}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Footer */}
      <footer className="bg-gray-900 text-center py-8 text-white/70">
        <p>© {new Date().getFullYear()} LeadFlow — Built with Kashif.</p>
      </footer>
    </main>
  );
}
