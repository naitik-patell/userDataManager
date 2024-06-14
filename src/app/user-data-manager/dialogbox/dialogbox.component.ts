import {Component, Inject} from '@angular/core';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { DashboardComponent } from '../User/dashboard/dashboard.component';

// export interface DialogData {
//   username: string;
//   id : string;
// }
@Component({
  selector: 'app-dialogbox',
  standalone: true,
  imports: [MatFormFieldModule,MatInputModule,FormsModule,MatButtonModule,MatDialogTitle,MatDialogContent,MatDialogActions,MatDialogClose],
   templateUrl: './dialogbox.component.html',
  styleUrl: './dialogbox.component.css'
})
export class DialogboxComponent {
  constructor(
    public dialogRef: MatDialogRef<DashboardComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
  onOkClick(): void {
    this.data.onOk(this.data.id);  // Call the function passed from the parent
    this.dialogRef.close(this.data.id);  // Close the dialog and return the data
  }
}
