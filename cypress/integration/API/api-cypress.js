//Les paramétres obligatoires
describe('Les paramétres obligatoires q et appid', () => {

   it('Tester le nom de la ville q=paris sans les parametres (appid, mode, units, lang)', () => {
        cy.request({failOnStatusCode: false , url:'https://api.openweathermap.org/data/2.5/weather?q=paris'}).as('touta');
        cy.get('@touta').then(todos => {
            expect(todos.status).to.eq(401);
            assert.isObject(todos.body, 'Todos Response is an object')
            expect(todos.body).to.include({"message":"Invalid API key. Please see https://openweathermap.org/faq#error401 for more info."});
        })
    })



    it('Tester lapp_id appid=APP_ID(secret code)  sans les parametres (q, mode, units, lang)', () => {
        cy.request({failOnStatusCode: false , url:'https://api.openweathermap.org/data/2.5/weather?&appid=APP_ID'}).as('touta');
        cy.get('@touta').then(todos => {
            expect(todos.status).to.eq(400);
            assert.isObject(todos.body, 'Todos Response is an object')
            expect(todos.body).to.include({"message":"Nothing to geocode"});
        });
    })


    it('Tester lapp_id appid=APP_ID avec le parametre q=paris', () => {
        cy.request('https://api.openweathermap.org/data/2.5/weather?appid=APP_ID&q=paris').as('touta');
        cy.get('@touta').then(todos => {
            expect(todos.status).to.eq(200);
            assert.isObject(todos.body, 'Todos Response is an object')
            expect(todos.body).to.include({"name": "Paris"});
            expect(todos.body.sys).to.include({"country": "FR"});
            expect(todos.body.main.temp_min).to.exist
            expect(todos.body.main.temp_max).to.exist
        });
    })

    it('Tester lapi sans paramétres (app_id,q, mode, units, lang)', () => {
        cy.request({failOnStatusCode: false , url:'https://api.openweathermap.org/data/2.5/weather?'}).as('touta');
        cy.get('@touta').then(todos => {
            expect(todos.status).to.eq(401);
            assert.isObject(todos.body, 'Todos Response is an object')
            expect(todos.body).to.include({"message":"Invalid API key. Please see https://openweathermap.org/faq#error401 for more info."});
        });
    })

    it('Tester le nom de la ville q=paris avec les parametres :appid=APP_ID(secret code) mode par default units=metric lang=fr', () => {
        cy.request('https://api.openweathermap.org/data/2.5/weather?appid=APP_ID&q=paris&units=metric&mode&lang=fr').as('touta');
        cy.get('@touta').then(todos => {
            expect(todos.status).to.eq(200);
            assert.isObject(todos.body, 'Todos Response is an object')
            expect(todos.body).to.include({"name": "Paris"});
            expect(todos.body.sys).to.include({"country": "FR"});
            expect(todos.body.main.temp_min).to.exist
            expect(todos.body.main.temp_max).to.exist
        });
    })
})

