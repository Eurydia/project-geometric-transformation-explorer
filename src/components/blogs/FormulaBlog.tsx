import { List, ListItem, ListItemText, Typography } from "@mui/material";
import { MathJax } from "better-react-mathjax";
import { memo, type FC } from "react";
import { Collapsible } from "../surface/Collapsible";

const FORMULAE = [
  `$A(x,y)$ หมุนตามเข็มนาฬิกา $90^{\\circ}$ รอบจุดกำเนิด $(0,0)$: $$A'(y,-x)$$`,
  `$A(x,y)$ หมุนทวนเข็มนาฬิกา $90^{\\circ}$ รอบจุดกำเนิด $(0,0)$: $$A'(-y,x)$$`,
  `$A(x,y)$ หมุนตามหรือทวนเข็มนาฬิกา $180^{\\circ}$ รอบจุดกำเนิด $(0,0)$: $$A'(-x,-y)$$`,
  `$A(x,y)$ หมุนตามเข็มนาฬิกา $270^{\\circ}$ รอบจุดกำเนิด $(0,0)$: $$A'(-y,x)$$`,
  `$A(x,y)$ หมุนทวนเข็มนาฬิกา $270^{\\circ}$ รอบจุดกำเนิด $(0,0)$: $$A'(y,-x)$$`,

  `$A(x,y)$ หมุนตามเข็มนาฬิกา $90^{\\circ}$ รอบจุดกำเนิด $(a,b)$: $$A'(a-b+y, b+a-x)$$`,
  `$A(x,y)$ หมุนทวนเข็มนาฬิกา $90^{\\circ}$ รอบจุดกำเนิด $(a,b)$: $$A'(a+b-y, b-a+x)$$`,
  `$A(x,y)$ หมุนตามหรือทวนเข็มนาฬิกา $180^{\\circ}$ รอบจุดกำเนิด $(a,b)$: $$A'(2a-x,2b-y)$$`,
  `$A(x,y)$ หมุนตามเข็มนาฬิกา $270^{\\circ}$ รอบจุดกำเนิด $(a,b)$: $$A'(a+b-y, b-a+x)$$`,
  `$A(x,y)$ หมุนทวนเข็มนาฬิกา $270^{\\circ}$ รอบจุดกำเนิด $(a,b)$: $$A'(a-b+y, b+a-x)$$`,
] as const;

export const FormulaBlog: FC = memo(() => {
  return (
    <Collapsible
      title={<Typography fontWeight={600}>{`สูตรการหมุน`}</Typography>}
      children={
        <List
          sx={{
            paddingLeft: 4,
            listStyleType: "disc",
          }}
        >
          {FORMULAE.map((formula, index) => {
            return (
              <ListItem key={`forumla-${index}`} sx={{ display: "list-item" }}>
                <ListItemText
                  slotProps={{
                    primary: { variant: "body1" },
                  }}
                >
                  <MathJax dynamic>{formula}</MathJax>
                </ListItemText>
              </ListItem>
            );
          })}
        </List>
      }
    />
  );
});
