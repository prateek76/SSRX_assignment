import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table'
import {SelectionModel} from '@angular/cdk/collections';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatPaginator, MatSort} from '@angular/material';


import { DialogOverviewExampleDialog } from "../modal/modal.component";
import { PeriodicElement } from "../interfaces/user.interface";
import { dataManagement } from "../services/data.service";


@Component({
  selector: 'table-basic-example',
  templateUrl: 'table.component.html',
})

export class TableBasicExample implements OnInit {

  

    dataSource = null;
    selection = new SelectionModel<PeriodicElement>(true, []);
    displayedColumns = ['select', 'position', 'name', 'weight', 'symbol',"action"];


    @ViewChild(MatPaginator,{static:false}) paginator: MatPaginator;
    @ViewChild(MatSort,{static:false}) sort: MatSort;


    constructor(public dialog: MatDialog,
              private dataService: dataManagement){
    }

    ngOnInit(){
        this.dataService.dataSource$.subscribe(
            (data)=>{
                this.dataSource = new MatTableDataSource<PeriodicElement> (data);
                console.log(this.dataSource);
            })
    }

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }

  

  isAllSelected() {
    let numSelected = this.selection.selected.length;
    let numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle(ev) {
    if (this.isAllSelected()) {
      this.selection.clear();
    }
    else{
      this.dataSource.data.forEach(row => this.selection.select(row));
    }
         
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: PeriodicElement): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }

  edit(eve,edit){
    this.dataSource.data.forEach(
        (row) => {
            if (row['position'].toString() == eve['position']){
                this.selection.select(row)
            }
        });
    eve.edit = edit
    console.log(eve);
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '250px',
      data: eve,

    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
      this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    });

      }



}