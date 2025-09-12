import { useFormContext } from "@/contexts/app-form-context";
import { Button } from "@mui/material";
import type { FC } from "react";

export const FormSubmitButton: FC = () => {
  const { Subscribe, handleSubmit } = useFormContext();
  return (
    <Subscribe selector={({ canSubmit }) => ({ canSubmit })}>
      {({ canSubmit }) => (
        <Button
          disabled={!canSubmit}
          variant="contained"
          onClick={handleSubmit}
        >
          {`คำนวณ`}
        </Button>
      )}
    </Subscribe>
  );
};
