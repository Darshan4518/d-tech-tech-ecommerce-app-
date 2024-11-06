import { Image, Pressable, StatusBar, Text, View } from "react-native";
import logo from "@/assets/images/logo.png";
import { Link } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

const Index = () => {
  return (
    <SafeAreaView className=" flex-1">
      <StatusBar />
      <View className=" w-full h-full  bg-[#0001FC] flex items-center justify-evenly">
        <View className=" flex items-center">
          <Text className=" text-5xl font-bold my-2 text-white ">D-TECH</Text>
          <Text
            className=" text-base font-bold text-slate-100 "
            style={{ letterSpacing: 4 }}
          >
            TECH MARKET
          </Text>
        </View>

        <Image source={logo} />
        <Link href={"/(tabs)/(home)"}>
          <View className=" bg-white p-3 w-[90vw] rounded-md">
            <Text className=" text-center p-1 text-2xl font-bold text-blue-700 ">
              Let's Start
            </Text>
          </View>
        </Link>
        <Link href={"/onboarding"}>
          <Text className=" text-center text-2xl font-semibold text-white">
            Skip for now
          </Text>
        </Link>
      </View>
    </SafeAreaView>
  );
};

export default Index;
