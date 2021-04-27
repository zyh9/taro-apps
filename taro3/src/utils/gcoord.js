import gcoord from "gcoord";

// WGS84 => BD
const wgsToBmap = ({ lat, lng }) => {
  let result = gcoord.transform([lng, lat], gcoord.WGS84, gcoord.BD09);
  return {
    lng: result[0],
    lat: result[1]
  };
};

// WGS84 => GCJ
const wgsToGcj = ({ lat, lng }) => {
  let result = gcoord.transform([lng, lat], gcoord.WGS84, gcoord.GCJ02);
  return {
    lng: result[0],
    lat: result[1]
  };
};

// GCJ => BD
const gcjToBmap = ({ lat, lng }) => {
  let result = gcoord.transform([lng, lat], gcoord.GCJ02, gcoord.BD09);
  return {
    lng: result[0],
    lat: result[1]
  };
};

export default {
  wgsToBmap,
  wgsToGcj,
  gcjToBmap
};
