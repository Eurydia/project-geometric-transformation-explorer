import {
  Alert,
  AlertTitle,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { MathJax } from "better-react-mathjax";
import { memo, type FC } from "react";

type Props = {
  errors: string[];
};
export const ErrorList: FC<Props> = memo(({ errors }) => {
  return (
    <Alert severity="warning">
      <AlertTitle>{`คำเตือน`}</AlertTitle>
      <List
        dense
        disablePadding
        sx={{
          "listStyleType": "disc",
          "pl": 2,
          "& .MuiListItem-root": {
            display: "list-item",
          },
        }}
      >
        {errors.map((error, index) => (
          <ListItem
            key={`error-item-${index}`}
            dense
            disableGutters
            disablePadding
          >
            <ListItemText
              slotProps={{
                primary: { variant: "body1" },
              }}
            >
              <MathJax dynamic>{error}</MathJax>
            </ListItemText>
          </ListItem>
        ))}
      </List>
    </Alert>
  );
});