describe('Tester le q lorsque (q=empty string)', () => {

    it('Tester le nom de la ville q=empty string sans les parametres (appid, mode, units, lang)', () => {
         cy.request({failOnStatusCode: false , url:'https://api.openweathermap.org/data/2.5/weather?q='}).as('touta');
         cy.get('@touta').then(todos => {
             expect(todos.status).to.eq(401);
             assert.isObject(todos.body, 'Todos Response is an object')
             expect(todos.body).to.include({"message":"Invalid API key. Please see https://openweathermap.org/faq#error401 for more info."});
         });
     })

    it('Tester  (q=empty string)  avec le parametre lapp_id appid=APP_ID(secret code)', () => {
        cy.request({failOnStatusCode: false , url:'https://api.openweathermap.org/data/2.5/weather?appid=APP_ID&q='}).as('touta');
        cy.get('@touta').then(todos => {
            expect(todos.status).to.eq(400);
            assert.isObject(todos.body, 'Todos Response is an object')
            expect(todos.body).to.include({"message":"Nothing to geocode"});
        });
    })

    it('Tester le nom de la ville q=emty string avec les parametres :appid=APP_ID(secret code) mode par default units=metric  lang=fr', () => {
        cy.request({failOnStatusCode: false , url:'https://api.openweathermap.org/data/2.5/weather?appid=APP_ID&q=&mode=&units=metric&lang=fr'}).as('touta');
        cy.get('@touta').then(todos => {
            expect(todos.status).to.eq(400);
            assert.isObject(todos.body, 'Todos Response is an object')
            expect(todos.body).to.include({"message":"Nothing to geocode"});
        });
    })
 })


 describe('Tester le q lorsque (q=france)', () => {

    it('Tester le nom de la ville q=france sans les parametres (appid, mode, units, lang)', () => {
         cy.request({failOnStatusCode: false , url:'https://api.openweathermap.org/data/2.5/weather?q=france'}).as('touta');
         cy.get('@touta').then(todos => {
             expect(todos.status).to.eq(401);
             assert.isObject(todos.body, 'Todos Response is an object')
             expect(todos.body).to.include({"message":"Invalid API key. Please see https://openweathermap.org/faq#error401 for more info."});
         });
    })

     it('Tester  (q=france)  avec le parametre lapp_id appid=APP_ID(secret code)', () => {
        cy.request({failOnStatusCode: false , url:'https://api.openweathermap.org/data/2.5/weather?appid=APP_ID&q=france'}).as('touta');
        cy.get('@touta').then(todos => {
            expect(todos.status).to.eq(400);
            assert.isObject(todos.body, 'Todos Response is an object')
            expect(todos.body).to.include({"message":"Nothing to geocode"});
        });
    })

    it('Tester le nom de la ville q=france avec les parametres : appid=APP_ID(secret code) mode par default units=metric lang=fr', () => {
        cy.request({failOnStatusCode: false , url:'https://api.openweathermap.org/data/2.5/weather?appid=APP_ID&q=france&mode=&units=metric&lang=fr'}).as('touta');
        cy.get('@touta').then(todos => {
            expect(todos.status).to.eq(400);
            assert.isObject(todos.body, 'Todos Response is an object')
            expect(todos.body).to.include({"message":"Nothing to geocode"});
        });
    })
})


describe('Tester appid lorsque (appid=empty string)', () => {

    it('Tester lapp_id appid=empty string sans les parametres (appid, mode, units, lang)', () => {
         cy.request({failOnStatusCode: false , url:'https://api.openweathermap.org/data/2.5/weather?appid=APP_ID'}).as('touta');
         cy.get('@touta').then(todos => {
             expect(todos.status).to.eq(400);
             assert.isObject(todos.body, 'Todos Response is an object')
             expect(todos.body).to.include({"message":"Nothing to geocode"});
         });
     })

     it('Tester lapp_id appid=empty string avec le parametre (q=paris) ', () => {
        cy.request({failOnStatusCode: false , url:'https://api.openweathermap.org/data/2.5/weather?appid=&q=paris'}).as('touta');
        cy.get('@touta').then(todos => {
            expect(todos.status).to.eq(401);
            assert.isObject(todos.body, 'Todos Response is an object')
            expect(todos.body).to.include({"message":"Invalid API key. Please see https://openweathermap.org/faq#error401 for more info."});
        });
    })

    it('Tester lapp_id appid=empty string avec les parametres : q=paris mode par default units=metric lang=fr', () => {
        cy.request({failOnStatusCode: false , url:'https://api.openweathermap.org/data/2.5/weather?appid=&q=paris&mode=&units=metric&lang=fr'}).as('touta');
        cy.get('@touta').then(todos => {
            expect(todos.status).to.eq(401);
            assert.isObject(todos.body, 'Todos Response is an object')
            expect(todos.body).to.include({"message":"Invalid API key. Please see https://openweathermap.org/faq#error401 for more info."});
        });
    })
})

