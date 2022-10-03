import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import BaseScreen from "./components/screens/BaseScreen";
import LoginScreen from "./components/screens/LoginScreen";
import AccountScreen from "./components/screens/AccountScreen";
import ArticleScreen from "./components/screens/ArticleScreen";
import TagScreen from "./components/screens/TagScreen";
import ThemeScreen from "./components/screens/ThemeScreen";
import LandingScreen from "./components/screens/LandingScreen";
import TagDetailScreen from "./components/screens/TagDetailScreen";
import ThemeDetailScreen from "./components/screens/ThemeDetailScreen";
import ArticleDetailScreen from "./components/screens/ArticleDetailScreen";
import AccountDetailScreen from "./components/screens/AccountDetailScreen";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<BaseScreen />}>
          <Route index element={<LandingScreen />} />
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/accounts" element={<AccountScreen />} />
          <Route path="/account/:id" element={<AccountDetailScreen/>} />
          <Route path="/articles" element={<ArticleScreen />} />
          <Route path="/articles/:id" element={<ArticleDetailScreen/>} />
          <Route path="/themes" element={<ThemeScreen />} />
          <Route path="/theme/:id" element={<ThemeDetailScreen/>} />
          <Route path="/tags" element={<TagScreen />} />
          <Route path="/tag/:id" element={<TagDetailScreen/>} />
          <Route path="*" element={<h1> 404 not found </h1>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
