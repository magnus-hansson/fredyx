import Server from 'socket.io';

export default function startServer(store) {
    const io = new Server().attach(8090);
    //lyssna på ändringar i store
    store.subscribe(
        () => io.emit('state', store.getState().toJS())
    );
    //skicka state från store till klient när dom connectar
    io.on('connection', (socket) => {
       socket.emit('state', store.getState().toJS());
       socket.on('action', store.dispatch.bind(store));
    });
}