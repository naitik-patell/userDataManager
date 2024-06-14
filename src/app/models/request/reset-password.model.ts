import { FormControl } from "@angular/forms";

export class ResetPasswordModel {
    Password !: FormControl<string | null>
    confirmPassword !: FormControl<string | null>
    Email !: FormControl<string | null>
}
