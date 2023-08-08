declare global {
  interface Window {
    togglePhoto: () => void;
    __FORMS_DATA__: { [path: string]: FormInput[] };
  }
}

export {};
