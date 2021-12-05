import { IToggle } from "./toggle.interface";

/**
 * A simple key-value pair class, to re-enforce IToggle
 * @class
 * @implements IToggle
 */

export class Toggle implements IToggle {
  key: string;
  value: boolean;

  constructor(key: string, value: boolean) {
    this.key = key;
    this.value = value;
  }

  /**
   * Create an object from an object that is of type IToggle
   * @param { IToggle } object An object that is of type IToggle
   * @returns { Toggle } a Toggle object
   */
  static from(object: IToggle): Toggle {
    return new Toggle(object.key, object.value);
  }
}
