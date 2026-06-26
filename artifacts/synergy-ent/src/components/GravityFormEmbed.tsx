import React, { useEffect, useRef } from "react";

type GravityFormEmbedProps = {
  html?: string;
};

export function GravityFormEmbed({ html }: GravityFormEmbedProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) {
      return;
    }

    container.querySelectorAll("script").forEach((script) => {
      const executable = document.createElement("script");

      Array.from(script.attributes).forEach((attribute) => {
        executable.setAttribute(attribute.name, attribute.value);
      });

      executable.text = script.text;
      script.replaceWith(executable);
    });
  }, [html]);

  if (!html) {
    return null;
  }

  return (
    <div
      ref={containerRef}
      className="healen-gform"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
