import { Box, Button, Dialog, Typography } from "@mui/material";
import { type FC, Fragment, memo, useCallback, useState } from "react";

export const ExpandableImage: FC<{
  src: string;
  alt: string;
}> = memo(({ src, alt }) => {
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
        slotProps={{ paper: { component: "figure" } }}
      >
        <Box
          component="figcaption"
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="subtitle1">{alt}</Typography>
          <Button size="small" variant="text" onClick={handleClose}>
            {`ปิด`}
          </Button>
        </Box>
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
});
