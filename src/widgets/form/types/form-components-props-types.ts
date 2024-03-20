import { FieldErrors, UseFormRegister } from "react-hook-form";
import { BikeFormData } from "./bike-form-types";
import { AccessoryFormData } from "./accessory-form-types";

export interface FormComponentsPropsTypes {
    errors: FieldErrors<BikeFormData> | FieldErrors<AccessoryFormData>;
    register:
        | UseFormRegister<BikeFormData>
        | UseFormRegister<AccessoryFormData>;
}
