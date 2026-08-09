import { List, ListItem, ListItemText, Typography } from "@mui/material";
import { MathJax } from "better-react-mathjax";
import { type FC, memo } from "react";

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
              <ListItemText disableTypography>
                <Typography>
                  <MathJax dynamic>{formula}</MathJax>
                </Typography>
              </ListItemText>
            </ListItem>
          );
        })}
      </List>
    );
  },
  () => true,
);
