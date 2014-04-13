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

        getSatellite : function(callback){

            var _satelliteslist;

            $.getJSON('http://spacebottle.cloudapp.net/api/satellites',
                function(satellites){

                    _satelliteslist = satellites;

                    $.getJSON('http://spacebottle.azure-mobile.net/api/messages',
                        function(satellitesmsg){
                            for(var i = 0;i < satellitesmsg.length;i++){
                                for(var ii = 0;ii < _satelliteslist.length;ii++){
                                    if(_satelliteslist[ii].msgcount == undefined){
                                        _satelliteslist[ii].msgcount = 0;
                                    }
                                    if(satellitesmsg[i].satellite_id == _satelliteslist[ii].id){
                                        _satelliteslist[ii].msgcount += 1;

                                        /**azureClient.getTable("Detail").where({
                                            name: _satelliteslist[ii].name

                                        }).read({
                                                success: function(results){
                                                    console.log(results);
                                                }
                                            });

                                        break;**/
                                    }
                                }

                            }
                            callback(_satelliteslist);
                        }
                    );

                }

            );

            /*var _du1 = {
                latitude: 30.869839468399245,
                longitude: -172.4070156804559,
                id: "20037971-5097-40c6-aa19-790bf3e92898",
                name: "ariari",
                msgcount: "6"
            }

            var _du2 = {
                latitude: 10.869839468399245,
                longitude: -142.4070156804559,
                id: "20037971-5097-40c6-aa19-790bf3e97898",
                name: "nashinashi",
                msgcount: "0"
            }

            callback([_du1,_du2]);*/

        }

    };

    /**
     * Private Method
     *
     */


})()