import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Get from './component/Get';
import Update from './component/Update';
import Post from './component/Post';
import Delete from './component/Delete';
import Navbar from './component/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css'


function App() {
  return (
    <div>
    <BrowserRouter> 
      <Routes>         
      <Route path="/" element={<Navbar />}>
      <Route index element={<Get />} />
          <Route path="/delete" element={<Delete />} />
          <Route path="/post" element={<Post />} />
          <Route path="/update" element={<Update />} />
        </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
