import { Fragment } from "react";
import { MathJax } from "better-react-mathjax";
import z from "zod/v4";
import { AppFormHook } from "@/libs/form/app-form-hooks";
import type { Schema$TranslationFormData } from "@/types/schemas/form-data/translation-form";
import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

export const TranslationForm = AppFormHook.withFieldGroup({
  defaultValues: {} as z.input<typeof Schema$TranslationFormData>,
  render: ({ group }) => {
    return (
      <Stack spacing={3}>
        <Toolbar disableGutters>
          <group.AppForm>
            <group.FormResetButton />
          </group.AppForm>
        </Toolbar>
        <Stack>
          <Typography>
            <MathJax dynamic>{`เวกเตอร์ของการเลื่อนขนาน $(a,b)$`}</MathJax>
          </Typography>
          <Stack spacing={0.5} direction={"row"} sx={{ flexWrap: "nowrap" }}>
            <group.AppField name="translation.x">
              {(field) => <field.NumberTextField />}
            </group.AppField>
            <group.AppField name="translation.y">
              {(field) => <field.NumberTextField />}
            </group.AppField>
          </Stack>
        </Stack>
        <Stack>
          <group.AppField name="points" mode="array">
            {(field) => (
              <Fragment>
                {field.state.value.map((_, index) => (
                  <Stack key={`translate-point-${index}`} spacing={0.5}>
                    <Stack
                      direction={"row"}
                      sx={{ justifyContent: "space-between" }}
                    >
                      <Typography>
                        <MathJax dynamic>
                          {index === 0 && `พิกัดที่ ${index + 1} $(x,y)$`}
                          {index !== 0 && `พิกัดที่ ${index + 1}`}
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
