import type { Vec2D } from "@/types";
import { Stack } from "@mui/material";
import {
  memo,
  type Dispatch,
  type FC,
  type ReactNode,
  type SetStateAction,
} from "react";
import {
  List,
  arrayMove,
  type RenderItemParams,
} from "react-movable";

type Props = {
  items: { id: number; vec: Vec2D<string> }[];
  onChange: Dispatch<
    SetStateAction<{ id: number; vec: Vec2D<string> }[]>
  >;
  renderItem: (
    parms: RenderItemParams<{
      id: number;
      vec: Vec2D<string>;
    }>
  ) => ReactNode;
};
export const SortableCoordinateList: FC<Props> = memo(
  ({ items, onChange, renderItem }) => {
    return (
      <List
        lockVertically
        disabled={items.length === 1}
        values={items}
        onChange={({ oldIndex, newIndex }) =>
          onChange((prev) =>
            arrayMove(prev, oldIndex, newIndex)
          )
        }
        renderList={({ children, props }) => (
          <Stack
            spacing={1}
            {...props}
          >
            {children}
          </Stack>
        )}
        renderItem={renderItem}
      />
    );
  }
);
