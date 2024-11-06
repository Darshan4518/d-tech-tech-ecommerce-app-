import {
  View,
  Text,
  FlatList,
  Pressable,
  ActivityIndicator,
  StatusBar,
} from "react-native";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { SafeAreaView } from "react-native-safe-area-context";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Link, useNavigation } from "expo-router";
const Categories = () => {
  const navigate = useNavigation();

  const fetchCategories = async () => {
    const res = await axios.get(
      "https://fakestoreapi.in/api/products/category"
    );
    return res.data.categories;
  };

  const { data, error, isPending } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
    staleTime: 60000,
  });

  if (isPending)
    return (
      <View className=" flex-1 items-center justify-center">
        <ActivityIndicator className=" animate-spin" size="large" />
      </View>
    );
  if (error) return <Text>Error loading categories</Text>;

  return (
    <SafeAreaView className=" p-3">
      <StatusBar />
      <Pressable onPress={() => navigate.goBack()}>
        <AntDesign
          name="arrowleft"
          size={35}
          color="black"
          className=" font-bold"
        />
      </Pressable>
      <Text className=" text-3xl font-bold my-3">Categories</Text>
      <FlatList
        data={data}
        renderItem={({ item }: { item: string }) => (
          <Link
            href={{
              pathname: "/categoriesItems",
              params: { category: item },
            }}
            className=" my-2 bg-white elevation-sm p-[3vh]  "
          >
            <Text className=" text-2xl font-semibold capitalize">{item}</Text>
          </Link>
        )}
      />
    </SafeAreaView>
  );
};

export default Categories;
