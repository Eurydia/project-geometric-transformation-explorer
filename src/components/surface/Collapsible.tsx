import { Collapse, Stack, Typography } from "@mui/material";
import { memo, useCallback, useState, type FC, type ReactNode } from "react";

type Props = { title: ReactNode; content: ReactNode };
export const Collapsible: FC<Props> = memo(({ content, title }) => {
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
          onClick={handleToggle}
          sx={{
            cursor: "pointer",
            "&:hover": {
              textDecorationLine: "underline",
            },
          }}
        >
          {open ? `(ซ่อน)` : `(แสดง)`}
        </Typography>
      </Stack>

      <Collapse in={open}>{content}</Collapse>
    </Stack>
  );
});
