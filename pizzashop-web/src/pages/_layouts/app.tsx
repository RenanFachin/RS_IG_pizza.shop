import { Outlet } from 'react-router-dom' // https://reactrouter.com/en/main/components/outlet

export function AppLayout() {
  return (
    <div>
      <h1>Cabeçalho</h1>

      <div>
        {/* conteúdo */}
        <Outlet />
      </div>
    </div>
  )
}
