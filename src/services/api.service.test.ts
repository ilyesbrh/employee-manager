import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import api, {
    getWorkers,
    getWorker,
    getWorkerLocations,
    getWorkerImage,
    updateWorkerStatus,
} from "./api.service";
import { Worker, WorkerLocations } from "../models/worker";
import { WorkersFilter } from "../models/worker";
import { enqueueSnackbar } from "notistack";

const mock = new MockAdapter(api);
jest.mock("notistack");

const workerId = "cafcd692-655b-41e7-b8bf-5462abcd1a74";
const worker: Worker = {
    "Id": "cafcd692-655b-41e7-b8bf-5462abcd1a74",
    "Active": true,
    "FirstName": "v0tN75FL",
    "LastName": "Se+Ub1Il",
    "JobTitle": "Worker",
    "EmployerId": "629e5a81-fb1c-4b78-9d8d-cd498c677436",
    "StreetAddress": "li3Ua47M",
    "City": "A1dH3ZXj",
    "PostalCode": "12345",
    "MobileNumber": "222-222-2222",
    "PhoneNumber": 'null',
    "DateHired": "2018-10-12T00:00:00",
    "EmployeeNumber": 'null',
    "EmergencyContact1": 'null',
    "EmergencyContact2": 'null',
    "EmergencyNotes": 'null',
    "CreatedOn": "2017-10-11T12:34:21.033",
    "LastModifiedOn": "2020-05-20T13:06:55.35"
};
const workerLocations: WorkerLocations[] = [];
const filter: WorkersFilter = {
    "firstName": "az",
    "lastName": "",
    "jobTitle": "",
    "isArchived": false,
    "locationId": "",
    "page": 1,
    "count": 10,
};

beforeEach(() => {
    mock.reset();
});

test("getWorkers", async () => {
    mock.onGet("workers").reply(200, [worker]);

    const response = await getWorkers(filter);
    expect(response).toEqual([worker]);
});

test("getWorker", async () => {
    mock.onGet(`workers/${workerId}`).reply(200, worker);

    const response = await getWorker(workerId);
    expect(response).toEqual(worker);
});

test("getWorkerLocations", async () => {
    mock.onGet(`workers/${workerId}/locations`).reply(200, workerLocations);

    const response = await getWorkerLocations(workerId);
    expect(response).toEqual(workerLocations);
});

test("getWorkerImage", async () => {
    const blob = new Blob(["image data"], { type: "image/jpeg" });
    mock.onGet(`workers/photo/${workerId}`).reply(200, blob);

    const response = await getWorkerImage(workerId);
    const objectUrl = URL.createObjectURL(blob);
    expect(response).toEqual(objectUrl);
});

test("updateWorkerStatus", async () => {
    const status = true;
    const body = { WorkerId: workerId };
    mock.onPost("workers/status").reply(200);
    mock.onDelete("workers/status").reply(200);

    await updateWorkerStatus(workerId, status);
    expect(mock.history.post).toHaveLength(1);
    expect(mock.history.post[0].data).toEqual(JSON.stringify(body));

    await updateWorkerStatus(workerId, !status);
    expect(mock.history.delete).toHaveLength(1);
    expect(mock.history.delete[0].data).toEqual(JSON.stringify(body));
});

describe('Error handling', () => {
    it('should display an error message when a 401 error occurs', async () => {
        mock.onGet('workers').reply(401);

        await getWorkers(filter);

        expect(enqueueSnackbar).toHaveBeenCalledWith(
            expect.any(String),
            expect.objectContaining({ variant: 'error' })
        );
    });

    it('should display a warning message when a 429 error occurs', async () => {
        mock.onGet('workers').reply(429);

        await getWorkers(filter);

        expect(enqueueSnackbar).toHaveBeenCalledWith(
            expect.any(String),
            expect.objectContaining({ variant: 'warning' })
        )
    });

    it('should display an error message when a 500 error occurs', async () => {
        mock.onGet('workers').reply(500);

        await getWorkers(filter);

        expect(enqueueSnackbar).toHaveBeenCalledWith(
            expect.any(String),
            expect.objectContaining({ variant: 'error' })
        );
    });
});