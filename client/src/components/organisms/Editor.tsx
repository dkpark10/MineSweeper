import React, { useRef, useMemo } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

var toolbarOptions = [

  ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
  ['blockquote', 'code-block'],

  [{ 'list': 'ordered' }, { 'list': 'bullet' }],
  [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
  [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
  [{ 'direction': 'rtl' }],                         // text direction
  [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
  [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
  [{ 'font': [] }],
  [{ 'align': [] }],
  ['clean']                                         // remove formatting button
];

type StateCallback = React.Dispatch<React.SetStateAction<any>>;

interface IEditorProps {
  contents: string;
  setContents: StateCallback;
}

const EditorComponent = ({ contents, setContents }: IEditorProps) => {

  const quillRef = useRef<ReactQuill>();

  const modules = useMemo(() => ({
    toolbar: toolbarOptions
  }), []);

  return (
    <>
      <ReactQuill
        ref={element => {
          if (element !== null)
            quillRef.current = element;
        }}
        value={contents}
        onChange={setContents}
        modules={modules}
        theme="snow"
        style={{
          height: '87%',
        }}
      />
    </>
  )
};

export default React.memo(EditorComponent);