describe('tester api', () => {
    it('scenario 1', () => {
        cy.request('https://api.openweathermap.org/data/2.5/weather?q=sfax&appid=APP_ID&units=metric').as('touta');
        cy.get('@touta').then(todos => {
            expect(todos.status).to.eq(200);
            assert.isObject(todos.body, 'Todos Response is an object')
            expect(todos.body).to.include({"name": "Sfax"});
            expect(todos.body.sys).to.include({"country": "TN"});
            expect(todos.body.main.temp_min).to.exist
            expect(todos.body.main.temp_max).to.exist
        });
    })

    it('appeler la meteo sans q', () => {
        cy.request({failOnStatusCode: false , url:'https://api.openweathermap.org/data/2.5/weather?appid=APP_ID&units=metric'}).as('touta');
        cy.get('@touta').then(todos => {
            expect(todos.status).to.eq(400);
            assert.isObject(todos.body, 'Todos Response is an object')
            expect(todos.body).to.include({"message":"Nothing to geocode"});
        })
    })
})