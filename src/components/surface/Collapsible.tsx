import { Collapse, Stack, Typography } from "@mui/material";
import { memo, useCallback, useState, type FC, type ReactNode } from "react";

type Props = { title: ReactNode; children: ReactNode };
export const Collapsible: FC<Props> = memo(({ children, title }) => {
  const [open, setOpen] = useState(false);

  const handleToggle = useCallback(() => setOpen((prev) => !prev), []);
  return (
    <Stack>
      <Stack
        direction="row"
        useFlexGap
        flexWrap="wrap"
        alignItems="center"
        justifyContent="space-between"
      >
        {title}
        <Typography
          component={"span"}
          tabIndex={0}
          onClick={handleToggle}
          sx={{
            width: "fit-content",
            cursor: "pointer",
            "&:hover": {
              textDecorationLine: "underline",
            },
          }}
        >
          {open ? `(ซ่อน)` : `(แสดง)`}
        </Typography>
      </Stack>

      <Collapse in={open}>{children}</Collapse>
    </Stack>
  );
});
