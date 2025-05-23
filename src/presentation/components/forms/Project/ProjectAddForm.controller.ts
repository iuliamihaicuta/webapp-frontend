import { ProjectAddFormController, ProjectAddFormModel } from "./ProjectAddForm.types";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { useIntl } from "react-intl";
import { useQueryClient } from "@tanstack/react-query";
import { useAddProject } from "@infrastructure/apis/api-management";
import { useCallback } from "react";

const getDefaultValues = (initialData?: ProjectAddFormModel): ProjectAddFormModel => ({
    title: "",
    description: "",
    startDate: "",
    endDate: "",
    location: "",
    organizationId: "",
    ...initialData,
});

const useInitProjectAddForm = () => {
    const { formatMessage } = useIntl();
    const defaultValues = getDefaultValues();

    const schema = yup.object().shape({
        title: yup.string().required(formatMessage({ id: "globals.validations.requiredField" }, { fieldName: formatMessage({ id: "globals.title" }) })),
        description: yup.string().required(formatMessage({ id: "globals.validations.requiredField" }, { fieldName: formatMessage({ id: "globals.description" }) })),
        startDate: yup.string().required(formatMessage({ id: "globals.validations.requiredField" }, { fieldName: formatMessage({ id: "globals.startDate" }) })),
        endDate: yup.string().required(formatMessage({ id: "globals.validations.requiredField" }, { fieldName: formatMessage({ id: "globals.endDate" }) })),
        location: yup.string().required(formatMessage({ id: "globals.validations.requiredField" }, { fieldName: formatMessage({ id: "globals.location" }) })),
        organizationId: yup.string().uuid().required(formatMessage({ id: "globals.validations.requiredField" }, { fieldName: formatMessage({ id: "globals.organization" }) })),
    });

    return { defaultValues, resolver: yupResolver(schema) };
};

export const useProjectAddFormController = (onSubmit?: () => void): ProjectAddFormController => {
    const { defaultValues, resolver } = useInitProjectAddForm();
    const { mutateAsync: add, status } = useAddProject();
    const queryClient = useQueryClient();

    // const submit = useCallback((data: ProjectAddFormModel) => {
    //     return add(data).then(() => {
    //         if (onSubmit) onSubmit();
    //     });
    // }, [add, queryClient]);
    const submit = useCallback((data: ProjectAddFormModel) => {
        const formattedData = {
            ...data,
            startDate: new Date(data.startDate),
            endDate: new Date(data.endDate),
        };

        return add(formattedData).then(() => {
            if (onSubmit) onSubmit();
        });
    }, [add, onSubmit]);

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors }
    } = useForm<ProjectAddFormModel>({ defaultValues, resolver });

    return {
        actions: {
            handleSubmit,
            submit,
            register,
            watch,
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
