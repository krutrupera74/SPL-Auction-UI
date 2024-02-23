export class SportsList {
    id: string;
    name: string;
    isActive: boolean;
    organizationId: string;
}

export interface SportsAddModel {
    name: string;
    isActive: boolean;
    organizationId: string;
}

export interface SportsUpdateModel {
    id: string;
    name: string;
    isActive: boolean;
    organizationId: string;
}