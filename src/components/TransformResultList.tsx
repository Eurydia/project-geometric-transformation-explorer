import {
  parseVec,
  validateNum,
  validateVec,
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
  center?: Vec2D<string>;
  result: Record<number, [Vec2D<number>, Vec2D<number>]>;
  angle?: string;
  direction: number;
};
export const TransformResultList: FC<Props> = memo(
  ({ angle, center, direction, result }) => {
    const preparedResult = useMemo(() => {
      const items: string[] = [];
      for (const [
        { x, y },
        { x: px, y: py },
      ] of Object.values(result)) {
        const xstr = x.toLocaleString("fullwide", {
          notation: "standard",
          maximumFractionDigits: 6,
          useGrouping: false,
        });
        const ystr = y.toLocaleString("fullwide", {
          notation: "standard",
          maximumFractionDigits: 6,
          useGrouping: false,
        });
        const pystr = py.toLocaleString("fullwide", {
          notation: "standard",
          maximumFractionDigits: 6,
          useGrouping: false,
        });
        const pxstr = px.toLocaleString("fullwide", {
          notation: "standard",
          maximumFractionDigits: 6,
          useGrouping: false,
        });

        items.push(
          `(${xstr}, ${ystr}) &\\rightarrow (${pxstr},${pystr})`
        );
      }

      return `\\begin{align} 
      ${items.join("\\\\")} 
      \\end{align}`;
    }, [result]);

    const centerReady = useMemo(() => {
      const r = center !== undefined && validateVec(center);
      if (!r) {
        return { ready: false };
      }
      const { x, y } = parseVec(center);
      return {
        ready: true,
        x: x.toLocaleString("fullwide", {
          notation: "standard",
          maximumFractionDigits: 6,
          useGrouping: false,
        }),
        y: y.toLocaleString("fullwide", {
          notation: "standard",
          maximumFractionDigits: 6,
          useGrouping: false,
        }),
      };
    }, [center]);

    const angleReady = useMemo(() => {
      const ready =
        angle !== undefined && validateNum(angle);
      if (!ready) {
        return { ready };
      }
      return {
        ready,
        angle: Number(angle).toLocaleString("fullwide", {
          notation: "standard",
          maximumFractionDigits: 6,
          useGrouping: false,
        }),
      };
    }, [angle]);

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
              {centerReady.ready
                ? `จุดหมุน: $(${centerReady.x}, ${centerReady.y})$`
                : `จุดหมุน: $-$`}
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
              {angleReady.ready
                ? `ขนาดของมุมที่หมุน: $${angleReady.angle}^{\\circ}$`
                : `ขนาดของมุมที่หมุน: $-$`}
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
              {direction === 0
                ? `ทิศทาง: $-$`
                : direction === -1
                ? `ทิศทาง: ทวนเข็มนาฬิกา`
                : `ทิศทาง: ตามเข็มนาฬิกา`}
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
              {`พิกัดเดิม $\\rightarrow$ พิกัดใหม่:`}
              {preparedResult}
            </MathJax>
          </ListItemText>
        </ListItem>
      </List>
    );
  },
  (prev, next) => {
    return prev.result === next.result;
  }
);
