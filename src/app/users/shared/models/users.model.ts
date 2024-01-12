export class UserAddModel {
    username: string;
    password: string;
    organizationId: string;
    role: string;
    isActive: boolean;
}

export class UserUpdateModel {
    id: string;
    username: string;
    password: string;
    organizationId: string;
    role: string;
    isActive: boolean;
}

export class UsersList {
    id: string;
    organizationName: string;
    isActive: boolean;
}
