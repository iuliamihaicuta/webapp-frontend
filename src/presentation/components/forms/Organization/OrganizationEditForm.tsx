import React from "react";
import {
    Button,
    CircularProgress,
    FormControl,
    FormHelperText,
    FormLabel,
    OutlinedInput,
    Stack
} from "@mui/material";
import { FormattedMessage, useIntl } from "react-intl";
import { isEmpty, isUndefined } from "lodash";
import { useOrganizationEditFormController } from "./OrganizationEditForm.controller";
import { OrganizationEditFormModel } from "./OrganizationEditForm.types";

interface OrganizationEditFormProps {
    organization: OrganizationEditFormModel;
    onSubmit?: () => void;
}

export const OrganizationEditForm = ({
                                         organization,
                                         onSubmit
                                     }: OrganizationEditFormProps) => {
    const { formatMessage } = useIntl();
    const { state, actions, computed } =
        useOrganizationEditFormController(organization, onSubmit);

    return (
        <form onSubmit={actions.handleSubmit(actions.submit)}>
            <Stack spacing={4} style={{ width: "100%" }}>
                <FormControl fullWidth error={!isUndefined(state.errors.name)}>
                    <FormLabel required>
                        <FormattedMessage id="globals.name" />
                    </FormLabel>
                    <OutlinedInput
                        {...actions.register("name")}
                        placeholder={formatMessage(
                            { id: "globals.placeholders.textInput" },
                            { fieldName: formatMessage({ id: "globals.name" }) }
                        )}
                        autoComplete="none"
                    />
                    <FormHelperText hidden={isUndefined(state.errors.name)}>
                        {state.errors.name?.message}
                    </FormHelperText>
                </FormControl>
                <Button type="submit" disabled={!isEmpty(state.errors) || computed.isSubmitting}>
                    {computed.isSubmitting ? (
                        <CircularProgress size={24} />
                    ) : (
                        <FormattedMessage id="globals.submit" />
                    )}
                </Button>
            </Stack>
        </form>
    );
};