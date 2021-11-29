const express = require("express");
const app = express();
const mongoose = require ("mongoose")

const connect = ()=>{
    return mongoose.connect("mongodb://127.0.0.1:27017/naukri")
};
app.use(express.json());
//------------------------------------------------SCHEMAS---------------------------------------------------------------//
 //city
const citySchema = new mongoose.Schema({
    city_name:{type:String,required:true}
},{
    versionKey: false,
    timestamps:true,
});
const city = mongoose.model("city",citySchema)


          //rating//

          const ratingSchema = new mongoose.Schema({
            rating:{type:Number,required:true}
        },{
            versionKey: false,
            timestamps:true,
        });
        const rating = mongoose.model("rating",ratingSchema)

 //WFH scheema
 
 const WFHSchema = new mongoose.Schema({
    avaiblity:{type:Boolean,required:false}
},{
    versionKey: false,
    timestamps:true,
});
const WFH = mongoose.model("WFH",WFHSchema)



// //companies Scheema
// const companySchema = new mongoose.Schema({
//     company_name:{type:string,required:true}
    
// },{
//     versionKey: false,
//     timestamps:true,
// });
// const WFH = mongoose.model("WFH",WFHSchema)

//job scheema
const jobSchema = new mongoose.Schema({
    position:{type:String,required:true},
    notice_period:{type:String,required:false},
    WFH_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"wfhs",
        required:"true"
    },

},{
    versionKey: false,
    timestamps:true,
});
const job = mongoose.model("job",jobSchema)


        
//----------------------------------------------post-----------------------------------------------------------------//
app.post("/city", async(req,res)=>{
            try{
               const City  =  await city.create(req.body);
                return res.status(200).send(City);
            }catch(e){
               return res.status(500).json({ status: "Failed", message: e.message });
            }
 
        });


        app.post("/rating", async(req,res)=>{
            try{
               const Rating  =  await rating.create(req.body);
                return res.status(200).send(Rating);
            }catch(e){
               return res.status(500).json({ status: "Failed", message: e.message });
            }
 
        });

      //wfh post
        app.post("/WFH", async(req,res)=>{
            try{
               const wfh  =  await WFH.create(req.body);
                return res.status(200).send(wfh);
            }catch(e){
               return res.status(500).json({ status: "Failed", message: e.message });
            }
 
        });

    //job post

    app.post("/job", async(req,res)=>{
        try{
           const Job  =  await job.create(req.body);
            return res.status(200).send(Job);
        }catch(e){
           return res.status(500).json({ status: "Failed", message: e.message });
        }

    });
  //get 
    
app.get("/job", async (req, res) => {
    try {
      const Job = await job.find().lean().exec();
  
      return res.status(200).json({
        success: true,
        data: Job,
      });
    } catch (e) {
      return res.status(500).json({
        success: false,
        error: e.message,
      });
    }
  });


//-----------------------------------------------Listen----------------------------------------------------------------//
app.listen(6453,async()=>{
    await connect();
    console.log("listening on port 6453")
})