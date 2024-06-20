const connection = require('../../services/connection');


async function getAdList(req, res){
    
    const sql = "SELECT ad_id, price, title, location, sub_location FROM ads_table;";

    connection.query(sql, (err,result) =>{
        if(err){
            console.log("Error getting ad data:",err)
            return res.status(500).json("Error occured");
        }else{
            if(result.length > 0){
                console.log(result);
                return res.status(200).json({result});
            }else{
                return res.status(201).json("Ad data not found.")
            }
        }
    });
    
}  


module.exports = getAdList