import { List, ListItem, ListItemText, Typography } from "@mui/material";
import { MathJax } from "better-react-mathjax";
import { memo, type FC } from "react";

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
        sx={{
          paddingLeft: 4,
          listStyleType: "disc",
        }}
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
  () => true
);
