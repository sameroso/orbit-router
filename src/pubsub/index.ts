const routePubSub: { fns: any; subscribe: any; publish: any } = {
  fns: new Set(),
  subscribe: (fn: any) => {
    // @ts-ignore
    this?.fns?.add(fn);
    // @ts-ignore
    return () => this?.fns?.delete(fn);
  },
  // @ts-ignore
  publish: (param) => this?.fns?.forEach((fn) => fn(param)),
};

export default routePubSub;
