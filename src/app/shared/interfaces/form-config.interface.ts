

export interface FormConfig {
  title: string;
  service: any;
  fields: { name: string; type: string; label: string }[];
}

export interface FormConfigs {
  [key: string]: FormConfig;
}
