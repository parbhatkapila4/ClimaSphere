import { BrowserRouter, Routes} from "react-router-dom";
import "./App.css";
import Layout from "./components/ui/layout";
import { ThemeProvider } from "./context/theme-provider";

function App (){
  return(
    
   <BrowserRouter>
   <ThemeProvider defaultTheme="dark">
     <Layout>
          <Routes>
            
          </Routes>
          </Layout>
   </ThemeProvider>
   </BrowserRouter>
  )
}
export default App;