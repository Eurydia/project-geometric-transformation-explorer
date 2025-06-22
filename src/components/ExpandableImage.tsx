import {
  Box,
  Button,
  Dialog,
  DialogActions,
  Typography,
} from "@mui/material";
import {
  Fragment,
  memo,
  useCallback,
  useState,
  type FC,
} from "react";

type Props = {
  src: string;
  alt: string;
};
export const ExpandableImage: FC<Props> = memo(
  ({ src, alt }) => {
    const [expanded, setExpanded] = useState(false);
    const handleExpand = useCallback(() => {
      setExpanded(true);
    }, []);

    const handleClose = useCallback(() => {
      setExpanded(false);
    }, []);
    return (
      <Fragment>
        <Box
          component="img"
          alt={alt}
          src={src}
          onClick={handleExpand}
          width="100%"
          title={alt}
          sx={{
            backgroundRepeat: "no-repeat",
            backgroundSize: "contain",
            cursor: "pointer",
          }}
        />
        <Dialog
          open={expanded}
          onClose={handleClose}
          maxWidth="md"
          fullWidth
        >
          <DialogActions
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography fontWeight={700}>{alt}</Typography>
            <Button
              size="small"
              variant="text"
              onClick={handleClose}
            >
              {`ปิด`}
            </Button>
          </DialogActions>
          <Box
            component="img"
            src={src}
            alt={alt}
            width="100%"
            sx={{
              backgroundRepeat: "no-repeat",
              backgroundSize: "contain",
            }}
          />
        </Dialog>
      </Fragment>
    );
  }
);
