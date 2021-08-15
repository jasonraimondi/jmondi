import { AbstractStorage } from "./abstract_storage";

export class SessionStorage extends AbstractStorage {
  readonly adapter = window.sessionStorage;
}
