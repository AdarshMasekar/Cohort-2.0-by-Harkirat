const { courseValidation } = require("../validation/validation");
const {Course} = require("../db/index")

async function courseMiddleware(req,res,next){
    const title = req.body.title;
    const description = req.body.description;
    const price = req.body.price;
    const validated = courseValidation({title,description,price});
    if(!validated.success){
        return res.status(400).json({error:validated.error.issues.map(issue=>issue.message).join(" and")});
    }
    const courseExists = await Course.findOne({title:title});
    if(courseExists){
       return res.status(400).json({error:"course already exists with this title!"});
    }
    else{
        next();
    }
}

module.exports = courseMiddleware;
