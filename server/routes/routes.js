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
            'cars': cars[0],
            page: req.params.carid
        })
    })
};