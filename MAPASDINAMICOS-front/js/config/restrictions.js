/**
 * Define las restricciones de acceso para cada uno de los usuarios
 * @returns {Object} regresa un objeto que en base a el rol define una restricción de acceso
 */
define([], function(){
        return {

            roles:{
                r1:{
                        label:'Administrador',
                        admonUsers:{
                                exclude :[1]
                        }
                        
                },
                r2:{
                        label:'Coordinador de Gabinete SIAP',
                        admonUsers:{
                                exclude:[1,6]
                        },
                        createTeamWorks:true
                },
                r3:{
                        label:'Coordinador Estatal'
                        
                },
                r4:{
                        label:'Supervisor'
                       
                },
                r5:{
                        label:'Brigadista',
                        maxCharge:30
                       
                },
                r6:{
                        label:'Ejecutivo'
                       
                }
                
            },
            states:{
                e01:{label:"Aguascalientes",alias:'Ags.',active:true},
                e02:{label:"Baja California",alias:'B.C.',active:true},
                e03:{label:"Baja California Sur",alias:'B.C.S.',active:true},
                e04:{label:"Campeche",alias:'Camp.',active:true},
                e05:{label:"Chiapas",alias:'Chis.',active:true},
                e06:{label:"Chihuahua",alias:'Chih.',active:true},
                e07:{label:"Coahuila",alias:'Coah.',active:true},
                e08:{label:"Colima",alias:'Col',active:true},
                e09:{label:"Distrito Federal",alias:'D.F.',active:true},
                e10:{label:"Durango",alias:'Dgo.',active:true},
                e11:{label:"Guanajuato",alias:'Gto.',active:true},
                e12:{label:"Guerrero",alias:'Gro.',active:true},
                e13:{label:"Hidalgo",alias:'Hgo.',active:true},
                e14:{label:"Jalisco",alias:'Jal.',active:true},
                e15:{label:"M&eacute;xico",alias:'M&eacute;x.',active:true},
                e16:{label:"Michoac&aacute;n",alias:'Mich.',active:true},
                e17:{label:"Morelos",alias:'Mor.',active:true},
                e18:{label:"Nayarit",alias:'Nay.',active:true},
                e19:{label:"Nuevo Le&oacute;n",alias:'N.L.',active:true},
                e20:{label:"Oaxaca",alias:'Oax.',active:true},
                e21:{label:"Puebla",alias:'Pue.',active:true},
                e22:{label:"Quer&eacute;taro",alias:'Qro.',active:true},
                e23:{label:"Quintana Roo",alias:'Q.R.',active:true},
                e24:{label:"San Luis Potos&iacute;",alias:'S.L.P.',active:true},
                e25:{label:"Sinaloa",alias:'Sin.',active:true},
                e26:{label:"Sonora",alias:'Son.',active:true},
                e27:{label:"Tabasco",alias:'Tab.',active:true},
                e28:{label:"Tamaulipas",alias:'Tams.',active:true},
                e29:{label:"Tlaxcala",alias:'Tlax.',active:true},
                e30:{label:"Veracruz",alias:'Ver.',active:true},
                e31:{label:"Yucat&aacute;n",alias:'Yuc.',active:true},
                e32:{label:"Zacatecas",alias:'Zac.',active:true}
            }
        }
});