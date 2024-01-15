import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home, Profile, SignIn, About, SignUp, PrivateRoute } from './pages';
import { Header } from './components';

function App() {
   return (
      <BrowserRouter>
         <Header />
         <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/about" element={<About />} />
            <Route element={<PrivateRoute />}>
               <Route path="/profile" element={<Profile />} />
            </Route>
         </Routes>
      </BrowserRouter>
   );
}

export default App;
