import Collapse from "@mui/material/Collapse";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { memo, useCallback, useState, type FC, type ReactNode } from "react";

type Props = { title: ReactNode; children: ReactNode };
export const Collapsible: FC<Props> = memo(({ children, title }) => {
  const [open, setOpen] = useState(false);

  const handleToggle = useCallback(() => setOpen((prev) => !prev), []);
  return (
    <Stack
      spacing={2}
      sx={(t) => ({
        padding: t.spacing(1.375),
        backgroundColor: t.alpha(t.palette.scrapbook.paper, 0.8),
        borderWidth: 1.5,
        borderStyle: "dashed",
        borderColor: t.alpha(t.palette.scrapbook.ink, 0.4),
        borderRadius: t.spacing(0.375),
        boxShadow: `${t.spacing(0.375)} ${t.spacing(0.5)} 0 ${t.alpha(t.palette.scrapbook.ink, 0.08)}`,
      })}
    >
      <Stack
        direction="row"
        spacing={1}
        sx={{
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {title}
        <Typography
          component="span"
          onClick={handleToggle}
          sx={(theme) => ({
            cursor: "pointer",
            color: theme.palette.primary.dark,
            fontWeight: 700,
            ":hover": {
              textDecorationLine: "underline",
            },
          })}
        >
          {open ? `(ซ่อน)` : `(แสดง)`}
        </Typography>
      </Stack>
      <Collapse in={open}>{children}</Collapse>
    </Stack>
  );
});
