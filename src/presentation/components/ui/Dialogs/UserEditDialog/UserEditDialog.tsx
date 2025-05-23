import { useState } from "react";
import { Button, Dialog, DialogContent, DialogTitle } from "@mui/material";
import { UserDTO } from "@infrastructure/apis/client";
import { useIntl } from "react-intl";
import { UserEditForm } from "@presentation/components/forms/User/UserEditForm";

interface UserEditDialogProps {
  user: UserDTO;
  onSave: (updatedUser: UserDTO) => Promise<void>;
  trigger: React.ReactElement;
}

export const UserEditDialog = ({ user, onSave, trigger }: UserEditDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { formatMessage } = useIntl();

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  const handleSubmit = async (updatedUser: UserDTO) => {
    await onSave(updatedUser);
    close();
  };

  return (
      <>
        {/* Trigger button (e.g., Edit IconButton) */}
        <span onClick={open}>
        {trigger}
      </span>

        <Dialog open={isOpen} onClose={close}>
          <DialogTitle>
            {formatMessage({ id: "labels.editUser" })}
          </DialogTitle>
          <DialogContent>
            <UserEditForm user={user} onSubmit={handleSubmit} />
          </DialogContent>
        </Dialog>
      </>
  );
};
