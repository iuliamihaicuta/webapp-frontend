import { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useIntl } from "react-intl";
import * as yup from "yup";
import { useUpdateOrganization } from "@infrastructure/apis/api-management";
import {
    OrganizationEditFormController,
    OrganizationEditFormModel
} from "./OrganizationEditForm.types";

export const useOrganizationEditFormController = (
    organization: OrganizationEditFormModel,
    onSubmit?: () => void
): OrganizationEditFormController => {
    const { formatMessage } = useIntl();

    const schema = yup.object().shape({
        name: yup
            .string()
            .required(
                formatMessage(
                    { id: "globals.validations.requiredField" },
                    { fieldName: formatMessage({ id: "globals.name" }) }
                )
            )
    });

    const { register, handleSubmit, reset, formState: { errors } } =
        useForm<OrganizationEditFormModel>({
            defaultValues: organization,
            resolver: yupResolver(schema)
        });

    // Reset form fields if organization data changes
    useEffect(() => {
        reset(organization);
    }, [organization, reset]);

    const { mutateAsync: update, status } = useUpdateOrganization();

    const submit = useCallback(
        (data: OrganizationEditFormModel) =>
            update({ ...organization, ...data }).then(() => {
                if (onSubmit) onSubmit();
            }),
        [update, organization, onSubmit]
    );

    return {
        actions: { register, handleSubmit, submit },
        computed: { defaultValues: organization, isSubmitting: status === "pending" },
        state: { errors }
    };
};