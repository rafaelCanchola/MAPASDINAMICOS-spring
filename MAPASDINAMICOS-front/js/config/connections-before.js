/**
 * Definici�n de rutas de conexion
 * @returns {Object} regresa un objeto con cada uno de los modulos de conexion que empleara el sistema
 */
define([], function () {
    return {
        years: {
            getAll: {
                url: 'http://187.191.53.158:8080/ServiceMapasDinamicos/Years?',
                type: 'GET',
                dataType: 'json',
                contentType: 'application/json'
            },
            get: {
                url: 'http://187.191.53.158:8080/ServiceMapasDinamicos/Years?',
                type: 'GET',
                dataType: 'json',
                contentType: 'application/json'
            },
            add: {
                url: 'http://187.191.53.158:8080/ServiceMapasDinamicos/Years?',
                type: 'POST',
                dataType: 'json',
                contentType: 'application/x-www-form-urlencoded'
            },
            edit: {
                url: 'http://187.191.53.158:8080/ServiceMapasDinamicos/Years?',
                type: 'POST',
                dataType: 'json',
                contentType: 'application/x-www-form-urlencoded'
            },
            remove: {
                url: 'http://187.191.53.158:8080/ServiceMapasDinamicos/ActionYear?',
                type: 'POST',
                dataType: 'json',
                contentType: 'application/x-www-form-urlencoded'
            },
            consult: {
                url: 'http://187.191.53.158:8080/ServiceMapasDinamicos/Years?',
                type: 'POST',
                dataType: 'json',
                contentType: 'application/json'
            },
            upload: {
                url: 'http://187.191.53.158:8080/ServiceMapasDinamicos/UploadChargeYear?',
                type: 'POST',
                dataType: 'json',
                contentType: 'application/json'
            },
            download: {
                url: 'http://187.191.53.158:8080/ServiceMapasDinamicos/DownloadChargeYear?',
                type: 'POST',
                dataType: 'json',
                contentType: 'application/x-www-form-urlencoded'
            },
            deleteCharge: {
                url: 'http://187.191.53.158:8080/ServiceMapasDinamicos/DeleteChargeYear?',
                type: 'POST',
                dataType: 'json',
                contentType: 'application/json'
            }
        },
        zones: {
            get: {
                url: 'http://187.191.53.158:8080/ServiceMapasDinamicos/ZonesValidated?',
                type: 'GET',
                dataType: 'json',
                contentType: 'application/json'
            },
            remove: {
                url: 'http://187.191.53.158:8080/ServiceMapasDinamicos/Zones?',
                type: 'POST',
                dataType: 'json',
                contentType: 'application/x-www-form-urlencoded'
            }
        },
        polygons: {
            get: {
                url: 'http://187.191.53.158:8080/ServiceMapasDinamicos/PolygonsDelivered?',
                type: 'GET',
                dataType: 'json',
                contentType: 'application/json'
            },
            remove: {
                url: 'http://187.191.53.158:8080/ServiceMapasDinamicos/PolygonsDelivered?',
                type: 'POST',
                dataType: 'json',
                contentType: 'application/x-www-form-urlencoded'
            },
            download: {
                getSeed: {
                    url: 'http://187.191.53.158:8080/ServiceMapasDinamicos/FilePolygon?',
                    type: 'POST',
                    dataType: 'json'
                },
                url: {
                    url: 'http://187.191.53.158:8080/ServiceMapasDinamicos/DownloadPolygons?',
                    type: 'POST',
                    dataType: 'json'
                }
            }
        },
        users: {
            login: {
                url: 'http://187.191.53.158:8080/ServiceMapasDinamicos/login',
                type: 'POST',
                dataType: 'json',
                contentType: 'application/json'//,
                        //xhrFields:{withCredentials: true},
                        //crossDomain:true
            },
            logout: {
                url: 'http://187.191.53.158:8080/ServiceMapasDinamicos/logout',
                type: 'GET',
                dataType: 'json',
                contentType: 'application/json'
            },
            add: {
                url: 'http://187.191.53.158:8080/ServiceMapasDinamicos/users',
                type: 'POST',
                dataType: 'json',
                contentType: 'application/json'
            },
            edit: {
                url: 'http://187.191.53.158:8080/ServiceMapasDinamicos/UsersEdit',
                type: 'POST',
                dataType: 'json',
                contentType: 'application/json'
            },
            del: {
                url: 'http://187.191.53.158:8080/ServiceMapasDinamicos/Users',
                type: 'GET',
                dataType: 'json',
                contentType: 'application/json'
            },
            search: {
                url: 'http://187.191.53.158:8080/ServiceMapasDinamicos/Users',
                type: 'POST',
                dataType: 'json',
                contentType: 'application/x-www-form-urlencoded'
            }
        },
        workTeams: {

            getNodes: {
                url: 'http://187.191.53.158:8080/ServiceMapasDinamicos/users/dependants',
                type: 'GET',
                dataType: 'json',
                contentType: 'application/json'

            },
            actions: {
                url: 'http://187.191.53.158:8080/ServiceMapasDinamicos/Users?',
                type: 'GET',
                dataType: 'json',
                contentType: 'application/json'
            }
        },
        actions: {
            set: {
                url: 'http://187.191.53.158:8080/ServiceMapasDinamicos/Actions?',
                type: 'GET',
                dataType: 'json',
                contentType: 'application/json'
            },
            get: {
                url: 'http://187.191.53.158:8080/ServiceMapasDinamicos/Actions?',
                type: 'GET',
                dataType: 'json',
                contentType: 'application/json'
            }

        },
        assignCharge: {
            getList: {
                url: 'http://187.191.53.158:8080/ServiceMapasDinamicos/AssignCharge?',
                type: 'POST',
                dataType: 'json',
                contentType: 'application/x-www-form-urlencoded'
            },
            setList: {

                url: 'http://187.191.53.158:8080/ServiceMapasDinamicos/AssignCharge?',
                type: 'POST',
                dataType: 'json',
                contentType: 'application/json'
            },
            autocomplete: {
                url: 'http://187.191.53.158:8080/ServiceMapasDinamicos/Places?',
                type: 'GET',
                dataType: 'json',
                contentType: 'application/json'
            },
            getFieldsToFilter: {
                url: 'data/dataFilter.do',
                type: 'GET',
                dataType: 'json',
                contentType: 'application/json'
            }
        },
        deliveredCharge: {
            getByDelivering: {
                url: 'http://187.191.53.158:8080/ServiceMapasDinamicos/AssignCharge?',
                type: 'GET',
                dataType: 'json',
                contentType: 'application/json'
            },
            getDelivered: {
                url: 'http://187.191.53.158:8080/ServiceMapasDinamicos/AssignCharge?',
                type: 'GET',
                dataType: 'json',
                contentType: 'application/json'
            },
            getValidated: {
                url: 'http://187.191.53.158:8080/ServiceMapasDinamicos/AssignCharge?',
                type: 'GET',
                dataType: 'json',
                contentType: 'application/json'
            }
        },
        validateCharge: {
            get: {
                url: 'http://187.191.53.158:8080/ServiceMapasDinamicos/ValidateCharge?',
                type: 'GET',
                dataType: 'json',
                contentType: 'application/json'
            },
            set: {
                url: 'http://187.191.53.158:8080/ServiceMapasDinamicos/ValidateCharge?',
                type: 'POST',
                dataType: 'json',
                contentType: 'application/json'
            }
        },
        charge: {
            upload: {
                url: 'http://187.191.53.158:8080/ServiceMapasDinamicos/UploadCharge?',
                type: 'GET',
                dataType: 'json',
                contentType: 'application/json'
            },
            download: {
                url: 'http://187.191.53.158:8080/ServiceMapasDinamicos/DownloadCharge?',
                type: 'GET',
                dataType: 'json',
                contentType: 'application/json'
            }
        },
        features: {
            getPredios: {
                url: 'http://187.191.53.158:8080/ServiceMapasDinamicos/Predios?',
                type: 'POST',
                dataType: 'json',
                contentType: 'application/x-www-form-urlencoded'
            },
            getPolygons: {
                url: 'http://187.191.53.158:8080/ServiceMapasDinamicos/Polygons?',
                type: 'POST',
                dataType: 'json',
                contentType: 'application/x-www-form-urlencoded'
            },
        },
        identify: {
            getPredio: {
                url: 'http://187.191.53.158:8080/ServiceMapasDinamicos/Predios?',
                type: 'GET',
                dataType: 'json',
                contentType: 'application/json'
            },
            getPolygon: {
                url: 'http://187.191.53.158:8080/ServiceMapasDinamicos/Polygons?',
                type: 'GET',
                dataType: 'json',
                contentType: 'application/json'
            }
        },
        search: {
            event: {
                url: 'http://187.191.53.158:8080/ServiceMapasDinamicos/Predios?',
                type: 'POST',
                dataType: 'json',
                contentType: 'application/x-www-form-urlencoded'
            }
        },
        notification: {
            event: {
                url: 'http://187.191.53.158:8080/ServiceMapasDinamicos/Actions?',
                type: 'GET',
                dataType: 'json',
                contentType: 'application/json'
            }
        },
        graph: {
            bottom: {
                url: 'http://187.191.53.158:8080/ServiceMapasDinamicos/Report?',
                type: 'GET',
                dataType: 'json',
                contentType: 'application/json'
            }
        },
        progress: {
            data: {
                url: 'http://187.191.53.158:8080/ServiceMapasDinamicos/Graph?',
                type: 'GET',
                dataType: 'json',
                contentType: 'application/json;charset=UTF-8'
            },
            customGraph: {
                url: 'http://187.191.53.158:8080/ServiceMapasDinamicos/GraphDinamic?',
                type: 'GET',
                dataType: 'json'

            },
            customGraphResult: {
                url: 'http://187.191.53.158:8080/ServiceMapasDinamicos/CustomGraphDinamic?',
                type: 'POST',
                dataType: 'json'
            },
            customTables: {
                url: 'http://187.191.53.158:8080/ServiceMapasDinamicos/TableDinamic?',
                type: 'GET',
                dataType: 'json'

            },
            customTablesResult: {
                url: 'http://187.191.53.158:8080/ServiceMapasDinamicos/CustomTableDinamic?',
                type: 'POST',
                dataType: 'json'
            },
            actionLine: {
                url: 'http://187.191.53.158:8080/ServiceMapasDinamicos/GraphLineDelivered?',
                type: 'GET',
                dataType: 'json',
                contentType: 'application/json;charset=UTF-8'
            },
            actionLine2: {
                url: 'http://187.191.53.158:8080/ServiceMapasDinamicos/GraphLineStatus?',
                type: 'GET',
                dataType: 'json',
                contentType: 'application/json;charset=UTF-8'
            },
            brigadist: {
                url: 'http://187.191.53.158:8080/ServiceMapasDinamicos/GraphBrigadista?',
                type: 'GET',
                dataType: 'json',
                contentType: 'application/json;charset=UTF-8'
            }
        },
        image: {
            getImage: {
                url: 'http://187.191.53.158:8080/ServiceMapasDinamicos/Photos?',
                type: 'GET',
                dataType: 'json'
            }
        },
        tracklog: {
            getTracklog: {
                url: 'http://187.191.53.158:8080/ServiceMapasDinamicos/Tracks?',
                type: 'GET',
                dataType: 'json'
            }
        },
        reports: {
            getFields: {
                url: 'http://187.191.53.158:8080/ServiceMapasDinamicos/Table?',
                type: 'POST',
                dataType: 'json'
            },
            getReport: {
                url: 'http://187.191.53.158:8080/ServiceMapasDinamicos/Table?',
                type: 'POST',
                dataType: 'json'
            },
            getGraph: {
                url: 'http://187.191.53.158:8080/ServiceMapasDinamicos/Graph?',
                type: 'POST',
                dataType: 'json'
            },
            getSeed: {
                url: 'http://187.191.53.158:8080/ServiceMapasDinamicos/CSV?',
                type: 'POST',
                dataType: 'json'
            },
            downloadCvs: {
                url: 'http://187.191.53.158:8080/ServiceMapasDinamicos/DownloadCSV?',
                type: 'POST',
                dataType: 'json'
            },
            getSeedPdf: {
                url: 'http://187.191.53.158:8080/ServiceMapasDinamicos/CSV?',
                type: 'POST',
                dataType: 'json'
            },
            downloadPdf: {
                url: 'http://187.191.53.158:8080/ServiceMapasDinamicos/DownloadPDF?',
                type: 'POST',
                dataType: 'json'
            }
        },
        reportsQuestionnaire: {
            getFields: {
                url: 'http://187.191.53.158:8080/ServiceMapasDinamicos/TableQuestionnaire?',
                type: 'POST',
                dataType: 'json'
            },
            getReport: {
                url: 'http://187.191.53.158:8080/ServiceMapasDinamicos/TableQuestionnaire?',
                type: 'POST',
                dataType: 'json'
            },
            getGraph: {
                url: 'http://187.191.53.158:8080/ServiceMapasDinamicos/Graph?',
                type: 'POST',
                dataType: 'json'
            },
            getSeed: {
                url: 'http://187.191.53.158:8080/ServiceMapasDinamicos/CSV?',
                type: 'POST',
                dataType: 'json'
            },
            downloadCvs: {
                url: 'http://187.191.53.158:8080/ServiceMapasDinamicos/DownloadCSV?',
                type: 'POST',
                dataType: 'json'
            },
            getSeedPdf: {
                url: 'http://187.191.53.158:8080/ServiceMapasDinamicos/CSV?',
                type: 'POST',
                dataType: 'json'
            },
            downloadPdf: {
                url: 'http://187.191.53.158:8080/ServiceMapasDinamicos/DownloadPDF?',
                type: 'POST',
                dataType: 'json'
            }
        },
        reportsUniverse: {
            getFields: {
                url: 'http://187.191.53.158:8080/ServiceMapasDinamicos/TableUniverse?',
                type: 'POST',
                dataType: 'json'
            },
            getReport: {
                url: 'http://187.191.53.158:8080/ServiceMapasDinamicos/TableUniverse?',
                type: 'POST',
                dataType: 'json'
            },
            getGraph: {
                url: 'http://187.191.53.158:8080/ServiceMapasDinamicos/Graph?',
                type: 'POST',
                dataType: 'json'
            },
            getSeed: {
                url: 'http://187.191.53.158:8080/ServiceMapasDinamicos/CSV?',
                type: 'POST',
                dataType: 'json'
            },
            downloadCvs: {
                url: 'http://187.191.53.158:8080/ServiceMapasDinamicos/DownloadCSV?',
                type: 'POST',
                dataType: 'json'
            },
            getSeedPdf: {
                url: 'http://187.191.53.158:8080/ServiceMapasDinamicos/CSV?',
                type: 'POST',
                dataType: 'json'
            },
            downloadPdf: {
                url: 'http://187.191.53.158:8080/ServiceMapasDinamicos/DownloadPDF?',
                type: 'POST',
                dataType: 'json'
            },
            getImages: {
                url: 'http://187.191.53.158:8080/ServiceMapasDinamicos/DocsUniverse?',
                type: 'POST',
                dataType: 'json'
            }
        },
        folios: {
            replace: {
                url: 'http://187.191.53.158:8080/ServiceMapasDinamicos/ReplacePredio?',
                type: 'POST',
                dataType: 'json'
            },
        },
        questionnaire: {
            get: {
                url: 'http://187.191.53.158:8080/ServiceMapasDinamicos/Questionnaire?',
                type: 'POST',
                dataType: 'json'
            },
            save: {
                url: 'http://187.191.53.158:8080/ServiceMapasDinamicos/Questionnaire?',
                type: 'POST',
                dataType: 'json'
            },
            set: {
                url: 'http://187.191.53.158:8080/ServiceMapasDinamicos/Questionnaire?',
                type: 'POST',
                dataType: 'json'
            },
            getSub: {
                url: 'http://187.191.53.158:8080/ServiceMapasDinamicos/SubQuestionnaire?',
                type: 'POST',
                dataType: 'json'
            }
        }
    }
});