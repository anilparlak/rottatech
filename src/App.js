import { Route, BrowserRouter, Routes } from 'react-router-dom';
import Posts from './pages/Posts';
import PostDetail from './pages/PostDetail';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  return (
    <div className='container'>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Posts />} />
          <Route path="/post-detail/:postId" element={<PostDetail />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
