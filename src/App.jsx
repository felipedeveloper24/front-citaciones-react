
import './App.css'
import RouterPrincipal from './routes/routes'
import "bootstrap/dist/js/bootstrap.bundle"
import { QueryClient,QueryClientProvider } from 'react-query'

const queryClient = new QueryClient();

function App() {
  return(
    <>
    <QueryClientProvider client={queryClient}>
        <RouterPrincipal/>
    </QueryClientProvider>
    </>
  )
}

export default App
