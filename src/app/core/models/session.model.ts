export interface HallModel {
    _id?: string;
    name: string;
    location: string;
}

export interface TimeSlotModel {
    _id?: string;
    startTime: string;
    endTime: string;
    noHalls: boolean;
    details: {
        title: string;
        location: string;
    }
}

export interface SessionModel {
    _id: string;
    type: string;
    typeColor: string;
    title: string;
    description: string;
    hallId: string;
    timeSlotId: string;
    speakers: string[];
}