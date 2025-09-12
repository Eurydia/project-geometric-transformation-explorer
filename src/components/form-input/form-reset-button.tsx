import { useFormContext } from "@/contexts/app-form-context";
import { Button } from "@mui/material";
import type { FC } from "react";

export const FormResetButton: FC = () => {
  const { Subscribe, reset } = useFormContext();
  return (
    <Subscribe selector={({ isDefaultValue }) => ({ isDefaultValue })}>
      {({ isDefaultValue }) => (
        <Button
          disabled={isDefaultValue}
          variant="outlined"
          color="error"
          onClick={() => reset()}
        >
          {`คืนค่าเริ่มต้น`}
        </Button>
      )}
    </Subscribe>
  );
};
