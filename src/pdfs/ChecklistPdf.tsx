import FrontPage from "./components/FrontPage";
import { Page, Text, View, Document, Image, Font } from "@react-pdf/renderer";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { stylesPDF, tw } from "./Style";
import ContactInformation from "./components/ContactInformation";

type ChecklistItemTypeEnum = "select" | "title" | "checkbox";
export interface FileInfo {
  fileUrl: string;
  fileType: string;
  name: string;
}
export type ChecklistItem = {
  title: string;
  index: number;
  type: ChecklistItemTypeEnum;
  value?: string;
  files?: FileInfo[];
};
export interface FormattedFileInfo {
  base64: string | null;
  name: string;
}

type ChecklistPdfPost = {
  title: string;
  description?: string;
  checklistItem: ChecklistItem[];
  customerInformation: string;
  companyInformation: string;
  projectNumber?: number;
  projectTitle: string;
  formattedLogo?: string;
};

export type FormattedchecklistItem = Omit<ChecklistItem, "files"> & {
  files?: FormattedFileInfo[];
};
type ChecklistPdfProps = {
  data: ChecklistPdfPost;
  formattedLogo: string;
  formattedChecklistItem: FormattedchecklistItem[];
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
  formattedChecklistItem,
}: ChecklistPdfProps) {
  const {
    title,
    description,
    customerInformation,
    companyInformation,
    projectNumber,
    projectTitle,
  } = data;
  const items = formattedChecklistItem.map(
    ({ index, title, type, value, files }) => {
      const images = files?.length
        ? files.map(function (file, index) {
            if (!file.base64) return null;
            return (
              <Image key={index} style={{ width: 200 }} src={file.base64} />
            );
          })
        : null;
      if (type === "title")
        return (
          <View key={index} style={tw("pt-6 w-full")}>
            <Text style={tw("font-bold text-lg")}>{value}</Text>
            {images}
          </View>
        );
      return (
        <View key={index} style={tw("pt-6 w-full")}>
          <Text style={tw("text-md")}>
            {index + 1}. {title} – {resolveChecklistType(type)}
          </Text>
          <Text style={tw("text-rg text-system-green110 font-bold mt-4")}>
            {type === "select" &&
              (value === "true" ? "Gjennomført" : "Ikke gjennomført")}
            {type === "checkbox" &&
              (value === "false" ? "Ikke gjennomført" : value)}
          </Text>
          {images}
        </View>
      );
    }
  );
  const checklistDetails = (
    <Page size="A4" style={tw("relative font-sans pb-40")}>
      <Header logoSrc={formattedLogo} />
      <ContactInformation
        customerInformation={customerInformation ?? "-"}
        companyInformation={companyInformation}
      />

      <View style={tw(`${SectionStyle}`)}>
        <View style={tw(`mt-10`)}>
          <View>
            <Text style={tw("text-h2")}>Sjekkliste</Text>
          </View>
          <View style={tw("flex flex-row pt-10")}>
            <View style={{ width: "50%", paddingTop: 0 }}>
              <Text style={styles.boldHead}>Prosjektnummer</Text>
              <Text style={{ fontSize: 12 }}>{projectNumber}</Text>
              <Text style={styles.boldHead}>Navn på Prosjekt</Text>
              <Text style={{ fontSize: 12 }}>{projectTitle}</Text>
            </View>
            <View style={{ width: "50%", paddingTop: 0 }}>
              <Text style={styles.boldHead}>Beskrivelse</Text>
              <Text style={{ fontSize: 12 }}>{description}</Text>
            </View>
          </View>
        </View>
      </View>
      <View style={tw(`${SectionStyle}`)}>{items}</View>
      <Footer dokumentasjonstype={"Sjekklistedokumentasjon"}></Footer>
    </Page>
  );
  return (
    <Document>
      <FrontPage
        title={"Sjekkliste"}
        projectNumber={projectNumber}
        subtitle={title}
        logoSrc={formattedLogo}
        customerInformation={customerInformation ?? "-"}
        companyInformation={companyInformation}
      />
      {checklistDetails}
    </Document>
  );
}

function resolveChecklistType(type?: ChecklistItemTypeEnum) {
  switch (type) {
    case "select":
      return "Opprettet";
    case "title":
      return "Startet";
    case "checkbox":
      return "Flervalg";
  }
  return "";
}
