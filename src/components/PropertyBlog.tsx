import img from "@/assets/graph-image.png";
import {
  Box,
  Collapse,
  List,
  ListItem,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import {
  memo,
  useCallback,
  useState,
  type FC,
} from "react";

const PROPERTIES = [
  `รูปต้นแบบและภาพที่ได้จากการหมุน สามารถทับกันได้สนิทโดยไม่ต้องพลิกรูป หรือกล่าวว่ารูปต้นแบบและภาพที่ได้จากการหมุนเท่ากันทุกประการ`,
  `จุดแต่ละจุดบนรูปต้นแบบและภาพที่ได้จากการหมุนจุดนั้น จะอยู่บนวงกลมเดียวกันที่มีจุดหมุนเป็นจุดศูนย์กลาง แต่วงกลมทั้งหลายเหล่านั้นไม่จำเป็นต้องมีรัศมียาวเท่ากัน`,
  `เส้นตรงที่แบ่งครึ่งและตั้งฉากกับส่วนของเส้นตรงที่เชื่อมระหว่างจุดบนรูปต้นแบบและภาพที่ได้จากการหมุนจุดนั้น จะผ่านจุดหมุนเสมอ`,
] as const;

export const PropertyBlog: FC = memo(() => {
  const [open, setOpen] = useState(false);

  const handleToggle = useCallback(
    () => setOpen((prev) => !prev),
    []
  );

  return (
    <Stack spacing={0.5}>
      <Stack
        direction="row"
        useFlexGap
        flexWrap="wrap"
        alignItems="center"
        justifyContent="space-between"
      >
        <Typography
          variant="h6"
          component="div"
        >
          {`สมบัติการหมุน`}
        </Typography>
        <Typography
          onClick={handleToggle}
          sx={{
            "&:hover": {
              textDecorationLine: "underline",
            },
          }}
        >
          {open ? `(ซ่อน)` : `(แสดง)`}
        </Typography>
      </Stack>
      <Collapse in={open}>
        <List
          sx={{
            pl: 4,
            listStyleType: "disc",
          }}
        >
          {PROPERTIES.map((msg, index) => {
            return (
              <ListItem
                key={`prop-msg-${index}`}
                sx={{ display: "list-item" }}
              >
                <ListItemText
                  slotProps={{
                    primary: { variant: "body1" },
                  }}
                >
                  {msg}
                </ListItemText>
              </ListItem>
            );
          })}
        </List>
        <Box
          component="img"
          src={img}
          alt="ตัวอย่างกราฟ"
          width="100%"
          sx={{
            backgroundRepeat: "no-repeat",
            backgroundSize: "contain",
          }}
        />
      </Collapse>
    </Stack>
  );
});
