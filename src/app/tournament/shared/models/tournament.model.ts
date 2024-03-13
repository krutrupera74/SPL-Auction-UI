export interface TournamentAddModel {
    name: string;
    isActive: boolean;
    description: string;
    sportId: string;
    tournamentDates: string;
}

export interface TournamentUpdateModel {
    id: string;
    name: string;
    isActive: boolean;
    description: string;
    sportId: string;
    tournamentDates: string;
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