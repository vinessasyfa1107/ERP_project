
export type resultdata = {
    "planning_id": number,
    "income_ts" : Date,
    "amount": number,
    "faktur_ts": string,
    "coa_kd": string,
    "keterangan": string,
}


export async function DataIncome (query: string) {
    if (query.trim() === "") return [];
    // /?q=${encodeURI(query)}
    
             
    const response = await fetch(
      `/api/income/`, {mode: 'no-cors'}
    );
    
    const results = await response.json();
    // console.log("response ", results)
    const documents = results as resultdata[];
    console.log(documents);
    return documents.slice(0, documents.length).map(({ planning_id, income_ts, amount, faktur_ts, coa_kd, keterangan }) => ({
        planning_id, income_ts, amount, faktur_ts, coa_kd, keterangan
      }));
  }