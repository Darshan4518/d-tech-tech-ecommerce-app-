import React, { lazy, Suspense } from "react";
import {
  View,
  Text,
  StatusBar,
  Image,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import boseSpeaker from "@/assets/images/Bosespeaker.png";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Link } from "expo-router";
import useAuthRedirect from "@/hooks/middleware";
import PopularProducts from "@/components/popularProducts";

// Lazy-loaded components
const Sales = lazy(() => import("@/components/Sales"));

// Reusable loading component
const LoadingIndicator = () => (
  <View className="flex-1 justify-center items-center">
    <ActivityIndicator size="large" color="#0000ff" />
  </View>
);

type Icons = {
  name: string;
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  route: string;
};

const Home = () => {
  useAuthRedirect();

  const icons: Icons[] = [
    {
      name: "Categories",
      icon: "menu",
      route: "/categories",
    },
    {
      name: "Favorites",
      icon: "heart-outline",
      route: "/favorites",
    },
    {
      name: "Best Selling",
      icon: "account",
      route: "/best-selling",
    },
  ];

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="p-4">
          <Text className="text-4xl font-bold">Home</Text>
          <View className="w-[95%] mx-auto my-5 h-[15vh] bg-[#0001FC] rounded-md flex-row items-center justify-evenly">
            <View>
              <Text className="text-xl text-white font-bold">
                Base Home Speaker
              </Text>
              <Text className="text-base text-slate-300 font-bold">$279</Text>
            </View>
            <Image source={boseSpeaker} />
          </View>
          <View className="mx-auto mb-4">
            <FlatList
              data={icons}
              horizontal
              keyExtractor={(item) => item.name}
              renderItem={({ item }: { item: Icons }) => (
                <View className="flex-col items-center mx-6">
                  <Link href={item.route} asChild>
                    <TouchableOpacity className="p-3 bg-blue-100/80 rounded-full">
                      <MaterialCommunityIcons
                        name={item.icon}
                        size={30}
                        color="blue"
                      />
                    </TouchableOpacity>
                  </Link>
                  <Text className="text-base text-blue-500 font-bold my-2">
                    {item.name}
                  </Text>
                </View>
              )}
              showsHorizontalScrollIndicator={false}
              getItemLayout={(data, index) => ({
                length: 60,
                offset: 60 * index,
                index,
              })}
            />
          </View>
          <Suspense fallback={<LoadingIndicator />}>
            <Sales />
          </Suspense>
          <PopularProducts />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
