/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import "./App.css";
import Login from "./components/Login";
import AppLayout from "./components/AppLayout";
import Home from "./components/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { connect } from "react-redux";
import { getUserAuth } from "./actions";

function App(props) {
  useEffect(() => {
    props.getUserAuth();
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/" element={<AppLayout />}>
          <Route path="/home" element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => ({
  getUserAuth: () => dispatch(getUserAuth()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);

// export default App;
