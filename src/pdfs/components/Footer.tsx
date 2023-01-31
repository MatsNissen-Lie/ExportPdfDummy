// import React from "react";
import { Page, Text, View, Document, Image } from "@react-pdf/renderer";
import { tw } from "../Style";

const Footer = ({ dokumentasjonstype }: { dokumentasjonstype: string }) => (
  <View
    style={{
      position: "absolute",
      bottom: 0,
      height: 80,
      width: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      flexDirection: "row",
      fontSize: 12,
      paddingHorizontal: 40,
    }}
    fixed
  >
    <Text
      style={tw("text-left w-1/3")}
      render={({ pageNumber, totalPages }) =>
        `Side ${pageNumber - 1} av ${totalPages - 1}`
      }
    />
    <Text style={tw("text-center w-1/3")}>
      Laget med <Text style={tw("font-bold text-black")}>Skyworker</Text>
    </Text>
    <Text style={tw("text-right w-1/3")}>{dokumentasjonstype}</Text>
  </View>
);

export default Footer;
