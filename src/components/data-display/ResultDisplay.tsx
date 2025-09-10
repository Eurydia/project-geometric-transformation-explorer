import { formatCoord, formatNumber } from "@/hooks/useRotationGroup";
import type { Vec2D } from "@/types";
import { List, ListItem, ListItemText, Typography } from "@mui/material";
import { MathJax } from "better-react-mathjax";
import { memo, useMemo, type FC } from "react";
import { Collapsible } from "../surface/Collapsible";

type Props = {
  data:
    | {
        center: Vec2D<number>;
        result: {
          id: number;
          preimage: Vec2D<number>;
          image: Vec2D<number>;
        }[];
        angle: number;
        direction: number;
      }
    | undefined;
};
export const ResultDisplay: FC<Props> = memo(({ data }) => {
  const resultItems = useMemo(() => {
    if (data === undefined) {
      return "$-$";
    }

    const _data = structuredClone(data.result);
    _data.sort((x, y) => x.id - y.id);

    const items: string[] = [];
    for (const { id, image, preimage } of _data) {
      const preimgCoord = formatCoord(preimage);
      const imgCoord = formatCoord(image);
      const id_ = formatNumber(id);
      items.push(
        `A_{${id_}}${preimgCoord} &\\rightarrow A_{${id_}}^{\\prime}${imgCoord}`
      );
    }

    return items.length > 0
      ? `\\begin{align} ${items.join("\\\\")} \\end{align}`
      : "$-$";
  }, [data]);

  const center = useMemo(() => {
    if (data === undefined) {
      return "-";
    }
    return formatCoord(data.center);
  }, [data]);

  const angle = useMemo(() => {
    if (data === undefined) {
      return "-";
    }
    return `${formatNumber(data.angle)}^{\\circ}`;
  }, [data]);

  const direction = useMemo(() => {
    if (data === undefined) {
      return "$-$";
    }
    return data.direction === -1 ? `ทวนเข็มนาฬิกา` : `ตามเข็มนาฬิกา`;
  }, [data]);

  return (
    <Collapsible
      title={
        <Typography variant="h6" component="div" fontWeight={700}>
          {`ผลลัพธ์`}
        </Typography>
      }
      children={
        <List dense disablePadding>
          <ListItem dense disableGutters disablePadding>
            <ListItemText disableTypography>
              <MathJax dynamic>{`จุดหมุน: $${center}$`}</MathJax>
            </ListItemText>
          </ListItem>
          <ListItem dense disableGutters disablePadding>
            <ListItemText disableTypography>
              <MathJax dynamic>{`ขนาดของมุมที่หมุน: $${angle}$`}</MathJax>
            </ListItemText>
          </ListItem>
          <ListItem dense disableGutters disablePadding>
            <ListItemText disableTypography>
              <MathJax dynamic>{`ทิศทาง: ${direction}`}</MathJax>
            </ListItemText>
          </ListItem>
          <ListItem dense disableGutters disablePadding>
            <ListItemText disableTypography>
              <MathJax dynamic>
                {`พิกัดเดิม $\\rightarrow$ พิกัดใหม่: ${resultItems}`}
              </MathJax>
            </ListItemText>
          </ListItem>
        </List>
      }
    />
  );
});
