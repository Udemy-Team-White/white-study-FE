import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import styled from "styled-components";
import { Black, Gray3, White } from "../../styles/colors";
import { useEffect } from "react";

const EditorWrapper = styled.div`
  background-color: ${White};
  border: 1px solid ${Gray3};
  color: ${Black};
  border-radius: 6px;

  .tiptap {
    min-height: 200px;
    padding: 12px;
    outline: none;
  }
`;

const Toolbar = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 12px;
  padding: 4px 10px;
  border-bottom: 1px solid ${Gray3};
`;

const ToolButton = styled.button`
  min-width: 20px;
  background: transparent;
  border: none;
  padding: 4px 6px;
  cursor: pointer;
  color: ${(props) => (props.active ? "#4f46e5" : "#333")};
  font-weight: ${(props) => (props.active ? "bold" : "normal")};
  border-radius: 4px;
  transition: background 0.2s;

  &:hover {
    background: #f0f0f0;
  }

  svg {
    width: 16px;
    height: 16px;
  }
`;

const TextEditor = ({ value, onChange }) => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: value,
    onUpdate({ editor }) {
      onChange(editor.getHTML());
    },
  });

  useEffect(() => {
    if (!editor) return;

    const current = editor.getHTML();

    // 내용이 다를 때만 업데이트 (무한루프 방지)
    if (value !== current) {
      editor.commands.setContent(value || "", false);
    }
  }, [value, editor]);

  return (
    <EditorWrapper>
      <EditorMenuBar editor={editor} />
      <EditorContent editor={editor} />
    </EditorWrapper>
  );
};

export default TextEditor;

// 텍스트에디터 버튼
const EditorMenuBar = ({ editor }) => {
  if (!editor) return null;
  const headingLevels = [1, 2, 3, 4, 5, 6];

  return (
    <Toolbar>
      <ToolButton
        type="button"
        onClick={() => editor.chain().focus().toggleBold().run()}
        active={editor.isActive("bold")}
        title="Bold (Ctrl+B)"
      >
        <b>B</b>
      </ToolButton>

      <ToolButton
        type="button"
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        active={editor.isActive("underline")}
        title="Underline (Ctrl+U)"
      >
        <u>U</u>
      </ToolButton>

      <ToolButton
        type="button"
        onClick={() => editor.chain().focus().toggleStrike().run()}
        active={editor.isActive("strike")}
        title="Strike"
      >
        <s>S</s>
      </ToolButton>

      {headingLevels.map((level) => (
        <ToolButton
          type="button"
          key={level}
          onClick={() => editor.chain().focus().toggleHeading({ level }).run()}
          active={editor.isActive("heading", { level })}
          title={`Heading ${level}`}
        >
          <b>H{level}</b>
        </ToolButton>
      ))}
    </Toolbar>
  );
};
