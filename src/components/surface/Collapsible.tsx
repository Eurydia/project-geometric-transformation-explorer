import ButtonBase from "@mui/material/ButtonBase";
import Stack from "@mui/material/Stack";
import {
  type FC,
  memo,
  type PropsWithChildren,
  type ReactNode,
  useCallback,
  useState,
} from "react";

export const Collapsible: FC<PropsWithChildren<{ title: ReactNode }>> = memo(
  ({ children, title }) => {
    const [open, setOpen] = useState(false);
    const handleToggle = useCallback(() => setOpen((prev) => !prev), []);
    return (
      <Stack
        component="section"
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
          component="header"
          direction="row"
          spacing={1}
          sx={{
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {title}
          <ButtonBase
            type="button"
            disableRipple
            onClick={handleToggle}
            sx={(theme) => ({
              ...theme.typography.subtitle1,
              cursor: "pointer",
              color: theme.palette.primary.dark,
              textDecorationLine: "underline",
            })}
          >
            {open ? `(ซ่อน)` : `(แสดง)`}
          </ButtonBase>
        </Stack>
        <section hidden={!open}>{children}</section>
      </Stack>
    );
  },
);
