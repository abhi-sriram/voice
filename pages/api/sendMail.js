const nodemailer = require('nodemailer');
export default async function sendMail(req,res){
    const email = req.body.email;
    
    let type = req.body.type;
    const id = req.body.id;
    const data = req.body.data;
    const docId = req.body.docId;
    let colName = req.body.colName;
    let msg = ''

    if(type=='suggestion'){
      type = 'Suggestion/Feedback';
    }else{
      type = 'Complaint';
    }

    if(colName=='mess'){
        colName = "Mess"
        const mess = req.body.mess;
        if(mess=="p12"){
             msg = `P1-P2 Mess `
        }
        if(mess=="e12"){
            msg = `E1-E2 Mess`
       }
       if(mess=="e34"){
        msg = `E3-E4 Mess`
   }
    }else if(colName=='bb'){
        colName = "Brew Berry"
        msg = `Brew Berry`
    }else{
        colName = "Super Market"
        msg = `Super Market`
    }


    // "data": req.body.data.trim(),
    //                     "type": req.body.type.trim(),
    //                     "id": req.body.id.trim(),
    //                     "mess": req.body.mess.trim(),
    //                     "email": req.body.email.trim()
    var transporter =  nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'sgc.tech@rgukt.ac.in',
          pass: 'Mk@A7hmS^272J*Ky@RC'
        }
      });
      //  sgc.food@rgukt.ac.in
      var mailOptions = {
        from: 'sgc.tech@rgukt.ac.in',
        to: `${email}, b172197@rgukt.ac.in`,
        subject: `${type} - ${id} - ${msg}`,
        html: `<h2>Hello, ${id}</h2><p>Thanks for submitting grevience.</p><p>${msg}</p><p>${type}: <code>${data}</code></p>
        <p>Use this for future reference - <code>${docId}</code></p>
        <p>Regards,<br><h3>SGC-Student Governing Council</h3>
        </p><p><a>sgc.food@rgukt.ac.in</a></p><p><a>sgc.hnh@rgukt.ac.in</a></p>
        `
      };
      
       transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
          res.status(400).json({message:error,status:400});
        } else {
          console.log('Email sent: ' + info.response);
          res.status(200).json({message:info.response,status:200});
        }
      });
      
}   