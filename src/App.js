import './App.css';

import { useEffect, useState } from 'react';
import { Container, Grid } from '@material-ui/core';

import { Auth } from 'aws-amplify';
import { AmplifyAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';
import { AuthState, onAuthUIStateChange } from '@aws-amplify/ui-components';

import Input from './components/Input';
import MapContainer from './components/MapContainer';

const SAPPORO_LNGLAT = [141.3545, 43.0618];

function App() {
  const [authState, setAuthState] = useState(null);
  const [credentials, setCredentials] = useState(null);

  useEffect(() => {
    return onAuthUIStateChange((nextAuthState /* , authData */) => {
      setAuthState(nextAuthState);

      if (authState !== nextAuthState && nextAuthState === AuthState.SignedIn) {
        setPlace(SAPPORO_LNGLAT);
        Auth.currentCredentials().then((data) => {
          setCredentials(data);
        });
      }
    });
  });

  const [place, setPlace] = useState(SAPPORO_LNGLAT);
  useEffect(() => {
    console.log('place useEffect', place);
  }, place);

  /**
   * Call into Input Component
   * @param {*} place
   */
  const updatePlace = (place) => {
    setPlace(place);
    console.log('updatePlace', place);
  };

  return (
    <Container maxWidth="lg">
      <AmplifyAuthenticator>
        {(authState === AuthState.SignedIn) && (
          <div>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Input updatePlace={updatePlace} credentials={credentials} lnglat={place}></Input>
              </Grid>
            </Grid>
            <MapContainer credentials={credentials} lnglat={place}></MapContainer>
            <AmplifySignOut />
          </div>
        )}
      </AmplifyAuthenticator>

    </Container>
  );
}

export default App;
