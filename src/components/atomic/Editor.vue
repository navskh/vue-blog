<template>
	<div class="editor">
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
				@click="goEdit(1)"
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
		</div>
		<editor-content
			class="editor-content overflow-y-scroll editor-height"
			:editor="editor"
		/>
	</div>
</template>

<script setup>
/*eslint-disable*/
import { Editor, useEditor, EditorContent } from '@tiptap/vue-3';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Highlight from '@tiptap/extension-highlight';
import Placeholder from '@tiptap/extension-placeholder';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import { lowlight } from 'lowlight';
import { ref } from 'vue';

const props = defineProps({
	modelValue: {
		type: String,
		default: '',
	},
});

const emit = defineEmits(['update:modelValue']);

const editor = new Editor({
	content: props.modelValue,
	extensions: [
		StarterKit,
		Underline,
		Highlight,
		History,
		CodeBlockLowlight.configure({
			languageClassPrefix: 'language-',
			defaultLanguage: 'plaintext',
			lowlight,
		}),
		Placeholder.configure({
			emptyEditorClass: 'is-editor-empty',
			placeholder: '무엇이든 기록하세요',
		}),
	],
	editorProps: {
		attributes: {
			class: 'prose prose-sm sm:prose m-5 focus:outline-none',
		},
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
			font-size: 0.8rem;
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
