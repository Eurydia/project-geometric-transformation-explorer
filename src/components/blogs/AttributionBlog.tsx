import { Stack, Typography } from "@mui/material";
import { memo, type FC } from "react";
import { Collapsible } from "../surface/Collapsible";

export const AttributionBlog: FC = memo(() => {
  return (
    <Collapsible
      title={
        <Typography
          variant="h6"
          component="div"
        >
          {`ข้อมูลเว็ปไซต์`}
        </Typography>
      }
      content={
        <Stack spacing={1}>
          <Typography>
            {`เว็ปไซต์ถูกจัดทำและพัฒนาเพื่อให้เป็นสื่อการสอนของกลุ่มสาระการเรียนรู้คณิตศาสตร์ เรื่องการแปลงทางเรขาคณิต (การหมุน)`}
          </Typography>
          <Typography fontWeight={700}>
            {`พัฒนาและปรับปรุงโดย`}
          </Typography>
          <Typography>{`นางสาวเจนจิรา แจ้งมากและ`}</Typography>
          <Typography>{`นายธนกร พุทธรักษา`}</Typography>
          <Typography component="div">
            {`(แก้ไขครั้งล่าสุดเมื่อ: 21 มิถุนายน พ.ศ. 2568)`}
          </Typography>
        </Stack>
      }
    />
  );
});
