import { Outlet } from "react-router-dom";
import { SnackbarProvider } from 'notistack'
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

import Layout from "./app/Layout/skelton/layout";

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <SnackbarProvider>
        <Layout>
          <Outlet />
        </Layout>
      </SnackbarProvider>
    </LocalizationProvider>
  );
}

export default App;