
export type resultpengeluaran = {
    "date": string,
    "value": string
}


export async function dataplanning(query: string) {
    if (query.trim() === "") return [];
    // /?q=${encodeURI(query)}
    
             
    const response = await fetch(
      `http://localhost:3000/json/grafik-planning.json`
    );
    
    const results = await response.json();
    // console.log("response ", results)
    const documents = results as resultpengeluaran[];
    console.log(documents);
    return documents.slice(0, 10).map(({ date, value }) => ({
        date, value
      }));
  }