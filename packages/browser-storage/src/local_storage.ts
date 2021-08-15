import { AbstractStorage } from "./abstract_storage";

export class LocalStorage extends AbstractStorage {
  readonly adapter = window.localStorage;
}
