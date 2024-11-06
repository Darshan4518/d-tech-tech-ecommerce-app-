import { useEffect } from "react";
import { useRouter, useSegments } from "expo-router";
import userStore from "@/store/userStore";

const useAuthRedirect = () => {
  const { user } = userStore();
  const router = useRouter();
  const segments = useSegments();

  useEffect(() => {
    const isAuthenticated = Boolean(user);
    if (!isAuthenticated && segments[0] !== "(auth)/login") {
      router.replace("/(auth)/login");
    }
  }, [segments, user]);
};

export default useAuthRedirect;
