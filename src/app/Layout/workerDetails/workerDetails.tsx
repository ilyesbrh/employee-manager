import { FunctionComponent, useEffect, useState } from "react";
import { Avatar, Button, Paper, Chip } from "@mui/material";
import { Timeline, TimelineItem, TimelineSeparator, TimelineConnector, TimelineContent, TimelineOppositeContent } from '@mui/lab';

import dayjs from "dayjs";

import { Navigate, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import "./workerDetails.scss";
import { getWorkerImage, getWorker, getWorkerLocations, updateWorkerStatus } from "../../../services/api.service";
import { Worker, WorkerLocations } from "../../../models/worker";
import { enqueueSnackbar } from "notistack";
import UploadAvatar from "../../components/imageUploader";


const WorkerDetails: FunctionComponent<any> = () => {

    const navigator = useNavigate();

    // Worker params
    const { id } = useParams();

    // Worker locations 
    const [locations, setLocations] = useState<Array<WorkerLocations>>([]);

    // Worker object
    const [worker, setWorker] = useState<Worker | null>(null);


    /* Lifecycle hooks */

    // Did mount hook
    useEffect(() => {

        // load worker data
        getWorker(id).then(worker => worker ? setWorker(worker) : null);

        // load worker locations
        getWorkerLocations(id).then(locations => locations ? setLocations(locations) : null);

    }, [id]);


    /* Handlers */

    const handleEdit = (event: any) => {
        navigator('edit');
    }

    const handleStatusEdit = (event: any) => {
        if (!id) return;

        updateWorkerStatus(id, !worker?.Active).then((_) => {
            enqueueSnackbar('Status updated successfully', {
                variant: 'success',
            });

            if (!worker) return;

            setWorker({ ...worker, Active: !worker?.Active });
        });

    }

    return (
        <div className="container mb-5">
            <Paper className="h-100 p-4">
                <div className="row account-settings">
                    <div className="col-12 user-profile d-flex flex-column align-items-start justify-content-center w-100">
                        <UploadAvatar workerId={worker?.Id} className="m-4" />
                        <div className="d-flex">
                            <h3 className="user-name">
                                {worker?.FirstName} {worker?.LastName}
                            </h3>
                            <Button variant="outlined" className="mx-3" onClick={handleEdit}>Edit</Button>
                            <Button variant="outlined" className="" onClick={handleStatusEdit} color="warning">{worker?.Active ? 'Disable' : 'Enable'}</Button>
                        </div>

                    </div>
                    <div className="col-12 mt-4">
                        <dl className="d-flex align-items-center">
                            <dt className="w-25">Status:</dt>
                            <dd className="text-right h5 w-75">
                                {
                                    worker?.Active
                                        ? <Chip className="mx-3" label="Enabled" color="success" />
                                        : <Chip className="mx-3" label="Disabled" color="error" />}
                            </dd>
                        </dl>
                        <dl className="d-flex align-items-center">
                            <dt className="w-25">Title:</dt>
                            <dd className="text-right h5 w-75">{worker?.JobTitle}</dd>
                        </dl>
                        <dl className="d-flex align-items-center">
                            <dt className="w-25">Modified:</dt>
                            <dd className="text-right h5 w-75">{dayjs(worker?.LastModifiedOn).format('DD/MM/YYYY')}</dd>
                        </dl>

                    </div>

                    <div className="col-12 h3">Locations history</div>

                    <Timeline position="left" className="col-md-4">
                        {locations.map((location, index) => (
                            <TimelineItem key={index}>
                                <TimelineOppositeContent>
                                    <p >{dayjs(location.StartDate).format("MMM YYYY")} - {dayjs(location.EndDate).format("MMM YYYY")}</p>
                                </TimelineOppositeContent>
                                <TimelineSeparator>
                                    <TimelineConnector />
                                </TimelineSeparator>
                                <TimelineContent>
                                    <h4 className="text-info">{location.Name}</h4>
                                    <p>{location.Description}</p>
                                    <p>{location.Address}</p>
                                </TimelineContent>
                            </TimelineItem>
                        ))}
                    </Timeline>
                </div>
            </Paper >
        </div >
    );
};


export default WorkerDetails;