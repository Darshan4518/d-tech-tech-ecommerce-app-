import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { User } from "@/app/(auth)/signup";

interface UserStore {
  user: User | null;
  setUser: (user: User | null) => void;
}

const userStore = create<UserStore>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user: User | null) => set({ user }),
    }),
    {
      name: "user",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

export default userStore;
