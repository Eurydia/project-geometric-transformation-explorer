import Card from "@mui/material/Card";
import type { FC, ReactNode } from "react";

export const TopicCardFrame: FC<{
  children: ReactNode;
  tone: "yellowPale" | "green" | "pink";
  rotation: number;
}> = ({ children, tone, rotation }) => (
  <Card
    sx={(t) => ({
      backgroundColor: t.palette.scrapbook[tone],
      borderWidth: 2,
      borderStyle: "solid",
      borderColor: t.alpha(t.palette.scrapbook.ink, 0.72),
      borderRadius: t.spacing(0.75),
      boxShadow: [
        `${t.spacing(0.875)} ${t.spacing(1.125)} 0 ${t.alpha(t.palette.scrapbook.ink, 0.14)}`,
        `0 ${t.spacing(2.25)} ${t.spacing(3.5)} ${t.alpha(t.palette.scrapbook.shadow, 0.1)}`,
      ].join(","),
      transform: `rotate(${rotation}deg)`,
      transition: t.transitions.create(["transform", "box-shadow"], {
        duration: 180,
        easing: "ease",
      }),
      ":hover": {
        transform: `translateY(${t.spacing(-0.875)}) rotate(0deg)`,
        boxShadow: [
          `${t.spacing(1.25)} ${t.spacing(1.625)} 0 ${t.alpha(t.palette.scrapbook.ink, 0.14)}`,
          `0 ${t.spacing(3)} ${t.spacing(4.75)} ${t.alpha(t.palette.scrapbook.shadow, 0.13)}`,
        ].join(","),
      },
    })}
  >
    {children}
  </Card>
);
