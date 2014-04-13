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

    }, 5000);

    $("input#search-box").keyup(function(key) {
        Mapcontroller.searchMarker($(this).val(),function(lat,lng,keys){
            if(lat == null){
                $("input#search-box").autocomplete({
                    source: keys
                });
            }else{
                console.log(key);
                Mapcontroller.setMapPosition(lat,lng);
            }

        });
    });

/*    $("input#search-box").keypress(function(key) {
        if(key.which == 13){
            Mapcontroller.searchMarker($(this).val(),function(lat,lng,key){
                console.log(key);
                Mapcontroller.setMapPosition(lat,lng);
            });
        }
    });*/

});
