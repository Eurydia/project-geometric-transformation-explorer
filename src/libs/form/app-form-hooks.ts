import { ArrayItemRemoveButton } from "@/components/form-input/arrat-item-remove-button";
import { ArrayItemAddButton } from "@/components/form-input/array-item-add-button";
import { FormResetButton } from "@/components/form-input/form-reset-button";
import { FormSubmitButton } from "@/components/form-input/form-submit-button";
import { NumberTextField } from "@/components/form-input/NumberTextField";
import { ReflectionEquationTypeInput } from "@/components/form-input/reflection-equation-type-input";
import { createFormHook } from "@tanstack/react-form";
import { AppFormHookContexts } from "./app-form-hook-context";

export const AppFormHook = createFormHook({
  fieldComponents: {
    NumberTextField,
    ArrayItemAddButton,
    ArrayItemRemoveButton,
    ReflectionEquationTypeInput,
  },
  formComponents: {
    FormResetButton,
    FormSubmitButton,
  },
  fieldContext: AppFormHookContexts.fieldContext,
  formContext: AppFormHookContexts.formContext,
});
