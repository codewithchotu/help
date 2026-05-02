// src/App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./LoginPage";
import Home from "./pages/home/Home";
import RegisterDonor from "./pages/home/RegisterDonor";
import RequestBlood from "./pages/request/RequestBlood";
import ViewDonor from "./pages/donor/ViewDonor";
import ViewRequests from "./pages/home/ViewRequests";
import MapPage from "./pages/home/MapPage";
import Layout from "./components/Layout";

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/register-donor" element={<RegisterDonor />} />
        <Route path="/request-blood" element={<RequestBlood />} />
        <Route path="/view-donor" element={<ViewDonor />} />
        <Route path="/view-requests" element={<ViewRequests />} />
        <Route path="/map" element={<MapPage />} />
      </Routes>
    </Layout>
  );
}
