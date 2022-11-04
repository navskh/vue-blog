<template>
  <div class="editor h-[70%]">
    <div class="editor__header">
      <button
        class="btn btn-ghost my-btn ri-bold h-8"
        :class="{ 'btn-active': editor.isActive('bold') }"
        @click="editor.chain().focus().toggleBold().run()"
      />
      <button
        class="btn btn-ghost my-btn ri-italic h-8"
        :class="{ 'btn-active': editor.isActive('italic') }"
        @click="editor.chain().focus().toggleItalic().run()"
      />
      <button
        class="btn btn-ghost my-btn ri-underline h-8"
        :class="{ 'btn-active': editor.isActive('underline') }"
        @click="editor.chain().focus().toggleUnderline().run()"
      />
      <button
        class="btn btn-ghost my-btn ri-strikethrough h-8"
        :class="{ 'btn-active': editor.isActive('strike') }"
        @click="editor.chain().focus().toggleStrike().run()"
      />
      <button
        class="btn btn-ghost my-btn ri-h-1 h-8"
        :class="{ 'btn-active': editor.isActive('heading', { level: 1 }) }"
        @click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
      />
      <button
        class="btn btn-ghost my-btn ri-h-2 h-8"
        :class="{ 'btn-active': editor.isActive('heading', { level: 2 }) }"
        @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
      />
      <button
        class="btn btn-ghost my-btn ri-h-3 h-8"
        :class="{ 'btn-active': editor.isActive('heading', { level: 3 }) }"
        @click="editor.chain().focus().toggleHeading({ level: 3 }).run()"
      />
      <button
        class="btn btn-ghost my-btn ri-paragraph h-8"
        :class="{ 'btn-active': editor.isActive('paragraph') }"
        @click="editor.chain().focus().toggleParagraph().run()"
      />
      <button
        class="btn btn-ghost my-btn ri-list-unordered h-8"
        :class="{ 'btn-active': editor.isActive('bulletList') }"
        @click="editor.chain().focus().toggleBulletList().run()"
      />
      <button
        class="btn btn-ghost my-btn ri-list-ordered h-8"
        :class="{ 'btn-active': editor.isActive('orderedList') }"
        @click="editor.chain().focus().toggleOrderedList().run()"
      />
      <button
        class="btn btn-ghost my-btn ri-mark-pen-line h-8"
        @click="editor.chain().focus().toggleHighlight().run()"
      />
      <button
        class="btn btn-ghost my-btn ri-code-view h-8"
        :class="{ 'btn-active': editor.isActive('codeBlock') }"
        @click="editor.chain().focus().toggleCodeBlock().run()"
      />
      <button
        class="btn btn-ghost my-btn ri-double-quotes-l h-8"
        :class="{ 'btn-active': editor.isActive('blockquote') }"
        @click="editor.chain().focus().toggleBlockquote().run()"
      />
      <button
        class="btn btn-ghost my-btn ri-arrow-left-right-line h-8"
        @click="changeMarkdown(props.modelValue)"
      />
      <button
        class="btn btn-ghost my-btn h-8"
        @click="
          editor
            .chain()
            .focus()
            .insertTable({
              rows: 3,
              cols: 3,
              withHeaderRow: true,
            })
            .run()
        "
      >
        <img class="icon h-4" src="@/assets/images/icons/table.svg" />
      </button>

      <span v-if="editor.isActive('table')">
        <button
          class="btn btn-ghost my-btn h-8"
          @click="editor.chain().focus().deleteTable().run()"
        >
          <img class="icon h-4" src="@/assets/images/icons/delete_table.svg" />
        </button>
        <button
          class="btn btn-ghost my-btn h-8"
          @click="editor.chain().focus().addColumnBefore().run()"
        >
          <img
            class="icon h-4"
            src="@/assets/images/icons/add_col_before.svg"
          />
        </button>
        <button
          class="btn btn-ghost my-btn h-8"
          @click="editor.chain().focus().addColumnAfter().run()"
        >
          <img class="icon h-4" src="@/assets/images/icons/add_col_after.svg" />
        </button>
        <button
          class="btn btn-ghost my-btn h-8"
          @click="editor.chain().focus().addRowBefore().run()"
        >
          <img
            class="icon h-4"
            src="@/assets/images/icons/add_row_before.svg"
          />
        </button>
        <button
          class="btn btn-ghost my-btn h-8"
          @click="editor.chain().focus().addRowAfter().run()"
        >
          <img class="icon h-4" src="@/assets/images/icons/add_row_after.svg" />
        </button>
        <button
          class="btn btn-ghost my-btn h-8"
          @click="editor.chain().focus().deleteColumn().run()"
        >
          <img class="icon h-4" src="@/assets/images/icons/delete_col.svg" />
        </button>
        <button
          class="btn btn-ghost my-btn h-8"
          @click="editor.chain().focus().deleteRow().run()"
        >
          <img class="icon h-4" src="@/assets/images/icons/delete_row.svg" />
        </button>
        <button
          class="btn btn-ghost my-btn h-8"
          @click="editor.chain().focus().mergeCells().run()"
        >
          <img class="icon h-4" src="@/assets/images/icons/combine_cells.svg" />
        </button>
      </span>
      <!-- <input type="file" class="btn btn-ghost my-btn ri-image-line h-8" /> -->
    </div>
    <editor-content
      class="editor-content overflow-y-scroll editor-height"
      :editor="editor"
    />
  </div>
