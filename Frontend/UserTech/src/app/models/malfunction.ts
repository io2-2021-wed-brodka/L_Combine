export interface Malfunction{
    id: string;
    bikeId: string;
    description: string;
    reportingUserId: string;
    state: MalfunctionState;
}

export enum MalfunctionState{
    BikeRented = "rented",
    Waiting = "waiting",
    InReparation = "inReparation"
}
