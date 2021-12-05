import "jasmine";
import { ToggleGroup } from './index';

describe("ToggleGroup", () => {
  it("should create instances", () => {
    expect(new ToggleGroup()).toBeTruthy();
    expect(new ToggleGroup([])).toBeTruthy();
    expect(new ToggleGroup(['good', 'bad'])).toBeTruthy();
    expect(new ToggleGroup(['good', 'bad'], true)).toBeTruthy();
    expect(new ToggleGroup([{ key: 'good', value: true }])).toBeTruthy();
    expect(new ToggleGroup([{ key: 'good', value: true }, { key: 'good', value: true }])).toBeTruthy();
  })

  it('should test open/close behaviour', () => {
    const t1 = new ToggleGroup([{ key: 'good', value: false }], false);
    const t2 = new ToggleGroup([{ key: 'bad', value: true }], false);
    
    t1.open('good');
    expect(t1.getValue('good')).toBeTruthy();

    t2.close('bad');
    expect(t2.getValue('bad')).toBeFalse();
  });

  it('should test open/close all behaviour', () => {
    const t1 = new ToggleGroup(['good', 'bad'], false);
    t1.openAll();
    
    expect(t1.getValue('good')).toBeTruthy();
    expect(t1.getValue('bad')).toBeTruthy();

    t1.closeAll();
    expect(t1.getValue('good')).toBeFalse();
    expect(t1.getValue('bad')).toBeFalse();
  });

  it('should test set / get value behaviour', () => {
    const t1 = new ToggleGroup([{ key: 'good', value: false }], false);
    const t2 = new ToggleGroup([{ key: 'bad', value: true }], false);
    
    t1.setValue('good', true);
    expect(t1.getValue('good')).toBeTruthy();

    t2.setValue('bad', false);
    expect(t2.getValue('bad')).toBeFalse();
  });

  it('should test `create` and `counts` behaviour', () => {
    const t1 = new ToggleGroup(
      [
        { key: 'good', value: false },
        { key: 'bad', value: true },
        { key: 'good1', value: false },
        { key: 'bad1', value: true },
        { key: 'good2', value: false },
        { key: 'bad2', value: true },
      ]
    );

    t1.createToggle('sad');
    t1.createToggle('happy', true);
    t1.createToggle(['happy', 'sad', 'happy1', 'sad1'], true);
    
    expect(t1.getOpenCount()).toBe(6);
    expect(t1.getCloseCount()).toBe(4);
  });

  it('should test `create` and `counts` behaviour', () => {
    const t1 = new ToggleGroup(
      [
        { key: 'good', value: false },
        { key: 'bad', value: true },
        { key: 'good1', value: false },
        { key: 'bad1', value: true },
        { key: 'good2', value: false },
        { key: 'bad2', value: true },
      ]
    );

    t1.createToggle('sad');
    t1.createToggle('happy', true);
    t1.createToggle(['happy', 'sad', 'happy1', 'sad1'], true);

    t1.dropOpen('good1');
    
    expect(t1.getOpenCount()).toBe(1);
    expect(t1.getCloseCount()).toBe(9);
  });

  it('should test `create` and `counts` behaviour', () => {
    const t1 = new ToggleGroup(
      [
        { key: 'good', value: false },
        { key: 'bad', value: true },
        { key: 'good1', value: false },
        { key: 'bad1', value: true },
        { key: 'good2', value: false },
        { key: 'bad2', value: true },
      ]
    );

    expect(t1.openKeys.length).toBe(3);
    expect(t1.closedKeys.length).toBe(3);

    expect(t1.openKeys.includes('good')).toBeFalse();
    expect(t1.openKeys.includes('bad')).toBeTruthy();
    expect(t1.closedKeys.includes('bad1')).toBeFalse();
    expect(t1.closedKeys.includes('good2')).toBeTruthy();
  });
});