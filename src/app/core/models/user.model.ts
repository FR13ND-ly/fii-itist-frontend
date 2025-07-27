export interface UserModel {
    _id?: string;
    email: string;
    firstName: string;
    lastName: string;
    educationLevel: string;
    educationInstitution: string;
    educationYear: string;
    faculty: string;
    occupation: string;
    experience: string;
    heardAboutUs: string;
    oAuth: boolean;
    isAdmin: boolean;
    canScan: boolean;
}

export interface EnrolmentModel {
    _id?: string;
    userId: string;
    sessionId: string;
    arrived: boolean;
}


export interface AttendanceModel {
    _id?: string;
    userId: string;
    sessionId: string;
}