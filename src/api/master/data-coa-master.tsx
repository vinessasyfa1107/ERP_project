
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
      `http://192.168.100.210:8080/coa/query/`, {mode: 'no-cors'}
    );
    
    const results = await response.json();
    // console.log("response ", results)
    const documents = results as resultpengeluaran[];
    console.log(documents);
    return documents.slice(0, 10).map(({ id, coa_kd, coa_name, category  }) => ({
        id, coa_kd, coa_name, category
      }));
  }