import {
  alpha,
  Button,
  Stack,
  Toolbar,
  Typography,
  useTheme,
} from "@mui/material";
import { Fragment, memo, useMemo, type FC } from "react";
import z from "zod/v4";
import { MathJax } from "better-react-mathjax";
import { NumberTextField } from "../form-input/NumberTextField";
import { createFormHook } from "@tanstack/react-form";
import { fieldContext, formContext } from "@/contexts/app-form-context";
import { RemoveArrayItemButton } from "../form-input/form-remove-array-item-button";
import { RotationAnglePresetInput } from "../form-input/rotation-angle-preset-input";
import { RotationDirectionInput } from "../form-input/rotation-direction-input";
import { AddArrayItemButton } from "../form-input/form-add-array-item-button";

const { useAppForm } = createFormHook({
  fieldComponents: {
    NumberTextField,
    RemoveArrayItemButton,
    AddArrayItemButton,
    RotationAnglePresetInput,
    RotationDirectionInput,
  },
  formComponents: {},
  fieldContext,
  formContext,
});

const NumericString = z
  .string()
  .trim()
  .normalize()
  .refine((arg) => !isNaN(Number(arg)))
  .pipe(z.transform((arg) => Number(arg)));

const Coord2D = z.object({ x: NumericString, y: NumericString });

const RotationFormDataSchema = z.object({
  direction: NumericString,
  angle: NumericString,
  center: Coord2D,
  points: Coord2D.array().min(1).max(4),
});

type Props = {
  onSubmit: (v: z.output<typeof RotationFormDataSchema>) => unknown;
};
export const CalculatorForm: FC<Props> = memo(({ onSubmit }) => {
  const { handleSubmit, AppField, Subscribe, reset, pushFieldValue } =
    useAppForm({
      defaultValues: {
        direction: "1",
        angle: "90",
        center: { x: "0", y: "0" },
        points: [{ x: "1", y: "1" }],
      } as z.input<typeof RotationFormDataSchema>,
      validators: { onChange: RotationFormDataSchema },
      onSubmit: ({ value }) => {
        const r = RotationFormDataSchema.safeParse(value);
        if (r.success) {
          onSubmit(r.data);
        }
      },
    });
  const theme = useTheme();

  const alternateColor = useMemo(() => {
    return alpha(theme.palette.primary.light, 0.1);
  }, [theme.palette.primary.light]);

  return (
    <Stack spacing={0.5}>
      <Toolbar>
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
      </Toolbar>
      <Stack spacing={0.5} padding={1}>
        <Typography>{`ทิศทางการหมุน`}</Typography>
        <AppField name="direction">
          {(field) => <field.RotationDirectionInput />}
        </AppField>
      </Stack>
      <Stack spacing={0.5} padding={1} sx={{ backgroundColor: alternateColor }}>
        <Typography>{`ขนาดของมุมที่หมุน (องศา)`}</Typography>
        <AppField name="angle">
          {(field) => (
            <Stack spacing={0.5}>
              <field.NumberTextField />
              <field.RotationAnglePresetInput />
            </Stack>
          )}
        </AppField>
      </Stack>
      <Stack spacing={0.5} padding={1}>
        <Typography>
          <MathJax>{`จุดหมุน $(x,y)$`}</MathJax>
        </Typography>
        <Stack useFlexGap spacing={0.5} direction={"row"} flexWrap={"nowrap"}>
          <AppField name="center.x">
            {(field) => <field.NumberTextField />}
          </AppField>
          <AppField name="center.y">
            {(field) => <field.NumberTextField />}
          </AppField>
        </Stack>
      </Stack>
      <Stack>
        <AppField name="points" mode="array">
          {(field) => (
            <Fragment>
              {field.state.value.map((_, index) => (
                <Stack
                  key={`point-${index}`}
                  spacing={0.5}
                  padding={1}
                  sx={{
                    backgroundColor:
                      index % 2 === 0 ? alternateColor : undefined,
                  }}
                >
                  <Stack direction={"row"} justifyContent={"space-between"}>
                    <Typography>{`พิกัดที่ ${index + 1}`}</Typography>
                    <field.RemoveArrayItemButton index={index} />
                  </Stack>
                  <Stack spacing={0.5} direction="row">
                    <AppField name={`points[${index}].x`}>
                      {(subField) => <subField.NumberTextField />}
                    </AppField>
                    <AppField name={`points[${index}].y`}>
                      {(subField) => <subField.NumberTextField />}
                    </AppField>
                  </Stack>
                </Stack>
              ))}
            </Fragment>
          )}
        </AppField>
      </Stack>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Subscribe selector={({ canSubmit }) => ({ canSubmit })}>
          {({ canSubmit }) => (
            <Button
              variant="contained"
              onClick={handleSubmit}
              disabled={!canSubmit}
            >
              {`คำนวณ`}
            </Button>
          )}
        </Subscribe>
        <AppField name="points">
          {(field) => <field.AddArrayItemButton />}
        </AppField>
      </Toolbar>
    </Stack>
  );
});
