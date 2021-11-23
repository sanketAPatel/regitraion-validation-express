const express =require('express');
const  router =express.Router();
const productModel=require('../models/product');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const saltRounds = 10;


router.get('/product', async(req,res)=>{
    console.log('product get  api called');
     

    //find all()
    const products= await productModel.find();
   
    try {res.json(products);
        }
    catch(err)
    {
    res.send(err);
     }
    })

    
    /* res.json({ 
         body:{
            serialNumber:2,
            name: 'nokia',
            pType: 'mobile'
         }
     })*/
    
    
    router.post('/register',[
        check('userName','userName must be betn 5-10').isLength({ min: 5, max: 10 }),
        check('email','must be abc@mal.com format').isEmail(),
        check('password', 'shd be betn 5-10 char long').isLength({ min: 5, max: 10 }),
    ],async (req,res)=>{
      

        //validation
        const errorMsg=validationResult(req);
     if(!errorMsg.isEmpty()){
         return res.status(400).json({errorMEssage: errorMsg.array()})
     }
        console.log('product post api called');
    //-----------validation ends----//

    const salt = await bcrypt.genSalt(10);
    const hashPassWord= await bcrypt.hash(req.body.password,salt);
       
        const user=new productModel({
           
            userName: req.body.userName,
		email: req.body.email,
		//password: req.body.password;
        password: hashPassWord
        
        });


        //res.json(req.body.name );
        //res.json(product);
      /*  product.save((err,resp)=>{
                if(err){return res.send(err);}

                res.json(product);
        })*/

        /*  save then  promise
        product.save().then((resp)=>{
            res.json(resp);
            })
            .catch((err)=>{
            res.send(err);
            });*/

            
//--------------------await---------//
            const save =await user.save();
try 
{

res.json(save);
}
catch(err)
{
res.send(err);
}
    })  


    //-------------------------login Page--------------------------//
    router.post('/login',[
   //   check('userName','userName must be betn 5-10').isLength({ min: 5, max: 10 }),
        check('email','must be abc@mal.com format').isEmail(),
        check('password', 'shd be betn 5-10 char long').isLength({ min: 5, max: 10 }),
    ],async (req,res)=>{
      

        //validation
        const errorMsg=validationResult(req);
     if(!errorMsg.isEmpty()){
         return res.status(400).json({errorMEssage: errorMsg.array()})
     }
        console.log('login post api called');
    //-----------validation ends----//

 //--data exist or not------///
    const email=req.body.email;
const password=req.body.password;
const products= await productModel.findOne({email:email});

if(!products){
    return res.status(400).json({errorMEssage: 'wrong '})
}
   //--data exist or not------/// 

   const isPwdOk= bcrypt.compare(password,products.password);
       
   if(!isPwdOk){
    return res.status(400).json({errorMEssage: 'wrong pwd '})
}
 
return res.json(products);   
//--
    })  
    //--------------------------login ends-------------------------//
   



module.exports=router;