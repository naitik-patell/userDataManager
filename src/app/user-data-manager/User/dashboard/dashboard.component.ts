import { AfterViewInit, ChangeDetectorRef, Component, Inject, ViewChild } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { UserService } from '../../user.service';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { DialogboxComponent } from '../../dialogbox/dialogbox.component';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, Sort, MatSortModule } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { NavbarComponent } from '../../navbar/navbar.component';
import { ResponseModel } from '../../../models/response/reponse.model';
import { DashboardModel } from '../../../models/response/dashboard.model';




@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MatToolbarModule, MatFormFieldModule, MatInputModule, MatTableModule, MatButtonModule, MatPaginatorModule, MatSortModule, MatIconModule, NavbarComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements AfterViewInit {
  dataSource = new MatTableDataSource<DashboardModel>();
  username: string | undefined;
  id: string | undefined;
  NavbarHeading: string = "Dashboard";
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  @ViewChild(MatSort) sort !: MatSort;

  constructor(private userservice: UserService, private router: Router, public dialog: MatDialog, private toastr: ToastrService, private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.getDashboardData();

    this.dataSource.filterPredicate = (data: DashboardModel, filter: string) => {
      return data.firstName?.toLowerCase().includes(filter) ||
        data.lastName?.toLowerCase().includes(filter) ||
        data.email?.toLowerCase().includes(filter);
    };

  }
  ngAfterViewInit(): void {
    this.cdr.detectChanges();
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }

  }


  openDialog(username: string, id: string): void {
    const dialogRef = this.dialog.open(DialogboxComponent, {
      data: {
        username: username,
        id: id,
        onOk: this.onOk.bind(this)
      },
    });
  }
  onOk(id: Number): void {
    this.DeleteUser(id)
  }



  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'email', 'phone', 'userName', 'country', 'genderName', 'streetAddress', 'birthDate', 'actions'];


  // ----------------Dashboard data getting from database------------------
  getDashboardData() {
    this.userservice.get("user/").subscribe(
      (res: ResponseModel | null) => {
        this.dataSource.data = res?.data;
      },
      error => {
        if (error.status === 401) {
          this.toastr.error("Unauthorised login ", 'Unauthorized');
        }
        console.log(error);
      }
    )
  }

  // -------------------------------------Search Filter  function ---------------------------
  SearchFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLocaleLowerCase();
  }

  // -----------------------Update user data in database-------------------
  UpdateUserData(id: Number) {
    this.router.navigate(['/user-data/update/', id]);
  }

  // -----------------------Delete user data from database-------------------
  DeleteUser(id: Number) {
    this.userservice.delete("User/" + id).subscribe(
      (res: ResponseModel) => {
        this.toastr.success(res.message, 'Success');
        this.getDashboardData();
      },
      error => {
        this.toastr.error(error.message, 'Error');
        this.getDashboardData();
      }
    )
  }
}

