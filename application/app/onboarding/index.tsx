import Slide2 from "@/components/Slide2";
import Slide3 from "@/components/Slide3";
import Slide4 from "@/components/Slide4";
import { StatusBar, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Swiper from "react-native-swiper";

export default function Index() {
  return (
    <SafeAreaView className=" flex-1">
      <StatusBar />
      <Swiper
        className=" w-full h-full"
        autoplay={false}
        loop={false}
        activeDotColor="red"
        dotColor="white"
        showsButtons={true}
        dot={
          <View
            style={{
              backgroundColor: "white",
              width: 8,
              height: 8,
              borderRadius: 4,
              marginLeft: 3,
              marginRight: 3,
              marginTop: 3,
              marginBottom: "auto",
            }}
          />
        }
        activeDotStyle={{
          backgroundColor: "red",
          width: 20,
          height: 8,
          borderRadius: 4,
          marginLeft: 3,
          marginRight: 3,
          marginTop: 3,
          marginBottom: "auto",
        }}
      >
        <Slide2 />
        <Slide3 />
        <Slide4 />
      </Swiper>
    </SafeAreaView>
  );
}
