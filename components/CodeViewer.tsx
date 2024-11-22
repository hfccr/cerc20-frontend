import { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  useTheme,
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import { Highlight, themes } from "prism-react-renderer";

interface CodeViewerProps {
  codeBlock: string;
  title: string;
}

export default function CodeViewer({ codeBlock, title }: CodeViewerProps) {
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
        <DialogContent>
          <Highlight theme={highlightTheme} code={codeBlock} language="tsx">
            {({ className, style, tokens, getLineProps, getTokenProps }) => (
              <pre style={style}>
                {tokens.map((line, i) => (
                  <div key={i} {...getLineProps({ line })}>
                    <span>{i + 1}</span>
                    {line.map((token, key) => (
                      <span key={key} {...getTokenProps({ token })} />
                    ))}
                  </div>
                ))}
              </pre>
            )}
          </Highlight>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
