import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { UpdateImage } from "../../services/api.service";
import { enqueueSnackbar } from "notistack";
import UploadAvatar from "./imageUploader";

jest.mock("../../services/api.service");
jest.mock("notistack");

describe("UploadAvatar Component", () => {

    const workerId = "7ac75791-63dc-4fff-a4c8-6f53309c49ca";

    beforeEach(() => {
        (UpdateImage as jest.Mock).mockClear();
        (enqueueSnackbar as jest.Mock).mockClear();
    });

    test("renders UploadAvatar component", () => {
        render(<UploadAvatar workerId={workerId} />);
        const avatarElement = screen.getByAltText("Worker photo");
        expect(avatarElement).toBeInTheDocument();
    });

    test("triggers file input click on avatar click", () => {
        render(<UploadAvatar workerId={workerId} />);
        const avatarElement = screen.getByAltText("Worker photo");
        const inputElement = screen.getByTestId("photo-upload");

        fireEvent.click(avatarElement);

        expect(inputElement).toHaveProperty("files.length", 0);
    });

    test("handles file input change and calls UpdateImage and enqueueSnackbar", async () => {
        const file = new File(["photo"], "photo.jpg", { type: "image/jpeg" });

        (UpdateImage as jest.Mock).mockResolvedValue(true);

        render(<UploadAvatar workerId={workerId} />);
        const inputElement = screen.getByTestId("photo-upload");

        fireEvent.change(inputElement, { target: { files: [file] } });

        expect(UpdateImage).toHaveBeenCalledWith(workerId, file);

        await expect(enqueueSnackbar).toHaveBeenCalledWith("Image changed successfully", {
            variant: "success",
        });
    });
});
