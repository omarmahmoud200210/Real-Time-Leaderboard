import { createContext, useContext, useState } from 'react'
import { io, type Socket } from 'socket.io-client'

export const SocketContext = createContext<Socket | null>(null)

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL ?? 'http://localhost:3000'

let socketSingleton: Socket | null = null

function getSocket(): Socket {
  if (!socketSingleton) {
    socketSingleton = io(BACKEND_URL, {
      path: '/socket.io',
      transports: ['websocket'],
      withCredentials: true,
    })
  }
  return socketSingleton
}

export function SocketProvider({ children }: { children: React.ReactNode }) {
  const [socket] = useState<Socket>(() => getSocket())
  return <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
}

export function useSocket() {
  return useContext(SocketContext)
}
