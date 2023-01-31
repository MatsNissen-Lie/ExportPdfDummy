import FrontPage from "./components/FrontPage";
import { Page, Text, View, Document, Image, Font } from "@react-pdf/renderer";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { stylesPDF, tw } from "./Style";
import ContactInformation from "./components/ContactInformation";

type ChangeOrderPdfPost = {
  title: string;
  description: string;
  cost?: number;
  hours: number;
  companyLogoUrl?: string;
  signatureUrl?: string;
  projectNumber?: number;
  projectTitle: string;
  customerInformation?: string;
  companyInformation: string;
};

type checklistPdfProps = {
  data: ChangeOrderPdfPost;
  formattedLogo: string;
  formattedSignature: string;
};
const SectionStyle = "mx-10 mt-10";
const styles = {
  boldHead: {
    fontFamily: "Inter",
    fontWeight: 600,
    paddingTop: 16,
    fontSize: 12,
  },
};

export default function ChecklistPdf({
  data,
  formattedLogo,
  formattedSignature,
}: checklistPdfProps) {
  const {
    title,
    description,
    customerInformation,
    companyInformation,
    projectTitle,
    projectNumber,
  } = data;

  const ChangeOrder = (
    <Page size="A4" style={tw("relative font-sans pb-40")}>
      <Header logoSrc={formattedLogo} />
      <ContactInformation
        customerInformation={customerInformation ?? "-"}
        companyInformation={companyInformation}
      />

      <View style={tw(`${SectionStyle}`)}>
        <View style={tw(`mt-10`)}>
          <View>
            <Text style={tw("text-h2")}>Dokumentasjon av avvik</Text>
          </View>
          <View style={tw("flex flex-row pt-10")}>
            <View style={{ width: "50%", paddingTop: 0 }}>
              <Text style={styles.boldHead}>Prsjektnummer</Text>
              <Text style={{ fontSize: 12 }}>{projectNumber}</Text>
              <Text style={styles.boldHead}>Prsjektnummer</Text>
              <Text style={{ fontSize: 12 }}>{projectTitle}</Text>
            </View>
            <View style={{ width: "50%", paddingTop: 0 }}>
              <Text style={styles.boldHead}>Beskrivelse</Text>
              <Text style={{ fontSize: 12 }}>{description}</Text>
            </View>
          </View>
        </View>
      </View>
      <View fixed style={tw(`${SectionStyle} absolute bottom-[100px] w-full `)}>
        <Image style={{ width: 300 }} src={formattedSignature} />
      </View>
      <Footer dokumentasjonstype={"Sjekklistedokumentasjon"} />
    </Page>
  );
  return (
    <Document>
      {/* <FrontPage
        title={"Enrdingsordre"}
        subtitle={title}
        projectNumber={projectNumber}
        logoSrc={formattedLogo}
        customerInformation={customerInformation}
        companyInformation={companyInformation}
      /> */}
      {ChangeOrder}
    </Document>
  );
}
