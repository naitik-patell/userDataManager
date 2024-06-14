import { FormControl } from "@angular/forms";

export class UserRegisterModel {

    firstName!: FormControl<string | null>;
    lastName!: FormControl<string | null> ;
    email!: FormControl<string | null>;
    phone!: FormControl<string | null>;
    userName!: FormControl<string | null>;
    password!: FormControl<string | null>;
    countryId!: FormControl<Number | null>;
    gender!: FormControl<Number | null>;
    birthDate !: FormControl<string | null>;
    streetAddress!: FormControl<string | null>;
}

