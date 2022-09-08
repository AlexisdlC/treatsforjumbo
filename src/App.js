import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Login from './pages/Login'
import Layout from './pages/Layout'
import Dashboard from './pages/Dashboard';
import Home from './pages/Home'
import EditNote from './pages/EditNote'
import TreatGame from './pages/TreatGame';
import CreateNote from './pages/CreateNote';
import DeleteNote from './pages/DeleteNote';

import RequireAuth from './RequireAuth';
import PersistLogin from './pages/PersistLogin';
// import logo from './logo.svg';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>

        <Route path='/login' element={<Login />} />
        <Route path='/' element={<Home />} />
        <Route path='/treatgame' element={<TreatGame />} />
        
        <Route element={<PersistLogin />}>
          <Route element={<RequireAuth />}>
            <Route path='dashboard' element={<Dashboard />} />
            <Route path='editNote' element={<EditNote />} />
            <Route path='createNote' element={<CreateNote />} />
            <Route path='deleteNote' element={<DeleteNote />} />
          </Route>
        </Route>
        
      </Route>
    </Routes>
  )
}