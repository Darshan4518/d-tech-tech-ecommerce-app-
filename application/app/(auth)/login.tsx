import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  StatusBar,
} from "react-native";
import React, { useState } from "react";
import { Link, router } from "expo-router";
import ToastManager, { Toast } from "toastify-react-native";
import userStore from "@/store/userStore";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { SafeAreaView } from "react-native-safe-area-context";
import { apiUrl } from "@/constant/constant";
import { User } from "./signup";

interface ApiResponse {
  user: User;
  message: string;
  success: boolean;
}

type userType = {
  email: string;
  password: string;
};

const Login = () => {
  const { setUser } = userStore();
  const [formData, setFormData] = useState<userType>({
    email: "",
    password: "",
  });

  const handleChange = (field: keyof userType, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const login = async (userData: userType) => {
    const response = await axios.post<ApiResponse>(
      `${apiUrl}/api/v1/user/login`,
      userData
    );
    return response.data;
  };

  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      if (data.success) {
        setUser(data.user);
        Toast.success(data.message);
        setFormData({ email: "", password: "" });
        router.push("/(home)");
      } else {
        Toast.error("Login failed. Please check your credentials.");
      }
    },
    onError: (error) => {
      Toast.error("An error occurred. Please try again.");
    },
  });

  return (
    <SafeAreaView className=" flex-1">
      <StatusBar />
      <View className="w-full h-full bg-[#0001FC] flex justify-evenly">
        <ToastManager />
        <Text className="text-white font-bold text-3xl text-center pt-5">
          Login
        </Text>
        <View className="p-3 flex flex-col gap-5">
          <View>
            <Text className="text-white font-bold text-xl">Email</Text>
            <TextInput
              inputMode="email"
              placeholder="Enter email..."
              value={formData.email}
              onChangeText={(value) => handleChange("email", value)}
              className="border-white border p-2 my-1 text-white placeholder:text-slate-200"
              autoCapitalize="none"
            />
          </View>
          <View>
            <Text className="text-white font-bold text-xl">Password</Text>
            <TextInput
              placeholder="Enter password..."
              value={formData.password}
              onChangeText={(value) => handleChange("password", value)}
              className="border-white border p-2 my-1 text-white placeholder:text-slate-200"
              secureTextEntry
            />
          </View>
          <TouchableOpacity
            className="bg-white p-3 w-[90vw] rounded-md mx-auto"
            onPress={() => loginMutation.mutate(formData)}
            disabled={loginMutation.isPending}
          >
            <View className="p-1 flex-row justify-center items-center">
              {loginMutation.isPending ? (
                <ActivityIndicator size="large" color="#0001FC" />
              ) : (
                <Text className="text-2xl font-bold text-blue-700">Login</Text>
              )}
            </View>
          </TouchableOpacity>
          {loginMutation.isError && (
            <Text className="text-red-500 text-center mt-2">
              Failed to log in. Please try again.
            </Text>
          )}
          <Text className="text-yellow-300 font-semibold text-xl text-center">
            Don’t have an account? <Link href="./signup">Sign up</Link>
          </Text>
        </View>
        <Link href="/(tabs)/(home)" className="mx-auto">
          <Text className="text-2xl font-bold text-white text-center">
            Skip for now
          </Text>
        </Link>
      </View>
    </SafeAreaView>
  );
};

export default Login;