</template>

<script setup>
/*eslint-disable*/
import {
  Editor,
  useEditor,
  EditorContent,
  VueNodeViewRenderer,
} from '@tiptap/vue-3';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Highlight from '@tiptap/extension-highlight';
import Placeholder from '@tiptap/extension-placeholder';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import Image from '@tiptap/extension-image';
import { lowlight } from 'lowlight';
import { ref, watchEffect } from 'vue';
import { marked } from 'marked';
import parseMd from '@/assets/md';
import Iframe from '@/components/atomic/EditorComponent/Iframe';
import Table from '@tiptap/extension-table';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
import TableRow from '@tiptap/extension-table-row';

import css from 'highlight.js/lib/languages/css';
import js from 'highlight.js/lib/languages/javascript';
import html from 'highlight.js/lib/languages/xml';
import sql from 'highlight.js/lib/languages/sql';

import CodeBlockComponent from './EditorComponent/CodeBlockComponent.vue';

// lowlight.registerLanguage('html', html);
// lowlight.registerLanguage('css', css);
// lowlight.registerLanguage('js', js);
// lowlight.registerLanguage('sql', sql);

const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
});

const emit = defineEmits(['update:modelValue']);

const changeMarkdown = (data) => {
  marked.setOptions({
    renderer: new marked.Renderer(),
    highlight: function (code, lang) {
      const hljs = require('highlight.js');
      const language = hljs.getLanguage(lang) ? lang : 'plaintext';
      return hljs.highlight(code, { language }).value;
    },
    langPrefix: 'hljs language-', // highlight.js css expects a top-level 'hljs' class.
    pedantic: false,
    gfm: true,
    breaks: false,
    sanitize: false,
    smartLists: true,
    smartypants: false,
    xhtml: false,
  });

  var replaceData = data.replaceAll('<p>', '').replaceAll('</p>', '');
  // editor.view.dom.innerHTML = marked(parseMd(replaceData));
  editor.view.dom.innerHTML = marked.parse(replaceData);
};

const addImage = () => {
  const url = window.prompt('URL : ');

  if (url) {
    editor.chain().focus().setImage({ src: url }).run();
  }
};

