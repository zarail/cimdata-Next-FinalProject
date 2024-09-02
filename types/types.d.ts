import 'react';

declare module 'react' {
  interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
    // Erweitert React HTMLAttributes um das 'xyz' Attribut für AnimXYZ
    xyz?: string;
  }
}
