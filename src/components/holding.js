<div>

        <Header></Header>
        <Switch>
          <Route
            exact
            path={'/'}
            component={LandingPage}
          />
          <Route
            exact
            path={'/register'}
            component={Register}
          />
          <Route
            exact
            path={'/login'}
            component={Login}
          />
          <Route
            exact
            path={'/client'}
            component={ClientList}
          />
        </Switch>   
</div>