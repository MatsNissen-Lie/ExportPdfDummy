import { Page, Text, View, Document, Image, Font } from "@react-pdf/renderer";
import { resolve } from "node:path/win32";
import createTw from "react-pdf-tailwind";
import Footer from "./components/Footer";
import Header from "./components/Header";
// import { tw } from "./StyleConfig";
// import Footer from "./Footer";

Font.register({
  family: "Open Sans",
  fonts: [
    {
      src: "https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-regular.ttf",
    },
    {
      src: "https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-600.ttf",
      fontWeight: 600,
    },
  ],
});

Font.register({
  family: "Inter",
  fonts: [
    {
      src: "https://fonts.gstatic.com/s/inter/v2/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZFhjQ.ttf",
    },
    {
      src: "https://fonts.gstatic.com/s/inter/v2/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuGKYAZFhjQ.ttf",
      fontWeight: 600,
    },
  ],
});
const SPACING = {
  DEFAULT: "1.5rem", // redundant?
  0.5: "0.125rem", // XTiny
  1: "0.25rem", // Tiny
  2: "0.5rem", // XXSmall
  3: "0.75rem", // XSmall
  4: "1rem", // Small
  6: "1.5rem", // Regular
  8: "2rem", // Medium
  12: "3rem", // Large
  16: "4rem", // XLarge
  20: "5rem", // XXLarge
  24: "6rem", // Huge
  32: "8rem", // XHuge
  48: "12rem", // XXHuge
};
//kan kjøre tailwind styling
export const tw = createTw({
  theme: {
    fontSize: {
      xs: ["0.75rem", "1rem"],
      sm: ["0.875rem", "1rem"],
      rg: ["1rem", "1.5rem"],
      md: ["1.25rem", "1.75rem"],
      lg: ["1.5rem", "2rem"],
      "font-sm": "1rem",
      "font-md": "1.5rem",
      "font-lg": "2rem",
      lglogo: ["3rem", "2rem"],
      h2: 30,
    },
    fontFamily: {
      sans: ["Open Sans"],
      inter: ["Inter"],
    },
    extend: {
      height: {
        "100": 100,
        "16": "1rem",
      },
      padding: { SPACING },
      paddingTop: { SPACING },
      paddingBottom: { SPACING },
      paddingRight: { SPACING },
      paddingLeft: { SPACING },
      colors: {
        primary: {
          DEFAULT: "#FFBB9D", // OLD
          light: "#FFEBE2", // OLD
          dark: "#FFA883", // OLD
          110: "#011A0E",
          100: "#04331C",
          90: "#076638",
          10: "#DAE9E8",
        },
        secondary: {
          DEFAULT: "#04331C", // OLD
          110: "#D5F864",
          100: "#E8FE96",
          90: "#EFFFDC",
        },
        system: { purple: "#6938EF", gray: "#525252" },
      },
    },
  },
});

const stylesPDF = {
  boldHead: {
    fontFamily: "Inter",
    fontWeight: 600,
    paddingTop: 5,
    fontSize: 12,
  },
};
const SectionStyle = "mx-10 mt-10";

