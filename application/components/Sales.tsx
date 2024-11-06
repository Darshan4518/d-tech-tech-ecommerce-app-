import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  Image,
  Dimensions,
} from "react-native";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Link } from "expo-router";
import PopularProducts from "./popularProducts";

const { width, height } = Dimensions.get("window");

interface Product {
  id: string;
  image: string;
  onSale: boolean;
  discount: number;
  brand: string;
}

const Sales = () => {
  const [salesProducts, setSalesProducts] = useState<Product[] | null>(null);

  const fetchSaleProducts = async () => {
    const res = await axios.get(`https://fakestoreapi.in/api/products`);
    return res.data?.products;
  };

  const {
    data: products,
    error,
    isLoading,
  } = useQuery<Product[]>({
    queryKey: ["productssales"],
    queryFn: fetchSaleProducts,
    staleTime: 60000,
  });

  useEffect(() => {
    if (products) {
      const sales = products.filter((product) => product.onSale);
      setSalesProducts(sales);
    }
  }, [products]);

  if (isLoading) {
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
    return (
      <Text className="text-red-500 text-center">
        Error fetching category items: {(error as Error).message}
      </Text>
    );
  }

  return (
    <View>
      <Text className="text-3xl font-bold text-center my-4">Sales</Text>
      <FlatList
        data={salesProducts}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Link
            href={{
              pathname: "/(search)/[id]",
              params: { id: item.id },
            }}
          >
            <View className="max-w-[50%] mx-3">
              <View className="relative">
                <Image
                  source={{ uri: item.image }}
                  style={{ width: width * 0.4, height: height * 0.2 }}
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
              <Text className="font-semibold text-xl text-center mt-2 line-clamp-1">
                {item.brand}
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

export default Sales;
