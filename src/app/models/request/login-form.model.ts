import { FormControl } from "@angular/forms";

export class LoginFormModel {
    LoginIdentifier !: FormControl<string | null>
      Password !: FormControl<string | null>;
}
