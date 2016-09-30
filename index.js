/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
 
 /*
 *	Implémentation du protocole bluetooth InfantAccess de SinginCity basé sur la librairie BLE central de cordova
 *	
 *	GITHUB : https://github.com/don/cordova-plugin-ble-central#advertising-data
 *		  	 https://github.com/don/cordova-plugin-ble-central
 *	En mode debug : https://github.com/apache/cordova-plugin-console :	cordova plugin add cordova-plugin-console
 */
var InfantAccessBLE = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'InfantAccessBLE.receivedEvent(...);'
    onDeviceReady: function()
	{
        InfantAccessBLE.receivedEvent('deviceready');
    }
	,
    // Update DOM on a Received Event
    receivedEvent: function(id)
	{
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');
        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');
        console.log('Received Event: ' + id);
		InfantAccessScanForDevices();		
    }
	,
	/**
		*	@author : David Namboka
		*	@name  :	InfantAccessScanForDevices
		*	@param : services ( List of services to discover, or [] to find all devices )
		*			 seconds  ( Number of seconds to run discovery )
		*			 success  ( Success callback function that is invoked which each discovered device )
		*			 failure  ( Error callback function, invoked when error occurs. [optional] )
		*	@description : On scan et on arrête le scan dans la même fonction
		*	@return : objet JSON 
					  {
							"name": "DeviceName",
							"id": "BD922605-1B07-4D55-8D09-B66653E51BBA",
							"rssi": -79, // puissance du signal
							"advertising": Android (rawData), IOS (objet JSON)
					  }
	*/
	InfantAccessScanForDevices : function( services, seconds, success, failure  )
	{
		ble.scan
		(
			[],
			5, // <= durée du scan
			function( device ) 
			{
				alert( JSON.stringify( device ) );
			}, 
			InfantAccessScanFailure
		);	
		setTimeout
		(
			ble.stopScan
			,
			5000
			, // <= dans 5 secondes on arrête
			function() { alert( "Scan complete" ); }
			,
			function() { alert( "stopScan failed" ); }
		);	
	}
	,	
	/**
	*	@author :   David Namboka
	*	@name  :	InfantAccessScanFailure
	*	@param :    void
	*	@description : Callback en cas d'erreur de scan
	*	@return : void
	*/		
	InfantAccessScanFailure : function()
	{
		alert( "failure" );
	}
	,	
	/**
	*	@author :   David Namboka
	*	@name  :	InfantAccessConnectDevice
	*	@param :    void
	*	@description : Etablir une connexion avec un device dont on possède l'id
	*	@return : void
	*/	
	InfantAccessConnectDevice : function( device_id, InfantAccessConnectSuccess, InfantAccessConnectFailure )
	{
		ble.connect( device_id, InfantAccessConnectSuccess, InfantAccessConnectFailure );		
	}
	,
	/**
	*	@author :   David Namboka
	*	@name  :	InfantAccessConnectSuccess
	*	@param :    void
	*	@description : Callback lorsque la connexion est bien établie
	*	@return : void
	*/	
	InfantAccessConnectSuccess: function( e )
	{
		console.log( e );
	}
	,
	/**
	*	@author :   David Namboka
	*	@name  :	bluetoothScanFailure
	*	@param :    void
	*	@description : Callback en cas d'échec de la connexion
	*	@return : void
	*/	
	InfantAccessConnectFailure : function( e )
	{
		console.log( e );
	}
};

//On initialize InfantAccessBLE
InfantAccessBLE.initialize();
