import { FormControl } from "@angular/forms";

export class CountryFormModel {
    name !:  FormControl<string | null>;
    description !: FormControl<string | null>
    FlagUrl !: FormControl<string | null>
}
