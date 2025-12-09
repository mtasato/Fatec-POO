import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ListBus from "./components/Bus/ListBus";
import ListAccessibilityFeatures from "./components/Acessibility/ListAcessibility";
import ListVan from "./components/Van/ListVan";

export function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navigate to="/bus" replace />} />
                <Route path="/bus" element={<ListBus />} />
                <Route path="/acessibility" element={<ListAccessibilityFeatures />} />
                <Route path="/van" element={<ListVan />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;