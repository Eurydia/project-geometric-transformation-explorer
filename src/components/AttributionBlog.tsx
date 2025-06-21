import { Collapse, Stack, Typography } from "@mui/material";
import {
  memo,
  useCallback,
  useState,
  type FC,
} from "react";

export const AttributionBlog: FC = memo(() => {
  const [open, setOpen] = useState(false);

  const handleToggle = useCallback(
    () => setOpen((prev) => !prev),
    []
  );
  return (
    <Stack>
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
          {`ข้อมูลเว็ปไซต์`}
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
        <Stack spacing={1}>
          <Typography
            variant="subtitle2"
            component="div"
          >
            {`(แก้ไขครั้งล่าสุดเมื่อ: 21 มิถุนายน พ.ศ. 2568)`}
          </Typography>
          <Typography>
            {`เว็ปไซต์ถูกจัดทำและพัฒนาเพื่อให้เป็นสื่อการสอนของกลุ่มสาระการเรียนรู้คณิตศาสตร์ เรื่องการแปลงทางเรขาคณิต (การหมุน)`}
          </Typography>
          <Typography fontWeight={700}>
            {`พัฒนาและปรับปรุงโดย`}
          </Typography>
          <Typography>{`นางสาวเจนจิรา แจ้งมากและ`}</Typography>
          <Typography>{`นายธนกร พุทธรักษา`}</Typography>
        </Stack>
      </Collapse>
    </Stack>
  );
});
