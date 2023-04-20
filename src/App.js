import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import Home from "./pages/home";

function App() {
    return (
        <Router>
            <CssBaseline />
            <div className="fc-app container">
                <header className="fc-app-header">
                    <h1 id="logo">fCookies</h1>
                    <span className="fc-tagline">Bet you can't read just one!!</span>
                </header>
                <main>
                    <Routes>
                        <Route path="/" element={<Home />} />
                    </Routes>
                </main>
            </div>
        </Router>
    );
}

export default App;
