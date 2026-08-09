import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { type FC, memo } from "react";
import { Collapsible } from "../surface/Collapsible";

export const AttributionBlog: FC = memo(() => {
  return (
    <Collapsible
      title={
        <Typography
          component="h2"
          variant="subtitle1"
        >{`ข้อมูลเว็ปไซต์`}</Typography>
      }
    >
      <Stack component="article" spacing={1}>
        <Typography>
          {`เว็ปไซต์ถูกจัดทำและพัฒนาเพื่อให้เป็นสื่อการสอนของกลุ่มสาระการเรียนรู้คณิตศาสตร์ เรื่องการแปลงทางเรขาคณิต`}
        </Typography>
        <Typography
          component="h3"
          variant="subtitle1"
        >{`พัฒนาและปรับปรุงโดย`}</Typography>
        <Stack component="address">
          <Typography>{`นางสาวเจนจิรา แจ้งมากและ`}</Typography>
          <Typography>{`นายธนกร พุทธรักษา`}</Typography>
        </Stack>
        <Typography>{`(แก้ไขครั้งล่าสุดเมื่อ: 21 มิถุนายน พ.ศ. 2568)`}</Typography>
      </Stack>
    </Collapsible>
  );
});
