import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ItemService } from './../../services/item.service';

@Component({
  selector: 'app-edit-item',
  templateUrl: './edit-item.component.html',
  styleUrls: ['./edit-item.component.css']
})
export class EditItemComponent implements OnInit, AfterViewInit {

  itemID: string = '';
  itemDetails = null;

  formAddItem = new FormGroup({
    name: new FormControl(null, [Validators.required, Validators.minLength(2)]),
    desc: new FormControl(null),
    rg_price: new FormControl(0, [Validators.required, Validators.min(0)]),
    manufacturer: new FormControl(null, [Validators.required, Validators.minLength(2)]),
    stk_qty: new FormControl(0, [Validators.required, Validators.min(0)]),
    is_sale_active: new FormControl(false),
    sale_discount: new FormControl(0),
  });

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private itemService: ItemService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.itemID = this.route.snapshot.paramMap.get('id') + '';
    if (this.itemID) {
      this.getItemDetails();
    } else {
      this.router.navigate(['/admin/items']);
    }
  }

  ngAfterViewInit(): void {
    document.getElementById('name').focus();
  }

  hasError(formControlName: string) {
    const formControlObj = this.formAddItem.get(formControlName);
    return formControlObj?.errors && (formControlObj.dirty || formControlObj.touched);
  }

  getItemDetails() {
    this.itemService.getItemDetails(this.itemID).then(response => {
      this.itemDetails = response;
      if (this.itemDetails.id) {
        Object.keys(this.formAddItem.controls).forEach(eachControl => {
          this.formAddItem.get(eachControl)?.setValue(this.itemDetails[eachControl]);
        });
      } else {
        this.router.navigate(['/admin/items']);
      }
    });
  }

  updateItem() {
    if (this.formAddItem.valid) {
      const saveItem = {};
      Object.keys(this.formAddItem.controls).forEach(eachControl => {
        saveItem[eachControl] = this.formAddItem.get(eachControl).value;
      });
      saveItem['id'] = this.itemDetails.id;
      this.itemService.updateItem(this.itemDetails.id, saveItem).then(response => {
        this.snackBar.open('Item Updated', 'Okay', {
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
