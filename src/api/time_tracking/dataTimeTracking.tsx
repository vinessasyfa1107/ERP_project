export type resultTimeTracking = {
    "approval_ts": string,
    "planning_id": number,
    "entry_by": number,
    "realization": number,
    "status": string
}


export async function dataTimeTracking(query: string) {
    if (query.trim() === "") return [];
    // /?q=${encodeURI(query)}


    const response = await fetch(
        `/api/approval/`
    );

    const results = await response.json();
    // console.log("response ", results)
    const documents = results as resultTimeTracking[];
    console.log(documents, "test");
    return documents.slice(0, documents.length).map(({ approval_ts, planning_id, entry_by, realization, status  }) => ({
        approval_ts, planning_id, entry_by, realization, status 
    }));
}