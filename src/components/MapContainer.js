import { useEffect, useState } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import PropTypes from 'prop-types';

import { Signer } from 'aws-amplify';
import awsconfig from '../aws-exports';

export default function MapContainer(props) {
  const mapName = 'SampleMap';

  const [mapInstance, setMapInstance] = useState(null);
  useEffect(() => {
    if (props.credentials && !mapInstance) {
      if (props.credentials && !mapInstance) {
        const map = new maplibregl.Map({
          container: document.getElementById('map'),
          style: mapName,
          center: [props.lnglat[0], props.lnglat[1]],
          zoom: 16,
          transformRequest: transformRequest,
        });
        map.addControl(new maplibregl.NavigationControl(), 'top-left');
        map.on('load', () => {
          map.resize();
        });

        setMapInstance(map);
      }
    }

    if (props.credentials && mapInstance) {
      mapInstance.setCenter(props.lnglat);
    }

    if (!props.credentials) {
      setMapInstance(null);
    }
  });

  const transformRequest = (url, resourceType) => {
    if (resourceType === 'Style' && !url.includes('://')) {
      url = `https://maps.geo.${awsconfig.aws_project_region}.amazonaws.com/maps/v0/maps/${url}/style-descriptor`;
    }

    if (url.includes('amazonaws.com')) {
      return {
        url: Signer.signUrl(url, {
          access_key: props.credentials.accessKeyId,
          secret_key: props.credentials.secretAccessKey,
          session_token: props.credentials.sessionToken,
        }),
      };
    }

    return { url };
  };

  return (
    <div
      id="map"
      style={{
        height: '60vh',
        width: '100%',
        marginTop: 8,
        marginBottom: 8
      }}
    ></div>
  );
}

MapContainer.propTypes = {
  credentials: PropTypes.any,
  lnglat: PropTypes.array
};
