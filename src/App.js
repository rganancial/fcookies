import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home";

function App() {
    return (
        <Router>
            <div className="fc-app">
                <header className="fc-app-header">
                    <p>Home of the future fCookies project revival site!</p>
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
