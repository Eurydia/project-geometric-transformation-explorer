import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { MathJax } from "better-react-mathjax";
import { Fragment } from "react";
import z from "zod/v4";
import { AppFormHook } from "@/libs/form/app-form-hooks";
import type { Schema$RotationFormData } from "@/types/schemas/form-data/rotation-form.schema";

export const RotationForm = AppFormHook.withFieldGroup({
  defaultValues: {} as z.input<typeof Schema$RotationFormData>,
  render: ({ group }) => {
    return (
      <Stack spacing={3}>
        <Toolbar>
          <group.AppForm>
            <group.FormResetButton />
          </group.AppForm>
        </Toolbar>
        <Stack>
          <Typography>{`ทิศทางการหมุน`}</Typography>
          <group.AppField name="direction">
            {(field) => <field.RotationDirectionInput />}
          </group.AppField>
        </Stack>
        <Stack>
          <Typography sx={{ whiteSpace: "normal", textWrap: "wrap" }}>
            {`ขนาดของมุมที่หมุน (องศา)`}
          </Typography>
          <group.AppField name="angle">
            {(field) => (
              <Stack spacing={0.5}>
                <field.NumberTextField />
                <field.RotationAnglePresetInput />
              </Stack>
            )}
          </group.AppField>
        </Stack>
        <Stack>
          <Typography>
            <MathJax dynamic>{`จุดหมุน $(a,b)$`}</MathJax>
          </Typography>
          <Stack spacing={0.5} direction={"row"}>
            <group.AppField name="center.x">
              {(field) => <field.NumberTextField />}
            </group.AppField>
            <group.AppField name="center.y">
              {(field) => <field.NumberTextField />}
            </group.AppField>
          </Stack>
        </Stack>
        <Stack>
          <group.AppField name="points" mode="array">
            {(field) => (
              <Fragment>
                {field.state.value.map((_, index) => (
                  <Stack key={`point-${index}`} spacing={0.5}>
                    <Stack
                      direction={"row"}
                      sx={{ justifyContent: "space-between" }}
                    >
                      <Typography>
                        <MathJax dynamic>
                          {index === 0
                            ? `พิกัดที่ ${index + 1} $(x,y)$`
                            : `พิกัดที่ ${index + 1}`}
                        </MathJax>
                      </Typography>
                      <field.ArrayItemRemoveButton index={index} />
                    </Stack>
                    <Stack spacing={0.5} direction="row">
                      <group.AppField name={`points[${index}].x`}>
                        {(subField) => <subField.NumberTextField />}
                      </group.AppField>
                      <group.AppField name={`points[${index}].y`}>
                        {(subField) => <subField.NumberTextField />}
                      </group.AppField>
                    </Stack>
                  </Stack>
                ))}
              </Fragment>
            )}
          </group.AppField>
        </Stack>
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <group.AppForm>
            <group.FormSubmitButton />
          </group.AppForm>
          <group.AppField name="points">
            {(field) => <field.ArrayItemAddButton />}
          </group.AppField>
        </Toolbar>
      </Stack>
    );
  },
});
