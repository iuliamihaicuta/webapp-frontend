import { Button, Dialog, DialogContent, DialogTitle } from "@mui/material";
import { useOrganizationAddDialogController } from "./OrganizationAddDialog.controller";
import { useIntl } from "react-intl";
import {UserAddForm} from "@presentation/components/forms/User/UserAddForm";
import { OrganizationAddForm } from "@presentation/components/forms/Organization/OrganizationAddForm";

export const OrganizationAddDialog = () => {
  const { open, close, isOpen } = useOrganizationAddDialogController();
  const { formatMessage } = useIntl();

  return (
      <div>
        <Button variant="outlined" onClick={open}>
          {formatMessage({ id: "labels.addOrganization", defaultMessage: "Add Organization" })}
        </Button>
        <Dialog open={isOpen} onClose={close}>
          <DialogTitle>
            {formatMessage({ id: "labels.addOrganization", defaultMessage: "Add Organization" })}
          </DialogTitle>
          <DialogContent>
            <OrganizationAddForm onSubmit={close} />
          </DialogContent>
        </Dialog>
      </div>
  );
};