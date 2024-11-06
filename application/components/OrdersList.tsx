import {
  View,
  Text,
  FlatList,
  Image,
  Dimensions,
  Pressable,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { apiUrl } from "@/constant/constant";
import userStore from "@/store/userStore";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { router } from "expo-router";

const { width, height } = Dimensions.get("window");

const OrdersList = () => {
  const { user } = userStore();
  const fetchUserOrders = async () => {
    if (!user?.id) {
      throw new Error("User ID is required");
    }
    const res = await axios.get(`${apiUrl}/api/v1/order`, {
      headers: {
        "user-id": user.id.toString(),
      },
    });
    return res.data.orders.Order;
  };

  const {
    data: orders,
    isPending,
    error,
  } = useQuery({
    queryKey: ["orders", user?.id],
    queryFn: fetchUserOrders,
    enabled: !!user?.id,
    staleTime: 60000,
  });

  if (isPending) return <Text>Loading...</Text>;
  if (error instanceof Error) return <Text>{error.message}</Text>;

  return (
    <View>
      <FlatList
        data={orders}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => {
          return (
            <View>
              {item?.items?.map((product: any) => (
                <TouchableOpacity
                  style={{ marginBottom: 10 }}
                  key={product?.id}
                  className=" flex-row my-2  justify-between items-center p-2"
                  onPress={() =>
                    router.push({
                      pathname: "/(search)/[id]",
                      params: { id: product?.id },
                    })
                  }
                >
                  <View className=" flex-row  justify-between items-center gap-3">
                    <Image
                      source={{ uri: product?.image }}
                      style={{ width: width * 0.3, height: (height * 0.2) / 2 }}
                      resizeMode="stretch"
                    />
                    <View>
                      <Text className=" font-bold text-xl max-w-[45vw] line-clamp-2  break-words">
                        {product?.title}
                      </Text>
                      <View className=" gap-1 flex-row items-center">
                        <Text>Ordered : </Text>
                        <Text>
                          {(() => {
                            const createdAt = new Date(item?.createdAt);
                            createdAt.setDate(createdAt.getDate());
                            return createdAt.toISOString().slice(0, 10);
                          })()}
                        </Text>
                      </View>
                    </View>
                  </View>
                  <Pressable>
                    <MaterialIcons
                      name="arrow-forward-ios"
                      size={24}
                      color="black"
                    />
                  </Pressable>
                </TouchableOpacity>
              ))}
            </View>
          );
        }}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

export default OrdersList;
