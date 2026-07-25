import { memo, type FC } from "react";
import { Collapsible } from "../surface/Collapsible";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

export const AttributionBlog: FC = memo(() => {
  return (
    <Collapsible
      title={
        <Typography sx={{ fontWeight: 700 }}>{`ข้อมูลเว็ปไซต์`}</Typography>
      }
      children={
        <Stack spacing={1}>
          <Typography>
            {`เว็ปไซต์ถูกจัดทำและพัฒนาเพื่อให้เป็นสื่อการสอนของกลุ่มสาระการเรียนรู้คณิตศาสตร์ เรื่องการแปลงทางเรขาคณิต`}
          </Typography>
          <Typography sx={{ fontWeight: 700 }}>
            {`พัฒนาและปรับปรุงโดย`}
          </Typography>
          <Stack>
            <Typography>{`นางสาวเจนจิรา แจ้งมากและ`}</Typography>
            <Typography>{`นายธนกร พุทธรักษา`}</Typography>
          </Stack>
          <Typography>
            {`(แก้ไขครั้งล่าสุดเมื่อ: 21 มิถุนายน พ.ศ. 2568)`}
          </Typography>
        </Stack>
      }
    />
  );
});
