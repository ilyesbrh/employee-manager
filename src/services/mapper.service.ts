import dayjs, { Dayjs } from 'dayjs';
import { WorkerForm, Worker } from '../models/worker';

export function mapWorkerToWorkerForm(worker: Worker): WorkerForm {
    return {
        FirstName: worker.FirstName,
        LastName: worker.LastName,
        JobTitle: worker.JobTitle,
        StreetAddress: worker.StreetAddress,
        City: worker.City,
        PostalCode: worker.PostalCode,
        MobileNumber: worker.MobileNumber,
        PhoneNumber: worker.PhoneNumber,
        DateHired: dayjs(worker.DateHired),
        Position: '',
        EmployeeNumber: worker.EmployeeNumber,
        EmergencyContact1: worker.EmergencyContact1,
        EmergencyContact2: worker.EmergencyContact2,
        EmergencyNotes: worker.EmergencyNotes,
    };
}