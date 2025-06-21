import {
  Collapse,
  List,
  ListItem,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import { MathJax } from "better-react-mathjax";
import {
  memo,
  useCallback,
  useState,
  type FC,
} from "react";

export const FormulaBlog: FC = memo(() => {
  const [open, setOpen] = useState(false);

  const handleToggle = useCallback(
    () => setOpen((prev) => !prev),
    []
  );

  return (
    <Stack spacing={0.5}>
      <Stack
        direction="row"
        useFlexGap
        flexWrap="wrap"
        alignItems="center"
        justifyContent="space-between"
      >
        <Typography
          variant="h6"
          component="div"
        >
          {`สูตรการหมุน`}
        </Typography>
        <Typography
          onClick={handleToggle}
          sx={{
            "&:hover": {
              textDecorationLine: "underline",
            },
          }}
        >
          {open ? `(ซ่อน)` : `(แสดง)`}
        </Typography>
      </Stack>
      <Collapse in={open}>
        <List
          dense
          disablePadding
          sx={{
            "pl": 4,
            "listStyleType": "disc",
            "& .MuiListItem-root": {
              display: "list-item",
            },
          }}
        >
          <ListItem>
            <ListItemText
              slotProps={{ primary: { variant: "body1" } }}
            >
              <MathJax dynamic>
                {`$A(x,y)$ หมุนตามเข็มนาฬิกา $90^{\\circ}$ รอบจุดกำเนิด $(0,0)$:
                  $$A'(y,-x)$$`}
              </MathJax>
            </ListItemText>
          </ListItem>
          <ListItem>
            <ListItemText
              slotProps={{ primary: { variant: "body1" } }}
            >
              <MathJax dynamic>
                {`$A(x,y)$ หมุนทวนเข็มนาฬิกา $90^{\\circ}$ รอบจุดกำเนิด $(0,0)$:
                  $$A'(-y,x)$$
                `}
              </MathJax>
            </ListItemText>
          </ListItem>
          <ListItem>
            <ListItemText
              slotProps={{ primary: { variant: "body1" } }}
            >
              <MathJax dynamic>
                {`$A(x,y)$ หมุนตามหรือทวนเข็มนาฬิกา $180^{\\circ}$ รอบจุดกำเนิด $(0,0)$:
                  $$A'(-x,-y)$$`}
              </MathJax>
            </ListItemText>
          </ListItem>
          <ListItem>
            <ListItemText
              slotProps={{ primary: { variant: "body1" } }}
            >
              <MathJax dynamic>
                {`$A(x,y)$ หมุนตามเข็มนาฬิกา $270^{\\circ}$ รอบจุดกำเนิด $(0,0)$:
                  $$A'(-y,x)$$`}
              </MathJax>
            </ListItemText>
          </ListItem>
          <ListItem>
            <ListItemText
              slotProps={{ primary: { variant: "body1" } }}
            >
              <MathJax dynamic>
                {`$A(x,y)$ หมุนทวนเข็มนาฬิกา $270^{\\circ}$ รอบจุดกำเนิด $(0,0)$:
                  $$A'(y,-x)$$`}
              </MathJax>
            </ListItemText>
          </ListItem>
        </List>
      </Collapse>
    </Stack>
  );
});
