import { LetBinding } from "../LanguageModel/LanguageModel";
import { LanguageComponent } from "./LanguageComponent";
export const LetBindingComponent: LanguageComponent<{
  key: string;
  value: string;
}> = {
  view: ({ data }) => (
    <>
      let {data.key} = {data.value}
    </>
  ),
  model: ({ model, data }) =>
    model.addLetBinding(new LetBinding(data.key, data.value))
};
