import { Button, Dialog, DialogContent, DialogTitle } from "@mui/material";
import { useProjectAddFormController } from "./ProjectAddDialog.controller";
import { useIntl } from "react-intl";
import { ProjectAddForm } from "@presentation/components/forms/Project/ProjectAddForm";

export const ProjectAddDialog = () => {
  const { open, close, isOpen } = useProjectAddFormController();
  const { formatMessage } = useIntl();

  return (
      <div>
        <Button variant="outlined" onClick={open}>
          {formatMessage({ id: "labels.addProject", defaultMessage: "Add Project" })}
        </Button>
        <Dialog open={isOpen} onClose={close}>
          <DialogTitle>
            {formatMessage({ id: "labels.addProject", defaultMessage: "Add Project" })}
          </DialogTitle>
          <DialogContent>
            <ProjectAddForm onSubmit={close} />
          </DialogContent>
        </Dialog>
      </div>
  );
};