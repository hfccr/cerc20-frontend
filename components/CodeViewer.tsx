import { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  Typography,
  useTheme,
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import { Highlight, themes } from "prism-react-renderer";

interface CodeViewerProps {
  codeBlock: string;
  title: string;
  description?: string;
}

export default function CodeViewer({
  codeBlock,
  title,
  description,
}: CodeViewerProps) {
  const [open, setOpen] = useState(false);
  const toggleOpen = () => setOpen(!open);
  const handleClose = () => setOpen(false);
  const theme = useTheme();
  const highlightTheme =
    theme.palette.mode === "dark" ? themes.jettwaveDark : themes.vsLight;
  return (
    <>
      <IconButton aria-label="view-code" size="small" onClick={toggleOpen}>
        <InfoIcon />
      </IconButton>
      <Dialog open={open} onClose={handleClose} maxWidth="lg">
        <DialogTitle>{title}</DialogTitle>
        <Divider />
        <DialogContent>
          {description && <Typography sx={{ mb: 2 }}>{description}</Typography>}
          <Highlight theme={highlightTheme} code={codeBlock} language="tsx">
            {({ className, style, tokens, getLineProps, getTokenProps }) => (
              <pre style={{ ...style, padding: "16px", borderRadius: "8px" }}>
                {tokens.map((line, i) => (
                  <div key={i} {...getLineProps({ line })}>
                    <span style={{ width: "24px", display: "inline-block" }}>
                      {i + 1}
                    </span>
                    {line.map((token, key) => (
                      <span key={key} {...getTokenProps({ token })} />
                    ))}
                  </div>
                ))}
              </pre>
            )}
          </Highlight>
        </DialogContent>
        <Divider />
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
