/**
 * Created by yusuke on 2014/04/12.
 */

/**
 * define namespace
 */
if(!window.SatelliteManager) SatelliteManager = {};

/**
 * define Location.manager
 */
(function(){

    /**
     * @constructor
     */
    function manager(){

        //Azureへの接続用
        azureClient = new WindowsAzure.MobileServiceClient(
            "https://spacebottle.azure-mobile.net/",
            "NIxTTzFiVmtUptmvETPKInerCKgRub76"
        );

    }

    SatelliteManager.manager = manager;

    /**
     * メンバオブジェクト
     */
    var azureClient;

    /**
     * メンバ変数
     */

    /**
     * Public Method
     *
     */
    manager.prototype = {

        getSatellite : function(callback,satelliteid){

            var _satelliteslist;

            $.getJSON('http://spacebottle.cloudapp.net/api/satellites',
                function(satellites){

                    _satelliteslist = satellites;

                    $.getJSON('https://spacebottle.azure-mobile.net/api/messages',
                        function(satellitesmsg){
                            for(var i = 0;i < satellitesmsg.length;i++){
                                for(var ii = 0;ii < _satelliteslist.length;ii++){
                                    if(_satelliteslist[ii].msgcount == undefined){
                                        _satelliteslist[ii].msgcount = 0;
                                    }
                                    if(satellitesmsg[i].satellite_id == _satelliteslist[ii].id){
                                        _satelliteslist[ii].msgcount += 1;
                                        break;
                                    }
                                }
                            }
                            callback(_satelliteslist);
                        }
                    );

                }
            );


        }

    };

    /**
     * Private Method
     *
     */


})()