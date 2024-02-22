var registermodel = require('../model/register');
var jwt = require('jsonwebtoken');
var nodemailer = require('nodemailer');

exports.register = async (req,res) => {

    var data = await registermodel.create(req.body);

    res.status(200).json({
        data
    })

}

exports.login = async (req,res)=>{
    var data = await registermodel.find({email:req.body.email});

    if(data.length==1)
    {
        if(data[0].password==req.body.password){

            var token = jwt.sign({id:data[0].id},"cdmi");

            res.status(200).json({
                status:"Login",
                token
            })
        }else{
            res.status(200).json({
                status:"check your email and password"
            })
        }
    }else{
        res.status(200).json({
            status:"check your email and password"
        })
    }
}

exports.get_data = async (req,res)=>{

    var page_no = req.query.page_no;
    var limit = 5;

    if(page_no==undefined)
    {
        page_no=1;
    }

    var start = (page_no-1)*limit;

    var data = await registermodel.find().skip(start).limit(limit);
    var data_count = await registermodel.find().count();

    var total_page = Math.ceil(data_count/limit);


    res.status(200).json({
        data,
        total_page,
        page_no
    })
}

exports.send_mail = async (req,res)=>{
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'languagepdf@gmail.com',
          pass: 'ltvmboyosziuwslu'
        }
      });
      
      var mailOptions = {
        from: 'languagepdf@gmail.com',
        to: 'languagepdf@gmail.com',
        subject: 'Sending Email using Node.js',
        text: 'That was easy!'
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
            res.status(200).json({
                status:info.response
            })
        }
      });
}
