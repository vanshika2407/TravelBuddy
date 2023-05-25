export function getSquareCoordinates(latitude, longitude) {
  const earthRadius = 6371; // km
  const d = 1; // km
  const latRadian = latitude * (Math.PI/180);
  const lonRadian = longitude * (Math.PI/180);
  const latOffset = (d/earthRadius) * (180/Math.PI);
  const lonOffset = (d/earthRadius) * (180/Math.PI) / Math.cos(latRadian);
 
  const bottomRightLat = latitude - latOffset;
  const bottomRightLon = longitude - lonOffset;
  const topRightLat = latitude + latOffset;
  const topRightLon = longitude + lonOffset;
 
  return {
    sw: { lat: bottomRightLat, lng: bottomRightLon },
    ne: { lat: topRightLat, lng: topRightLon }
  };
}