import { List, ListItem } from "@mui/material";
import { type FC, memo } from "react";
import { BlockMath } from "@/components/data-display/BlockMath";

const FORMULAS = [
  `$A(x,y)$ เลื่อนขนาน $\\begin{bmatrix} a \\\\ b\\end{bmatrix}$: $$A'(x+a,y+b)$$`,
] as const;

export const TranslationFormulaBlog: FC = memo(
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
