'use strict';

export default (app: any) => {
  
  const { io } = app,
    master = io.of('/'),
    ic = io.controller;

  master.route('test', ic.home.test);
  master.route('busyCheck', ic.home.busyCheck);
  master.route('packing', ic.home.packing);
  master.route('getComponentData', ic.home.getComponentData);
}