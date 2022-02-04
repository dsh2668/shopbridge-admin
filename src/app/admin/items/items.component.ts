import { Component, OnInit } from '@angular/core';
import { ConfirmDialogService } from './../../shared/ui-components/confirm-dialog/confirm-dialog.service';
import { ItemService } from './../../services/item.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {

  items = new Array();
  searchString = '';
  itemSortBy = '';
  itemSortAscending = true;

  itemsPerPage = 5;
  currentPage = 1;

  searchBasedOn = 'id,name,desc';

  constructor(
    private itemService: ItemService,
    private snackBar: MatSnackBar,
    private confirmDialogService: ConfirmDialogService
  ) { }

  ngOnInit(): void {
    this.getItems();
  }

  getItems() {
    this.itemService.getItems().then(response => {
      this.items = response;
    });
  }

  onDelete(eachItem) {
    this.confirmDialogService.confirmThis({
      message: 'Do you want to delete ' + eachItem.name + '?'
    }, (isConfirmed) => {
      if (isConfirmed) {
        this.itemService.deleteItem(eachItem.id).then(response => {
          this.snackBar.open('Item Deleted', 'Okay', {
            duration: 3000
          });
          this.getItems();
        });
      }
    });
  }

}
