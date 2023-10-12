
export type resultpengeluaran = {
    "id": number,
    "account_name": string,
    "email": string,
    "access": string,
    "role": string,
    "category": string
}


export async function dataaccountmaster(query: string) {
    if (query.trim() === "") return [];
    // /?q=${encodeURI(query)}
    
             
    const response = await fetch(
      `http://localhost:8001/api/accountread/`, {mode: 'no-cors'}
    );
    
    const results = await response.json();
    // console.log("response ", results)
    const documents = results as resultpengeluaran[];
    console.log(documents);
    return documents.slice(0, 10).map(({ id, account_name, email, access, role, category  }) => ({
        id, account_name, email, access, role, category
      }));
  }