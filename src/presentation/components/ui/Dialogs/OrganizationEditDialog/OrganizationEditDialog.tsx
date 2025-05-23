import React from "react";
import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import { useOrganizationEditDialogController } from "./OrganizationEditDialog.controller";
import { useIntl } from "react-intl";
import { OrganizationEditForm } from "@presentation/components/forms/Organization/OrganizationEditForm";

interface Organization {
    id: string;
    name: string;
    description?: string;
}

interface OrganizationEditDialogProps {
    organization: Organization;
    onSave: (updatedOrganization: Organization) => void;
    trigger: React.ReactElement;
}

export const OrganizationEditDialog = ({
                                           organization,
                                           onSave,
                                           trigger,
                                       }: OrganizationEditDialogProps) => {
    const { open, close, isOpen } = useOrganizationEditDialogController();
    const { formatMessage } = useIntl();

    const handleSubmit = (updatedOrganization: Organization) => {
        onSave(updatedOrganization);
        close();
    };

    const triggerElement = React.cloneElement(trigger, {
        onClick: open,
    });

    return (
        <>
            {triggerElement}
            <Dialog open={isOpen} onClose={close}>
                <DialogTitle>
                    {formatMessage({
                        id: "labels.editOrganization",
                        defaultMessage: "Edit Organization",
                    })}
                </DialogTitle>
                <DialogContent>
                    <OrganizationEditForm
                        organization={organization}
                        onSubmit={handleSubmit}
                    />
                </DialogContent>
            </Dialog>
        </>
    );
};