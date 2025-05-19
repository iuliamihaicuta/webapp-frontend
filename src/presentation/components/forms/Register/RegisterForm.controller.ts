import { useCallback } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useIntl } from "react-intl";
import { useAppDispatch } from "@application/store";
import { RegisterFormModel, RegisterFormController } from "./RegisterForm.types";

const useInitRegisterForm = () => {
    const { formatMessage } = useIntl();

    const defaultValues: RegisterFormModel = {
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    };

    const schema = yup.object().shape({
        name: yup.string()
            .required(formatMessage({ id: "globals.validations.requiredField" }, { fieldName: formatMessage({ id: "globals.name" }) })),
        email: yup.string()
            .email(formatMessage({ id: "globals.validations.invalidEmail" }))
            .required(formatMessage({ id: "globals.validations.requiredField" }, { fieldName: formatMessage({ id: "globals.email" }) })),
        password: yup.string()
            .min(6, formatMessage({ id: "globals.validations.minLength" }, { length: 6 }))
            .required(formatMessage({ id: "globals.validations.requiredField" }, { fieldName: formatMessage({ id: "globals.password" }) })),
        confirmPassword: yup.string()
            .oneOf([yup.ref("password")], formatMessage({ id: "globals.validations.passwordMismatch" }))
            .required(formatMessage({ id: "globals.validations.requiredField" }, { fieldName: formatMessage({ id: "globals.confirmPassword" }) })),
    });

    const resolver = yupResolver(schema);

    return { defaultValues, resolver };
};

export const useRegisterFormController = (): RegisterFormController => {
    const { defaultValues, resolver } = useInitRegisterForm();
    const dispatch = useAppDispatch();

    const submit = useCallback((data: RegisterFormModel) => {
        // Logica pentru înregistrare
        console.log("Register data:", data);
    }, []);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RegisterFormModel>({
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
            isSubmitting: false, // Înlocuiește cu logica reală
        },
        state: {
            errors,
        },
    };
};