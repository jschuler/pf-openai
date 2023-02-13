import React from "react";
import { CodeEditor, Language } from "@patternfly/react-code-editor";

export const Editor = ({ content, readOnly, setCode }) => {
  const onEditorDidMount = (editor, monaco) => {
    // console.log(editor.getValue());
    editor.layout();
    editor.focus();
    monaco.editor.getModels()[0].updateOptions({
      tabSize: 5,
    });
  };
  const onChange = (value) => {
    if (setCode) {
      setCode(value);
    }
  };
  return (
    <>
      <CodeEditor
        // isDarkTheme={isDarkTheme}
        // isLineNumbersVisible={isLineNumbersVisible}
        isReadOnly={readOnly}
        // isMinimapVisible={isMinimapVisible}
        // isLanguageLabelVisible
        code={content}
        onChange={onChange}
        language={Language.javascript}
        onEditorDidMount={onEditorDidMount}
        height="400px"
      />
    </>
  );
};

export default Editor;
