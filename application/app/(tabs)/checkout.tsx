import {
  View,
  Text,
  StatusBar,
  FlatList,
  Image,
  Dimensions,
  Pressable,
  TouchableOpacity,
} from "react-native";
import React, { useMemo } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import useCheckoutStore, { Product } from "@/store/checkout";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { apiUrl } from "@/constant/constant";
import userStore from "@/store/userStore";

const { width, height } = Dimensions.get("window");

const Checkout = () => {
  const { products, removeProduct, clearProduct } = useCheckoutStore();
  const { user } = userStore();

  const total = useMemo(
    () => products.reduce((acc, product) => acc + (product.price || 0), 0),
    [products]
  );

  const ordercreate = async (orderItems: Product[]) => {
    try {
      const res = await axios.post(`${apiUrl}/api/v1/order/create`, {
        items: orderItems,
        total,
        user,
      });
    } catch (error) {
      console.error("Order creation failed:", error);
    }
  };

  const orderMutation = useMutation({
    mutationFn: ordercreate,
    onSuccess: () => {
      clearProduct();
    },
    onError: (error) => {
      console.error("Order mutation error:", error);
    },
  });

  const renderProduct = ({ item }: { item: Product }) => (
    <View
      className="bg-white rounded-lg p-4 mx-2"
      style={{ maxHeight: height * 0.5, width: width * 0.7 }}
    >
      <View className="flex-row justify-between mb-2">
        <Text className="bg-blue-400 rounded-md text-white font-bold p-2 px-3">
          New
        </Text>
        <Pressable onPress={() => removeProduct(item.id)}>
          <MaterialIcons name="highlight-remove" size={28} color="black" />
        </Pressable>
      </View>

      <Image
        source={{ uri: item.image }}
        style={{ width: width * 0.5, height: height * 0.25 }}
        resizeMode="contain"
        className="self-center mb-4"
      />

      <View className="flex-row items-center justify-between">
        <View className="max-w-[65%]">
          <Text className="text-2xl font-bold">{item.model}</Text>
          <Text className="text-2xl font-bold text-blue-500 my-2">
            USD {item.price}
          </Text>
          <Text className="capitalize text-xl font-semibold text-gray-400">
            {item.color}
          </Text>
        </View>
        <View className="bg-blue-200 p-3 rounded-md">
          <Text className="text-blue-900">x1</Text>
        </View>
      </View>
    </View>
  );

  const OrderComponent = () => (
    <View>
      <View className="p-2 my-2 border-b border-gray-100">
        <Text className="text-2xl font-bold">Delivery</Text>
      </View>
      <View className="p-2 my-2 border-b border-gray-100 flex-row items-center justify-between">
        <Text className="text-2xl font-bold">Payment</Text>
        <View>
          <Text className="text-blue-600 text-xl font-bold">Visa ***875</Text>
          <Text className="text-blue-600 font-bold">2027/12/31</Text>
        </View>
      </View>
      <View className="p-2 my-2 border-b border-gray-100 flex-row items-center justify-between">
        <Text className="text-2xl font-bold">Total</Text>
        <Text className="text-blue-600 text-xl font-bold">${total}</Text>
      </View>
      <TouchableOpacity
        className="w-full p-4 bg-blue-500 rounded-md"
        onPress={() => orderMutation.mutate(products)}
        disabled={orderMutation.isPending}
      >
        <Text className="text-white font-bold text-center text-xl">
          {orderMutation.isPending ? "Placing Order..." : "Place Order"}
        </Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 p-4">
      <StatusBar />
      <Text className="text-3xl font-bold mb-4">Checkout</Text>
      <FlatList
        data={products}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={renderProduct}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={
          <View className="flex-1 justify-center items-center">
            <Text className="text-2xl font-bold text-center text-gray-400">
              No products in cart
            </Text>
          </View>
        }
        contentContainerStyle={products.length === 0 ? { flex: 1 } : {}}
      />
      {products?.length > 0 && <OrderComponent />}
    </SafeAreaView>
  );
};

export default Checkout;
