import type { ShikiTransformer } from 'shiki';

/**
 * Wraps every highlighted block in <figure class="code-block"> with a header showing
 * the filename (from a `title="..."` fence meta, or the Code component's `title`) and the language.
 */
export const codeHeader: ShikiTransformer = {
  name: 'code-header',
  root(root) {
    const pre = root.children[0];
    if (!pre || pre.type !== 'element') return;
    const raw = this.options.meta?.__raw ?? '';
    const filename = /title=(?:"([^"]*)"|'([^']*)')/.exec(raw);
    const title = filename?.[1] ?? filename?.[2];
    const lang = this.options.lang;

    pre.properties.tabindex = 0;

    const header = {
      type: 'element' as const,
      tagName: 'figcaption',
      properties: {},
      children: [
        {
          type: 'element' as const,
          tagName: 'span',
          properties: { class: 'filename' },
          children: [{ type: 'text' as const, value: title ?? '' }],
        },
        {
          type: 'element' as const,
          tagName: 'span',
          properties: { class: 'language' },
          children: [{ type: 'text' as const, value: lang }],
        },
      ],
    };

    root.children = [
      {
        type: 'element',
        tagName: 'figure',
        properties: { class: 'code-block' },
        children: [header, pre],
      },
    ];
  },
};
