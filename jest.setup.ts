import '@testing-library/jest-dom';

global.ResizeObserver = class ResizeObserver {
  public cb: ResizeObserverCallback;
    constructor(cb: ResizeObserverCallback) {
    this.cb = cb;
  }
  observe() {}
  unobserve() {}
  disconnect() {}
};

