import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FieldConfig } from '../../interfaces/field-config.interface';

@Component({
  selector: 'shared-generic-form',
  templateUrl: './generic-form.component.html',
  styleUrl: './generic-form.component.css'
})
export class GenericFormComponent implements OnChanges {
  @Input() title!: string;
  @Input() config!: FieldConfig[];
  @Input() form!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['config']) {
      this.createFormGroup();
    }
  }

  createFormGroup(): void {
    this.config.forEach(field => {
      if (!this.form.controls[field.name]) {
        this.form.addControl(field.name, this.fb.control(field.value || '', field.validators || []));
      }
    });
  }


}
