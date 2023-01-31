import React from "react";
import { Text, View } from "@react-pdf/renderer";
import { stylesPDF, tw } from "../Style";

const ContactInformation = ({
  customerInformation,
  companyInformation,
}: {
  customerInformation: string;
  companyInformation: string;
}) => (
  <View style={tw(`mx-10`)}>
    <View style={tw("flex flex-row justify-between")}>
      <View style={{ width: "50%", paddingRight: 60 }}>
        <Text style={stylesPDF.boldHead}>Kunde</Text>
        <Text style={{ fontSize: 12 }}>{customerInformation}</Text>
      </View>
      <View style={{ width: "50%", paddingRight: 60 }}>
        <Text style={stylesPDF.boldHead}>Leverandør</Text>
        <Text style={{ fontSize: 12 }}>{companyInformation}</Text>
      </View>
    </View>
  </View>
);

export default ContactInformation;
