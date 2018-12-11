import { LanguageComponent } from "./LanguageComponent";
export const AllNamesComponent: LanguageComponent<{}> = {
  view: ({ model }) => (
    <>
      {Object.values(model.dataTypes)
        .map(({ name }) => name)
        .concat(Object.values(model.letBindings).map(({ key }) => key))
        .join(", ")}
    </>
  ),
  model: ({ model }) => model
};
