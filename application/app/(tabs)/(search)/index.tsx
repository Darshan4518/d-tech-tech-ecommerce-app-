import React, { useState } from "react";
import {
  View,
  Text,
  StatusBar,
  TextInput,
  TouchableOpacity,
  Alert,
  FlatList,
  Pressable,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link, router } from "expo-router";
import searchStore from "@/store/searchStore";

const Search = () => {
  const [query, setQuery] = useState<string>("");
  const { searchQueries, clearSearchQuery, removeSearchQuery, setSearchQuery } =
    searchStore();

  const handleSearch = () => {
    const trimmedQuery = query.trim().toLowerCase();

    if (trimmedQuery) {
      router.push({
        pathname: "/(home)/categoriesItems",
        params: { category: trimmedQuery },
      });

      if (!searchQueries.includes(trimmedQuery)) {
        setSearchQuery(trimmedQuery);
      }
      setQuery("");
    } else {
      Alert.alert("Error", "Please enter a search term");
    }
  };

  const renderSearchItem = ({ item }: { item: string }) => (
    <View className="flex-row items-center justify-between my-2">
      <Link
        href={{
          pathname: "/(home)/categoriesItems",
          params: { category: item.toLowerCase() },
        }}
        className="p-2 flex-1"
      >
        <Text className="font-bold text-slate-500 text-2xl capitalize">
          {item}
        </Text>
      </Link>
      <Pressable onPress={() => removeSearchQuery(item.toLowerCase())}>
        <FontAwesome name="remove" size={20} color="gray" />
      </Pressable>
    </View>
  );

  return (
    <SafeAreaView className="flex-1">
      <StatusBar />
      <View className="w-full h-full p-3">
        <Text className="text-3xl font-bold">Search</Text>
        <View className="bg-[#E0ECF8] rounded-full items-center flex-row w-full p-3 my-3">
          <TextInput
            placeholder="Search category..."
            value={query}
            onChangeText={setQuery}
            onSubmitEditing={handleSearch}
            className="text-blue-500 font-bold placeholder:text-blue-500 flex-1 px-2"
          />
          <TouchableOpacity onPress={handleSearch}>
            <FontAwesome
              name="search"
              size={18}
              color="blue"
              className=" px-3"
            />
          </TouchableOpacity>
        </View>
        <View>
          <View className="flex-row items-center justify-between my-2">
            <Text className="text-2xl font-bold">Latest Search</Text>
            <Pressable onPress={clearSearchQuery}>
              <Text className="text-xl font-semibold text-gray-500">Clear</Text>
            </Pressable>
          </View>
          <FlatList
            data={searchQueries}
            renderItem={renderSearchItem}
            keyExtractor={(item) => item}
            ListEmptyComponent={() => (
              <Text className="text-gray-500 text-lg mx-auto my-[10vh] ">
                No recent searches
              </Text>
            )}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Search;
