import { ValidatorFn, Validators } from "@angular/forms";


export interface FieldConfig {
  name: string;
  label: string;
  type: string;  // 'text', 'select', 'checkbox', etc.
  options?: Array<{label: string, value: any}>;  // Used for 'select' type
  value?: any;
  validators?: ValidatorFn[];
}
