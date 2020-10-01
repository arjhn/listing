const express=require('express')
const app=express();

const bodyParser=require('body-parser');
const cors= require('cors');

const mysql=require('mysql');

app.use(cors());

const connection=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'Podman@1',
    database:'foo'
})

connection.connect(err=>{
    if(err) throw err
    console.log('Connected to SQL')
})

app.get('/',(req,res)=>{
    
    connection.query('SELECT vid,app,source_id,comments,overall_status FROM DATA_TAB',(err,rows)=>{
        if(err) throw err
        
        console.log(rows)

        let result=rows.map((mysqlObj, index) => {
            return Object.assign({}, mysqlObj);
        });
        res.send(result)
      //  console.log(result[0]['id'])
    })


})

app.post('/search',bodyParser.json(),(req,res)=>{

    connection.query('SELECT app,vid,source_id,overall_status,comments FROM DATA_TAB WHERE '+req.body.col+' LIKE "%'+req.body.searchVal+'%"',(err,rows)=>{
        if(err) throw err
        
        let result=rows.map((mysqlObj, index) => {
            return Object.assign({}, mysqlObj);
        });
        res.send(result)
        console.log(result)
    })

})

app.post('/update',bodyParser.json(),(req,res)=>{
    connection.query(
        'UPDATE DATA_TAB SET comments="'+req.body.comment+'" WHERE vid="'+req.body.comId+'"',(err,rows)=>{
            if(err) throw err
        
            /**let result=rows.map((mysqlObj, index) => {
                return Object.assign({}, mysqlObj);
            });**/
            console.log(rows)
            res.send(rows)
        }
    )
    //console.log(req.body.comId)
})


const listener= app.listen(8011,()=>{
    console.log('The App is on');
});