export function uriToTrackID(uri: string[]): string[] {
    let trackIds = [];
    for (let i = 0; i < uri.length; i++) {
        console.log("converting id ", uri[i].split(":")[2]);
        trackIds[i] = uri[i].split(":")[2];
    }
    return trackIds;
}