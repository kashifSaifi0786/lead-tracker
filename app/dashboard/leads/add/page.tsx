"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLeadStore } from "@/lib/leadStore";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const leadSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email").optional(),
  phone: z.string().optional(),
});

type LeadFormData = z.infer<typeof leadSchema>;

export default function AddLeadPage() {
  const { addLead } = useLeadStore();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LeadFormData>({ resolver: zodResolver(leadSchema) });

  const onSubmit = async (data: LeadFormData) => {
    await addLead(data);
    router.push("/dashboard/leads");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <Card className="w-[400px] shadow-xl">
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold text-center mb-4">
            Add New Lead
          </h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
            <div>
              <Label>Name</Label>
              <Input {...register("name")} placeholder="Lead name" />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name.message}</p>
              )}
            </div>
            <div>
              <Label>Email</Label>
              <Input {...register("email")} placeholder="example@email.com" />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>
            <div>
              <Label>Phone</Label>
              <Input {...register("phone")} placeholder="9876543210" />
            </div>
            <Button type="submit" className="w-full mt-4">
              Save Lead
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
