const status = {
    BACKLOG: backlog,
    PROCESSING: processing,
    DONE: done,
    BASKET: basket,
  };
  
  const StatusLabel = {
    [Status.BACKLOG]: `Бэклог`,
    [Status.PROCESSING]: `В процессе`,
    [Status.DONE]: `Готово`,
    [Status.BASKET]: `Корзина`,
  };
  
  export { status, StatusLabel };
  