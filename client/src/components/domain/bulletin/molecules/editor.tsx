import React, { useRef, useMemo, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import styled from "styled-components";
import { isMobile } from "../../../../utils/common";

const toolbarOptions = [
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

const EditorWrapper = styled.div`
  height:554px;
`;

interface Props{
  contents:string;
  setContents: React.Dispatch<React.SetStateAction<any>>;
}

const Editor = ({
  contents,
  setContents
}: Props) => {
  const quillRef = useRef<ReactQuill>();
  const modules = useMemo(() => ({
    toolbar: toolbarOptions
  }), []);

  return (
    <EditorWrapper>
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
          height: isMobile() ? "79%" : "86%"
        }}
      />
    </EditorWrapper>
  )
};

export default React.memo(Editor);