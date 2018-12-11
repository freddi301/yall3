import { LanguageComponent } from "./LanguageComponent";
import { DataTypeComponent } from "./DataTypeComponent";
import { LetBindingComponent } from "./LetBindingComponent";
import { AllNamesComponent } from "./AllNamesComponent";

export const LanguageComponents = (<
  Components extends Record<string, LanguageComponent<any>>
>(
  components: Components
) => components)({
  DataTypeComponent: DataTypeComponent,
  LetBindingComponent: LetBindingComponent,
  AllNamesComponent: AllNamesComponent
});
export type LanguageComponents = typeof LanguageComponents;
