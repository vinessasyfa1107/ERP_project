
export type resultpengeluaran = {
    "id": number,
    "coa_kd": string,
    "coa_name": string,
    "category": string
}


export async function datacoamaster(query: string) {
    if (query.trim() === "") return [];
    // /?q=${encodeURI(query)}
    
             
    const response = await fetch(
      `http://localhost:8001/api/coa/`, {mode: 'no-cors'}
    );
    
    const results = await response.json();
    // console.log("response ", results)
    const documents = results as resultpengeluaran[];
    console.log(documents);
    return documents.slice(0, 10).map(({ id, coa_kd, coa_name, category  }) => ({
        id, coa_kd, coa_name, category
      }));
  }