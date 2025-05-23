import { FormController } from "../FormController";
import {
    UseFormHandleSubmit,
    UseFormRegister,
    FieldErrorsImpl,
    DeepRequired,
    UseFormWatch,
} from "react-hook-form";

export type ProjectAddFormModel = {
    title: string;
    description: string;
    startDate: string;
    endDate: string;
    location: string;
    organizationId: string;
};

export type ProjectAddFormState = {
    errors: FieldErrorsImpl<DeepRequired<ProjectAddFormModel>>;
};

export type ProjectAddFormActions = {
    register: UseFormRegister<ProjectAddFormModel>;
    watch: UseFormWatch<ProjectAddFormModel>;
    handleSubmit: UseFormHandleSubmit<ProjectAddFormModel>;
    submit: (body: ProjectAddFormModel) => void;
};

export type ProjectAddFormComputed = {
    defaultValues: ProjectAddFormModel;
    isSubmitting: boolean;
};

export type ProjectAddFormController = FormController<ProjectAddFormState, ProjectAddFormActions, ProjectAddFormComputed>;
