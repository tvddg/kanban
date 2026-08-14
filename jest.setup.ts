import '@testing-library/jest-dom';

global.ResizeObserver = class ResizeObserver {
  public cb: any;
    constructor(cb: any) {
    this.cb = cb;
  }
  observe() {}
  unobserve() {}
  disconnect() {}
};