describe('Tester appid lorsque (appid=string)', () => {
    it('Tester lapp_id appid=123appid sans les parametres (appid, mode, units, lang)', () => {
        cy.request({failOnStatusCode: false , url:'https://api.openweathermap.org/data/2.5/weather?appid=123appid'}).as('touta');
        cy.get('@touta').then(todos => {
            expect(todos.status).to.eq(401);
            assert.isObject(todos.body, 'Todos Response is an object')
            expect(todos.body).to.include({"message":"Invalid API key. Please see https://openweathermap.org/faq#error401 for more info."});
        });
    })

    it('Tester lapp_id appid=123appid avec le parametre (q=paris)', () => {
        cy.request({failOnStatusCode: false , url:'https://api.openweathermap.org/data/2.5/weather?appid=123appid&q=paris'}).as('touta');
        cy.get('@touta').then(todos => {
            expect(todos.status).to.eq(401);
            assert.isObject(todos.body, 'Todos Response is an object')
            expect(todos.body).to.include({"message":"Invalid API key. Please see https://openweathermap.org/faq#error401 for more info."});
        });
    })

    it('Tester lapp_id appid=123appid avec les parametres : q=paris mode par default units=metric lang=fr', () => {
        cy.request({failOnStatusCode: false , url:'https://api.openweathermap.org/data/2.5/weather?appid=123appid&q=paris&mode=&units=metric&lang=fr'}).as('touta');
        cy.get('@touta').then(todos => {
            expect(todos.status).to.eq(401);
            assert.isObject(todos.body, 'Todos Response is an object')
            expect(todos.body).to.include({"message":"Invalid API key. Please see https://openweathermap.org/faq#error401 for more info."});
        });
    })
})

//mode
describe('Tester le format de reponse (mode=empty string) par default json', () => {
    it('Tester le format de reponse (mode=empty string) sans les parametres (q, appid, units, lang)', () => {
        cy.request({failOnStatusCode: false , url:'https://api.openweathermap.org/data/2.5/weather?mode='}).as('touta');
        cy.get('@touta').then(todos => {
            expect(todos.status).to.eq(401);
            assert.isObject(todos.body, 'Todos Response is an object')
            expect(todos.body).to.include({"message":"Invalid API key. Please see https://openweathermap.org/faq#error401 for more info."});
        })
    })

    it('Tester format de reponse (mode=empty string) avec le parametre q=paris', () => {
        cy.request({failOnStatusCode: false , url:'https://api.openweathermap.org/data/2.5/weather?mode=&q=paris'}).as('touta');
        cy.get('@touta').then(todos => {
            expect(todos.status).to.eq(401);
            assert.isObject(todos.body, 'Todos Response is an object')
            expect(todos.body).to.include({"message":"Invalid API key. Please see https://openweathermap.org/faq#error401 for more info."});
        })
    })

    it('Tester format de reponse (mode=empty string) avec le parametre appid=APP_ID(secret code)', () => {
        cy.request({failOnStatusCode: false , url:'https://api.openweathermap.org/data/2.5/weather?appid=APP_ID&mode='}).as('touta');
        cy.get('@touta').then(todos => {
            expect(todos.status).to.eq(400);
            assert.isObject(todos.body, 'Todos Response is an object')
            expect(todos.body).to.include({"message":"Nothing to geocode"});
        })
    })

    it('Tester format de reponse (mode=empty string) avec les parametres: q=paris appid=APP_ID(secret code)', () => {
        cy.request('https://api.openweathermap.org/data/2.5/weather?appid=APP_ID&q=paris&mode=').as('touta');
        cy.get('@touta').then(todos => {
            expect(todos.status).to.eq(200);
            assert.isObject(todos.body, 'Todos Response is an object')
            expect(todos.body).to.include({"name": "Paris"});
            expect(todos.body.sys).to.include({"country": "FR"});
            expect(todos.body.main.temp_min).to.exist
            expect(todos.body.main.temp_max).to.exist
        });
    })
})

