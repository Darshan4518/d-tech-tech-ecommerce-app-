import { Dimensions, Image, Text, View } from "react-native";
import illution from "@/assets/images/Illustration.png";
export default function Slide2() {
  const { width, height } = Dimensions.get("window");

  return (
    <View className=" w-full h-full  bg-[#0001FC] flex items-center justify-center">
      <Image
        source={illution}
        style={{
          width: width * 0.8,
          height: height * 0.6,
          resizeMode: "contain",
          marginBottom: height * 0.05,
        }}
      />
      <Text className=" text-3xl font-bold text-white">
        The best tech market
      </Text>
    </View>
  );
}
