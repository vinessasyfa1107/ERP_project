import { dataIdPlan } from "../../../containers/dashboard/plannings/table/table-pengajuan-baru";

export type resultdata = {
  "pengajuan_id": number,
  "keterangan": string,
  "kebutuhan": string,
  "reference": string,
  "namapengajuan": String
}
  
  export async function DataDetailWeekly(query: string) {
    if (query.trim() === "") return [];
    // /?q=${encodeURI(query)}
  
  
    const response = await fetch(
      `/api/weeklypengajuan/${dataIdPlan()}`
    );
  
    const results = await response.json();
    // console.log("response ", results)
    const documents = results as resultdata[];
    console.log(documents, "TESTT");
    return documents.slice(0, documents.length).map(({ pengajuan_id, keterangan, kebutuhan, namapengajuan}) => ({
      pengajuan_id, keterangan, kebutuhan, namapengajuan
    }));
  }
