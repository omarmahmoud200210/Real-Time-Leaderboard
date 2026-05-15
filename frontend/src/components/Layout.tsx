import { Link, Outlet } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { useAuth } from '@/contexts/AuthContext'

export function Layout() {
  const { user, logout } = useAuth()

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <nav className="max-w-4xl mx-auto px-4 h-14 flex items-center gap-6">
          <Link to="/leaderboard" className="font-semibold text-foreground hover:text-foreground/80">
            Leaderboard
          </Link>
          <Link to="/games" className="text-muted-foreground hover:text-foreground">
            Games
          </Link>
          <Link to="/reports" className="text-muted-foreground hover:text-foreground">
            Reports
          </Link>
          <div className="ml-auto flex items-center gap-3">
            {user ? (
              <>
                <span className="text-sm text-muted-foreground">{user.username}</span>
                <Separator orientation="vertical" className="h-4" />
                <Button variant="ghost" size="sm" onClick={logout}>
                  Logout
                </Button>
              </>
            ) : (
              <Link to="/login">
                <Button variant="ghost" size="sm">Login</Button>
              </Link>
            )}
          </div>
        </nav>
      </header>
      <main className="max-w-4xl mx-auto px-4 py-8">
        <Outlet />
      </main>
    </div>
  )
}
