import { Dayjs } from 'dayjs';
export type Worker = {
    Id: string;
    Active: boolean;
    FirstName: string;
    LastName: string;
    JobTitle: string;
    EmployerId: string;
    StreetAddress: string;
    City: string;
    PostalCode: string;
    MobileNumber: string;
    PhoneNumber: string;
    DateHired: string; // ISO date string
    EmployeeNumber: string;
    EmergencyContact1: string;
    EmergencyContact2: string;
    EmergencyNotes: string;
    CreatedOn: string; // ISO date string
    LastModifiedOn: string; // ISO date string
}

export type WorkerForm = {
    FirstName: string;
    LastName: string;
    JobTitle: string;
    StreetAddress: string;
    City: string;
    PostalCode: string;
    MobileNumber: string;
    PhoneNumber: string;
    DateHired: string;
    Position: string;
    EmployeeNumber: string;
    EmergencyContact1: string;
    EmergencyContact2: string;
    EmergencyNotes: string;
}

export type WorkerLocations = {
    Id: string;
    Name: string;
    Description: string;
    Address: string;
    StartDate: string;
    EndDate: string;
    CreatingCompanyId: string;
    IsArchived: boolean;
    CreatedOn: string;
    LastModifiedOn: string;
}

export type WorkersFilter = {
    firstName: any;
    lastName: any;
    jobTitle: any;
    isArchived: any;
    locationId: any;
    page: any;
    count: any;
};