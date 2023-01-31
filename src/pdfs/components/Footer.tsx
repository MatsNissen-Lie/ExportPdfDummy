// import React from "react";
import { Text, View } from "@react-pdf/renderer";
import { tw } from "../Style";

const Footer = ({ dokumentasjonstype }: { dokumentasjonstype: string }) => (
  <View
    style={tw(
      "bg-primary-100 absolute h-[80px] w-full flex items-center justify-between flex-row text-sm px-10 bottom-0 text-white"
    )}
    fixed
  >
    <Text
      style={tw("text-left w-1/3")}
      render={({ pageNumber, totalPages }) =>
        `Side ${pageNumber - 1} av ${totalPages - 1}`
      }
    />
    <Text style={tw("text-center w-1/3")}>
      Laget med <Text style={tw("font-bold")}>Skyworker</Text>
    </Text>
    <Text style={tw("text-right w-1/3")}>{dokumentasjonstype}</Text>
  </View>
);

export default Footer;
