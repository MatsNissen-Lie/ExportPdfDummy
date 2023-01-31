import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
  pdf,
  Font,
} from "@react-pdf/renderer";
import myPic from "./img/pic.png";
import { PDFViewer, PDFDownloadLink } from "@react-pdf/renderer";
import createTw from "react-pdf-tailwind";
import DeviationPdf, { toDataURL } from "./pdfs/DeviationPdf";
import InspectionPdf from "./pdfs/Inspection";
import ChecklistPdf, { FormattedchecklistItem } from "./pdfs/ChecklistPdf";
import ChangeOrder from "./pdfs/ChangeOrder";

const url = await toDataURL(
  "https://media-cldnry.s-nbcnews.com/image/upload/t_nbcnews-fp-1024-512,f_auto,q_auto:best/rockcms/2022-01/210602-doge-meme-nft-mb-1715-8afb7e.jpg"
);
const items: FormattedchecklistItem[] = [
  {
    title: "drikker vin, spiser ost",
    index: 1,
    type: "title",
    value: "hei",
    files: [
      {
        name: "hei",
        base64: url,
      },
      {
        name: "hei",
        base64: url,
      },
      {
        name: "hei",
        base64: url,
      },
    ],
  },
  {
    title: "string",
    index: 2,
    type: "checkbox",
    value: "false",
    files: [
      {
        name: "hei",
        base64: url,
      },
    ],
  },
  {
    title: "string",
    index: 3,
    type: "select",
    value: "true",
    files: [
      {
        name: "hei",
        base64: url,
      },
    ],
  },
];

const MyDocument = () => (
  // <DeviationPdf deviation={"Dokumentasjon av avvik"} projectNumber={"1233"} />
  // <ChecklistPdf
  //   data={{
  //     title: "Halla",
  //     description: "detta",
  //     checklistItem: [],
  //     customerInformation: "kunder",
  //     companyInformation: "Halla",
  //     projectNumber: 123,
  //     projectTitle: "Prosjekt sjekkliste",
  //     formattedLogo: undefined,
  //   }}
  //   formattedLogo={"/img/logo.png"}
  //   formattedChecklistItem={items}
  // />
  <ChangeOrder
    data={{
      title: "Fikse på Høgda",
      description: "Kaffe på proggerne",
      cost: 10000,
      hours: 66,
      projectNumber: 123,
      projectTitle: "Movie star",
      customerInformation: "Mygo",
      companyInformation: "Nissehus ASA",
    }}
    formattedLogo={"/img/logo.png"}
    formattedSignature={"/img/sign.png"}
  />
);

function App() {
  const downloadFile = (blob: Blob, fileName: string) => {
    const link = document.createElement("a");
    // create a blobURI pointing to our Blob
    link.href = URL.createObjectURL(blob);
    link.download = fileName;
    // some browser needs the anchor to be in the doc
    document.body.append(link);
    link.click();
    link.remove();
    // in case the Blob uses a lot of memory
    setTimeout(() => URL.revokeObjectURL(link.href), 7000);
  };

  const handleOnClick = async () => {
    const MyDocument1 = MyDocument();
    const blob = await pdf(MyDocument1).toBlob();
    downloadFile(blob, "test");
  };

  return (
    <div className="App">
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="bg-black h-8 w-full flex justify-center items-cente mb-10">
        <p className="text-lg bg-white">Its happening</p>
      </div>
      <div>
        <PDFViewer width={600} height={897}>
          <MyDocument />
        </PDFViewer>
        <button className="" onClick={handleOnClick}>
          download file
        </button>
        <div className="hidden">
          <PDFDownloadLink document={<MyDocument />} fileName="FORM">
            {({ loading }) =>
              loading ? (
                <button>Loading Document...</button>
              ) : (
                <button>Download</button>
              )
            }
          </PDFDownloadLink>
        </div>
      </div>
    </div>
  );
}

export default App;
