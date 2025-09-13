import { Typography, Stack, List, ListItem, ListItemText } from "@mui/material";
import { memo, type FC } from "react";

const PROPERTIES = [
  "รูปต้นแบบและภาพที่ได้จากการเลื่อนขนานสามารถทับกันได้สนิทโดยไม่ต้องพลิกรูป หรือกล่าวว่ารูปต้นแบบและภาพที่ได้จากการเลื่อนขนานเท่ากันทุกประการ",
  "ส่วนของเส้นตรงที่เชื่อมระหว่างจุดที่สมนัยกันแต่ละคู่ จะขนานกันและยาวเท่ากันทุกเส้น",
  "ส่วนของเส้นตรงบนรูปต้นแบบและภาพที่ได้จากการเลือนขนานส่วนของเส้นตรงนั้น จะขนานกันและยาวเท่ากัน",
] as const;

export const TranslationPropertyBlog: FC = memo(
  () => {
    return (
      <Stack spacing={0.5}>
        <List
          sx={{
            pl: 4,
            listStyleType: "disc",
          }}
        >
          {PROPERTIES.map((p, index) => (
            <ListItem sx={{ display: "list-item" }} key={`PROP-${index}`}>
              <ListItemText disableTypography>
                <Typography>{p}</Typography>
              </ListItemText>
            </ListItem>
          ))}
        </List>
      </Stack>
    );
  },
  () => true
);
