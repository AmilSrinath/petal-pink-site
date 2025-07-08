import MyRouter from "routers/index"
import { Helmet, HelmetProvider } from "react-helmet-async"

function App() {
  return (
    <HelmetProvider>
      <Helmet>
        <title>Petal Pink</title>
        <meta name="description" content="Petal Pink" />
      </Helmet>

      {/* MAIN APP */}
      <div className="bg-gradient-to-br from-white to-purple-50 dark:from-slate-900 dark:to-purple-900 text-base text-slate-900 dark:text-slate-200 min-h-screen">
        <MyRouter />
      </div>
    </HelmetProvider>
  )
}

export default App
