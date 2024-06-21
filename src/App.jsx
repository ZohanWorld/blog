import { Route, Routes } from 'react-router-dom'
import { Provider } from 'react-redux'

import './App.css'

import Layout from './components/Layout'
import HomePage from './pages/Homepage'
import { store } from './store'
import ArticlePage from './pages/Articlepage'
import Registerpage from './pages/Registerpage'
import Loginpage from './pages/Loginpage'
import Profilepage from './pages/Profilepage'
import Newarticlepage from './pages/Newarticlepage'
import Needauthpages from './hoc/Needauthpages'
import Onlynotauthed from './hoc/Onlynotauthed'
import EditArticlePage from './pages/Editarticlepage'

function App() {
  return (
    <Provider store={store}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="post/:slug" element={<ArticlePage />} />
          <Route element={<Onlynotauthed />}>
            <Route path="/sign-in" element={<Loginpage />} />
            <Route path="/sign-up" element={<Registerpage />} />
          </Route>
          <Route element={<Needauthpages />}>
            <Route path="/profile" element={<Profilepage />} />
            <Route path="/new-article" element={<Newarticlepage />} />
            <Route path="/articles/:slug/edit" element={<EditArticlePage />} />
          </Route>
        </Route>
      </Routes>
    </Provider>
  )
}

export default App
