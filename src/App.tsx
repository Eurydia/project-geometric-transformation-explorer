import {
  Box,
  Button,
  Grid,
  List,
  ListItem,
  ListItemText,
  Paper,
  Toolbar,
  Typography,
} from "@mui/material";
import { MathJax } from "better-react-mathjax";
import { useCallback, useState } from "react";
import { AngleInput } from "./components/AngleInput";
import { CoordinateForm } from "./components/CoordinateForm";
import { RotationSolver } from "./services/RotationSolver";

export const App = () => {
  // useEffect(() => {
  //   const elt = document.createElement("div");
  //   elt.style.width = "600px";
  //   elt.style.height = "400px";

  //   const calculator = Desmos.GraphingCalculator(elt, {
  //     expressions: false, // hide the expression list
  //     keypad: false, // hide the on-screen keypad
  //     settingsMenu: false, // hide the wrench menu
  //   });

  //   calculator.setExpression({
  //     id: "graph1",
  //     latex: "y=x^2",
  //   });

  //   document.body.prepend(elt);
  //   return () => elt.remove();
  // }, []);
  const [center, setCenter] = useState({
    x: "0",
    y: "0",
  });
  const [point, setPoint] = useState({
    x: "1",
    y: "1",
  });
  const [angle, setAngle] = useState("");
  const [direction, setDirection] = useState(1);

  const [result, setResult] = useState<
    RotationSolver | undefined
  >(undefined);

  const handleSolve = useCallback(() => {
    const e = new RotationSolver();
    if (
      e.withPoint(point) === undefined ||
      e.withAngle(angle, direction) === undefined ||
      e.withCenter(center) === undefined
    ) {
      setResult(undefined);
      return;
    }

    setResult(e.solve() ?? undefined);
  }, [center, point, angle, direction]);

  return (
    <Box
      sx={{
        padding: 2,
        maxWidth: "md",
        margin: "auto",
        display: "flex",
        flexDirection: "column",
        gap: 1,
      }}
    >
      <Paper
        variant="outlined"
        sx={{ padding: 4 }}
      >
        <Grid
          container
          spacing={2}
        >
          <Grid size={6}>
            <CoordinateForm
              value={center}
              onChange={setCenter}
              label="จุดกำเนิด"
            />
          </Grid>
          <Grid size={6}>
            <CoordinateForm
              value={point}
              onChange={setPoint}
              label="จุดที่จะหมุด"
            />
          </Grid>
          <Grid size={12}>
            <AngleInput
              angle={angle}
              onAngleChange={setAngle}
              onDirectionChange={setDirection}
              direction={direction}
            />
          </Grid>
          <Grid size={12}>
            <Toolbar
              disableGutters
              variant="dense"
            >
              <Button
                variant="contained"
                disableElevation
                disableRipple
                onClick={handleSolve}
              >
                {`คำนวณ`}
              </Button>
            </Toolbar>
          </Grid>
        </Grid>
      </Paper>
      {result !== undefined && (
        <Paper
          variant="outlined"
          sx={{ padding: 4 }}
        >
          <Typography
            variant="h5"
            component="div"
            fontWeight={600}
          >
            {`ผลลัพท์การหมุน`}
          </Typography>
          <List
            dense
            disablePadding
          >
            <ListItem
              dense
              disableGutters
              disablePadding
            >
              <ListItemText disableTypography>
                <MathJax>{`จุดกำเนิด: $(
                ${result.center!.x.toLocaleString(
                  "fullwide",
                  {
                    maximumFractionDigits: 3,
                    useGrouping: false,
                  }
                )},
                 ${result.center!.y.toLocaleString(
                   "fullwide",
                   {
                     maximumFractionDigits: 3,
                     useGrouping: false,
                   }
                 )}
                )$`}</MathJax>
              </ListItemText>
            </ListItem>
            <ListItem
              dense
              disableGutters
              disablePadding
            >
              <ListItemText disableTypography>
                <MathJax>{`จุดหมุด: $(
                ${result.point!.x.toLocaleString(
                  "fullwide",
                  {
                    maximumFractionDigits: 3,
                    useGrouping: false,
                  }
                )},
                 ${result.point!.y.toLocaleString(
                   "fullwide",
                   {
                     maximumFractionDigits: 3,
                     useGrouping: false,
                   }
                 )}
                )$`}</MathJax>
              </ListItemText>
            </ListItem>
            <ListItem
              dense
              disableGutters
              disablePadding
            >
              <ListItemText disableTypography>
                <MathJax>{`องศา: $
                ${(
                  (result.angle! * 180) /
                  Math.PI
                ).toLocaleString("fullwide", {
                  maximumFractionDigits: 3,
                  useGrouping: false,
                })}^{\\circ}$`}</MathJax>
              </ListItemText>
            </ListItem>
            <ListItem
              dense
              disableGutters
              disablePadding
            >
              <ListItemText disableTypography>
                <MathJax>{`ผลลัพท์: $(
                ${result.result!.x.toLocaleString(
                  "fullwide",
                  {
                    maximumFractionDigits: 3,
                    useGrouping: false,
                  }
                )},
                 ${result.result!.y.toLocaleString(
                   "fullwide",
                   {
                     maximumFractionDigits: 3,
                     useGrouping: false,
                   }
                 )}
                )$`}</MathJax>
              </ListItemText>
            </ListItem>
          </List>
        </Paper>
      )}
    </Box>
  );
};

