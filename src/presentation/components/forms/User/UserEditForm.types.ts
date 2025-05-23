import { UserRoleEnum } from "@infrastructure/apis/client";
import { FormController } from "../FormController";
import {
    UseFormHandleSubmit,
    UseFormRegister,
    FieldErrorsImpl,
    DeepRequired,
    UseFormWatch
} from "react-hook-form";
import { SelectChangeEvent } from "@mui/material";

export type UserEditFormModel = {
    name: string;
    email: string;
    role: UserRoleEnum;
};

export type UserEditFormState = {
    errors: FieldErrorsImpl<DeepRequired<UserEditFormModel>>;
};

export type UserEditFormActions = {
    register: UseFormRegister<UserEditFormModel>;
    watch: UseFormWatch<UserEditFormModel>;
    handleSubmit: UseFormHandleSubmit<UserEditFormModel>;
    submit: (body: UserEditFormModel) => void;
    selectRole: (value: SelectChangeEvent<UserRoleEnum>) => void;
};

export type UserEditFormComputed = {
    defaultValues: UserEditFormModel;
    isSubmitting: boolean;
};

export type UserEditFormController = FormController<UserEditFormState, UserEditFormActions, UserEditFormComputed>;
