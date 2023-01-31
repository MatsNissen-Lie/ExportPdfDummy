import FrontPage from "./components/FrontPage";
import { Page, Text, View, Document, Image } from "@react-pdf/renderer";
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

type ChangeOrderProps = {
  data: ChangeOrderPdfPost;
  formattedLogo: string;
  formattedSignature: string;
};
const SectionStyle = "mx-10 mt-10";
const styles = {
  boldHead: {
    fontFamily: "Inter",
    fontWeight: 600,
    paddingTop: 24,
    fontSize: 12,
  },
};

export default function ChangeOrder({
  data,
  formattedLogo,
  formattedSignature,
}: ChangeOrderProps) {
  const {
    title,
    description,
    customerInformation,
    companyInformation,
    projectTitle,
    projectNumber,

    hours,
    cost,
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
            <Text style={tw("text-h2")}>Enrdingsordre</Text>
          </View>
          <View style={tw("flex flex-row pt-10")}>
            <View style={{ width: "50%", paddingTop: 0 }}>
              <Text style={styles.boldHead}>Prosjekt</Text>
              <Text style={{ fontSize: 12 }}>{projectTitle}</Text>
              {projectNumber && (
                <>
                  <Text style={styles.boldHead}>Prosjektnummer</Text>
                  <Text style={{ fontSize: 12 }}>{projectNumber}</Text>
                </>
              )}
            </View>
            <View style={{ width: "50%", paddingTop: 0 }}>
              <Text style={styles.boldHead}>Beskrivelse</Text>
              <Text style={{ fontSize: 12 }}>{description}</Text>
            </View>
          </View>
        </View>
        <View style={tw(`flex flex-row pt-10`)}>
          <View style={{ width: "50%" }}>
            <Text style={stylesPDF.boldHead}>Kostand knyttet til avvik</Text>
            <Text style={tw("text-system-gray text-md")}>NOK {cost},-</Text>
          </View>
          <View style={{ width: "50%" }}>
            <Text style={stylesPDF.boldHead}>
              Antall timer knyttet til avviket
            </Text>
            <Text style={tw("text-system-gray text-md")}>{hours} timer</Text>
          </View>
        </View>
      </View>

      <View fixed style={tw(`absolute bottom-[100px] w-full px-10`)}>
        <Image style={{ width: 300 }} src={formattedSignature} />
      </View>
      <Footer dokumentasjonstype={"Sjekklistedokumentasjon"} />
    </Page>
  );
  return (
    <Document>
      <FrontPage
        title={"Enrdingsordre"}
        subtitle={title}
        projectNumber={projectNumber}
        logoSrc={formattedLogo}
        customerInformation={customerInformation ?? "-"}
        companyInformation={companyInformation}
      />
      {ChangeOrder}
    </Document>
  );
}
