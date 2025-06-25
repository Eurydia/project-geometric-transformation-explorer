import {
  parseVec,
  useRotationGroup,
  validateNum,
  validateVec,
} from "@/hooks/useRotationGroup";
import type { Vec2D } from "@/types";
import {
  Button,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import { memo, useCallback, type FC } from "react";
import { AngleInput } from "../form-input/AngleInput";
import { CoordinateForm } from "../form-input/CoordinateForm";
import { DirectionInput } from "../form-input/DirectionInput";

type Props = {
  onSubmit: (
    data:
      | {
          center: Vec2D<number>;
          result: {
            id: number;
            image: Vec2D<number>;
            preimage: Vec2D<number>;
          }[];
          angle: number;
          direction: number;
        }
      | undefined
  ) => unknown;
};
export const CalculatorForm: FC<Props> = memo(
  ({ onSubmit }) => {
    const { data, handlers, helper } = useRotationGroup();

    const handleSolve = useCallback(() => {
      if (
        !validateNum(data.angle) ||
        !validateVec(data.center)
      ) {
        onSubmit(undefined);
      }

      onSubmit({
        result: structuredClone(helper.getResult()),
        direction: data.direction,
        angle: Number(data.angle),
        center: parseVec(data.center),
      });
    }, [
      data.angle,
      data.center,
      data.direction,
      helper,
      onSubmit,
    ]);

    return (
      <Stack spacing={1}>
        <Typography
          variant="h4"
          component="div"
          fontWeight={700}
        >
          {`การแปลงทางเรขาคณิต (การหมุน)`}
        </Typography>
        <Toolbar sx={{ justifyContent: "flex-end" }}>
          <Button
            variant="outlined"
            color="error"
            onClick={handlers.reset}
          >
            {`คืนค่าเริ่มต้น`}
          </Button>
        </Toolbar>
        <DirectionInput
          value={data.direction}
          onChange={handlers.setDirection}
        />
        <AngleInput
          value={data.angle}
          onChange={handlers.setAngle}
        />
        <CoordinateForm
          label="จุดหมุน $(x,y)$"
          value={data.center}
          onChange={handlers.setCenter}
        />
        {data.points.map(({ vec, id }) => {
          return (
            <CoordinateForm
              key={`point-input-${id}`}
              label={`พิกัดที่ ${id}`}
              value={vec}
              onChange={handlers.updatePointValue(id)}
              endIcon={
                <Typography
                  component="div"
                  color={
                    data.points.length === 1
                      ? "textDisabled"
                      : "error"
                  }
                  onClick={handlers.removePoint(id)}
                  sx={{
                    "cursor":
                      data.points.length > 1
                        ? "pointer"
                        : "auto",
                    "pointerEvents":
                      data.points.length === 1
                        ? "none"
                        : "auto",
                    "&:hover": {
                      textDecorationLine: "underline",
                    },
                  }}
                >
                  {`(ลบ)`}
                </Typography>
              }
            />
          );
        })}
        <Toolbar
          sx={{
            justifyContent: "space-between",
            gap: 0.5,
            flexWrap: "wrap",
          }}
        >
          <Button
            variant="contained"
            onClick={handleSolve}
          >
            คำนวณ
          </Button>
          <Button
            variant="outlined"
            disabled={data.points.length >= 4}
            onClick={handlers.addPoint}
          >
            เพิ่มพิกัด
          </Button>
        </Toolbar>
      </Stack>
    );
  }
);
