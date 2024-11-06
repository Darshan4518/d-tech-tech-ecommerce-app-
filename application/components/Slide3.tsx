import { Dimensions, Image, Text, View } from "react-native";
import illution2 from "@/assets/images/Illustration2.png";

export default function Slide3() {
  const { width, height } = Dimensions.get("window");
  return (
    <View className=" w-full h-full  bg-[#0001FC] flex items-center justify-center ">
      <Image
        source={illution2}
        style={{
          width: width * 1,
          height: height * 0.6,
          resizeMode: "contain",
          marginBottom: height * 0.05,
        }}
      />
      <Text className=" text-3xl font-bold text-white ">
        A lot of exclusives
      </Text>
    </View>
  );
}
