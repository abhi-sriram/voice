import {db, collection, getDocs,query,orderBy,limit} from '../../firebase-app'

export default async function getData(req,res){

    try{
        const colName = req.body.collection.trim();
        if(colName===""){
            res.status(400).json({message:'Missing data',status:400});
        }
        const latest = req.body?.latest || true;
        console.log(colName);
        const docsCount = latest ? 10 : 100;
        const col = collection(db,colName)
        const q = query(col,orderBy("createdAt","desc"),  limit(docsCount));
        const querySnapshot = await getDocs(q);
        const data = []
        if(colName=='mess'){
            querySnapshot.forEach((doc) => {
                const d = {}
                    d['createdAt'] = doc.get('createdAt')
                    d['data'] = doc.get('data')
                    d['resolved'] = doc.get('resolved')
                    d['type'] = doc.get('type')
                    d['id'] = doc.get('id')
                    d['mess'] = doc.get('mess')
                    d['email'] = doc.get('email')
                    d['docId'] = doc.id

    
                 
                data.push(d)     
                console.log(doc.id);
            });
        }else{
            querySnapshot.forEach((doc) => {
                const d = {}
                    d['createdAt'] = doc.get('createdAt')
                    d['data'] = doc.get('data')
                    d['resolved'] = doc.get('resolved')
                    d['type'] = doc.get('type')
                    d['id'] = doc.get('id')
                    d['email'] = doc.get('email')
                    d['docId'] = doc.id
      
                data.push(d)     
                console.log(doc.id);
            });
        }
        
        console.log(data);
        console.log("Ended");
        const jsonData = JSON.stringify(data);
        console.log(jsonData);
        res.status(200).json({message:'succes',status:200,data:jsonData});
    }catch(e){
        console.log(e);
        res.status(400).json({message:e});
    }
}   