const mysql = require('../config/mysql');

module.exports = (app) => {
    async function getBrands() {
        let db = await mysql.connect();
        let [brands] = await db.execute(`
           SELECT brand_id, brand_title, brand_slogan, brand_image 
           FROM brands`);
        db.end();
        return brands;
    }

    app.get('/', async (req, res, next)=>{
        let brands = await getBrands();
        let db = await mysql.connect();
        let cars = await db.execute(`
        SELECT
          cars_id
        , cars_title
        , cars_description
        , cars_topspeed
        , cars_price
        , cars_image
        , brand_id
        , brand_title
        , brand_slogan
        , brand_image
        FROM cars
        INNER JOIN brands ON brand_id = cars_brand_fk`)
        db.end();
        res.render('home', {
            title: 'The Carzone',
            'brands': brands,
            'cars': cars[0]
        })
    })
    app.get('/contact', async (req, res, next)=>{
        let brands = await getBrands();
        // let db = await mysql.connect();
        // let cars = await db.execute(`
        // SELECT
        //   cars_id
        // , cars_title
        // , cars_description
        // , cars_topspeed
        // , cars_price
        // , cars_image
        // , brand_id
        // , brand_title
        // , brand_slogan
        // , brand_image
        // FROM cars
        // INNER JOIN brands ON brand_id = cars_brand_fk`)
        // db.end();
        res.render('contact', {
            title: 'The Car Page',
            'brands': brands
            // 'cars': cars[0]
        })
    })
    app.get('/brands', async (req, res, next)=>{
        let brands = await getBrands();
        // let db = await mysql.connect();
        // let cars = await db.execute(`
        // SELECT
        //   cars_id
        // , cars_title
        // , cars_description
        // , cars_topspeed
        // , cars_price
        // , cars_image
        // , brand_id
        // , brand_title
        // , brand_slogan
        // , brand_image
        // FROM cars
        // INNER JOIN brands ON brand_id = cars_brand_fk`)
        // db.end();
        res.render('brands', {
            title: 'The Car Page',
            'brands': brands
            // 'cars': cars[0]
        })
    })
    
    app.get('/cars', async (req, res, next)=>{
        let db = await mysql.connect();
        let [brands] = await db.execute(`SELECT * FROM brands`);
        let [cars] = await db.execute(`
        SELECT
        cars_id
        , cars_title
        , cars_description
        , cars_topspeed
        , cars_price
        , cars_image
        , cars_year
        , cars_weight_kg
        , brand_id
        , brand_title
        , brand_slogan
        , brand_image
        FROM cars
        INNER JOIN brands ON brand_id = cars_brand_fk ORDER BY brand_title ASC`)
        db.end();
        res.render('cars', {
            title: 'The Carzone',
            'brands': brands,
            'cars': cars
        })
    })

    app.get('/cars/:carid', async (req, res, next)=>{
        let brands = await getBrands();
        let db = await mysql.connect();
        let cars = await db.execute(`
        SELECT
          cars_id
        , cars_title
        , cars_description
        , cars_topspeed
        , cars_price
        , cars_image
        , cars_year
        , cars_weight_kg
        , brand_id
        , brand_title
        , brand_slogan
        , brand_image
        FROM cars
        INNER JOIN brands ON brand_id = cars_brand_fk WHERE brand_id = ?`, [req.params.carid])
        db.end();
        res.render('cars', {
            title: 'The Carzone',
            'brands': brands,
            'cars': cars[0]
        })
    })
       //  tilføjes i routes.js filen f.eks. lige under app.get('/contact') endpoint
    app.post('/', async (req, res, next) => {
       // indsamling af værdierne og oprettelse af de nødvendige variabler.
       //I req.body.name leder den efter name="name" i input feltet
       //Det samme gælder for alle de andre variabler
       let name = req.body.name;
       let email = req.body.email;
       let topic = req.body.topic;
       let message = req.body.message;
       let contactDate = new Date();
    
       // håndter valideringen, alle fejl pushes til et array så de er samlet ET sted
       let return_message = [];
       if (name == undefined || name == '') {
          return_message.push('Navn missing');
       }
       if (email == undefined || email == '') {
          return_message.push('Email missing');
       }
       if (topic == undefined || topic == '') {
          return_message.push('Topic missing');
       }
       if (message == undefined || message == '') {
          return_message.push('Message Text missing');
       }
    
       // dette er et kort eksempel på strukturen, denne udvides selvfølgelig til noget mere brugbart
       // hvis der er 1 eller flere elementer i `return_message`, så mangler der noget
       if (return_message.length > 0) {
          
          // der er mindst 1 information der mangler, returner beskeden som en string.
          let brands = await getBrands();
          let db = await mysql.connect();
          let cars = await db.execute(`
          SELECT
            cars_id
          , cars_title
          , cars_description
          , cars_topspeed
          , cars_price
          , cars_image
          , brand_id
          , brand_title
          , brand_slogan
          , brand_image
          FROM cars
          INNER JOIN brands ON brand_id = cars_brand_fk`)
          db.end();
          res.render('home', {
             'brands': brands,
             //Join gør at den sætter de forskellige felter sammen med mellemrum, hvis
             //felterne er tomme. I det her tilfælde bliver det joined i et tomt array
             //som hedder return_message, som er defineret lidt længere oppe
             'return_message': return_message.join(', '),
             'values': req.body, // læg mærke til vi "bare" sender req.body tilbage
             'cars': cars[0], 
             title: "The Carzone"
          });
          
       } else {
          // send det modtagede data tilbage, så vi kan se det er korrekt
          let db = await mysql.connect();
          let result = await db.execute(`
          INSERT INTO messages 
          (message_name, message_email, message_subject, message_text, message_date) 
          VALUES 
          (?,?,?,?,?)`, [name, email, topic, message, contactDate]);
          // affected rows er større end nul, hvis en (eller flere) række(r) blev indsat
          if (result[0].affectedRows > 0) {
             return_message.push('Tak for din besked, vi vender tilbage hurtigst muligt');
          } else {
             return_message.push('Din besked blev ikke modtaget.... ');
          }
          let brands = await getBrands();
          let cars = await db.execute(`
          SELECT
            cars_id
          , cars_title
          , cars_description
          , cars_topspeed
          , cars_price
          , cars_image
          , brand_id
          , brand_title
          , brand_slogan
          , brand_image
          FROM cars
          INNER JOIN brands ON brand_id = cars_brand_fk`)
          db.end();
          res.render('home', {
             'brands': brands,
             'cars': cars[0],
             'return_message': return_message.join(', '),
             // 'values': req.body, // læg mærke til vi "bare" sender req.body tilbage
             title: "The Carzone"
          });
       }
    });
};