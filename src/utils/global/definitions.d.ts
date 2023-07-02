export interface FormInput {
  name: string;
  value: string;
}

declare global {
  interface Window {
    toggleModal: () => void;
    __FORMS_DATA__: { [path: string]: FormInput[] };
  }
}

export {};
