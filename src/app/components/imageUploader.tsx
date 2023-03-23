import { FunctionComponent, useEffect, useRef, useState } from "react";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { UpdateImage } from "../../services/api.service";
import { enqueueSnackbar } from "notistack";
import { IconButton } from "@mui/material";

const UploadAvatar: FunctionComponent<any> = ({ workerId }: any) => {

  const inputFileRef = useRef<HTMLInputElement>(null);

  const [dataUrl, setDataUrl] = useState<string>('');

  /* Handlers */
  const handleAvatarClick = (event: any) => {
    console.log('avatar click');
    inputFileRef.current?.click();

  };

  // On file changed
  const handleFileInputChange = (event: any) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      if (typeof reader.result == 'string') setDataUrl(reader.result);
    };

    // Upload new picture
    UpdateImage(workerId, file).then(res => {

      if (res) enqueueSnackbar('Image changed successfully', {
        variant: 'success',
      });

    });

  };


  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <IconButton onClick={handleAvatarClick}>
        <Avatar
          alt="Worker photo"
          src={dataUrl ? dataUrl : ""}
          sx={{ width: 128, height: 128 }}

          className="m-4"
        />
      </IconButton>
      <input
        ref={inputFileRef}
        id="photo-upload"
        type="file"
        hidden
        onChange={handleFileInputChange}
      />
    </Box>
  );
};

export default UploadAvatar;
