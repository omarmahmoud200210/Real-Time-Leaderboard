import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { AuthProvider } from '@/contexts/AuthContext'
import { SocketProvider } from '@/contexts/SocketContext'
import { Layout } from '@/components/Layout'
import { ProtectedRoute } from '@/components/ProtectedRoute'
import { GamePage } from '@/pages/GamePage'
import { GamesPage } from '@/pages/GamesPage'
import { LeaderboardPage } from '@/pages/LeaderboardPage'
import { LoginPage } from '@/pages/LoginPage'
import { ReportsPage } from '@/pages/ReportsPage'

const queryClient = new QueryClient()

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <SocketProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route element={<Layout />}>
                <Route path="/leaderboard" element={<LeaderboardPage />} />
                <Route path="/games" element={<GamesPage />} />
                <Route path="/reports" element={<ReportsPage />} />
                <Route element={<ProtectedRoute />}>
                  <Route path="/games/:id" element={<GamePage />} />
                </Route>
                <Route path="*" element={<Navigate to="/leaderboard" replace />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </SocketProvider>
      </AuthProvider>
    </QueryClientProvider>
  )
}
