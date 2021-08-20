import React from 'react';
import { Route, Switch } from 'react-router-dom';
import styled from '@emotion/styled';
import Footer from './components/common/Footer';
import Header from './components/common/Header';
import LoginPage from './pages/LoginPage';
import PostListPage from './pages/PostListPage';
import ProfilePage from './pages/ProfilePage';
import RegisterPage from './pages/RegisterPage';
import PostPage from './pages/PostPage';
import PlayListPage from './pages/PlayListPage';
import PrivateRoute from './router/PrivateRoute';
import NotFound from './pages/NotFound';

const Wrapper = styled.div`
  width: 1024px;
  margin: 0 auto;

  @media (max-width: 1024px) {
    width: 100%;
    /* overflow: hidden; */
  }
`;

const Border = styled.div`
  width: 100%;
  border-bottom: 1px solid #868e96;
  margin: 15px 0;

  @media (max-width: 320px) {
    margin: 8px 0;
  }
`;

function App() {
  return (
    <>
      <Wrapper>
        <Header />
      </Wrapper>

      <Border />
      <Wrapper>
        <Switch>
          <Route exact component={PostListPage} path={['/', '/search']} />
          <PrivateRoute
            exact
            component={ProfilePage}
            path="/:username/profile"
          />
          <PrivateRoute
            exact
            component={PlayListPage}
            path="/:username/playlist"
          />
          <Route exact component={LoginPage} path="/login" />
          <Route exact component={RegisterPage} path="/register" />
          <Route exact component={PostPage} path="/watch" />
          <Route component={NotFound} />
        </Switch>
        <Footer />
      </Wrapper>
    </>
  );
}

export default App;
