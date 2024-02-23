export interface TournamentAddModel {
    name: string;
    startDate: string;
    endDate: string;
    isActive: boolean;
    description: string;
    sportId: string;
}

export interface TournamentUpdateModel {
    id: string;
    name: string;
    startDate: string;
    endDate: string;
    isActive: boolean;
    description: string;
    sportId: string;
}

export class TournamentsList {
    id: string;
    name: string;
    startDate: string;
    endDate: string;
    isActive: boolean;
    description: string;
    sportId: string;
}