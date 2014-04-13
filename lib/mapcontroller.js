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

        init : function(dom,callback){

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

            myMap.addControl({
                position: 'top_right',
                content: '衛星表示切り替え（次の更新タイミングで切り替わります）',
                style: {
                    margin: '5px',
                    padding: '1px 6px',
                    border: 'solid 1px #717B87',
                    background: '#fff'
                },
                events: {
                    click: callback
                }
            });


        },

        setMarkers : function(satelliteslist,is_allDisplay){

            $.each(satelliteslist,function(i,satelliteInfo){

                for(var i = 0;i < markerObjects.length; i++){
                    if(satelliteInfo.id == markerObjects[i].markerId){
                        myMap.removeMarker(markerObjects[i].markerObject);
                        /**if(markerObjects[i].msgMarkerObject != null){
                            myMap.removeMarker(markerObjects[i].msgMarkerObject);
                        }**/
                        markerObjects.splice(i,1);
                        break;
                    }
                }

                if(is_allDisplay || (!is_allDisplay && satelliteInfo.msgcount > 0)){

                    if(satelliteInfo.msgcount > 0){
                        var _image = {
                            url: 'img/eisei.png',
                            origin: new google.maps.Point(0,0),
                            anchor: new google.maps.Point(0,0),
                            scaledSize: new google.maps.Size(160, 83)
                        }
                    }else{
                        var _image = {
                            url: 'img/eisei_empty.png',
                            origin: new google.maps.Point(0,0),
                            anchor: new google.maps.Point(64,64),
                            scaledSize: new google.maps.Size(160, 83)
                        }
                    }

                    var _markerSatellite = myMap.addMarker({
                        lat:satelliteInfo.latitude,
                        lng:satelliteInfo.longitude,
                        title:'Satellite',
                        infoWindow : {
                            content: '<p>衛星の名前　:　' + satelliteInfo.name + '</p>' + '<p>運ぶメッセージの数　:　' + satelliteInfo.msgcount + '</p>'
                        },
                        icon:_image
                    });

                }

/**                 var _markerMsg = null;

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
                }**/

                var _markerObject = {
                    markerId: satelliteInfo.id,
                    markerName: satelliteInfo.name,
                    markerObject: _markerSatellite,
                    //msgMarkerObject: _markerMsg,
                    lat:satelliteInfo.latitude,
                    lng:satelliteInfo.longitude
                };
                markerObjects.push(_markerObject);

            });

        },

        searchMarker : function(markerName,callback){

            var _list = [];
            for(var i = 0;i < markerObjects.length; i++){
                if(markerName == markerObjects[i].markerName){
                    _list.push(markerObjects[i].markerName);
                    callback(markerObjects[i].lat,markerObjects[i].lng,_list);
                    break;
                }else{
                    if(markerObjects[i].markerName.indexOf(markerName) != -1){
                        _list.push(markerObjects[i].markerName);
                    }
                }
            }
            callback(null,null,_list);

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
