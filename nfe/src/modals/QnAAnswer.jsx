import React, {  useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";

function QnAAnswer({ open, handleClose , submithandler}) {
  const [editorData, setEditorData] = useState("");
  const [title, setTitle] = useState("");

 

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
      <DialogTitle>Create Q&A Answer</DialogTitle>
      <DialogContent>
        <div className="space-y-4">
          <TextField
            label="Title"
            variant="outlined"
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <CKEditor
            editor={ClassicEditor}
            data={editorData}
            onChange={(event, editor) => {
              const data = editor.getData();
              setEditorData(data);
            }}
          />
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={submithandler} color="primary">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default QnAAnswer;