import { OrganizationAddFormController, OrganizationAddFormModel } from "./OrganizationAddForm.types";
import { yupResolver } from "@hookform/resolvers/yup";
import { useIntl } from "react-intl";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { useCallback } from "react";
import { useAddOrganization } from "@infrastructure/apis/api-management";
import { useQueryClient } from "@tanstack/react-query";
import { isUndefined } from "lodash";

const getDefaultValues = (initialData?: OrganizationAddFormModel) => {
    const defaultValues = {
        name: "",
    };

    if (!isUndefined(initialData)) {
        return {
            ...defaultValues,
            ...initialData,
        };
    }

    return defaultValues;
};

const useInitOrganizationAddForm = () => {
    const { formatMessage } = useIntl();
    const defaultValues = getDefaultValues();

    const schema = yup.object().shape({
        name: yup.string()
            .required(formatMessage(
                { id: "globals.validations.requiredField" },
                { fieldName: formatMessage({ id: "globals.name" }) }
            ))
            .default(defaultValues.name),
    });

    return {
        defaultValues,
        resolver: yupResolver(schema),
    };
};

export const useOrganizationAddFormController = (
    onSubmit?: () => void
): OrganizationAddFormController => {
    const { defaultValues, resolver } = useInitOrganizationAddForm();
    const { mutateAsync: add, status } = useAddOrganization();
    const queryClient = useQueryClient();

    const submit = useCallback(
        (data: OrganizationAddFormModel) =>
            add(data).then(() => {
                if (onSubmit) onSubmit();
            }),
        [add, queryClient]
    );

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<OrganizationAddFormModel>({
        defaultValues,
        resolver,
    });

    return {
        actions: {
            handleSubmit,
            submit,
            register,
        },
        computed: {
            defaultValues,
            isSubmitting: status === "pending",
        },
        state: {
            errors,
        },
    };
};
