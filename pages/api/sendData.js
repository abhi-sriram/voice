import {db, collection,addDoc,serverTimestamp } from '../../firebase-app'

export default async function sendData(req,res){

    try{
        
        if(req.body?.collection.trim()==="" || req.body?.type.trim()==="" ||
         req.body?.id.trim()==="" || req.body?.email.trim()==="" || req.body.mess?.trim()===""){
            res.status(400).json({message:'Missing data',status:400});
        }
        const colName = req.body.collection.trim();
        console.log(colName);

        const col = collection(db,colName)
        let docId = "";
        
            if(colName=='mess'){
                if(req.body.mess.trim()==="p12" || req.body.mess.trim()!=="e12" || req.body.mess.trim()!=="e34"){
                    const doc = await addDoc(collection(db, colName), {
                        createdAt: serverTimestamp(),
                        data: req.body.data.trim(),
                        resolved: false,
                        type: req.body.type.trim(),
                        id: req.body.id.trim(),
                        mess: req.body.mess.trim(),
                        email: req.body.email.trim()
                      });
                      console.log(doc.id);
                      docId = doc.id;
                    var myHeaders = new Headers();
                    myHeaders.append("Content-Type", "application/json");

                    var raw = JSON.stringify({
                        "data": req.body.data.trim(),
                        "type": req.body.type.trim(),
                        "id": req.body.id.trim(),
                        "mess": req.body.mess.trim(),
                        "email": req.body.email.trim(),
                      "docId": docId,
                      "colName": colName

                    });

                    var requestOptions = {
                    method: 'POST',
                    headers: myHeaders,
                    body: raw,
                    redirect: 'follow'
                    };

                    await fetch("http://localhost:3000/api/sendMail", requestOptions)
                    .then(response => response.text())
                    .then(result => console.log(result))
                    .catch(error => console.log('error', error));
                }else{
                    res.status(400).json({message:'Invalid Mess ID',status:400});
                    
                }

                

            }else if(colName=='bb' || colName=='mart'){
                
                const doc = await addDoc(collection(db, colName), {
                    createdAt: serverTimestamp(),
                    data: req.body.data.trim(),
                    resolved: false,
                    type: req.body.type.trim(),
                    id: req.body.id.trim(),
                    email: req.body.email.trim()

                  });
                  console.log(doc.id);
                  docId = doc.id;

                  var myHeaders = new Headers();
                  myHeaders.append("Content-Type", "application/json");

                  var raw = JSON.stringify({
                      "data": req.body.data.trim(),
                      "type": req.body.type.trim(),
                      "id": req.body.id.trim(),
                      "email": req.body.email.trim(),
                      "docId": docId,
                        "colName": colName
                  });

                  var requestOptions = {
                  method: 'POST',
                  headers: myHeaders,
                  body: raw,
                  redirect: 'follow'
                  };

                  await fetch("http://localhost:3000/api/sendMail", requestOptions)
                  .then(response => response.text())
                  .then(result => console.log(result))
                  .catch(error => console.log('error', error));

            }else{
                res.status(400).json({message:'Invalid Collection',status:400});
            }

        res.status(200).json({message:'succes',status:200,id:docId});
    }catch(e){
        console.log(e);
        res.status(400).json({message:e,status:400});
    }
}   