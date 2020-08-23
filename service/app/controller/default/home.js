'use strict';

const Controller = require('egg').Controller

class HomeController extends Controller{

    async index(){
        this.ctx.body= 'api hi'
    }

    async getArticleList(){

        let sql = 'SELECT article.id as id,'+
                  'article.title as title,'+
                  'article.introduce as introduce,'+
                  'article.addTime as addTime,'+
                  'article.view_count as view_count,'+
                  'type.typeName as typeName '+
                  'FROM article LEFT JOIN type ON article.type_id = type.id'
     
         const results = await this.app.mysql.query(sql)
     
         this.ctx.body={data:results}

     }

     async getArticleById() {
        const id = this.ctx.params.id;
        const sql =
          'select article.id as id,' +
          'article.title as title,' +
          'article.introduce as introduce,' +
          'article.article_content as article_content,' +
          'article.addTime as addTime,'+
          'article.view_count as view_count,' +
          'type.typeName as typeName ,' +
          'type.id as typeId ' +
          'FROM article LEFT JOIN type ON article.type_id=type.id ' +
          'WHERE article.id=' +
          id;
        const result = await this.app.mysql.query(sql);
        this.ctx.body = { data: result };
      }

      async getTypeInfo(){
        
         const result = await this.app.mysql.select('type')
         this.ctx.body = {data:result}
      }

            //根据类别ID获得文章列表
      async getListById(){
        let id = this.ctx.params.id
        let sql = 'SELECT article.id as id,'+
        'article.title as title,'+
        'article.introduce as introduce,'+
        'article.addTime as addTime,'+
        'article.view_count as view_count ,'+
        'type.typeName as typeName '+
        'FROM article LEFT JOIN type ON article.type_id = type.id '+
        'WHERE type_id='+id
        const result = await this.app.mysql.query(sql)
        this.ctx.body={data:result}

      }
}

module.exports = HomeController