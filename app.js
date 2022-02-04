const express = require("express");
const app = express();
const cors = require("cors");
const AWS = require("aws-sdk");
const {PMIDocument} = require("./models/PMIDocument");
AWS.config.update({
    region: "eu-west-1",
});
const TABLE_NAME = "PMI_UPLOAD_TEST";
const PORT = 80;
const ddb = new AWS.DynamoDB();
app.use(cors());
app.get("/add", function (req,res){
    if (!req.query.at_id ||  !req.query.bucket_name || !req.query.file_name  ){
        console.log("ensure query..");
        res.end("ensure all of parameters");
        return;
    }
    let pmi = new PMIDocument(req.query.at_id, req.query.bucket_name, req.query.file_name);
    let params = {
        TableName:TABLE_NAME,
        Item: pmi
    };
    ddb.putItem(params, (err,data)=>{
        if (err){
            console.log("error: ",  JSON.stringify(err, null, 2));
            res.end("error happened " + JSON.stringify(err, null, 2));
        }else{
            res.end("data saved=> " +  JSON.stringify(pmi, null, 2))
        }
    })
});

app.listen(PORT || 8080, ()=>{
    console.log("server is listening on " + PORT || 8080);
})
