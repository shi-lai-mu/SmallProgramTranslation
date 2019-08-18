'use strict';

export default (app: any) => {
  
  const { io } = app,
    master = io.of('/'),
    ic = io.controller;
  master.route('Task/near', ic.home.test);
}