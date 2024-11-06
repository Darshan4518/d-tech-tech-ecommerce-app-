import { View, Text, Pressable } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import AntDesign from "@expo/vector-icons/AntDesign";
import OrdersList from "@/components/OrdersList";

const Orders = () => {
  return (
    <SafeAreaView className=" flex-1 bg-white">
      <View className=" flex-row gap-3 my-3">
        <Pressable onPress={() => router.back()}>
          <AntDesign
            name="arrowleft"
            size={35}
            color="black"
            className=" font-bold px-3"
          />
        </Pressable>
        <Text className=" text-4xl font-bold ">Orders</Text>
      </View>
      <OrdersList />
    </SafeAreaView>
  );
};

export default Orders;
