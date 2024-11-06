import { Dimensions, Image, Text, TouchableOpacity, View } from "react-native";
import illution3 from "@/assets/images/Illustration3.png";
import { router } from "expo-router";
export default function Slide4() {
  const { width, height } = Dimensions.get("window");

  return (
    <View className=" w-full h-full  bg-[#0001FC] flex items-center justify-evenly">
      <Image
        source={illution3}
        style={{
          width: width * 0.9,
          height: height * 0.6,
          resizeMode: "contain",
          marginBottom: height * 0.05,
        }}
      />
      <Text className=" text-3xl font-bold text-white">Sales all the time</Text>
      <TouchableOpacity
        className=" bg-white p-3 px-10 rounded-md"
        onPress={() => router.push("/signup")}
      >
        <Text className=" font-bold text-lg">Next</Text>
      </TouchableOpacity>
    </View>
  );
}
