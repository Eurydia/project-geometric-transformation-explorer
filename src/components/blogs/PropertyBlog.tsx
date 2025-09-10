import prop12 from "@/assets/prop1+2.jpg";
import prop3 from "@/assets/prop3.jpg";
import { List, ListItem, ListItemText, Stack, Typography } from "@mui/material";
import { memo, type FC } from "react";
import { ExpandableImage } from "../data-display/ExpandableImage";
import { Collapsible } from "../surface/Collapsible";

const PROPERTIES = [
  `รูปต้นแบบและภาพที่ได้จากการหมุน สามารถทับกันได้สนิทโดยไม่ต้องพลิกรูป หรือกล่าวว่ารูปต้นแบบและภาพที่ได้จากการหมุนเท่ากันทุกประการ`,
  `จุดแต่ละจุดบนรูปต้นแบบและภาพที่ได้จากการหมุนจุดนั้น จะอยู่บนวงกลมเดียวกันที่มีจุดหมุนเป็นจุดศูนย์กลาง แต่วงกลมทั้งหลายเหล่านั้นไม่จำเป็นต้องมีรัศมียาวเท่ากัน`,
  `เส้นตรงที่แบ่งครึ่งและตั้งฉากกับส่วนของเส้นตรงที่เชื่อมระหว่างจุดบนรูปต้นแบบและภาพที่ได้จากการหมุนจุดนั้น จะผ่านจุดหมุนเสมอ`,
] as const;

export const PropertyBlog: FC = memo(() => {
  return (
    <Collapsible
      title={<Typography fontWeight={600}>{`สมบัติการหมุน`}</Typography>}
      children={
        <Stack spacing={0.5}>
          <List
            sx={{
              pl: 4,
              listStyleType: "disc",
            }}
          >
            <ListItem sx={{ display: "list-item" }}>
              <ListItemText
                slotProps={{
                  primary: { variant: "body1" },
                }}
              >
                {PROPERTIES[0]}
              </ListItemText>
            </ListItem>
            <ListItem sx={{ display: "list-item" }}>
              <ListItemText
                slotProps={{
                  primary: { variant: "body1" },
                }}
              >
                {PROPERTIES[1]}
              </ListItemText>
            </ListItem>
          </List>
          <ExpandableImage
            src={prop12}
            alt={`แผนภาพแสดงคุณสมบัติที่หนึ่งและสองของการหมุน`}
          />
          <List
            sx={{
              pl: 4,
              listStyleType: "disc",
            }}
          >
            <ListItem sx={{ display: "list-item" }}>
              <ListItemText
                slotProps={{
                  primary: { variant: "body1" },
                }}
              >
                {PROPERTIES[2]}
              </ListItemText>
            </ListItem>
          </List>
          <ExpandableImage
            src={prop3}
            alt={`แผนภาพแสดงคุณสมบัติที่สามของการหมุน`}
          />
        </Stack>
      }
    />
  );
});
