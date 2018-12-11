import { useState } from "react";
import { properties, set, get, Lens } from "./utils/lens";
import { updateInArray } from "./utils/updateInArray";
import { LanguageModel } from "./LanguageModel/LanguageModel";
import { LanguageComponents } from "./LanguageComponents/LanguageComponents";
import { LanguageComponent } from "./LanguageComponents/LanguageComponent";

function App() {
  return <Ide />;
}

export default App;

interface SourcePersistance {
  blocks: {
    [K in keyof LanguageComponents]: Array<
      LanguageComponents[K] extends LanguageComponent<infer Data>
        ? Data
        : unknown
    >
  };
}

function Ide() {
  const [sourcePersistance, setSourcePersistance] = useState<SourcePersistance>(
    {
      blocks: {
        DataTypeComponent: [{ name: "sample" }],
        LetBindingComponent: [{ key: "sample", value: "sample" }],
        AllNamesComponent: [{}]
      }
    }
  );
  const model = calculateLanguageModel({ sourcePersistance });
  return ViewSource({ sourcePersistance, setSourcePersistance, model });
}

function calculateLanguageModel({
  sourcePersistance
}: {
  sourcePersistance: SourcePersistance;
}) {
  function step(model: LanguageModel) {
    model = sourcePersistance.blocks.DataTypeComponent.reduce(
      (model, data) =>
        LanguageComponents.DataTypeComponent.model({ model, data }),
      model
    );
    model = sourcePersistance.blocks.LetBindingComponent.reduce(
      (model, data) =>
        LanguageComponents.LetBindingComponent.model({ model, data }),
      model
    );
    return model;
  }
  let currentModel = LanguageModel.empty();
  let maxSteps = 16;
  while (maxSteps--) {
    const newModel = step(currentModel);
    if (newModel.isEqual(currentModel)) {
      return newModel;
    }
  }
  throw new Error("max cycles reached");
}

const blockLens = properties<SourcePersistance>().blocks;
function ViewSource({
  sourcePersistance,
  setSourcePersistance,
  model
}: {
  sourcePersistance: SourcePersistance;
  setSourcePersistance(sourcePersistance: SourcePersistance): void;
  model: LanguageModel;
}) {
  function makeUpdate<Data>(blocksLens: Lens<SourcePersistance, Data[]>) {
    return ({ id, data }: { id: number; data: Data }) => {
      const oldBlocks = blocksLens[get](sourcePersistance);
      const newBlocks = updateInArray(oldBlocks, id, data);
      setSourcePersistance(blocksLens[set](newBlocks)(sourcePersistance));
    };
  }
  return (
    <>
      <ViewBlocks
        model={model}
        languageComponent={LanguageComponents.DataTypeComponent}
        blocks={sourcePersistance.blocks.DataTypeComponent}
        update={makeUpdate(blockLens.DataTypeComponent)}
      />
      <ViewBlocks
        model={model}
        languageComponent={LanguageComponents.LetBindingComponent}
        blocks={sourcePersistance.blocks.LetBindingComponent}
        update={makeUpdate(blockLens.LetBindingComponent)}
      />
      <ViewBlocks
        model={model}
        languageComponent={LanguageComponents.AllNamesComponent}
        blocks={sourcePersistance.blocks.AllNamesComponent}
        update={makeUpdate(blockLens.AllNamesComponent)}
      />
    </>
  );
}

function ViewBlocks<Data>({
  blocks,
  languageComponent: { view: View },
  model,
  update
}: {
  blocks: Array<Data>;
  languageComponent: LanguageComponent<Data>;
  model: LanguageModel;
  update(args: { id: number; data: Data }): void;
}) {
  return (
    <>
      {blocks.map((data, index) => (
        <div key={index}>
          <View
            data={data}
            model={model}
            update={data => update({ id: index, data })}
          />
        </div>
      ))}
    </>
  );
}
