import { List, ListItem } from "@mui/material";
import { type FC, memo } from "react";
import { BlockMath } from "@/components/data-display/BlockMath";

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

export const RotationFormulaBlog: FC = memo(() => {
  return (
    <List
      sx={(t) => ({
        paddingLeft: t.spacing(4),
        listStyleType: "disc",
      })}
    >
      {FORMULAE.map((formula, index) => {
        return (
          <ListItem key={`forumla-${index}`} sx={{ display: "list-item" }}>
            <BlockMath>{formula}</BlockMath>
          </ListItem>
        );
      })}
    </List>
  );
});
