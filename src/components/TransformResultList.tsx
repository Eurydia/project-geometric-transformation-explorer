import {
  formatCoord,
  formatNumber,
} from "@/hooks/useRotationGroup";
import type { Vec2D } from "@/types";
import {
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { MathJax } from "better-react-mathjax";
import { memo, useMemo, type FC } from "react";

type Props = {
  data:
    | {
        center: Vec2D<number>;
        result: Record<
          number,
          [Vec2D<number>, Vec2D<number>]
        >;
        angle: number;
        direction: number;
      }
    | undefined;
};
export const TransformResultList: FC<Props> = memo(
  ({ data }) => {
    const result = useMemo(() => {
      if (data === undefined) {
        return "-";
      }

      const items: string[] = [];
      for (const [id, [preimg, img]] of Object.entries(
        data.result
      )) {
        const preimgCoord = formatCoord(preimg);
        const imgCoord = formatCoord(img);
        const id_ = formatNumber(Number(id));
        items.push(
          `A_{${id_}}${preimgCoord} &\\rightarrow A_{${id_}}^{\\prime}${imgCoord}`
        );
      }

      return items.length > 0 ? items.join(`\\\\`) : "-";
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
      return data.direction === -1
        ? `ทวนเข็มนาฬิกา`
        : `ตามเข็มนาฬิกา`;
    }, [data]);

    return (
      <List
        dense
        disablePadding
      >
        <ListItem
          dense
          disableGutters
          disablePadding
        >
          <ListItemText disableTypography>
            <MathJax dynamic>
              {`จุดหมุน: $${center}$`}
            </MathJax>
          </ListItemText>
        </ListItem>
        <ListItem
          dense
          disableGutters
          disablePadding
        >
          <ListItemText disableTypography>
            <MathJax dynamic>
              {`ขนาดของมุมที่หมุน: $${angle}$`}
            </MathJax>
          </ListItemText>
        </ListItem>
        <ListItem
          dense
          disableGutters
          disablePadding
        >
          <ListItemText disableTypography>
            <MathJax dynamic>
              {`ทิศทาง: ${direction}`}
            </MathJax>
          </ListItemText>
        </ListItem>
        <ListItem
          dense
          disableGutters
          disablePadding
        >
          <ListItemText disableTypography>
            <MathJax dynamic>
              {`พิกัดเดิม $\\rightarrow$ พิกัดใหม่: \\begin{align} ${result}\\end{align} `}
            </MathJax>
          </ListItemText>
        </ListItem>
      </List>
    );
  }
);
