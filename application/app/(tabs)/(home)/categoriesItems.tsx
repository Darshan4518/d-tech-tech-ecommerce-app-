import { Text, StatusBar, ActivityIndicator } from "react-native";
import React, { lazy, Suspense } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams } from "expo-router";

const CategoryItems = lazy(() => import("@/components/CategoryItems"));

const CategoriesItems = () => {
  const { category } = useLocalSearchParams();

  const categoryString = Array.isArray(category)
    ? category[0]
    : category || "mobile";

  return (
    <SafeAreaView className=" p-1">
      <StatusBar />
      <Suspense
        fallback={
          <Text className=" text-center my-auto">
            <ActivityIndicator className=" animate-spin " size="large" />
          </Text>
        }
      >
        <CategoryItems category={categoryString} />
      </Suspense>
    </SafeAreaView>
  );
};

export default CategoriesItems;
