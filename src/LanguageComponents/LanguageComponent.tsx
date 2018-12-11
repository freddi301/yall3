import React from "react";
import { LanguageModel } from "../LanguageModel/LanguageModel";
export interface LanguageComponent<Data> {
  view: React.ComponentType<{
    data: Data;
    update(data: Data): void;
    model: LanguageModel;
  }>;
  model(args: { model: LanguageModel; data: Data }): LanguageModel;
}
