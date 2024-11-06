import {
  View,
  Text,
  StatusBar,
  ActivityIndicator,
  Pressable,
  Image,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link, router, useLocalSearchParams, useNavigation } from "expo-router";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import useCheckoutStore, { Product } from "@/store/checkout";
import ToastManager, { Toast } from "toastify-react-native";

const ProductDetails = () => {
  const { id } = useLocalSearchParams();
  const { width, height } = Dimensions.get("window");
  const { addProduct, products } = useCheckoutStore();

  const fetchSingleProduct = async () => {
    const res = await axios.get(`https://fakestoreapi.in/api/products/${id}`);
    return res.data?.product;
  };

  const {
    data: product,
    error,
    isPending,
  } = useQuery({
    queryKey: ["product", id],
    queryFn: fetchSingleProduct,
    staleTime: 60000,
  });

  const addItem = (product: Product) => {
    if (!products?.includes(product)) {
      addProduct(product);
    } else {
      Toast.warn("item already added ", "top");
    }
  };

  if (isPending) {
    return (
      <ActivityIndicator
        className=" animate-spin"
        size="large"
        color="#0000ff"
      />
    );
  }

  if (error) {
    return <Text>Error fetching category items: {error.message}</Text>;
  }

  return (
    <SafeAreaView className="flex-1 bg-white p-2">
      <StatusBar />
      <ToastManager />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Pressable onPress={() => router.replace("/(search)")}>
          <AntDesign
            name="arrowleft"
            size={35}
            color="black"
            className=" font-bold px-3"
          />
        </Pressable>

        <Text className=" capitalize text-3xl px-3 font-bold my-3">
          {product?.title}
        </Text>
        <View className=" relative ">
          <Image
            source={{ uri: product?.image }}
            height={height * 0.5}
            width={width * 0.8}
            resizeMode="contain"
            className="mx-auto"
          />
          {product?.discount && (
            <View className=" absolute top-3 left-2 bg-red-600 p-3  rounded-tl-2xl rounded-br-2xl">
              <Text className=" text-white font-bold text-lg">
                {product?.discount}% OFF
              </Text>
            </View>
          )}
        </View>
        <View className=" px-2">
          <View className=" flex-row gap-4 items-center ">
            <Text className=" text-xl font-bold">Color :</Text>
            <Text className="text-xl text-gray-700 font-bold ">
              {product?.color}
            </Text>
          </View>
          <View className=" flex-row gap-4 items-center my-3">
            <Text className=" text-xl font-bold">Price :</Text>
            <Text className="text-xl text-blue-700 font-bold ">
              $ {product?.price}
            </Text>
          </View>

          <View className=" flex-row gap-4 items-center ">
            <Text className=" text-xl font-bold">Brand :</Text>
            <Text className="text-xl text-gray-700 font-bold capitalize ">
              {product?.brand}
            </Text>
          </View>
          <View className="  my-3 border-t border-b border-gray-500 p-2 flex-row justify-between">
            <Text className="  font-bold text-xl ">More Details</Text>
            <Link href={".."}>
              <MaterialIcons name="arrow-right" size={34} color="black" />
            </Link>
          </View>
          <TouchableOpacity
            className=" rounded-md bg-blue-600 flex-row justify-center items-center"
            style={{
              height: (height * 0.2) / 3,
            }}
            onPress={() => addItem(product)}
          >
            <Text className=" font-bold text-white text-2xl ">Add To Cart</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProductDetails;
