import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  Image,
  Dimensions,
} from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Link } from "expo-router";

const { width, height } = Dimensions.get("window");
const PopularProducts = () => {
  const [popularProdcucts, setPopularProducts] = useState();
  const fetchSaleProducts = async () => {
    const res = await axios.get(`https://fakestoreapi.in/api/products`);
    return res.data?.products;
  };

  const {
    data: products,
    error,
    isPending,
  } = useQuery({
    queryKey: ["productsPopular"],
    queryFn: fetchSaleProducts,
    staleTime: 60000,
  });
  useEffect(() => {
    if (products) {
      const popular = products?.filter((product: any) => product?.popular);
      setPopularProducts(popular);
    }
  }, [products]);

  if (isPending) {
    return (
      <View className=" flex-1 justify-center items-center">
        <ActivityIndicator
          className=" animate-spin"
          size="large"
          color="#0000ff"
        />
      </View>
    );
  }

  if (error) {
    return <Text>Error fetching category items: {error.message}</Text>;
  }
  return (
    <View className=" my-5">
      <Text className=" text-3xl font-bold text-center ">Popular</Text>
      <FlatList
        data={popularProdcucts}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <Link
            href={{
              pathname: "/(search)/[id]",
              params: { id: item.id },
            }}
            className=" my-3"
          >
            <View style={{ maxWidth: width * 0.5, margin: 8 }}>
              <View className=" relative">
                <Image
                  source={{ uri: item?.image }}
                  width={width * 0.4}
                  height={height * 0.2}
                  resizeMode="stretch"
                />
                {item?.discount && (
                  <View className=" absolute top-2 left-2 bg-red-600 p-2 rounded-tl-lg rounded-br-lg">
                    <Text className=" text-white font-bold text-xs">
                      {item?.discount}% OFF
                    </Text>
                  </View>
                )}
              </View>
              <Text className=" font-semibold text-xl text-center max-w-[100%] break-words line-clamp-1">
                {item?.brand}
              </Text>
            </View>
          </Link>
        )}
        getItemLayout={(data, index) => ({
          length: width * 0.5,
          offset: width * 0.5 * index,
          index,
        })}
      />
    </View>
  );
};

export default PopularProducts;
