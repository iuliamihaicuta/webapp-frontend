import { Button, Dialog, DialogContent, DialogTitle, DialogActions } from "@mui/material";
import { useDeleteDialogController } from "./DeleteDialog.controller";
import { useIntl } from "react-intl";
import { RequestResponse } from "@infrastructure/apis/client";

interface DeleteDialogProps {
    trigger: React.ReactElement;
    onConfirm: () => Promise<RequestResponse>;
}

export const DeleteDialog = ({ trigger, onConfirm }: DeleteDialogProps) => {
    const { open, close, isOpen } = useDeleteDialogController();
    const { formatMessage } = useIntl();

    const handleConfirm = async () => {
        await onConfirm();
        close();
    };

    return (
        <div>
            {/* When clicking the delete button, ask for confirmation before proceeding */}
            <span onClick={open}>
                {trigger}
            </span>

            <Dialog open={isOpen} onClose={close}>
                <DialogTitle>
                    {formatMessage({ id: "labels.delete" })}
                </DialogTitle>
                <DialogContent>
                    {formatMessage({ id: "labels.deleteConfirmation" })}
                </DialogContent>
                <DialogActions>
                    <Button variant="outlined" onClick={close}>
                        {formatMessage({ id: "labels.cancel" })}
                    </Button>
                    <Button variant="contained" color="error" onClick={handleConfirm}>
                        {formatMessage({ id: "labels.confirm" })}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};
