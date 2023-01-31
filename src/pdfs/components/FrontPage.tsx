// import React from "react";
import { Page, Text, View, Image } from "@react-pdf/renderer";
import { stylesPDF, tw } from "../Style";

type FrontPageProps = {
  title: string;
  subtitle: string;
  projectNumber?: number;
  logoSrc?: string;
  customerInformation?: string;
  companyInformation: string;
};

const FrontPage = ({
  title,
  subtitle,
  projectNumber,
  logoSrc,
  customerInformation,
  companyInformation,
}: FrontPageProps) => {
  console.log(logoSrc);
  return (
    <Page size="A4" style={tw("bg-primary-100 relative font-inter")}>
      <View
        style={tw("px-10 py-6 flex flex-row justify-between items-center ")}
      >
        <View style={tw("w-1/2 text-lg flex-grow")}>
          {logoSrc && logoSrc !== "" ? (
            <Image style={{ width: 50 }} src={logoSrc} />
          ) : (
            <Text style={tw("text-white font-bold")}>Logo</Text>
          )}
        </View>
        <View style={tw("w-1/2 flex flex-row text-secondary-100")}>
          <Text>Laget med </Text>
          <Text style={tw("font-bold")}>Skyworker</Text>
        </View>
      </View>

      <View
        style={{
          top: 260,
          paddingHorizontal: 40,
          position: "absolute",
        }}
      >
        <View style={tw("text-secondary-100")}>
          <Text style={{ fontSize: 64, fontWeight: 600, marginBottom: 5 }}>
            {title}
          </Text>
        </View>
        <View style={tw("text-secondary-90")}>
          <Text style={{ fontSize: 35, fontWeight: 600, marginBottom: 10 }}>
            {subtitle}
          </Text>
          {projectNumber && (
            <Text style={{ fontSize: 16, fontWeight: 600 }}>
              Prosjektnr: {projectNumber}
            </Text>
          )}
        </View>
      </View>

      <View style={tw("absolute bottom-10 w-full")}>
        <View
          style={tw(
            "px-10 py-6 flex flex-row justify-between text-white text-sm"
          )}
        >
          <View style={tw("text-white w-1/2 pr-20")}>
            <View style={tw("text-secondary-100")}>
              <Text style={stylesPDF.boldHead}>Kunde</Text>
            </View>
            <Text>{customerInformation}</Text>
          </View>
          <View style={tw("text-white w-1/2 pr-20")}>
            <View style={tw("text-secondary-100")}>
              <Text style={stylesPDF.boldHead}>Leverandør</Text>
            </View>
            <Text style={tw("font-sm")}>{companyInformation}</Text>
          </View>
        </View>
      </View>
    </Page>
  );
};
export default FrontPage;
