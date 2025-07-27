export interface AuthModel {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    isAdmin: boolean;
    canScan: boolean;
    iat: number;
} 

export interface EmailForm {
    email: string;
    password: string;
    oAuth: boolean;
    firstName: string;
    lastName: string;
}

export interface BaseInfoForm {
    firstName: string;
    lastName: string;
}

export interface LoginCredentials {
    email: string;
    password: string;
    oAuth: boolean;
}