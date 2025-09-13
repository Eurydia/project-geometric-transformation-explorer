import { Typography, Stack, List, ListItem, ListItemText } from "@mui/material";
import { memo, type FC } from "react";

const PROPERTIES = [
  "รูปต้นแบบและภาพที่ได้จากการสะท้อน สามารถทับกันได้สนิทโดยต้องพลิกรูปต้นแบบหรือพลิกภาพที่ได้จากการสะท้อนอย่างหนึ่งอย่างใด หรือกล่าวว่า รูปต้นแบบและภาพที่ได้จากการสะท้อนเท่ากันทุกประการ",
  "จุดที่สมนัยกันแต่ละคู่จะอยู่ห่างจากเส้นสะท้อนเท่ากัน หรือเส้นสะท้อนจะแบ่งครึ่งและตั้งฉากกับส่วนของเส้นตรงทีเชื่อมระหว่างจุดที่สมนัยกันบนรูปต้นแบบและภาพที่ได้จากการสะท้อน",
  "ส่วนของเส้นตรงที่เชื่อมระหว่างจุดที่สมนัยกันบนรูปต้นแบบและภาพที่ได้จากการสะท้อน จะขนานกัน",
] as const;

export const ReflectionPropertyBlog: FC = memo(
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
