'use client'

import { useEffect } from 'react'
import { useEditor, EditorContent, type Editor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Link from '@tiptap/extension-link'
import Image from '@tiptap/extension-image'
import { Table } from '@tiptap/extension-table'
import TableRow from '@tiptap/extension-table-row'
import TableHeader from '@tiptap/extension-table-header'
import TableCell from '@tiptap/extension-table-cell'
import Placeholder from '@tiptap/extension-placeholder'
import { Markdown } from 'tiptap-markdown'
import {
  Bold,
  Italic,
  Strikethrough,
  Code,
  Heading2,
  Heading3,
  Heading4,
  List,
  ListOrdered,
  Quote,
  Link as LinkIcon,
  Unlink,
  Image as ImageIcon,
  Table as TableIcon,
  Minus,
  Undo,
  Redo,
  Code2,
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface RichTextEditorProps {
  content: string
  onChange: (markdown: string) => void
}

function ToolbarButton({
  onClick,
  active,
  disabled,
  title,
  children,
}: {
  onClick: () => void
  active?: boolean
  disabled?: boolean
  title: string
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      title={title}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'p-2 rounded-md text-[#6B7FA3] hover:text-[#F0F4FF] hover:bg-white/5 transition-colors disabled:opacity-40 disabled:cursor-not-allowed',
        active && 'text-[#00D4FF] bg-[#00D4FF]/10'
      )}
    >
      {children}
    </button>
  )
}

function Toolbar({ editor }: { editor: Editor }) {
  const setLink = () => {
    const previousUrl = editor.getAttributes('link').href
    const url = window.prompt('Enter URL', previousUrl || 'https://')
    if (url === null) return
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run()
      return
    }
    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
  }

  const addImage = () => {
    const url = window.prompt('Image URL')
    if (url) editor.chain().focus().setImage({ src: url }).run()
  }

  return (
    <div className="flex flex-wrap items-center gap-1 p-2 rounded-t-lg bg-white/5 border border-white/10 border-b-0">
      <ToolbarButton title="Bold" active={editor.isActive('bold')} onClick={() => editor.chain().focus().toggleBold().run()}>
        <Bold size={15} />
      </ToolbarButton>
      <ToolbarButton title="Italic" active={editor.isActive('italic')} onClick={() => editor.chain().focus().toggleItalic().run()}>
        <Italic size={15} />
      </ToolbarButton>
      <ToolbarButton title="Strikethrough" active={editor.isActive('strike')} onClick={() => editor.chain().focus().toggleStrike().run()}>
        <Strikethrough size={15} />
      </ToolbarButton>
      <ToolbarButton title="Inline code" active={editor.isActive('code')} onClick={() => editor.chain().focus().toggleCode().run()}>
        <Code size={15} />
      </ToolbarButton>

      <div className="w-px h-5 bg-white/10 mx-1" />

      <ToolbarButton title="Heading 2" active={editor.isActive('heading', { level: 2 })} onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}>
        <Heading2 size={15} />
      </ToolbarButton>
      <ToolbarButton title="Heading 3" active={editor.isActive('heading', { level: 3 })} onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}>
        <Heading3 size={15} />
      </ToolbarButton>
      <ToolbarButton title="Heading 4" active={editor.isActive('heading', { level: 4 })} onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}>
        <Heading4 size={15} />
      </ToolbarButton>

      <div className="w-px h-5 bg-white/10 mx-1" />

      <ToolbarButton title="Bullet list" active={editor.isActive('bulletList')} onClick={() => editor.chain().focus().toggleBulletList().run()}>
        <List size={15} />
      </ToolbarButton>
      <ToolbarButton title="Numbered list" active={editor.isActive('orderedList')} onClick={() => editor.chain().focus().toggleOrderedList().run()}>
        <ListOrdered size={15} />
      </ToolbarButton>
      <ToolbarButton title="Quote" active={editor.isActive('blockquote')} onClick={() => editor.chain().focus().toggleBlockquote().run()}>
        <Quote size={15} />
      </ToolbarButton>
      <ToolbarButton title="Code block" active={editor.isActive('codeBlock')} onClick={() => editor.chain().focus().toggleCodeBlock().run()}>
        <Code2 size={15} />
      </ToolbarButton>

      <div className="w-px h-5 bg-white/10 mx-1" />

      <ToolbarButton title="Add link" active={editor.isActive('link')} onClick={setLink}>
        <LinkIcon size={15} />
      </ToolbarButton>
      <ToolbarButton title="Remove link" disabled={!editor.isActive('link')} onClick={() => editor.chain().focus().unsetLink().run()}>
        <Unlink size={15} />
      </ToolbarButton>
      <ToolbarButton title="Insert image" onClick={addImage}>
        <ImageIcon size={15} />
      </ToolbarButton>
      <ToolbarButton
        title="Insert table"
        onClick={() => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()}
      >
        <TableIcon size={15} />
      </ToolbarButton>
      <ToolbarButton title="Horizontal rule" onClick={() => editor.chain().focus().setHorizontalRule().run()}>
        <Minus size={15} />
      </ToolbarButton>

      <div className="w-px h-5 bg-white/10 mx-1" />

      <ToolbarButton title="Undo" disabled={!editor.can().undo()} onClick={() => editor.chain().focus().undo().run()}>
        <Undo size={15} />
      </ToolbarButton>
      <ToolbarButton title="Redo" disabled={!editor.can().redo()} onClick={() => editor.chain().focus().redo().run()}>
        <Redo size={15} />
      </ToolbarButton>
    </div>
  )
}

export default function RichTextEditor({ content, onChange }: RichTextEditorProps) {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: { levels: [2, 3, 4] },
      }),
      Link.configure({ openOnClick: false, autolink: true }),
      Image,
      Table.configure({ resizable: true }),
      TableRow,
      TableHeader,
      TableCell,
      Placeholder.configure({ placeholder: 'Start writing your post...' }),
      Markdown.configure({ html: false, transformPastedText: true }),
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange((editor.storage as unknown as { markdown: { getMarkdown: () => string } }).markdown.getMarkdown())
    },
    editorProps: {
      attributes: {
        class: 'mdx-content focus:outline-none min-h-[450px] px-4 py-3',
      },
    },
  })

  useEffect(() => {
    if (!editor) return
    const current = (editor.storage as unknown as { markdown: { getMarkdown: () => string } }).markdown.getMarkdown()
    if (content !== current) {
      editor.commands.setContent(content)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editor])

  if (!editor) return null

  return (
    <div>
      <Toolbar editor={editor} />
      <div className="rounded-b-lg bg-white/5 border border-white/10 max-h-[600px] overflow-y-auto">
        <EditorContent editor={editor} />
      </div>
    </div>
  )
}
