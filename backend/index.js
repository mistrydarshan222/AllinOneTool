
import whois from 'whois-api';
import express  from "express";
import cors  from "cors";

const app = express()
const port = 3300
app.use(cors())

app.get('/', async  (req, res) => {
    const domain = req.query.domain;
    
   await whois.lookup(domain, function(err, data) {
     if(! data.id){
            res.status(200).json({ status:200, message: domain })
          
        }
        else{
            res.status(404).json({status:404, message: "not found" })
        }
        console.log(data);
      })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


  