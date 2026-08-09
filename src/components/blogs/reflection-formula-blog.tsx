import { List, ListItem } from "@mui/material";
import { type FC, memo } from "react";
import { BlockMath } from "@/components/data-display/BlockMath";

const FORMULAS = [
  "$A(x,y)$ สะท้อนข้าม แกน $x$: $$A'(x, -y)$$",
  "$A(x,y)$ สะท้อนข้าม แกน $y$: $$A'(-x, y)$$",
  "$A(x,y)$ สะท้อนข้าม แกน $y=a$: $$A'(x, 2a-y)$$",
  "$A(x,y)$ สะท้อนข้าม แกน $x=a$: $$A'(2a-x, y)$$",
] as const;

export const ReflectionFormulaBlog: FC = memo(
  () => {
    return (
      <List
        sx={(t) => ({
          paddingLeft: t.spacing(4),
          listStyleType: "disc",
        })}
      >
        {FORMULAS.map((formula, index) => {
          return (
            <ListItem key={`forumla-${index}`} sx={{ display: "list-item" }}>
              <BlockMath>{formula}</BlockMath>
            </ListItem>
          );
        })}
      </List>
    );
  },
  () => true,
);
