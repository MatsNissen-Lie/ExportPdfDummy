import React from "react";
import { Text, View, Image } from "@react-pdf/renderer";
import { tw } from "../Style";

type HeaderProps = {
  logoSrc?: string;
};
const Header = ({ logoSrc }: HeaderProps) => {
  const date = new Date().toLocaleString().split(",")[0];
  return (
    <View
      fixed
      style={tw(
        "bg-primary-100 h-min-40 px-10 py-6 mb-6 flex flex-row justify-between items-center"
      )}
    >
      <View style={tw("w-1/2 text-lg")}>
        {logoSrc ? (
          <Image style={{ width: 50 }} src={logoSrc} />
        ) : (
          <Text style={tw("text-white font-bold")}>Logo</Text>
        )}
      </View>
      <View style={tw("w-1/2 text-white")}>
        <Text style={{ fontSize: 14 }}>{date}</Text>
      </View>
    </View>
  );
};
export default Header;
