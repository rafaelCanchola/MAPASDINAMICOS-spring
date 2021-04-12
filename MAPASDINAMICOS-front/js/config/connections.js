/**
 * Definici�n de rutas de conexion
 * @returns {Object} regresa un objeto con cada uno de los modulos de conexion que empleara el sistema
 */
define([], function () {
    return {
        years: {
            getAll: {
                url: 'http://localhost:8080/api/years?',
                type: 'GET',
                dataType: 'json',
                contentType: 'application/json'
            },
            get: {
                url: 'http://localhost:8080/api/Years?',
                type: 'GET',
                dataType: 'json',
                contentType: 'application/json'
            },
            add: {
                url: 'http://localhost:8080/api/Years?',
                type: 'POST',
                dataType: 'json',
                contentType: 'application/x-www-form-urlencoded'
            },
            edit: {
                url: 'http://localhost:8080/api/Years?',
                type: 'POST',
                dataType: 'json',
                contentType: 'application/x-www-form-urlencoded'
            },
            remove: {
                url: 'http://localhost:8080/api/ActionYear?',
                type: 'POST',
                dataType: 'json',
                contentType: 'application/x-www-form-urlencoded'
            },
            consult: {
                url: 'http://localhost:8080/api/Years?',
                type: 'POST',
                dataType: 'json',
                contentType: 'application/json'
            },
            upload: {
                url: 'http://localhost:8080/api/uploadcharge?',
                type: 'POST',
                dataType: 'raw',
                contentType: 'application/json'
            },
            download: {
                url: 'http://localhost:8080/api/DownloadChargeYear?',
                type: 'POST',
                dataType: 'json',
                contentType: 'application/x-www-form-urlencoded'
            },
            deleteCharge: {
                url: 'http://localhost:8080/api/DeleteChargeYear?',
                type: 'POST',
                dataType: 'json',
                contentType: 'application/json'
            }
        },
        zones: {
            get: {
                url: 'http://localhost:8080/api/ZonesValidated?',
                type: 'GET',
                dataType: 'json',
                contentType: 'application/json'
            },
            remove: {
                url: 'http://localhost:8080/api/Zones?',
                type: 'POST',
                dataType: 'json',
                contentType: 'application/x-www-form-urlencoded'
            }
        },
        polygons: {
            get: {
                url: 'http://localhost:8080/api/PolygonsDelivered?',
                type: 'GET',
                dataType: 'json',
                contentType: 'application/json'
            },
            remove: {
                url: 'http://localhost:8080/api/PolygonsDelivered?',
                type: 'POST',
                dataType: 'json',
                contentType: 'application/x-www-form-urlencoded'
            },
            download: {
                getSeed: {
                    url: 'http://localhost:8080/api/FilePolygon?',
                    type: 'POST',
                    dataType: 'json'
                },
                url: {
                    url: 'http://localhost:8080/api/DownloadPolygons?',
                    type: 'POST',
                    dataType: 'json'
                }
            }
        },
        users: {
            login: {
                url: 'http://localhost:8080/api/login',
                type: 'POST',
                dataType: 'json',
                contentType: 'application/json'//,
                        //xhrFields:{withCredentials: true},
                        //crossDomain:true
            },
            logout: {
                url: 'http://localhost:8080/api/logout',
                type: 'GET',
                dataType: 'json',
                contentType: 'application/json'
            },
            add: {
                url: 'http://localhost:8080/api/users',
                type: 'POST',
                dataType: 'json',
                contentType: 'application/json'
            },
            edit: {
                url: 'http://localhost:8080/api/UsersEdit',
                type: 'POST',
                dataType: 'json',
                contentType: 'application/json'
            },
            del: {
                url: 'http://localhost:8080/api/Users',
                type: 'GET',
                dataType: 'json',
                contentType: 'application/json'
            },
            search: {
                url: 'http://localhost:8080/api/Users',
                type: 'POST',
                dataType: 'json',
                contentType: 'application/x-www-form-urlencoded'
            }
        },
        workTeams: {

            getNodes: {
                url: 'http://localhost:8080/api/users/dependants',
                type: 'GET',
                dataType: 'json',
                contentType: 'application/json'

            },
            actions: {
                url: 'http://localhost:8080/api/Users?',
                type: 'GET',
                dataType: 'json',
                contentType: 'application/json'
            }
        },
        actions: {
            set: {
                url: 'http://localhost:8080/api/Actions?',
                type: 'GET',
                dataType: 'json',
                contentType: 'application/json'
            },
            get: {
                url: 'http://localhost:8080/api/Actions?',
                type: 'GET',
                dataType: 'json',
                contentType: 'application/json'
            }

        },
        assignCharge: {
            getList: {
                url: 'http://localhost:8080/api/AssignCharge?',
                type: 'POST',
                dataType: 'json',
                contentType: 'application/x-www-form-urlencoded'
            },
            setList: {

                url: 'http://localhost:8080/api/AssignCharge?',
                type: 'POST',
                dataType: 'json',
                contentType: 'application/json'
            },
            autocomplete: {
                url: 'http://localhost:8080/api/Places?',
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
                url: 'http://localhost:8080/api/AssignCharge?',
                type: 'GET',
                dataType: 'json',
                contentType: 'application/json'
            },
            getDelivered: {
                url: 'http://localhost:8080/api/AssignCharge?',
                type: 'GET',
                dataType: 'json',
                contentType: 'application/json'
            },
            getValidated: {
                url: 'http://localhost:8080/api/AssignCharge?',
                type: 'GET',
                dataType: 'json',
                contentType: 'application/json'
            }
        },
        validateCharge: {
            get: {
                url: 'http://localhost:8080/api/ValidateCharge?',
                type: 'GET',
                dataType: 'json',
                contentType: 'application/json'
            },
            set: {
                url: 'http://localhost:8080/api/ValidateCharge?',
                type: 'POST',
                dataType: 'json',
                contentType: 'application/json'
            }
        },
        charge: {
            upload: {
                url: 'http://localhost:8080/api/UploadCharge?',
                type: 'GET',
                dataType: 'json',
                contentType: 'application/json'
            },
            download: {
                url: 'http://localhost:8080/api/DownloadCharge?',
                type: 'GET',
                dataType: 'json',
                contentType: 'application/json'
            }
        },
        features: {
            getPredios: {
                url: 'http://localhost:8080/api/predios?',
                type: 'GET',
                dataType: 'json'
            },
            getPolygons: {
                url: 'http://localhost:8080/api/Polygons?',
                type: 'POST',
                dataType: 'json',
                contentType: 'application/x-www-form-urlencoded'
            },
        },
        identify: {
            getPredio: {
                url: 'http://187.191.53.158:8080/api/predioidentify?',
                type: 'GET',
                dataType: 'json',
                contentType: 'application/json'
            },
            getPolygon: {
                url: 'http://localhost:8080/api/Polygons?',
                type: 'GET',
                dataType: 'json',
                contentType: 'application/json'
            }
        },
        search: {
            event: {
                url: 'http://localhost:8080/api/Predios?',
                type: 'POST',
                dataType: 'json',
            }
        },
        notification: {
            event: {
                url: 'http://localhost:8080/api/Actions?',
                type: 'GET',
                dataType: 'json',
                contentType: 'application/json'
            }
        },
        graph: {
            bottom: {
                url: 'http://localhost:8080/api/Report?',
                type: 'GET',
                dataType: 'json',
                contentType: 'application/json'
            }
        },
        progress: {
            data: {
                url: 'http://localhost:8080/api/Graph?',
                type: 'GET',
                dataType: 'json',
                contentType: 'application/json;charset=UTF-8'
            },
            customGraph: {
                url: 'http://localhost:8080/api/GraphDinamic?',
                type: 'GET',
                dataType: 'json'

            },
            customGraphResult: {
                url: 'http://localhost:8080/api/CustomGraphDinamic?',
                type: 'POST',
                dataType: 'json'
            },
            customTables: {
                url: 'http://localhost:8080/api/TableDinamic?',
                type: 'GET',
                dataType: 'json'

            },
            customTablesResult: {
                url: 'http://localhost:8080/api/CustomTableDinamic?',
                type: 'POST',
                dataType: 'json'
            },
            actionLine: {
                url: 'http://localhost:8080/api/GraphLineDelivered?',
                type: 'GET',
                dataType: 'json',
                contentType: 'application/json;charset=UTF-8'
            },
            actionLine2: {
                url: 'http://localhost:8080/api/GraphLineStatus?',
                type: 'GET',
                dataType: 'json',
                contentType: 'application/json;charset=UTF-8'
            },
            brigadist: {
                url: 'http://localhost:8080/api/GraphBrigadista?',
                type: 'GET',
                dataType: 'json',
                contentType: 'application/json;charset=UTF-8'
            }
        },
        image: {
            getImage: {
                url: 'http://localhost:8080/api/Photos?',
                type: 'GET',
                dataType: 'json'
            }
        },
        tracklog: {
            getTracklog: {
                url: 'http://localhost:8080/api/Tracks?',
                type: 'GET',
                dataType: 'json'
            }
        },
        reports: {
            getFields: {
                url: 'http://localhost:8080/api/Table?',
                type: 'POST',
                dataType: 'json'
            },
            getReport: {
                url: 'http://localhost:8080/api/Table?',
                type: 'POST',
                dataType: 'json'
            },
            getGraph: {
                url: 'http://localhost:8080/api/Graph?',
                type: 'POST',
                dataType: 'json'
            },
            getSeed: {
                url: 'http://localhost:8080/api/CSV?',
                type: 'POST',
                dataType: 'json'
            },
            downloadCvs: {
                url: 'http://localhost:8080/api/DownloadCSV?',
                type: 'POST',
                dataType: 'json'
            },
            getSeedPdf: {
                url: 'http://localhost:8080/api/CSV?',
                type: 'POST',
                dataType: 'json'
            },
            downloadPdf: {
                url: 'http://localhost:8080/api/DownloadPDF?',
                type: 'POST',
                dataType: 'json'
            }
        },
        reportsQuestionnaire: {
            getFields: {
                url: 'http://localhost:8080/api/TableQuestionnaire?',
                type: 'POST',
                dataType: 'json'
            },
            getReport: {
                url: 'http://localhost:8080/api/TableQuestionnaire?',
                type: 'POST',
                dataType: 'json'
            },
            getGraph: {
                url: 'http://localhost:8080/api/Graph?',
                type: 'POST',
                dataType: 'json'
            },
            getSeed: {
                url: 'http://localhost:8080/api/CSV?',
                type: 'POST',
                dataType: 'json'
            },
            downloadCvs: {
                url: 'http://localhost:8080/api/DownloadCSV?',
                type: 'POST',
                dataType: 'json'
            },
            getSeedPdf: {
                url: 'http://localhost:8080/api/CSV?',
                type: 'POST',
                dataType: 'json'
            },
            downloadPdf: {
                url: 'http://localhost:8080/api/DownloadPDF?',
                type: 'POST',
                dataType: 'json'
            }
        },
        reportsUniverse: {
            getFields: {
                url: 'http://localhost:8080/api/TableUniverse?',
                type: 'POST',
                dataType: 'json'
            },
            getReport: {
                url: 'http://localhost:8080/api/TableUniverse?',
                type: 'POST',
                dataType: 'json'
            },
            getGraph: {
                url: 'http://localhost:8080/api/Graph?',
                type: 'POST',
                dataType: 'json'
            },
            getSeed: {
                url: 'http://localhost:8080/api/CSV?',
                type: 'POST',
                dataType: 'json'
            },
            downloadCvs: {
                url: 'http://localhost:8080/api/DownloadCSV?',
                type: 'POST',
                dataType: 'json'
            },
            getSeedPdf: {
                url: 'http://localhost:8080/api/CSV?',
                type: 'POST',
                dataType: 'json'
            },
            downloadPdf: {
                url: 'http://localhost:8080/api/DownloadPDF?',
                type: 'POST',
                dataType: 'json'
            },
            getImages: {
                url: 'http://localhost:8080/api/DocsUniverse?',
                type: 'POST',
                dataType: 'json'
            }
        },
        folios: {
            replace: {
                url: 'http://localhost:8080/api/ReplacePredio?',
                type: 'POST',
                dataType: 'json'
            },
        },
        questionnaire: {
            get: {
                url: 'http://localhost:8080/api/Questionnaire?',
                type: 'POST',
                dataType: 'json'
            },
            save: {
                url: 'http://localhost:8080/api/Questionnaire?',
                type: 'POST',
                dataType: 'json'
            },
            set: {
                url: 'http://localhost:8080/api/Questionnaire?',
                type: 'POST',
                dataType: 'json'
            },
            getSub: {
                url: 'http://localhost:8080/api/SubQuestionnaire?',
                type: 'POST',
                dataType: 'json'
            }
        }
    }
});