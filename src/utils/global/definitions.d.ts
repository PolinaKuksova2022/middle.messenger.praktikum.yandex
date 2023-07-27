// export interface FormInput {
//   name: string;
//   value: string;
// }

declare global {
  interface Window {
    togglePhoto: () => void;
    __FORMS_DATA__: { [path: string]: FormInput[] };
  }
}

export {};
