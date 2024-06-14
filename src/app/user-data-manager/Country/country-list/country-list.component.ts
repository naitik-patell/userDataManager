import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { UserService } from '../../user.service';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatSort, Sort, MatSortModule } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator } from '@angular/material/paginator';
import { DialogboxComponent } from '../../dialogbox/dialogbox.component';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { NavbarComponent } from '../../navbar/navbar.component';
import { ResponseModel } from '../../../models/response/reponse.model';
import { CountryModel } from '../../../models/Entities/country.model';

@Component({
  selector: 'app-country-list',
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, MatTableModule, MatFormFieldModule, MatInputModule, FormsModule, MatIconModule, MatPaginator, MatSortModule, NavbarComponent],
  templateUrl: './country-list.component.html',
  styleUrl: './country-list.component.css'
})
export class CountryListComponent {
  dataSource = new MatTableDataSource<CountryModel>();
  NavbarHeading: string = "Country List";
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  @ViewChild(MatSort) sort !: MatSort;
  constructor(private userservice: UserService,
    private router: Router,
    private toastr: ToastrService,
    private cdr: ChangeDetectorRef,
    public dialog: MatDialog,) { }

  ngOnInit() {
    this.getCountriesData();
    this.dataSource.filterPredicate = (data: CountryModel, filter: string) => {
      return data.name.toLowerCase().includes(filter);
    };

  }
  ngAfterViewInit(): void {
    this.cdr.detectChanges();
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }

  }

  displayedColumns: string[] = ['id', 'country', 'description', 'actions'];

  getCountriesData() {
    this.userservice.get('Country/GetCountries').subscribe(
      (res: ResponseModel | null) => {
        // console.log(res);
        this.dataSource.data = res?.data;
      },
      error => {
        console.log(error);
      });
  }

  addCountry() {
    this.router.navigate(['/user-data/addcountry']);
  }

  EditCountryData(id: Number) {
    this.router.navigate(['/user-data/editcountry/', id]);

  }
  SearchFilter(search: string) {
    this.dataSource.filter = search.trim().toLocaleLowerCase();

  }

  // ------------------------------Dialog open for deleting the country--------------------------
  openDialog(countryName: string, id: string): void {
    const dialogRef = this.dialog.open(DialogboxComponent, {
      data: {
        username: countryName,
        id: id,
        onOk: this.onOk.bind(this)
      },
    });
  }
  onOk(id: string): void {
    this.DeleteCountry(Number(id))
  }
  // -------------------------------Delete Country Service call-------------------------
  DeleteCountry(id: Number) {
    this.userservice.delete('Country/DeleteCountry/' + id).subscribe(
      (res: ResponseModel) => {
        this.toastr.success(res.message, 'Success');
        this.getCountriesData();
      }
    )
  }
}