const myList = ["google.png", "pic.png"];
const vedlegg = myList.map(function (ele) {
  return (
    <Page key={ele}>
      <Text style={tw("text-h2")}>Vedlegg</Text>
      <Image style={tw("w-full p-10 h-100 ")} src={`/img/${ele}`} />
    </Page>
  );
});
type DeviationPdfProps = {
  deviation: string;
  projectNumber: string;
  logoSrc?: string;
};
export const toDataURL = async (url: string) => {
  const response = await fetch(url);
  const myBlob = await response.blob();
  const base64 = await new Promise(async (resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(myBlob);
  });
  return base64 as string;
};
const DeviationPdf = ({
  deviation,
  projectNumber,
  logoSrc,
}: DeviationPdfProps) => {
  // console.log(base64);

  // fetch(url)
  //   .then((response) => response.blob())
  //   .then(
  //     (blob) =>
  //       new Promise((resolve, reject) => {
  //         const reader = new FileReader();
  //         reader.onloadend = () => resolve(reader.result);
  //         reader.onerror = reject;
  //         reader.readAsDataURL(blob);
  //       })
  //   );

  const header = (
    <View
      fixed
      style={tw(
        "bg-primary-100 h-min-40 px-10 py-6 flex flex-row justify-between items-center"
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
        <Text style={{ fontSize: 14 }}>DateTime</Text>
      </View>
    </View>
  );

  const footer = (
    <View
      style={{
        position: "absolute",
        bottom: 0,
        height: 40,
        width: "100%",
        display: "flex",
        alignItems: "center",
        backgroundColor: "green",
        justifyContent: "space-between",
        flexDirection: "row",
        fontSize: 12,
        paddingHorizontal: 40,
        paddingTop: 10,
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
      <Text style={tw("text-right w-1/3")}>Avviksdokumentasjon</Text>
    </View>
  );

  const avviksDetaljer = (
    <Page size="A4" style={tw("relative font-sans pb-40")}>
      <Header logoSrc={logoSrc ?? ""} />

      <View style={tw(`${SectionStyle}`)}>
        <View style={tw("px-10 flex flex-row justify-between")}>
          <View style={{ width: "50%", paddingRight: 60 }}>
            <Text style={stylesPDF.boldHead}>Kunde</Text>
            <Text style={{ fontSize: 12 }}>
              firmanavn, navn, adresse, postnummer, by, land
            </Text>
          </View>
          <View style={{ width: "50%", paddingRight: 60 }}>
            <Text style={stylesPDF.boldHead}>Leverandør</Text>
            <Text style={{ fontSize: 12 }}>
              firmanavn, navn, adresse, postnummer, by, land
            </Text>
          </View>
        </View>

        <View style={tw(`${SectionStyle}`)}>
          <View>
            <Text style={tw("text-h2")}>Dokumentasjon av avvik</Text>
          </View>
          <View style={tw("flex flex-row")}>
            <View style={{ width: "50%", padding: 10 }}>
              <Text style={stylesPDF.boldHead}>Prsjektnummer</Text>
              <Text style={{ fontSize: 12, paddingBottom: 20 }}>121333</Text>
              <Text style={stylesPDF.boldHead}>Prsjektnummer</Text>
              <Text style={{ fontSize: 12, paddingBottom: 20 }}>121333</Text>
              <Text style={stylesPDF.boldHead}>Prsjektnummer</Text>
              <Text style={{ fontSize: 12, paddingBottom: 20 }}>121333</Text>
              <Text style={stylesPDF.boldHead}>Prsjektnummer</Text>
              <Text style={{ fontSize: 12, paddingBottom: 20 }}>121333</Text>
              <Text style={stylesPDF.boldHead}>Prsjektnummer</Text>
              <Text style={{ fontSize: 12, paddingBottom: 20 }}>121333</Text>
              <Text style={stylesPDF.boldHead}>Prsjektnummer</Text>
              <Text style={{ fontSize: 12, paddingBottom: 20 }}>121333</Text>
              <Text style={stylesPDF.boldHead}>Prsjektnummer</Text>
              <Text style={{ fontSize: 12, paddingBottom: 20 }}>121333</Text>
              <Text style={stylesPDF.boldHead}>Prsjektnummer</Text>
              <Text style={{ fontSize: 12, paddingBottom: 20 }}>121333</Text>
              <Text style={stylesPDF.boldHead}>Prsjektnummer</Text>
              <Text style={{ fontSize: 12, paddingBottom: 20 }}>121333</Text>
              <Text style={stylesPDF.boldHead}>Prsjektnummer</Text>
              <Text style={{ fontSize: 12, paddingBottom: 20 }}>121333</Text>
              <Text style={stylesPDF.boldHead}>Prsjektnummer</Text>
              <Text style={{ fontSize: 12, paddingBottom: 20 }}>121333</Text>
              <Text style={stylesPDF.boldHead}>Prsjektnummer</Text>
              <Text style={{ fontSize: 12, paddingBottom: 20 }}>121333</Text>
              <Text style={stylesPDF.boldHead}>Prsjektnummer</Text>
              <Text style={{ fontSize: 12, paddingBottom: 20 }}>121333</Text>
            </View>
            <View style={{ width: "50%", padding: 10 }}>
              <Text style={stylesPDF.boldHead}>Beskrivelse</Text>
              <Text style={{ fontSize: 12, paddingBottom: 20 }}>
                Det har skjedd en brannskade i Eventyrveien 34B. Dette har ført
                til et hull i veggen og må fikses asap. Lorem ipsum lorem ipsum
                lorem ipsum lorem ipsum lorem ipsum lorem ipsum.
              </Text>
              <Text style={stylesPDF.boldHead}>Forebyggende tiltak</Text>
              <Text style={{ fontSize: 12, paddingBottom: 20 }}>
                Dette er en beskrivelse av hvordan vi tenker å forhindre at
                avviket skal skje en gang til.
              </Text>
            </View>
          </View>
        </View>

        <Image
          src={
            "data:application/pdf;base64,JVBERi0xLjMKJf////8KOSAwIG9iago8PAovVHlwZSAvRXh0R1N0YXRlCi9jYSAxCj4+CmVuZG9iago4IDAgb2JqCjw8Ci9UeXBlIC9QYWdlCi9QYXJlbnQgMSAwIFIKL01lZGlhQm94IFswIDAgNTk1LjI4MDAyOSA4NDEuODkwMDE1XQovQ29udGVudHMgNiAwIFIKL1Jlc291cmNlcyA3IDAgUgovVXNlclVuaXQgMQo+PgplbmRvYmoKNyAwIG9iago8PAovUHJvY1NldCBbL1BERiAvVGV4dCAvSW1hZ2VCIC9JbWFnZUMgL0ltYWdlSV0KL0V4dEdTdGF0ZSA8PAovR3MxIDkgMCBSCj4+Ci9Gb250IDw8Ci9GMSAxMCAwIFIKPj4KPj4KZW5kb2JqCjEyIDAgb2JqCihyZWFjdC1wZGYpCmVuZG9iagoxMyAwIG9iagoocmVhY3QtcGRmKQplbmRvYmoKMTQgMCBvYmoKKEQ6MjAyMzAxMTcwODA2MjRaKQplbmRvYmoKMTEgMCBvYmoKPDwKL1Byb2R1Y2VyIDEyIDAgUgovQ3JlYXRvciAxMyAwIFIKL0NyZWF0aW9uRGF0ZSAxNCAwIFIKPj4KZW5kb2JqCjEwIDAgb2JqCjw8Ci9UeXBlIC9Gb250Ci9CYXNlRm9udCAvSGVsdmV0aWNhCi9TdWJ0eXBlIC9UeXBlMQovRW5jb2RpbmcgL1dpbkFuc2lFbmNvZGluZwo+PgplbmRvYmoKNCAwIG9iago8PAo+PgplbmRvYmoKMyAwIG9iago8PAovVHlwZSAvQ2F0YWxvZwovUGFnZXMgMSAwIFIKL05hbWVzIDIgMCBSCi9WaWV3ZXJQcmVmZXJlbmNlcyA1IDAgUgo+PgplbmRvYmoKMSAwIG9iago8PAovVHlwZSAvUGFnZXMKL0NvdW50IDEKL0tpZHMgWzggMCBSXQo+PgplbmRvYmoKMiAwIG9iago8PAovRGVzdHMgPDwKICAvTmFtZXMgWwpdCj4+Cj4+CmVuZG9iago1IDAgb2JqCjw8Ci9EaXNwbGF5RG9jVGl0bGUgdHJ1ZQo+PgplbmRvYmoKNiAwIG9iago8PAovTGVuZ3RoIDMwMgovRmlsdGVyIC9GbGF0ZURlY29kZQo+PgpzdHJlYW0KeJzNU01Lw0AQvc+v2D9gOrPfC8VDUQveKgEP4mlJqpAWasDf7+6GxN2aiEUQM2HgvZnMzHsQYhjiikKykirrEEkxf4BTiFg6gHKq4haRuwC7Ei4Dnzdmo7sF/hLWA5YjC7gMfFLUpTyGhxd4ZEdYbXti+x5WN837q28ethvme8DwqSQyWhpU1nKh2c+o3h/TmnkBbw20sAsOU7phyIXpHFWFChFFuriAy8DnjYVD8/wl7F+abnjpZ3RYSYfkNBorBQkTKHH2TKbPC/jO9JHSGN9EfnaRrnjkzq5M9bhyVHHKps/8UZs6m5mV6jD5jhhZVrfwtFbiOtTXWmlhpHYDaHXDkQtBAT6z+h5u67BsHGej3EHMjL7dFLlSTpNH9MWGwNB/toH/yoYYH5Z0ASYKZW5kc3RyZWFtCmVuZG9iagp4cmVmCjAgMTUKMDAwMDAwMDAwMCA2NTUzNSBmIAowMDAwMDAwNjgxIDAwMDAwIG4gCjAwMDAwMDA3MzggMDAwMDAgbiAKMDAwMDAwMDU5NCAwMDAwMCBuIAowMDAwMDAwNTczIDAwMDAwIG4gCjAwMDAwMDA3ODUgMDAwMDAgbiAKMDAwMDAwMDgyOCAwMDAwMCBuIAowMDAwMDAwMTg5IDAwMDAwIG4gCjAwMDAwMDAwNTkgMDAwMDAgbiAKMDAwMDAwMDAxNSAwMDAwMCBuIAowMDAwMDAwNDc1IDAwMDAwIG4gCjAwMDAwMDAzOTkgMDAwMDAgbiAKMDAwMDAwMDMwNyAwMDAwMCBuIAowMDAwMDAwMzM1IDAwMDAwIG4gCjAwMDAwMDAzNjMgMDAwMDAgbiAKdHJhaWxlcgo8PAovU2l6ZSAxNQovUm9vdCAzIDAgUgovSW5mbyAxMSAwIFIKL0lEIFs8OWUyNmU3ZTUxZTY1MTc3YjBmMmJjOWJkMjllMjdmMjA+IDw5ZTI2ZTdlNTFlNjUxNzdiMGYyYmM5YmQyOWUyN2YyMD5dCj4+CnN0YXJ0eHJlZgoxMjAyCiUlRU9GCg=="
          }
          style={{ backgroundColor: "green" }}
        ></Image>
        <Image
          src={toDataURL(
            "https://media-cldnry.s-nbcnews.com/image/upload/t_nbcnews-fp-1024-512,f_auto,q_auto:best/rockcms/2022-01/210602-doge-meme-nft-mb-1715-8afb7e.jpg"
          )}
          style={{ backgroundColor: "green" }}
        ></Image>

        <View style={tw(`${SectionStyle} flex flex-row`)}>
          <View style={{ width: "50%" }}>
            <Text style={stylesPDF.boldHead}>Kostand knyttet til avvik</Text>
            <Text style={tw("text-system-gray")}>NOK {1000},-</Text>
          </View>
          <View style={{ width: "50%" }}>
            <Text style={stylesPDF.boldHead}>
              Antall timer knyttet til avviket
            </Text>
            <Text style={tw("text-system-gray")}>{20} timer</Text>
          </View>
        </View>
      </View>
      <Footer></Footer>
    </Page>
  );
  return (
    <Document>
      {/* <FrontPage
        title={deviation}
        projectNumber={projectNumber}
        logoSrc={
          "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.simplilearn.com%2Fimage-processing-article&psig=AOvVaw14JgzSsZyIUrFLlnmewamV&ust=1674128484888000&source=images&cd=vfe&ved=0CBAQjRxqFwoTCPDZn9-E0fwCFQAAAAAdAAAAABAE"
        }
      /> */}
      {avviksDetaljer}
      {vedlegg}
    </Document>
  );
};

export default DeviationPdf;
