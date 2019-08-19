'use strict';

export default (app: any) => {
  
  const { io } = app,
    master = io.of('/'),
    ic = io.controller;

  master.route('test', ic.home.test);
}