/**
 * Created by yusuke on 2014/04/12.
 */

$(document).ready(function(){

    var is_allDisplay = false;

    Mapcontroller = new Mapcontroller.manager();
    SatelliteManager = new SatelliteManager.manager();

    Mapcontroller.init('#map-container',function(){
        //表示切り替え
        if(is_allDisplay){
            is_allDisplay = false;
        }else{
            is_allDisplay = true;
        }
    });

    setInterval(function(){
        SatelliteManager.getSatellite(function(satelliteslist){
            Mapcontroller.setMarkers(satelliteslist,is_allDisplay);
        });

    }, 5000);

    $("input#search-box").keyup(function(key) {
        Mapcontroller.searchMarker($(this).val(),function(lat,lng,keys){
            if(lat == null){
                $("input#search-box").autocomplete({
                    source: keys
                });
            }else{
                Mapcontroller.setMapPosition(lat,lng);
            }

        });
    });

});
