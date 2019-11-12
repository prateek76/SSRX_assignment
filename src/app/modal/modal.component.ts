import {Component, Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { PeriodicElement } from "../interfaces/user.interface";
import { dataManagement } from "../services/data.service";
import { FormGroup, FormControl } from '@angular/forms';
import { Validators,AbstractControl } from '@angular/forms';

@Component({
  selector: 'modal',
  templateUrl: 'modal.component.html',
})
export class DialogOverviewExampleDialog {
	profileForm = new FormGroup({
		name: new FormControl('',[Validators.required, Validators.maxLength(60)]),
		symbol: new FormControl('',[Validators.required]),
		weight: new FormControl('',[Validators.required,this.weightRange]),
	});

 	constructor(public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
				@Inject(MAT_DIALOG_DATA) public data: PeriodicElement,
				private dataService: dataManagement) {}

	close(): void {
		this.dialogRef.close();
	}

	update(){
		this.dataService.update(this.data);
	}

	delete(){
		this.dataService.delete_data(this.data);
		this.dialogRef.close();
	}

	add_data(){
		this.dataService.add_data(this.data);
	}

	weightRange(control: AbstractControl): { [key: string]: boolean } | null {
    if (control.value !== undefined && (isNaN(control.value) || control.value < 1 || control.value > 1000)) {
        return { 'range': true };
    }
    return null;
}

}
