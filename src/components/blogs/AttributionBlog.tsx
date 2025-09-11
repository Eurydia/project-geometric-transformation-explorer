import { Stack, Typography } from "@mui/material";
import { memo, type FC } from "react";
import { Collapsible } from "../surface/Collapsible";

export const AttributionBlog: FC = memo(() => {
  return (
    <Collapsible
      title={<Typography fontWeight={600}>{`ข้อมูลเว็ปไซต์`}</Typography>}
      children={
        <Stack spacing={1}>
          <Typography>
            {`เว็ปไซต์ถูกจัดทำและพัฒนาเพื่อให้เป็นสื่อการสอนของกลุ่มสาระการเรียนรู้คณิตศาสตร์ เรื่องการแปลงทางเรขาคณิต`}
          </Typography>
          <Typography fontWeight={600}>{`พัฒนาและปรับปรุงโดย`}</Typography>
          <Stack>
            <Typography>
              {`นางสาวเจนจิรา แจ้งมากและ`}
              <br />
              {`นายธนกร พุทธรักษา`}
            </Typography>
          </Stack>
          <Typography component="div">
            {`(แก้ไขครั้งล่าสุดเมื่อ: 21 มิถุนายน พ.ศ. 2568)`}
          </Typography>
        </Stack>
      }
    />
  );
});
