// This module takes an input and  build a request to the Google Maps API.
// It returns a response that will include latitude and longitude data.

var request = "http://maps.googleapis.com/maps/api/geocode/json?address=" + input;

var response = xdmp.httpGet(request);

response;
