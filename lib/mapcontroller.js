/**
 * Created by yusuke on 2014/04/12.
 */

/**
* define namespace
*/
if(!window.Mapcontroller) Mapcontroller = {};

/**
 * define Location.manager
 */
(function(){

    /**
     * @constructor
     */
    function manager(){
    }

    Mapcontroller.manager = manager;

    /**
     * メンバオブジェクト
     */
    var myMap;

    /**
     * メンバ変数
     */
    var markerObjects = [];

    /**
     * Public Method
     * @type {{init: Function, setMyMarker: Function}}
     */
    manager.prototype = {

        init : function(dom){

            //地図を表示
            myMap = new GMaps({
                div: dom,
                //maxZoom: 40,
                minZoom: 3,
                disableDefaultUI: true,
                zoomControl: true,
                zoomControlOptions : {
                    style: google.maps.ZoomControlStyle.LARGE,
                    position: google.maps.ControlPosition.RIGHT_BOTTOM
                },
                zoom: 8,
                lat: 35.65858,
                lng: 139.745433,
                mapTypeId: google.maps.MapTypeId.SATELLITE,
                styles: [{
                    stylers: [
                        {   hue: '#2985f5'},
                        {   gamma: 1.50},
                        {   saturation: -40}]
                }]
            });

        },

        setMarkers : function(satelliteslist){

            $.each(satelliteslist,function(i,satelliteInfo){

                for(var i = 0;i < markerObjects.length; i++){
                    if(satelliteInfo.name == markerObjects[i].markerName){
                        myMap.removeMarker(markerObjects[i].markerObject);
                        if(markerObjects.msgMarkerObject != null){
                            myMap.removeMarker(markerObjects[i].msgMarkerObject);
                        }
                        markerObjects.splice(i,1);
                        break;
                    }
                }

                var _image = {
                    url: 'img/Satellite.png',
                    origin: new google.maps.Point(0,0),
                    anchor: new google.maps.Point(64,64),
                    scaledSize: new google.maps.Size(128, 128)
                }

                var _markerSatellite = myMap.addMarker({
                    lat:satelliteInfo.latitude,
                    lng:satelliteInfo.longitude,
                    title:'Satellite',
                    infoWindow : {
                        content: '<p>衛星の名前　:　' + satelliteInfo.name + '</p>' + '<p>保持するメッセージ数　:　' + satelliteInfo.msgcount + '</p>'
                    },
                    icon:_image
                });

                var _markerMsg = null;

                if(satelliteInfo.msgcount > 0){
                    var _image = {
                        url: 'img/msg.png',
                        origin: new google.maps.Point(0,0),
                        anchor: new google.maps.Point(0,0),
                        scaledSize: new google.maps.Size(50, 31)
                    }

                    _markerMsg = myMap.addMarker({
                        lat:satelliteInfo.latitude,
                        lng:satelliteInfo.longitude,
                        title:'Message',
                        icon:_image
                    });
                }

                var _markerObject = {
                    markerId: satelliteInfo.id,
                    markerName: satelliteInfo.name,
                    markerObject: _markerSatellite,
                    msgMarkerObject: _markerMsg,
                    lat:satelliteInfo.latitude,
                    lng:satelliteInfo.longitude
                };
                markerObjects.push(_markerObject);

            });

        },

        searchMarker : function(markerName,callback){

            for(var i = 0;i < markerObjects.length; i++){
                if(markerName == markerObjects.markerName){
                    callback(markerObjects.lat,markerObjects.lng);
                }
            }

        },

        setMapPosition : function(lat,lng){

            myMap.setCenter(lat,lng);

        }

    };

    /**
     * Private Method
     *
     */


})()