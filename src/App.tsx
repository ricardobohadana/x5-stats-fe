import { Routes, Route } from "react-router-dom"
import { Home } from "./pages/Home"
import { NewGame } from "./pages/NewGame"
import { NewPlayer } from "./pages/NewPlayer"
import { getChampionIconUrl } from "./api/cdn"
import { Navbar } from "./component/Navbar"
import "./index.css"
import "react-toastify/dist/ReactToastify.css"
import { ToastContainer } from "react-toastify"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import LoadingOverlay from "./component/LoadingOverlay"
import { useGlobalStore } from "./stores/store"
import { ErrorOverlay } from "./component/ErrorOverlay"

const queryClient = new QueryClient()

function App() {
  const isLoading = useGlobalStore((state) => state.isLoading)
  const hasError = useGlobalStore((state) => state.hasError)
  const errorMessage = useGlobalStore((state) => state.errorMessage)
  return (
    <div>
      <QueryClientProvider client={queryClient}>
        <div className="min-h-screen bg-gray-50 ">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/new" element={<NewGame />} />
            <Route path="/new-player" element={<NewPlayer />} />
            <Route
              path="*"
              element={
                <h1>
                  Not Found{" "}
                  <img height={25} width={25} src={getChampionIconUrl(null)} />
                </h1>
              }
            />
          </Routes>
          <ToastContainer />
          <LoadingOverlay isLoading={isLoading} />
          <ErrorOverlay hasError={hasError} errorMessage={errorMessage} />
        </div>
      </QueryClientProvider>
    </div>
  )
}

export default App
