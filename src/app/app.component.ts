import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormArray,
  FormControl,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  orderForm: FormGroup;
  items: FormArray;
  duplicateFound = false;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.orderForm = new FormGroup({
      items: new FormArray([]),
    });

    this.orderForm.get('items').valueChanges.subscribe((list) => {
      const namesMap = {};
      this.duplicateFound = false;
      const names = list.map((l) => l.firstname + l.lastname);
      for (let name of names) {
        namesMap[name] = 1 + (namesMap[name] || 0);
      }
      for (let key in namesMap) {
        if (namesMap[key] > 1) {
          console.log('duplicate found ' + key);
          this.duplicateFound = true;
          break;
        }
      }
    });
  }

  createItem(): FormGroup {
    return this.formBuilder.group({
      firstname: '',
      lastname: '',
    });
  }

  addItem(): void {
    this.items = this.orderForm.get('items') as FormArray;
    this.items.push(this.createItem());
  }
}
