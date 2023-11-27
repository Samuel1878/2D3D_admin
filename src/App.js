import {Route, Routes} from "react-router-dom"
import './App.css';
import Home from "./pages/home";
import Login from "./pages/login";
import ProtectedLayout from "./layouts/protected";
import SharedNav from "./layouts/sharedNav";
import Server from "./pages/server";
import DepositPage from "./pages/deposit";
import WithdrawlPage from "./pages/withdrawl";
import ServicesPage from "./pages/services";
import UserDetail from "./components/detail";
import EditPage from "./components/edit";

function App() {


  return (
    <Routes>
      <Route element={<ProtectedLayout />} path="/">
        <Route path="/home" element={<SharedNav />}>
          <Route element={<Home />} index />
          <Route path="/home/server" element={<Server />} />
          <Route path="/home/deposit" element={<DepositPage />} />
          <Route path="/home/withdrawl" element={<WithdrawlPage />} />
          <Route path="/home/service" element={<ServicesPage />} />
          <Route path="/home/detail" element={<UserDetail />} />
          <Route path="/home/edit" element={<EditPage />} />
        </Route>
      </Route>
      <Route element={<Login />} path="/login" />
    </Routes>
  );
}

export default App;