describe('Tester le format de reponse (mode=object) par default json', () => {
        it('Tester le format de reponse (mode=object) sans les parametres (q, appid, units, lang)', () => {
            cy.request({failOnStatusCode: false , url:'https://api.openweathermap.org/data/2.5/weather?mode=object'}).as('touta');
            cy.get('@touta').then(todos => {
                expect(todos.status).to.eq(401);
                assert.isObject(todos.body, 'Todos Response is an object')
                expect(todos.body).to.include({"message":"Invalid API key. Please see https://openweathermap.org/faq#error401 for more info."});
            });
        })

        it('Tester format de reponse (mode=object) avec le parametre q=paris', () => {
            cy.request({failOnStatusCode: false , url:'https://api.openweathermap.org/data/2.5/weather?mode=object&q=paris'}).as('touta');
            cy.get('@touta').then(todos => {
                expect(todos.status).to.eq(401);
                assert.isObject(todos.body, 'Todos Response is an object')
                expect(todos.body).to.include({"message":"Invalid API key. Please see https://openweathermap.org/faq#error401 for more info."});
            });
        })

        it('Tester format de reponse (mode=object) avec le parametre appid=APP_ID(secret code)', () => {
            cy.request({failOnStatusCode: false , url:'https://api.openweathermap.org/data/2.5/weather?mode=object&appid=APP_ID'}).as('touta');
            cy.get('@touta').then(todos => {
                expect(todos.status).to.eq(400);
                assert.isObject(todos.body, 'Todos Response is an object')
                expect(todos.body).to.include({"message":"Nothing to geocode"});
            });
        })

        it('Tester format de reponse (mode=object) avec les parametres: q=paris appid=APP_ID(secret code)', () => {
            cy.request('https://api.openweathermap.org/data/2.5/weather?mode=object&appid=APP_ID&q=paris').as('touta');
            cy.get('@touta').then(todos => {
                expect(todos.status).to.eq(200);
                assert.isObject(todos.body, 'Todos Response is an object')
                expect(todos.body).to.include({"name": "Paris"});
                expect(todos.body.sys).to.include({"country": "FR"});
                expect(todos.body.main.temp_min).to.exist
                expect(todos.body.main.temp_max).to.exist
            });
        })
})        
describe('Tester le format de reponse (mode=xml)', () => {
        it('Tester le format de reponse (mode=xml) sans les parametres (q, appid, units, lang)', () => {
            cy.request({failOnStatusCode: false , url:'https://api.openweathermap.org/data/2.5/weather?mode=xml'}).as('touta');
            cy.get('@touta').then(todos => {
                expect(todos.status).to.eq(401);
                assert.isObject(todos.body, 'Todos Response is an object')
                expect(todos.body).to.include({"message":"Invalid API key. Please see https://openweathermap.org/faq#error401 for more info."});
            });
        })

        it('Tester le format de reponse (mode=xml) en xml avec le parametres (q=paris)', () => {
            cy.request({failOnStatusCode: false , url:'https://api.openweathermap.org/data/2.5/weather?mode=xml&q=paris'}).as('touta');
            cy.get('@touta').then(todos => {
                expect(todos.status).to.eq(401);
                assert.isObject(todos.body, 'Todos Response is an object')
                expect(todos.body).to.include({"message":"Invalid API key. Please see https://openweathermap.org/faq#error401 for more info."});
            });
        })
        
        it('Tester le format de reponse (mode=xml) en xml avec le parametre appid=APP_ID(secret code)', () => {
            cy.request({failOnStatusCode: false , url:'https://api.openweathermap.org/data/2.5/weather?appid=APP_ID&mode=xml'}).as('touta');
            cy.get('@touta').then(todos => {
                expect(todos.status).to.eq(400);
                assert.isString(todos.body, 'Todos Response is an text/xml')
                expect(todos.headers['content-type']).to.contain('application/xml')
                cy.wrap(Cypress.$(todos.body))
    .then(xml => xml.filter('ClientError').find('message').text())
    .should('eq', 'Nothing to geocode')   
            });
        })
  })