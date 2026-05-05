import { useEffect, useState } from "react";

const nativeCursorSelector =
  "button, a, input, textarea, select, [role='button'], [contenteditable='true'], [contenteditable='']";

function shouldUseNativeCursor(target: EventTarget | null) {
  return target instanceof Element && Boolean(target.closest(nativeCursorSelector));
}

export function Cursor() {
  const [cursor, setCursor] = useState({
    x: 0,
    y: 0,
    visible: false,
    native: false,
  });

  useEffect(() => {
    document.documentElement.classList.add("custom-emoji-cursor-active");

    const handleMove = (event: MouseEvent) => {
      setCursor({
        x: event.clientX,
        y: event.clientY,
        visible: true,
        native: shouldUseNativeCursor(event.target),
      });
    };

    const handleLeave = () => {
      setCursor((current) => ({ ...current, visible: false }));
    };

    window.addEventListener("mousemove", handleMove);
    document.addEventListener("mouseleave", handleLeave);

    return () => {
      document.documentElement.classList.remove("custom-emoji-cursor-active");
      window.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseleave", handleLeave);
    };
  }, []);

  if (!cursor.visible || cursor.native) {
    return null;
  }

  return (
    <div
      aria-hidden="true"
      className="custom-emoji-cursor"
      style={{
        left: cursor.x,
        top: cursor.y,
      }}
    >
      ✏️
    </div>
  );
}
