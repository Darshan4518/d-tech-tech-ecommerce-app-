import {
  View,
  Text,
  FlatList,
  Image,
  Dimensions,
  ActivityIndicator,
  Pressable,
} from "react-native";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Link, useNavigation } from "expo-router";
import AntDesign from "@expo/vector-icons/AntDesign";

const CategoryItems = ({ category }: any) => {
  const { width, height } = Dimensions.get("window");
  const navigate = useNavigation();

  const fetchCategoryItems = async () => {
    const res = await axios.get(
      `https://fakestoreapi.in/api/products/category?type=${category}`
    );
    return res.data?.products;
  };

  const {
    data: products,
    error,
    isPending,
  } = useQuery({
    queryKey: ["category", category],
    queryFn: fetchCategoryItems,
    staleTime: 60000,
  });

  if (isPending) {
    return (
      <ActivityIndicator
        className=" animate-spin m-10"
        size="large"
        color="#0000ff"
      />
    );
  }

  if (error) {
    return <Text>Error fetching category items: {error.message}</Text>;
  }

  const HearderComponent = () => {
    return (
      <View>
        <Pressable onPress={() => navigate.goBack()}>
          <AntDesign
            name="arrowleft"
            size={35}
            color="black"
            className=" font-bold px-3"
          />
        </Pressable>

        <Text className=" capitalize text-3xl px-3 font-bold my-3">
          {category}
        </Text>
      </View>
    );
  };

  return (
    <FlatList
      data={products}
      numColumns={2}
      ListHeaderComponent={HearderComponent}
      showsVerticalScrollIndicator={false}
      columnWrapperStyle={{ justifyContent: "space-between" }}
      renderItem={({ item }) => {
        return (
          <View className=" flex-1 p-2">
            <Link
              href={{
                pathname: "/(search)/[id]",
                params: { id: item.id },
              }}
              className=" p-3 bg-white elevation-md gap-2 rounded-md"
              style={{ height: (height * 0.4) / 2 }}
            >
              <View className=" h-[70%] items-center justify-center">
                <View className="relative mx-auto">
                  <Image
                    source={{ uri: item.image }}
                    style={{ width: width * 0.4, height: (height * 0.2) / 2 }}
                    resizeMode="contain"
                    className=" mx-auto"
                  />
                  {item?.discount && (
                    <View className=" absolute top-2 left-2 bg-red-600 p-2 rounded-tl-lg rounded-br-lg">
                      <Text className=" text-white font-bold text-xs">
                        {item?.discount}% OFF
                      </Text>
                    </View>
                  )}
                </View>
              </View>
              <View className=" gap-1">
                <Text
                  className=" px-2 font-bold text-xl line-clamp-1 break-words"
                  style={{
                    width: width * 0.4,
                  }}
                >
                  {item.model}
                </Text>
                <Text className=" px-2 font-bold text-xl text-blue-500">
                  $ {item?.price}
                </Text>
              </View>
            </Link>
          </View>
        );
      }}
      keyExtractor={(item) => item?.id?.toString()}
    />
  );
};

export default CategoryItems;
