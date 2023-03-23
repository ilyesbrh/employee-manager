import { WorkersFilter, WorkerForm } from './../models/worker';
import { Worker } from '../models/worker';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';
import dayjs from 'dayjs';

export interface WorkersState {
    workers: Worker[],
    workersFilter: WorkersFilter,
    currentWorker: Worker | null,
    workerForm: WorkerForm
}

const initialState: WorkersState = {
    workers: [],
    workersFilter: {
        count: 10,
        page: 0,
        isArchived: false,
        jobTitle: '',
        firstName: '',
        lastName: '',
        locationId: '',
    },
    currentWorker: null,
    workerForm: {
        FirstName: "",
        LastName: "",
        JobTitle: "",
        StreetAddress: "",
        City: "",
        PostalCode: "",
        MobileNumber: "",
        PhoneNumber: "",
        DateHired: dayjs(Date.now()).toISOString(),
        Position: "",
        EmployeeNumber: "",
        EmergencyContact1: "",
        EmergencyContact2: "",
        EmergencyNotes: "",
    }
}



export const workersSlice = createSlice({
    initialState,
    name: 'workers',
    reducers: {

        // update the workers list in state with the data from the action payload
        updateWorkers: (state: WorkersState, Action: PayloadAction<Array<Worker>>) => {

            // update workers list
            state.workers = Action.payload;

            return state;
        },

        // update the current selected worker in state with the data from the action payload
        updateCurrentWorker: (state: WorkersState, Action: PayloadAction<Worker>) => {

            if (!Action.payload) return state;

            // update the current selected worker
            state.currentWorker = Action.payload;

            return state;

        },
        // reset the current selected worker in state with the data from the action payload
        resetCurrentWorker: (state: WorkersState, Action: PayloadAction<null>) => {

            // update the current selected worker
            state.currentWorker = null;
            state.workerForm = initialState.workerForm;

            return state;

        },

        // update the current selected worker form in state with the data from the action payload
        updateWorkerForm: (state: WorkersState, Action: PayloadAction<WorkerForm>) => {

            if (!Action.payload) return state;

            // update the current selected worker form
            state.workerForm = Action.payload;

            return state;

        },

        // update the current selected workers filter in state with the data from the action payload
        updateWorkerFilter: (state: WorkersState, Action: PayloadAction<WorkersFilter>) => {

            if (!Action.payload) return state;

            // update the current selected workers filter
            state.workersFilter = Action.payload;

            return state;

        },

    }
})

/* expose actions */
export const { updateWorkers, updateCurrentWorker, updateWorkerForm, updateWorkerFilter, resetCurrentWorker } = workersSlice.actions;

/* expose selectors */
export const selectWorkers = (state: RootState) => state.workersReducer.workers;
export const selectCurrentWorker = (state: RootState) => state.workersReducer.currentWorker;
export const selectWorkersFilter = (state: RootState) => state.workersReducer.workersFilter;
export const selectWorkerForm = (state: RootState) => state.workersReducer.workerForm;

/* expose reducers */
export default workersSlice.reducer;