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

// Wait for the deviceready event before using any of Cordova's device APIs.
// See https://cordova.apache.org/docs/en/latest/cordova/events/events.html#deviceready
document.addEventListener('deviceready', onDeviceReady, false);

function LoadPartialView(viewName, divClass = null) {
    $.ajax({
        url: 'Views/Modules' + viewName + '.html',
        method: 'GET',
        success: function(data) {
            $(divClass).html(data);
        },
        error: function(xhr, status, error) {
            console.error('Error al cargar la vista parcial:', error)
        }
    });
}

function onDeviceReady() {
    // Cordova is now initialized. Have fun!

    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
    document.getElementById('deviceready').classList.add('ready');
}

function saveLocalStorageValue(name, value) {
    // Para almacenar utilizaremos el método "setItem"
    // pasándole como parámetros la clave y el valor a almacenar:
    window.localStorage.setItem(name, value);
    return console.log(name + " guardado exitosamente.")
}

function getLocalStorageValue(name) {
    //Para recuperar un valor utilizamos el método "getItem"
    //pasándole como parámetro la clave del valor deseado:
    return window.localStorage.getItem(name);
}

function removeLocalStorageValue(name) {
    // Y para borrar el método removeItem y la clave:
    window.localStorage.removeItem(name);
    return console.log(name + " eliminado exitosamente.")
}
