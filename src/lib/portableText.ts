export type PortableTextSpan = {
  _type: "span";
  text?: string;
  marks?: string[];
};

export type PortableTextMarkDef = {
  _key: string;
  _type: string;
  href?: string;
};

export type PortableTextBlock = {
  _type: "block";
  style?: string;
  listItem?: "bullet" | "number";
  level?: number;
  children?: PortableTextSpan[];
  markDefs?: PortableTextMarkDef[];
};

const blockTags: Record<string, string> = {
  h2: "h2",
  h3: "h3",
  h4: "h4",
  blockquote: "blockquote",
  normal: "p",
};

const escapeHtml = (value: string) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");

const safeHref = (href = "") => {
  const trimmed = href.trim();
  if (/^(https?:|mailto:|tel:|\/)/i.test(trimmed)) {
    return escapeHtml(trimmed);
  }

  return "#";
};

const renderSpan = (span: PortableTextSpan, markDefs: PortableTextMarkDef[]) => {
  const marks = span.marks ?? [];
  const text = escapeHtml(span.text ?? "");

  return marks.reduce((html, mark) => {
    if (mark === "strong") return `<strong>${html}</strong>`;
    if (mark === "em") return `<em>${html}</em>`;
    if (mark === "underline") return `<u>${html}</u>`;
    if (mark === "strike-through") return `<s>${html}</s>`;
    if (mark === "code") return `<code>${html}</code>`;

    const markDef = markDefs.find((def) => def._key === mark);
    if (markDef?._type === "link") {
      return `<a href="${safeHref(markDef.href)}">${html}</a>`;
    }

    return html;
  }, text);
};

const renderBlock = (block: PortableTextBlock, tagOverride?: string) => {
  const tag = tagOverride ?? blockTags[block.style ?? "normal"] ?? "p";
  const body = (block.children ?? [])
    .filter((child) => child._type === "span")
    .map((child) => renderSpan(child, block.markDefs ?? []))
    .join("");

  return `<${tag}>${body}</${tag}>`;
};

export const renderPortableText = (blocks: PortableTextBlock[] = []) => {
  const html: string[] = [];
  let activeList: "bullet" | "number" | null = null;

  const closeList = () => {
    if (!activeList) return;
    html.push(activeList === "number" ? "</ol>" : "</ul>");
    activeList = null;
  };

  for (const block of blocks) {
    if (block._type !== "block") continue;

    if (block.listItem) {
      if (activeList !== block.listItem) {
        closeList();
        activeList = block.listItem;
        html.push(activeList === "number" ? "<ol>" : "<ul>");
      }

      html.push(renderBlock(block, "li"));
      continue;
    }

    closeList();
    html.push(renderBlock(block));
  }

  closeList();

  return html.join("");
};
