/**
 * Created by yusuke on 2014/04/12.
 */

$(document).ready(function(){

    Mapcontroller = new Mapcontroller.manager();
    SatelliteManager = new SatelliteManager.manager();

    Mapcontroller.init('#map-container');

    setInterval(function(){
        SatelliteManager.getSatellite(function(satelliteslist){
            Mapcontroller.setMarkers(satelliteslist);
        });

    }, 10000);

    $("input#search-box").keypress(function(key) {
        if(key.which == 13){
            Mapcontroller.searchMarker($(this).val(),function(lat,lng){
                Mapcontroller.setMapPosition(lat,lng);
            });
        }
    });

});