const editor = new Editor({
  content: props.modelValue,
  extensions: [
    StarterKit,
    Underline,
    Highlight,
    Image.configure({
      inline: true,
      allowBase64: true,
    }),
    History,
    CodeBlockLowlight.extend({
      addNodeView() {
        return VueNodeViewRenderer(CodeBlockComponent);
      },
    }).configure({
      // languageClassPrefix: 'language-',
      // defaultLanguage: 'sql',
      lowlight,
    }),
    Placeholder.configure({
      emptyEditorClass: 'is-editor-empty',
      placeholder: '무엇이든 기록하세요',
    }),
    Iframe,
    Table.configure({
      resizable: true,
    }),
    TableRow,
    TableHeader,
    TableCell,
  ],
  editorProps: {
    attributes: {
      class: 'prose-lg m-5 focus:outline-none',
    },
    autoFocus: true,
  },
  onUpdate: ({ editor }) => {
    emit('update:modelValue', editor.getHTML());
  },
});
</script>

<style lang="scss">
.editor {
  display: flex;
  flex-direction: column;
  //max-height: 500px;
  color: #0d0d0d;
  background-color: #fff;
  border: 1px solid rgb(209, 213, 219);
  border-radius: 0.5rem;
}
.editor__header {
  display: flex;
  align-items: center;
  flex: 0 0 auto;
  flex-wrap: wrap;
  padding: 0.25rem;
  border-bottom: 1px solid rgb(209, 213, 219);
}
.ProseMirror {
  height: fit-content;
  font-family: 'Fira Coding';
  pre {
    background: #0d0d0d;
    color: #fff;
    font-family: 'JetBrainsMono', monospace;
    padding: 0.75rem 1rem;
    border-radius: 0.5rem;

    code {
      color: inherit;
      padding: 0;
      background: none;
      font-size: 1rem;
    }

    .hljs-comment,
    .hljs-quote {
      color: #616161;
    }

    .hljs-variable,
    .hljs-template-variable,
    .hljs-attribute,
    .hljs-tag,
    .hljs-name,
    .hljs-regexp,
    .hljs-link,
    .hljs-name,
    .hljs-selector-id,
    .hljs-selector-class {
      color: #f98181;
    }

    .hljs-number,
    .hljs-meta,
    .hljs-built_in,
    .hljs-builtin-name,
    .hljs-literal,
    .hljs-type,
    .hljs-params {
      color: #fbbc88;
    }

    .hljs-string,
    .hljs-symbol,
    .hljs-bullet {
      color: #b9f18d;
    }

    .hljs-title,
    .hljs-section {
      color: #faf594;
    }

    .hljs-keyword,
    .hljs-selector-tag {
      color: #70cff8;
    }

    .hljs-emphasis {
      font-style: italic;
    }

    .hljs-strong {
      font-weight: 700;
    }
  }

  table {
    border-collapse: collapse;
    table-layout: fixed;
    width: 100%;
    margin: 0;
    overflow: hidden;

    td,
    th {
      min-width: 1em;
      border: 2px solid #ced4da;
      padding: 3px 5px;
      vertical-align: top;
      box-sizing: border-box;
      position: relative;

      > * {
        margin-bottom: 0;
      }
    }

    th {
      font-weight: bold;
      text-align: left;
      background-color: #f1f3f5;
    }

    .selectedCell:after {
      z-index: 2;
      position: absolute;
      content: '';
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      background: rgba(200, 200, 255, 0.4);
      pointer-events: none;
    }

    .column-resize-handle {
      position: absolute;
      right: -2px;
      top: 0;
      bottom: -2px;
      width: 4px;
      background-color: #adf;
      pointer-events: none;
    }

    p {
      margin: 0;
    }
  }
}

.tableWrapper {
  padding: 1rem 0;
  overflow-x: auto;
}

.ProseMirror:focus {
  outline: none;
}

.ProseMirror p.is-editor-empty:first-child::before {
  content: attr(data-placeholder);
  float: left;
  color: #adb5bd;
  pointer-events: none;
  height: 0;
}

::-webkit-scrollbar {
  width: 5px;
  height: 8px;
  background-color: hsl(var(--b3)); /* 또는 트랙에 추가한다 */
}

/* 썸(thumb) 추가 */
::-webkit-scrollbar-thumb {
  background: hsl(var(--p));
}
</style>
