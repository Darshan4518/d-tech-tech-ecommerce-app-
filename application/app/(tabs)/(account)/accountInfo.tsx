import { View, Text, TouchableOpacity, Pressable } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import userStore from "@/store/userStore";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import AntDesign from "@expo/vector-icons/AntDesign";
import { router } from "expo-router";

const AccountInfo = () => {
  const { user, setUser } = userStore();
  return (
    <SafeAreaView className=" p-3 flex-1">
      <View className=" flex-row gap-3 my-3">
        <Pressable onPress={() => router.back()}>
          <AntDesign
            name="arrowleft"
            size={35}
            color="black"
            className=" font-bold px-3"
          />
        </Pressable>
        <Text className=" text-4xl font-bold ">Account Inforamtion</Text>
      </View>
      <View className=" p-3">
        <View className=" my-5 flex-row items-center justify-between">
          <View>
            <Text className="text-lg font-bold">User Name</Text>
            <Text className="text-lg">{user?.name || "Ex.Darshan"}</Text>
          </View>
          <View className=" bg-white/30 p-3 rounded-md">
            <Text className=" font-semibold text-gray-700">Change</Text>
          </View>
        </View>
        <View className=" my-5  flex-row items-center justify-between">
          <View>
            <Text className="text-lg font-bold">Email</Text>
            <Text className="text-lg">
              {user?.email || "Ex.darshan@gmail.com"}
            </Text>
          </View>
          <View className=" bg-white/30 p-3 rounded-md">
            <Text className=" font-semibold text-gray-700">Change</Text>
          </View>
        </View>
        <View className=" my-5">
          <Text className="text-lg font-bold">Password</Text>
          <Text className="text-lg">*****</Text>
        </View>
        <View className=" my-5  flex-row items-center justify-between">
          <View>
            <Text className="text-lg font-bold">Address</Text>
            <Text className="text-lg max-w-[40vw] break-words">
              {user?.address || "Ex.kanakapura,banglore,karnakataka,india"}
            </Text>
          </View>
          <View className=" bg-white/30 p-3 rounded-md">
            <Text className=" font-semibold text-gray-700">
              {user?.address ? "Change" : "Add"}
            </Text>
          </View>
        </View>
        <View className=" my-5  flex-row items-center justify-between">
          <View>
            <Text className="text-lg font-bold">PhoneNo</Text>
            <Text className="text-lg max-w-[40vw] break-words">
              {user?.phoneNo || "Ex.6362734792"}
            </Text>
          </View>
          <View className=" bg-white/30 p-3 rounded-md">
            <Text className=" font-semibold text-gray-700">
              {user?.phoneNo ? "Change" : "Add"}
            </Text>
          </View>
        </View>
      </View>
      <TouchableOpacity
        className=" bg-blue-500 p-3 rounded-md flex-row gap-3 justify-center"
        onPress={() => setUser(null)}
      >
        <MaterialIcons name="logout" size={28} color={"white"} />
        <Text className=" text-white text-2xl font-bold">Logout</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default AccountInfo;
