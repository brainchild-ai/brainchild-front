import React, { useCallback, useMemo, useEffect } from 'react';
import { Button, Icon, Toolbar } from './component';
import { useSlate } from 'slate-react';
import {
  Editor,
} from 'slate';

const isMarkActive = (editor, format) => {
  const marks = Editor.marks(editor);
  return marks ? marks[format] === true : false;
};
const MarkButton = ({ format, icon }) => {
  const editor = useSlate();

  const toggleMark = (editor, format) => {
    const isActive = isMarkActive(editor, format);

    if (isActive) {
      Editor.removeMark(editor, format);
    } else {
      Editor.addMark(editor, format, true);
    }
  };
  return (
    <Button
      active={isMarkActive(editor, format)}
      onMouseDown={(event) => {
        event.preventDefault();
        toggleMark(editor, format);
      }}
    >
      <Icon>{icon}</Icon>
    </Button>
  );
};


export default MarkButton;
