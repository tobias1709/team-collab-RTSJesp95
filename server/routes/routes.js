const mysql = require('../config/mysql')
const date = require('date-and-time');

async function getCategories() {
   let db = await mysql.connect();
   let [categories] = await db.execute(`
      SELECT category_id, category_title 
      FROM categories`);
   db.end();
   return categories;
}

async function getTags(){
   let db = await mysql.connect();
   let [tags] = await db.execute(`
   SELECT
       fk_id
     , fk_blog_id
     , fk_tag_id 
     , blog_id
     , blog_title
     , tag_id
     , tag_name
   FROM fk_table
   INNER JOIN blog_posts ON blog_id = fk_blog_id
   INNER JOIN tags ON tag_id = fk_tag_id`)
   db.end();
   return tags;
}

module.exports = (app) => {
   app.get('/', async (req, res, next) => {
      let categories = await getCategories();
      let db = await mysql.connect();
      let blogPosts = await db.execute(`
      SELECT
           category_id
         , category_title
         , blog_id
         , blog_title
         , blog_text
         , blog_postdate
         , author_id
         , author_name
         , tags_category_id
         , tags_category_titles
         , tag_genre_id
         , tag_genre_names
      FROM blog_posts 
      INNER JOIN categories ON category_id = fk_category_id
      INNER JOIN authors ON author_id = fk_author_id
      INNER JOIN tags_categories ON tags_category_id = fk_tag_category_id
      INNER JOIN tags_genres on tag_genre_id = fk_tag_genre_id
      ORDER BY blog_postdate DESC LIMIT 3 `);
      db.end();
      res.render('home', {
         title: "The Blog Site",
         'categories': categories,
         'blogPosts': blogPosts[0]
      });
   });

   // /category/:category_id
   app.get('/category/:category_id', async (req, res, next) =>{
      let categories = await getCategories();
      let db = await mysql.connect();
      let blogPosts = await db.execute(`
      SELECT
           category_id
         , category_title
         , blog_id
         , blog_title
         , blog_text
         , blog_postdate
         , author_id
         , author_name
         , tags_category_id
         , tags_category_titles
         , tag_genre_id
         , tag_genre_names
      FROM blog_posts 
      INNER JOIN categories ON category_id = fk_category_id
      INNER JOIN authors ON author_id = fk_author_id
      INNER JOIN tags_categories ON tags_category_id = fk_tag_category_id
      INNER JOIN tags_genres on tag_genre_id = fk_tag_genre_id
      WHERE fk_category_id = ? ORDER BY blog_postdate DESC`, [req.params.category_id]);
      db.end();
      res.render('singleCategory',{
         title: "The Blog Site",
         'categories': categories,
         'blogPosts': blogPosts[0]
      })
   })

   app.get('/admin/edit', async (req, res, next)=>{
      let categories = await getCategories();
      let db = await mysql.connect();
      let allBlogPosts = await db.execute(`
      SELECT
           category_id
         , category_title
         , blog_id
         , blog_title
         , blog_text
         , blog_postdate
         , author_id
         , author_name
         , tags_category_id
         , tags_category_titles
         , tag_genre_id
         , tag_genre_names
      FROM blog_posts 
      INNER JOIN categories ON category_id = fk_category_id
      INNER JOIN authors ON author_id = fk_author_id
      INNER JOIN tags_categories ON tags_category_id = fk_tag_category_id
      INNER JOIN tags_genres on tag_genre_id = fk_tag_genre_id`);
      db.end();
      res.render('edit', {
         title: "The Blog Site",
         'categories': categories,
         'allBlogPosts': allBlogPosts[0]
      })
   })

   app.get('/search/:term', async (req, res, next)=>{
      let categories = await getCategories();
      let db = await mysql.connect();
      let [searchSQL] = await db.execute(`SELECT
            category_id
          , category_title
          , blog_id
          , blog_title
          , blog_text
          , blog_postdate
          , author_id
          , author_name
          , tags_category_id
          , tags_category_titles
          , tag_genre_id
          , tag_genre_names
      FROM blog_posts 
      INNER JOIN categories ON category_id = fk_category_id
      INNER JOIN authors ON author_id = fk_author_id
      INNER JOIN tags_categories ON tags_category_id = fk_tag_category_id
      INNER JOIN tags_genres on tag_genre_id = fk_tag_genre_id
      WHERE blog_posts.blog_title LIKE ? 
      OR blog_posts.blog_text LIKE ?
      OR tags_categories.tags_category_titles LIKE ?
      OR tags_genres.tag_genre_names LIKE ?
      ORDER BY blog_postdate DESC`, [`%${req.params.term}%`, `%${req.params.term}%`, `%${req.params.term}%`, `%${req.params.term}%`]);
      db.end();
      res.render('search', {
         title: "Search Results",
         'categories': categories,
         'blogPosts': searchSQL
      })
   })

   app.get('/test', async (req, res, next) =>{
      let categories = await getCategories();
      let db = await mysql.connect();
      let [blogPosts] = await db.execute(`
      SELECT
           category_id
         , category_title
         , blog_id
         , blog_title
         , blog_text
         , blog_postdate
         , author_id
         , author_name
      FROM blog_posts 
      INNER JOIN categories ON category_id = fk_category_id
      INNER JOIN authors ON author_id = fk_author_id
      ORDER BY blog_postdate DESC LIMIT 1 `);
      let [tags] = await db.execute(`
      SELECT
        tag_id
        , tag_name
        , fk_id
        , fk_blog_id
        FROM fk_table
        INNER JOIN tags ON tag_id = fk_tag_id`);
      for (let i = 0; i < blogPosts.length; i++) {
         blogPosts[i].tags = [];
         for (let j = 0; j < tags.length; j++) {
            if(tags[j].fk_blog_id == blogPosts[i].blog_id){
               blogPosts[i].tags.push(tags[j]);
            }
         }   
      }
      // console.log(blogPosts[0].tags[0]);
      db.end();
      res.render('test', {
         title: "Test",
         'categori': categories,
         'blogPosts': blogPosts,
         'tags': tags
      })
   })

   //Commented code

   // async function getLatestPosts(){
//    let db = await mysql.connect();
//    let [latestPosts] = await db.execute(`
//    SELECT 
//         category_id
//       , category_title
//       , blog_id
//       , blog_title
//       , blog_postdate
//    FROM categories 
//    LEFT OUTER JOIN blog_posts ON fk_category_id = category_id
//    WHERE blog_id = (
//          SELECT blog_id 
//          FROM blog_posts 
//          WHERE fk_category_id = category_id  
//          ORDER BY blog_postdate DESC LIMIT 1)
//    ORDER BY blog_postdate DESC`);
//    db.end();
//    return latestPosts;
// }

   // async function getAuthors(){
//    let db = await mysql.connect();
//    let [authors] = await db.execute(`
//    SELECT * FROM authors`);
//    db.end();
//    return authors;
// }
};