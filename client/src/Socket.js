import { io } from "socket.io-client"

const URL = import.meta.env.VITE_HOST

export const socket = io(URL, {
  autoConnect: false,
  secure: true,
})

socket.io.opts.debug = true;