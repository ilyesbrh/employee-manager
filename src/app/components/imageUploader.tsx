import { FunctionComponent, useRef, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import { UpdateImage } from "../../services/api.service";
import { enqueueSnackbar } from "notistack";
import { IconButton } from "@mui/material";

const UploadAvatar: FunctionComponent<any> = ({ workerId }: any) => {

  // define a reference to an input element
  const inputFileRef = useRef<HTMLInputElement>(null);

  // define a state for the data URL of the image
  const [dataUrl, setDataUrl] = useState<string>('');

  /* Handlers */

  // handle the click event for the avatar, triggering the file input click event
  const handleAvatarClick = (event: any) => {
    console.log('avatar click');
    inputFileRef.current?.click();

  };

  // handle the change event for the file input, displaying the image preview and uploading the new image
  const handleFileInputChange = (event: any) => {
    const file = event.target.files[0];
    if (!file) return;

    // read the file data as a data URL
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      if (typeof reader.result == 'string') setDataUrl(reader.result);
    };

    // upload the new image using the UpdateImage function
    UpdateImage(workerId, file).then(res => {

      // display a success message if the image was uploaded successfully
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
