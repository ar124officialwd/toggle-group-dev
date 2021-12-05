/**
 * ToggleGroup
 * A simple data structure to group and handle multiple toggles
 */
class ToggleGroup {
  /**
   * Collection of toggles -
   * Please don't access this directly (if using JS)
   * @type IToggle[]
   */
  private _toggles: IToggle[] = [];

  /**
   * Create a new instance of ToggleGroup
   * @param { IToggle[] | string[] } toggles Existing toggles (key-value pairs / string[]) to initialize group with, You may pass string array as well, in such case creates toggles by using string's as keys and sets value of each to `initalValue`.
   * @param { boolean } initalValue default value to be set, if toggles are to be created from string keys
   */
  constructor(toggles: IToggle[] | string[] = [], initalValue: boolean = false) {
    toggles.forEach((item: IToggle | string) => {
      let toggle: IToggle;
      if (item + '' === item) toggle = { key: item, value: initalValue };
      else toggle = item as IToggle;

      // avoid duplicates
      if (!this._toggles.find((i) => i.key == toggle.key))
        this._toggles.push(toggle);
    });
  }

  /**
   * Create one or more new toggle
   * @param { string | string[] } keys
   * array of keys to create toggles for or a string for creating single new toggle
   * 
   * @param { boolean } initalValue default value to initalize toggle(s) with
   */
  createToggle(keys: string | string[], initalValue = false) {
    const toggles: IToggle[] = [];

    if (typeof keys === 'string') {
      toggles.push({ key: keys, value: initalValue });
    } else {
      for (const key of keys) {
        toggles.push({ key, value: initalValue });
      }
    }

    for (const toggle of toggles) {
      const existing = this._toggles.find((i) => i.key === toggle.key);
      if (!existing) {
        this._toggles.push(toggle);
      }
    }
  }

  /**
   * Sets the value true to a toggle -
   * alias to `setValue(key, false)`
   * @param { string } key Unique key of the toggle
   */
  close(key: string) {
    return this.setValue(key, false);
  }

  /**
   * Close all items -
   * Sets value `false` to all of the toggles
   * @returns { ToggleGroup } this
   */
  closeAll(): ToggleGroup {
    return this.setAll(false);
  }

  /**
   * Get collection of keys which are currenty closed (Toggled on)
   * @returns { string[] }
   */
  get closedKeys() {
    return this._toggles.filter((i) => !i.value).map((i) => i.key);
  }

  /**
   * open (set value `true`) a toggle and drop (set value to `false`) rest
   * @param { ToggleGroup } key Unique key of the toggle
   */
  dropOpen(key: string) {
    return this.setAll(false).open(key);
  }

  /**
   * get number of toggles which are currently closed (have value `false`)
   * @returns { number } count of closed
   */
  getCloseCount() {
    return this._toggles.filter((i) => !i.value).length;
  }

  /**
   * get number of toggles which are currently opened (have value `true`)
   * @returns { number } count of open
   */
  getOpenCount() {
    return this._toggles.filter((i) => i.value).length;
  }

  /**
   * Get Toggle object, key value pair
   * @param { IToggle } key Key to get toggle of
   */
  getToggle(key: string) {
    let toggle = this.toggles.find((i) => i.key == key);
    if (!toggle) {
      toggle = {
        key,
        value: false,
      };

      this.toggles.push(toggle);
    }

    return toggle;
  }

  /**
   * Get current value of toggle by given key
   * @param { string } key Key to get value of toggle
   * @returns boolean value of the toggle, `undefined` if toggle doesn't exist
   */
  getValue(key: string): boolean | undefined {
    const item = this.toggles.find((i) => i.key == key);
    return item ? item.value : undefined;
  }

  /**
   * Sets the value true to a toggle -
   * alias to setValue(key, true)
   * @param { string } key Unique key of the toggle
   * @returns { ToggleGroup } this
   */
  open(key: string) {
    return this.setValue(key, true);
  }

  /**
   * Sets the value true to a toggle -
   * alias to setValue(key, true)
   * @param { string } key Unique key of the toggle
   * @returns { ToggleGroup } this
   */
  openAll() {
    return this.setAll(true);
  }

  /**
   * Get collection of keys which are currenty open (Toggled on)
   * @returns { string[] }
   */
  get openKeys() {
    return this._toggles.filter((i) => i.value).map((i) => i.key);
  }

  /**
   * Set the value of all toggle
   * @param { boolean } value value to be set
   * @returns { ToggleGroup } this
   */
  setAll(value: boolean) {
    for (const toggle of this.toggles) {
      toggle.value = value;
    }

    return this;
  }

  /**
   * Set the value of toggle against given key
   * @param { string } key Unique name of the toggle
   * @param { boolean } value value to be set
   * @returns { ToggleGroup } this
   */
  setValue(key: string, value: boolean) {
    let toggle = this.toggles.find((i) => i.key == key);
    if (!toggle) {
      toggle = {
        key,
        value: value,
      };

      this.toggles.push(toggle);
    } else {
      toggle.value = value;
    }

    return this;
  }

  /**
   * Toggle value of given key
   * @param { string } key Unique name of the toggle
   * @returns { ToggleGroup } this
   */
  toggle(key: string) {
    let toggle = this.toggles.find((i) => i.key == key);
    if (!toggle) {
      toggle = {
        key,
        value: true,
      };

      this.toggles.push(toggle);
    } else {
      toggle.value = !toggle.value;
    }

    return this;
  }

  /**
   * Get a copy of internally stored toggles
   * @getter
   */
  get toggles() {
    return this._toggles.map((i) => i);
  }

  /**
   * Restore toggles
   * @param { IToggle[] } toggles Array of existing toggle(Toggle objects)
   * @setter
   */
  set toggles(toggles: IToggle[]) {
    this._toggles = toggles;
  }
}

/**
 * Simple key-value pair
 * @type
 */
interface IToggle {
  key: string;
  value: boolean
};

/**
 * A simple key-value pair class, to re-enforce IToggle
 * @class
 * @implements IToggle
 */
class Toggle implements IToggle {
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

export = { ToggleGroup, Toggle };