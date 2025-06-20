export const Status={
    BACKLOG:'backlog',
    PROCESSING:'processing',
    READY:"ready",
    BIN:"bin",
};
export const StatusLabel={
    [Status.BACKLOG]:"Бэклог",
    [Status.PROCESSING]:"В процессе",
    [Status.READY]:"Готово",
    [Status.BIN]:"Корзина"
};
export const StatusI={
    0:Status.BACKLOG,
    1:Status.PROCESSING,
    2:Status.READY,
    3:Status.BIN
};

export const UserAction={
    UPDATE_TASK:'UPDATE_TASK',
    ADD_TASK:'ADD_TASK',
    DELETE_TASK: 'DELETE_TASK',
};
export const UpdateType={
    PATCH:'PATCH',
    MINOR: 'MINOR',
    MAJOR: 'MAJOR',
    INIT:'INIT'
};