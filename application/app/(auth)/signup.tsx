import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Dimensions,
  StatusBar,
} from "react-native";
import React, { useState } from "react";
import { Link, router } from "expo-router";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import userStore from "@/store/userStore";
import ToastManager, { Toast } from "toastify-react-native";
import { apiUrl } from "@/constant/constant";
import { SafeAreaView } from "react-native-safe-area-context";
const { width } = Dimensions.get("window");

export interface User {
  id?: number;
  name: string;
  email: string;
  password: string;
  address?: string;
  phoneNo?: number;
}

interface ApiResponse {
  newUser: User;
  message: string;
}

const Signup = () => {
  const { setUser } = userStore();
  const [formData, setFormData] = useState<User>({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (field: keyof User, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const createUser = async (userData: User) => {
    const response = await axios.post<ApiResponse>(
      `${apiUrl}/api/v1/user/create`,
      userData
    );
    return response.data;
  };

  const createUserMutation = useMutation({
    mutationFn: createUser,
    onSuccess: (data) => {
      setUser(data.newUser);
      router.push("/(home)");
      Toast.success(data.message);

      setFormData({
        name: "",
        email: "",
        password: "",
      });
    },
    onError: (error) => {
      console.log(error);
    },
  });

  return (
    <SafeAreaView className="flex-1 ">
      <StatusBar />
      <ToastManager animationStyle={"rightInOut"} position="bottom" />
      <View className=" w-full h-full bg-[#0001FC] justify-center px-5">
        <Text className="text-white font-bold text-3xl text-center pt-4">
          Create an account
        </Text>
        <View className="p-3 flex flex-col gap-[2vh]">
          <View>
            <Text className="text-white font-bold text-xl">User Name</Text>
            <TextInput
              placeholder="Enter name..."
              className="border-white border p-2 my-1 text-white placeholder:text-slate-200"
              style={{ fontSize: width > 400 ? 16 : 14 }}
              value={formData.name}
              onChangeText={(value) => handleChange("name", value)}
            />
          </View>
          <View>
            <Text className="text-white font-bold text-xl">Email</Text>
            <TextInput
              keyboardType="email-address"
              placeholder="Enter email..."
              className="border-white border p-2 my-1 text-white placeholder:text-slate-200"
              style={{ fontSize: width > 400 ? 16 : 14 }}
              value={formData.email}
              onChangeText={(value) => handleChange("email", value)}
            />
          </View>
          <View>
            <Text className="text-white font-bold text-xl">Password</Text>
            <TextInput
              placeholder="Enter password..."
              className="border-white border p-2 my-1 text-white placeholder:text-slate-200"
              secureTextEntry
              style={{ fontSize: width > 400 ? 16 : 14 }}
              value={formData.password}
              onChangeText={(value) => handleChange("password", value)}
            />
          </View>
          <TouchableOpacity
            className="bg-white p-3 rounded-md mx-auto"
            style={{ width: width * 0.85 }}
            onPress={() => createUserMutation.mutate(formData)}
            disabled={createUserMutation.isPending}
          >
            <Text
              className="text-center p-1 font-bold text-blue-700"
              style={{ fontSize: width > 400 ? 20 : 18 }}
            >
              {createUserMutation.isPending ? "Signing up..." : "Signup"}
            </Text>
          </TouchableOpacity>
          {createUserMutation.isError && (
            <Text className="text-red-500 text-center mt-2">
              Failed to create account. Please try again.
            </Text>
          )}
          <Text className="text-yellow-300 font-semibold text-xl text-center mt-4">
            Already have an account? <Link href={"./login"}>login</Link>
          </Text>
        </View>
        <Link href={"/(tabs)/(home)"} className="mx-auto">
          <Text
            className="text-2xl font-bold text-white text-center mt-8"
            style={{ textDecorationLine: "none" }}
          >
            Skip for now
          </Text>
        </Link>
      </View>
    </SafeAreaView>
  );
};

export default Signup;
