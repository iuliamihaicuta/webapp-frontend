import { UserEditFormController, UserEditFormModel } from "./UserEditForm.types";
import { yupResolver } from "@hookform/resolvers/yup";
import { useIntl } from "react-intl";
import * as yup from "yup";
import { isUndefined } from "lodash";
import { useForm } from "react-hook-form";
import { useQueryClient } from "@tanstack/react-query";
import { useUpdateUser } from "@infrastructure/apis/api-management";
import { useCallback } from "react";
import { UserDTO, UserRoleEnum } from "@infrastructure/apis/client";
import { SelectChangeEvent } from "@mui/material";

/**
 * Return default values based on existing user data.
 */
const getDefaultValues = (initialData: UserDTO): UserEditFormModel => ({
    name: initialData.name || "",
    email: initialData.email || "",
    role: initialData.role as UserRoleEnum || UserRoleEnum.Client
});

/**
 * Hook for validation schema and default values.
 */
const useInitUserEditForm = (initialData: UserDTO) => {
    const { formatMessage } = useIntl();
    const defaultValues = getDefaultValues(initialData);

    const schema = yup.object().shape({
        name: yup.string()
            .required(formatMessage(
                { id: "globals.validations.requiredField" },
                { fieldName: formatMessage({ id: "globals.name" }) })),
        email: yup.string()
            .required(formatMessage(
                { id: "globals.validations.requiredField" },
                { fieldName: formatMessage({ id: "globals.email" }) }))
            .email(),
        role: yup.string()
            .oneOf([UserRoleEnum.Admin, UserRoleEnum.Client])
            .required(formatMessage(
                { id: "globals.validations.requiredField" },
                { fieldName: formatMessage({ id: "globals.role" }) }))
    });

    const resolver = yupResolver(schema);
    return { defaultValues, resolver };
};

/**
 * Main controller hook.
 */
export const useUserEditFormController = (
    user: UserDTO,
    onSubmit?: (updatedUser: UserEditFormModel) => void
): UserEditFormController => {
    const { defaultValues, resolver } = useInitUserEditForm(user);
    const { mutateAsync: update, status } = useUpdateUser();
    const queryClient = useQueryClient();

    const submit = useCallback(async (data: UserEditFormModel) => {
        await update({ ...data, id: user.id });
        if (onSubmit) onSubmit(data);
    }, [update, onSubmit]);

    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors }
    } = useForm<UserEditFormModel>({
        defaultValues,
        resolver
    });

    const selectRole = useCallback((event: SelectChangeEvent<UserRoleEnum>) => {
        setValue("role", event.target.value as UserRoleEnum, {
            shouldValidate: true,
        });
    }, [setValue]);

    return {
        actions: {
            handleSubmit,
            submit,
            register,
            watch,
            selectRole
        },
        computed: {
            defaultValues,
            isSubmitting: status === "pending"
        },
        state: {
            errors
        }
    };
};
