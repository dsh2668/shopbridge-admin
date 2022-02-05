import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ItemService } from 'src/app/services/item.service';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})
export class AddItemComponent implements OnInit, AfterViewInit {

  formAddItem = new FormGroup({
    name: new FormControl(null, [Validators.required, Validators.minLength(2)]),
    desc: new FormControl(null),
    rg_price: new FormControl(0, [Validators.required, Validators.min(0)]),
    manufacturer: new FormControl(null, [Validators.required, Validators.minLength(2)]),
    stk_qty: new FormControl(0, [Validators.required, Validators.min(0)]),
    is_sale_active: new FormControl(false),
    sale_discount: new FormControl(0)
  });

  disabled = false;

  constructor(
    private itemService: ItemService,
    private snackBar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
      document.getElementById('name').focus();
  }

  hasError(formControlName: string) {
    const formControlObj = this.formAddItem.get(formControlName);
    return formControlObj?.errors && (formControlObj.dirty || formControlObj.touched);
  }

  saveItem() {
    if (this.formAddItem.valid) {
      const saveItem = {};
      Object.keys(this.formAddItem.controls).forEach(eachControl => {
        saveItem[eachControl] = this.formAddItem.get(eachControl).value;
      });
      saveItem['id'] = null;
      this.itemService.saveItem(saveItem).then(response => {
        this.snackBar.open('Item Saved', 'Okay', {
          duration: 3000
        });
        this.router.navigate(['/admin/items']);
      });
    } else {
      Object.keys(this.formAddItem.controls).forEach(eachControl => {
        this.formAddItem.get(eachControl)?.markAsTouched({ onlySelf: true });
      });
    }
  }

}
