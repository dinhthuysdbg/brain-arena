import type { ReactNode } from 'react';
import { Shell } from './components/Shell';
import { Play } from './components/Play';
import { usePath, match } from './router';
import { HomePage, GamesPage, RankingPage, MissionsPage, ProfilePage, NotFoundPage } from './pages/pages';
import { LoginPage } from './pages/Login';
import { verifySession } from './store/auth';
import { useEffect } from 'react';

export default function App() {
  const path = usePath();
  useEffect(() => { void verifySession(); }, []);
  const r = match(path);
  let page: ReactNode;
  switch (r.name) {
    case 'home': page = <HomePage />; break;
    case 'games': page = <GamesPage />; break;
    case 'play': page = <Play key={r.params.id} gameId={Number(r.params.id)} />; break;
    case 'ranking': page = <RankingPage />; break;
    case 'missions': page = <MissionsPage />; break;
    case 'profile': page = <ProfilePage />; break;
    case 'login': page = <LoginPage />; break;
    default: page = <NotFoundPage />;
  }
  return <Shell>{page}</Shell>;
}
