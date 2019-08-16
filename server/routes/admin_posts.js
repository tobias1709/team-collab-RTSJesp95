const mysql = require("../config/mysql");

async function getBlogPosts() {
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
   return blogPosts;
}

module.exports = app => {
   app.get("/admin/posts", async (req, res, next) =>{
      let allBlogInfo = await getBlogPosts();
      res.render('admin_posts', {
         'allBlogInfo': allBlogInfo
      })
   })

   app.post("/admin/posts", async (req, res, next) => {
      // her skal vi modtage form data og indsætte det i databasen
      // send bruger tilbage til kategori admin listen
      // indsamling af værdierne og oprettelse af de nødvendige variabler.
      let name = req.body.blog_title;
      let text = req.body.blog_text;
      let category = req.body.blog_category
      let authors = req.body.blog_author
   
      // håndter valideringen, alle fejl pushes til et array så de er samlet ET sted
      let return_message = [];
      if (name == undefined || name == '') {
         return_message.push('Name missing');
      }
      if (text == undefined || text == '') {
         return_message.push('Text missing');
      }
      if (category == undefined || text == '') {
         return_message.push('Category missing');
      }
      if (authors == undefined || text == '') {
         return_message.push('Author missing');
      }
      // dette er et kort eksempel på strukturen, denne udvides selvfølgelig til noget mere brugbart
      // hvis der er 1 eller flere elementer i `return_message`, så mangler der noget
      if (return_message.length > 0) {
         
         // der er mindst 1 information der mangler, returner beskeden som en string.
         // let allBlogInfo = await getBlogPosts();
         res.render('admin_posts', {
            //Join gør at den sætter de forskellige felter sammen med mellemrum, hvis
            //felterne er tomme. I det her tilfælde bliver det joined i et tomt array
            //som hedder return_message, som er defineret lidt længere oppe
            'return_message': return_message.join(', '),
            'values': req.body, // læg mærke til vi "bare" sender req.body tilbage
            title: "The Blog Page"
         });
         
      } else {
         // send det modtagede data tilbage, så vi kan se det er korrekt
         let now = new Date().toISOString().slice(0, 19).replace("T", ' ');
         let db = await mysql.connect();
         let result = await db.execute(`
         INSERT INTO blog_posts 
         (blog_title, blog_text, fk_category_id, fk_author_id, blog_postdate) 
         VALUES 
         (?,?,?,?,?)`, [name, text, category, authors, now]);
         db.end();
         // affected rows er større end nul, hvis en (eller flere) række(r) blev indsat
         if (result[0].affectedRows > 0) {
            return_message.push('Tak for din besked, vi vender tilbage hurtigst muligt');
         } else {
            return_message.push('Din besked blev ikke modtaget.... ');
         }
         let allBlogInfo = await getBlogPosts();
         res.render('admin_posts', {
            'allBlogInfo': allBlogInfo,
            'return_message': return_message.join(''),
            // 'values': req.body, // læg mærke til vi "bare" sender req.body tilbage
            title: "The Blog Page"
         });
      }
   });

   app.get("/admin/posts/edit/:blog_id", async (req, res, next) => {
      let allBlogInfo = await getBlogPosts();
      let db = await mysql.connect();
      let [selectedBlog] = await db.execute(`SELECT * FROM blog_posts WHERE blog_id = ?`, [req.params.blog_id]);
      db.end();

      res.render('admin_posts', {
         'allBlogInfo': allBlogInfo,
         'selectedBlog': selectedBlog[0]
      });
   });

   app.post("/admin/posts/edit/:blog_id", async (req, res, next) => {
      let db = await mysql.connect();
      let [result] = await db.execute(
         `UPDATE blog_posts 
         SET blog_title = ?, 
         blog_text = ?,
         fk_category_id = ?,
         fk_author_id = ?
         WHERE blog_id = ?`,
         [req.body.blog_title, req.body.blog_text, req.body.blog_category, req.body.blog_author, req.params.blog_id]);
         db.end();
      let allBlogInfo = await getBlogPosts();
      res.render('admin_posts', {
         'allBlogInfo': allBlogInfo
      });
   });
   
   app.get("/admin/posts/delete/:blog_id", async (req, res, next) => {
      let db = await mysql.connect();
      let [result] = await db.execute(`DELETE FROM blog_posts WHERE blog_id = ?`, [req.params.blog_id]);
      db.end();
      let allBlogInfo = await getBlogPosts();
      res.render('admin_posts', {
         'allBlogInfo': allBlogInfo
      });
   });
};