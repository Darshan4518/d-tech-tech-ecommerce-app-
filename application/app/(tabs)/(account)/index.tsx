import { View, Text, StatusBar, Dimensions, ScrollView } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import userStore from "@/store/userStore";
import { Link } from "expo-router";

const { width, height } = Dimensions.get("window");
const Index = () => {
  const { user } = userStore();
  return (
    <SafeAreaView className=" flex-1 p-3">
      <StatusBar />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text className=" text-4xl font-bold mb-3">Account</Text>

        <Text className=" text-center font-bold text-3xl my-2 capitalize ">
          {user?.name}
        </Text>
        <Text className=" text-center font-bold text-3xl my-2 ">
          {user?.email}
        </Text>

        <View className=" my-3 p-3">
          <View
            className=" bg-white elevation-sm justify-center  rounded-sm my-3"
            style={{ height: (height * 0.3) / 4 }}
          >
            <Link href={"/accountInfo"} className=" p-3">
              <Text className="text-2xl font-bold">Account Information</Text>
            </Link>
          </View>
          <View
            className="  bg-white elevation-sm justify-center  rounded-sm my-3"
            style={{ height: (height * 0.3) / 4 }}
          >
            <Link href={"/orders"} className=" p-3">
              <Text className="text-2xl font-bold ">Orders</Text>
            </Link>
          </View>
          <View
            className="  bg-white elevation-sm justify-center  rounded-sm my-3"
            style={{ height: (height * 0.3) / 4 }}
          >
            <Text className="text-2xl font-bold p-3">Returns & Refunds</Text>
          </View>
          <View
            className="  bg-white elevation-sm justify-center  rounded-sm my-3"
            style={{ height: (height * 0.3) / 4 }}
          >
            <Text className="text-2xl font-bold p-3">Security & Settings</Text>
          </View>
          <View
            className="  bg-white elevation-sm justify-center  rounded-sm my-3"
            style={{ height: (height * 0.3) / 4 }}
          >
            <Text className="text-2xl font-bold p-3">Help</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Index;
