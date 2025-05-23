import { FormController } from "../FormController";
import {
    UseFormRegister,
    UseFormHandleSubmit,
    FieldErrorsImpl,
    DeepRequired
} from "react-hook-form";

export type OrganizationEditFormModel = {
    name: string;
};

export type OrganizationEditFormState = {
    errors: FieldErrorsImpl<DeepRequired<OrganizationEditFormModel>>;
};

export type OrganizationEditFormActions = {
    register: UseFormRegister<OrganizationEditFormModel>;
    handleSubmit: UseFormHandleSubmit<OrganizationEditFormModel>;
    submit: (data: OrganizationEditFormModel) => void;
};

export type OrganizationEditFormComputed = {
    defaultValues: OrganizationEditFormModel;
    isSubmitting: boolean;
};

export type OrganizationEditFormController = FormController<
    OrganizationEditFormState,
    OrganizationEditFormActions,
    OrganizationEditFormComputed
>;