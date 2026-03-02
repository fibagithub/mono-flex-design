import DOMPurify from "dompurify";
import { useMemo } from "react";

interface SafeHTMLProps {
  html: string;
  className?: string;
}

export default function SafeHTML({ html, className }: SafeHTMLProps) {
  const clean = useMemo(
    () =>
      DOMPurify.sanitize(html, {
        ALLOWED_TAGS: [
          "p", "br", "strong", "b", "em", "i", "u", "ul", "ol", "li",
          "a", "h1", "h2", "h3", "h4", "span", "div",
        ],
        ALLOWED_ATTR: ["href", "target", "rel", "style", "class"],
      }),
    [html]
  );

  // If no HTML tags, just render as text
  if (!html || !html.includes("<")) {
    return <span className={className}>{html}</span>;
  }

  return <div className={className} dangerouslySetInnerHTML={{ __html: clean }} />;
}
