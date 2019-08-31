import socketIO from 'socket.io';
let ioInstance = null;

export default {
    init(server) {
        return ioInstance = socketIO(server);
    },
    
    io() {
        return ioInstance;
    }
};