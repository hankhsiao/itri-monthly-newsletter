import { MouseEvent } from 'react';

/**
 * Prevents link navigation when the user is selecting text.
 *
 * On desktop, titles are rendered as links. Without this, dragging to select
 * the title text triggers a click that opens the link, making it impossible to
 * copy the title. When there is an active text selection, we suppress the
 * navigation so the text can be copied instead.
 */
export function preventNavigationOnTextSelection(
  e: MouseEvent<HTMLAnchorElement>
): void {
  const selection = window.getSelection();
  if (selection && selection.toString().length > 0) {
    e.preventDefault();
  }
}
