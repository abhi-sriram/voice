import {signInWithEmailAndPassword,auth} from '../../firebase-app'

export default async function signIn(req,res){
    const email = req.body.email.trim();
    const password = req.body.password.trim();

    if(email==="" || password===""){
        res.status(400).json({message:'Invalid Credentials',status:400});
    }
    console.log(email);
    try{
        await signInWithEmailAndPassword(auth, email, password)
        .catch(e=>{
            console.log(e);
            res.status(400).json({message:e,status:400});
        });
        res.status(200).json({message:'success',status:200});
    }catch(e){
        console.log(e);
        res.status(400).json({message:e});
    }
}   