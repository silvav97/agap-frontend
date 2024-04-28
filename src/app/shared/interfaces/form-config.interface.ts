

export interface FormConfig {
  title: string;
  fields: { name: string; type: string; label: string }[];
}

export interface FormConfigs {
  [key: string]: FormConfig;
}
