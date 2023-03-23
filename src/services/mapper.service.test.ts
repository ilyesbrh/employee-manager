import { Worker, WorkerForm } from '../models/worker';
import dayjs from 'dayjs';
import { mapWorkerToWorkerForm } from './mapper.service';

describe('workerMapper', () => {
    describe('mapWorkerToWorkerForm', () => {
        it('should map a worker object to a worker form object', () => {
            const worker: Worker = {
                Id: '123',
                FirstName: 'John',
                LastName: 'Doe',
                JobTitle: 'Worker',
                StreetAddress: '123 Main St',
                City: 'New York',
                PostalCode: '12345',
                MobileNumber: '555-555-5555',
                PhoneNumber: '555-123-4567',
                DateHired: '2021-01-01T00:00:00',
                EmployeeNumber: '12345',
                EmergencyContact1: 'Jane Doe',
                EmergencyContact2: 'Bob Smith',
                EmergencyNotes: 'Test notes',
                CreatedOn: '2021-03-23T00:00:00',
                LastModifiedOn: '2021-03-23T00:00:00',
                Active: true,
                EmployerId: 'abc',
            };

            const expected: WorkerForm = {
                FirstName: 'John',
                LastName: 'Doe',
                JobTitle: 'Worker',
                StreetAddress: '123 Main St',
                City: 'New York',
                PostalCode: '12345',
                MobileNumber: '555-555-5555',
                PhoneNumber: '555-123-4567',
                DateHired: dayjs('2021-01-01T00:00:00'),
                Position: '',
                EmployeeNumber: '12345',
                EmergencyContact1: 'Jane Doe',
                EmergencyContact2: 'Bob Smith',
                EmergencyNotes: 'Test notes',
            };

            const result = mapWorkerToWorkerForm(worker);

            expect(result).toEqual(expected);
        });
    });
});
