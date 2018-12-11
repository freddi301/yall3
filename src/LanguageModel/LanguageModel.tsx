export class LanguageModel {
  constructor(
    public dataTypes: Record<string, DataType>,
    public letBindings: Record<string, LetBinding>
  ) {}
  isEqual(other: LanguageModel) {
    return true; // TODO
  }
  static empty() {
    return new LanguageModel({}, {});
  }
  addDataType(dataType: DataType): LanguageModel {
    return new LanguageModel(
      { ...this.dataTypes, [dataType.name]: dataType },
      this.letBindings
    );
  }
  addLetBinding(letBinding: LetBinding): LanguageModel {
    return new LanguageModel(this.dataTypes, {
      ...this.letBindings,
      [letBinding.key]: letBinding
    });
  }
}
export class DataType {
  constructor(public readonly name: string) {}
}
export class LetBinding {
  constructor(public readonly key: string, public readonly value: string) {}
}
