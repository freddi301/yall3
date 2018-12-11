import { DataType } from "../LanguageModel/LanguageModel";
import { LanguageComponent } from "./LanguageComponent";
export const DataTypeComponent: LanguageComponent<{
  name: string;
}> = {
  view: ({ data, update, model }) => (
    <span onClick={() => update({ ...data, name: data.name + "!" })}>
      data {data.name}
    </span>
  ),
  model: ({ model, data }) => model.addDataType(new DataType(data.name))
};
