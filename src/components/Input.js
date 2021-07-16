import { Location } from 'aws-sdk';
import { TextField } from '@material-ui/core';
import PropTypes from 'prop-types';

import awsconfig from '../aws-exports';

export default function Input(props) {
  const handleChange = (event) => {
    search(event.target.value);
  };

  const location = new Location({
    credentials: props.credentials,
    region: awsconfig.aws_project_region,
  });

  const search = (place) => {
    if (!place || place.length === 0) {
      return;
    }

    const params = {
      IndexName: 'SamplePlaceIndex',
      Text: place,
    };

    location.searchPlaceIndexForText(params, (err, data) => {
      if (err) {
        console.error(err);
        return;
      }
      if (data && data.Results && data.Results.length > 0) {
        props.updatePlace(
          [
            data.Results[0].Place.Geometry.Point[0],
            data.Results[0].Place.Geometry.Point[1],
          ]
        );
      }
    });
  };

  return (
    <div>
      <TextField
        fullWidth
        label="Place"
        variant="outlined"
        onBlur={handleChange}
        style={{ marginTop: 8, marginBottom: 8 }}
      />
    </div>
  );
}

Input.propTypes = {
  updatePlace: PropTypes.any,
  credentials: PropTypes.any,
  lnglat: PropTypes.array
};
