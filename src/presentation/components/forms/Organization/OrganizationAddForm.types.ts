import { FormController } from "../FormController";
import {
    UseFormHandleSubmit,
    UseFormRegister,
    FieldErrorsImpl,
    DeepRequired
} from "react-hook-form";

export type OrganizationAddFormModel = {
    name: string;
};

export type OrganizationAddFormState = {
    errors: FieldErrorsImpl<DeepRequired<OrganizationAddFormModel>>;
};

export type OrganizationAddFormActions = {
    register: UseFormRegister<OrganizationAddFormModel>;
    handleSubmit: UseFormHandleSubmit<OrganizationAddFormModel>;
    submit: (body: OrganizationAddFormModel) => void;
};

export type OrganizationAddFormComputed = {
    defaultValues: OrganizationAddFormModel,
    isSubmitting: boolean
};

export type OrganizationAddFormController = FormController<
    OrganizationAddFormState,
    OrganizationAddFormActions,
    OrganizationAddFormComputed
>;
