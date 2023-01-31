import React from "react";
import { Page, Text, View, Document, Image } from "@react-pdf/renderer";
import { stylesPDF, tw } from "./Style";
import Header from "./components/Header";
import Footer from "./components/Footer";
// import Footer from "./Footer";

const SectionStyle = "mx-10 mt-10";

type InspectionPdfProps = {
  logoSrc?: string;
  companyName: string;
  customerName: string;
};
type FileInfo = {
  name: string;
  base64: string | null;
};
const styles = {
  boldHead: {
    fontFamily: "Inter",
    fontWeight: 600,
    paddingTop: 5,
    fontSize: 12,
  },
};
export default function InspectionPdf() {
  //   const { name, updated_at, status, date_time } = inspection;
  const logoSrc = "/img/logo.png";
  const files = [
    { name: "google", base64: "/img/google.png" },
    { name: "google", base64: "/img/pic.png" },
    { name: "tilbud.pdf", base64: null },
  ];
  const stepsInformation = [
    {
      name: "En god gjerning",
      description: "Ta et bilde ab katten din og send det til Ane. ",
      response: "dette funker",
      step_number: "1",
      type: "Image",
      files: [],
    },
    {
      name: "En god gjerning",
      description: "Ta et bilde ab katten din og send det til Ane. ",
      response: "dette funker",
      step_number: "1",
      type: "Image",
      files: files,
    },
  ];

  const fileResponse = (files: FileInfo[]) => {
    return files.map(({ base64, name }, index) => {
      if (!base64)
        return (
          <View key={index} style={tw("p-10 w-full")}>
            <Text style={tw("text-sm pb-4")}>
              Dokumentet {name} kunne ikke vises. (Støttede formater: png, jpg
              eller jpeng)
            </Text>
          </View>
        );
      return (
        <View key={index} style={tw("p-10 w-full")}>
          <Image style={{ width: 150, borderRadius: 10 }} src={base64} />
          <Text style={tw("text-sm bt-4")}>{name}</Text>
        </View>
      );
    });
  };

  const steps = stepsInformation.map(function (
    { description, name, response, step_number, type, files },
    index
  ) {
    const myFiles = fileResponse(files);
    return (
      <View key={index} style={tw("pt-10 w-full")}>
        <Text style={tw("text-xl")}>
          Steg {step_number} – {}
          <Text style={tw("text-system-green")}>
            {"getInspectionTypeText(type)"}
          </Text>
        </Text>
        <View style={tw("pt-4")}>
          <Text style={stylesPDF.boldHead}>{name}</Text>
          <Text style={tw("text-system-gray text-sm pb-4")}>{description}</Text>
        </View>
        <View style={tw("pt-4")}>
          <Text style={stylesPDF.boldHead}>Svar</Text>
          {!files.length ? (
            <Text style={tw("text-system-gray text-sm pb-4")}>{response}</Text>
          ) : (
            myFiles
          )}
        </View>
      </View>
    );
  });

  const inspectionDetails = (
    <Page size="A4" style={tw("relative font-sans pb-40")}>
      <Header logoSrc={logoSrc} />

      <View style={tw(`${SectionStyle}`)}>
        <View style={tw("flex flex-row justify-between")}>
          <View style={{ width: "50%", paddingRight: 60 }}>
            <Text style={styles.boldHead}>Kunde</Text>
            <Text style={{ fontSize: 12 }}>{"customerName"}</Text>
          </View>
          <View style={{ width: "50%", paddingRight: 60 }}>
            <Text style={styles.boldHead}>Leverandør</Text>
            <Text style={{ fontSize: 12 }}>{"companyName"}</Text>
          </View>
        </View>
      </View>

      <View style={tw(`${SectionStyle} pt-10`)}>
        <View>
          <Text style={tw("text-h2")}>Digital Befaring</Text>
        </View>
        <View style={tw("flex flex-row")}>
          <View style={{ width: "50%", padding: 10 }}>
            <Text style={styles.boldHead}>Navn på befaring</Text>
            <Text style={{ fontSize: 12, paddingBottom: 20 }}>{"name"}</Text>
            <Text style={styles.boldHead}>Prosjekt</Text>
            <Text style={{ fontSize: 12, paddingBottom: 20 }}>
              {"(status)"}
            </Text>
          </View>
          <View style={{ width: "50%", padding: 10 }}>
            <Text style={styles.boldHead}>Dato sendt</Text>
            <Text style={{ fontSize: 12, paddingBottom: 20 }}>
              {"(date_time)"}
            </Text>
            <Text style={styles.boldHead}>Dato gjennomørt</Text>
            <Text style={{ fontSize: 12, paddingBottom: 20 }}>
              {"(updated_at)"}
            </Text>
          </View>
        </View>
      </View>

      <View style={tw(`${SectionStyle}`)}>{steps}</View>

      <Footer dokumentasjonstype={"Befaringsdokumentasjon"} />
    </Page>
  );

  return (
    <Document>
      {/* {
        <FrontPage
          title={"Digital befaring"}
          subtitle={"name"}
          logoSrc={logoSrc}
          customerInformation={"customerName"}
          supplierInformation={"companyName"}
        />
      } */}
      {inspectionDetails}
    </Document>
  );
}
