import { WorkerForm } from './../models/worker';
import { Worker, WorkerLocations } from '../models/worker';
import axios from 'axios';
import { enqueueSnackbar } from 'notistack';
import { WorkersFilter } from '../models/worker';


/* Axios setup */
const api = axios.create({
    baseURL: 'https://dev-api-1.sitedocs.com/api/v1/',
    timeout: 100000,
    headers: {
        'Authorization': 'Token 44798935-c223-47e6-b0eb-84df6c6210c7'
    }
});

api.interceptors.response.use(
    (response) => response,
    (error) => {
        const { response } = error;

        if (response.status === 401) {
            enqueueSnackbar(response.data.Message, {
                variant: 'error',
            });
        }
        else if (response.status === 404) {

            enqueueSnackbar(response.data.Message ? response.data.Message : 'Image not found..', {
                variant: 'error',
            });
        } else if (response.status === 429) {
            enqueueSnackbar(response.data.Message, {
                variant: 'warning',
            });
        } else if (response.status === 500) {
            enqueueSnackbar(response.data.Message, {
                variant: 'error',
            });
        }

        return Promise.reject(error);
    }
);

/* Api Endpoints */

export const getWorkers = async (filter: WorkersFilter | { page: number, count: number } | null) => {
    const config = {
        params: {
            ...filter
        }
    };

    try {
        const response = await api.get<Array<Worker>>('workers', config);
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

export const getWorker = async (workerId?: string) => {

    try {
        const response = await api.get<Worker>('workers/' + workerId);
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

export const getWorkerLocations = async (workerId?: string) => {

    try {
        const response = await api.get<Array<WorkerLocations>>('workers/' + workerId + '/locations');
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

export const getWorkerImage = async (id: any) => {
    const response = await api.get('workers/photo/' + id, { responseType: "blob" });

    if (response.status < 200 || response.status >= 300) {
        throw new Error("Failed to fetch image");
    }

    const blob = response.data;
    const objectUrl = URL.createObjectURL(blob);
    return objectUrl;
}


export const updateWorkerStatus = async (workerId: string, enable: boolean) => {

    const body = {
        WorkerId: workerId
    };

    try {
        const response = enable ? await api.post('workers/status', body) : await api.delete('workers/status', { data: body });
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const createWorker = async (workerData: WorkerForm) => {


    const response = await api.post('workers', workerData);
    return response.data;
};

export const updateWorker = async (workerId: any, workerData: WorkerForm) => {


    const response = await api.put(`workers`, { ...workerData, Id: workerId });
    return response.data;
};

export const UpdateImage = async (workerId: string, selectedFile: string | Blob) => {
    const formData = new FormData();
    formData.append("photo", selectedFile);

    try {
        const response = await api.put(
            `workers/photo/${workerId}`,
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: "Bearer " + localStorage.getItem("accessToken"),
                },
            }
        );
        
        return response.data;

        
    } catch (error) {

        return null;
    }
}

export default api;
