import { useAuthStore } from "@/lib/store/authStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const useAuthRedirect = () => {
  const { token } = useAuthStore();
  const router = useRouter();

  console.log(token);
  useEffect(() => {
    if (!token) {
      router.push("/login");
    }
  }, [token]);
};
