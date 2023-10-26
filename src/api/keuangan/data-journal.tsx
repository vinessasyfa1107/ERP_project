
export type resultdata = {
    "journal_id" : string,
    "journal_ts": string,
    "amount": number,
    "faktur": string,
    "keterangan": string
}


export async function DataJournal (query: string) {
    if (query.trim() === "") return [];
    // /?q=${encodeURI(query)}
    
             
    const response = await fetch(
      `/api/journal/`, {mode: 'no-cors'}
    );
    
    const results = await response.json();
    // console.log("response ", results)
    const documents = results as resultdata[];
    console.log(documents);
    return documents.slice(0, documents.length).map(({ journal_id, journal_ts, amount, faktur, keterangan }) => ({
        journal_id, journal_ts, amount, faktur, keterangan
      }));
  }