# Toggle Group
A map like data structure to handle multiple toggle(-able) elements

## What's ToggleGroup and how is useful
- `ToggleGroup` is a simple class that encapsulate a collection key value pairs, yet value is always boolean, toggleable.

- It provides interface to access value of particular key, change it and perform bulk operations like `closeAll` which sets all internal pairs to be value `false`.

- It can be useful in many scenarios, for example
  - You want to build a Tab switch structure - it does exactly that, you could initate it with unique tab keys and then utilize `dropOpen` method to switch (set to `true`) on one of them, while keeping (or dropping) rest to `false`.
  - You want to implement expand/collapse structure - yet again it does exactly that. It allows you to switch on (termed `open`) one or more keys, and close likewise. Also you could collapse all by calling `closeAll` method and expand all by calling `openAll` method.

I wrote this structure and found it useful in front-end Angular application. I use this to keep my views binded togathered and yet easily switched, based on state of `ToggleGroup` object. Examples are shared at end.

## Basic Usage

### importing 
**NodeJS**
```js
  const { ToggleGroup, Toggle } = require('toggle-group');
```

### Creating object
```js
  const simple = new ToggleGroup(); // that's all

  const tg = new ToggleGroup(['good', 'better'], false);
  tg.createToggle('best', true);

  console.log(tg);
  /* output
    ToggleGroup {
      _toggles: [
        { key: 'good', value: false },
        { key: 'better', value: false },
        { key: 'best', value: true }
      ]
    }
  */
 
  const tg1 = new ToggleGroup(
    [
      { key: 'good', value: true }, // maybe of type Toggle/IToggle
      Toggle.from({ key: 'good', value: false }), // Toggle instance created from IToggle
      new Toggle('good', false), // may include Toggle instances,
      'str-key-1',
      'str-key-2',
    ],

    // string key's get value passed in 2nd param, or fallback to `false`
    true
  );

  console.log(tg1.getValue('str-key-1'));
  /* output
    true 
  */
```

### Properties and methods (operations)
Please refer to [docs here](https://ar124official2019.github.io/toggle-group-dev/).

## Contribution
Kind of contrbution like improving code, fixing bugs, improving docs is highly appreciated.