const { Router } = require('express');
const router = Router();
const admin = require('firebase-admin');
//const { initializeApp, applicationDefault } = require("firebase-admin/app");
//const { getFirestore } = require("firebase-admin/firestore");

//conexion base de datos
var serviceAccount = require("../../proyectov-aaf96-firebase-adminsdk-iinme-4edcb151a2.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://proyectov-aaf96-default-rtdb.firebaseio.com/'
});

const db = admin.database();

//Direciones 
router.get('/', (req, res) => {
    console.log('Index works!');
    res.render('index');
})

router.get('/registro', (req, res) => {
    //console.log('Index works!');
    res.render('registro');
})

router.get('/registros', (req, res) => {
    db.ref('computadoras').once('value',(snapshot) => {
        const data = snapshot.val();
        res.render('registros', {computadoras:data});
    });
});

router.get('/ver-regi/:id',(req, res) => {
        res.render('ver-regi');
});

router.get('/actualizar/:id', async (req, res) => {
    //db.ref('computadoras' + req.params.id).get();
    db.ref('computadoras').once('value',(snapshot) => {
        const data = snapshot.val();
        res.render('actualizar',{computadoras:data});
    });
});

//metodos de la base de dato 
router.post('/new-computer', (req,res) => {
    console.log(req.body);
    const newcomputer = {
        marca: req.body.marca,
        modelo: req.body.modelo,
        estado: req.body.estado,
        antivirus: req.body.antivirus,
        nero: req.body.nero,
        winrar: req.body.winrar,
        windvd: req.body.windvd
    }
    db.ref('computadoras').push(newcomputer);
    res.redirect('/registros');
});

//dete
router.get('/delete-comp/:id', (req,res) => {
    db.ref('computadoras/'+ req.params.id).remove();
    res.redirect('/registros')
});

//update

router.post("/update-contact/:id", async (req, res) => {
    const { marca, modelo, estado, antivirus, nero, winrar, windvd } = req.body;
    const { id } = req.params;
    await db
      .collection("computadoras")
      .doc(id)
      .update({ marca, modelo, estado, antivirus, nero, winrar, windvd });
    res.redirect("/");
  });
router.post('/actualizar-re/:id', (req,res) =>{
    //const {marca, modelo, estado, antivirus, nero, winrar, windvd} = req.body;
    //db.ref('computadoras/'+ req.params.id).update({marca, modelo, estado, antivirus, nero, winrar, windvd});
    const actucomputer = {
        marca: req.body.marca,
        modelo: req.body.modelo,
        estado: req.body.estado,
        antivirus: req.body.antivirus,
        nero: req.body.nero,
        winrar: req.body.winrar,
        windvd: req.body.windvd
    }


    db.ref('computadoras/' + req.params.id).update(actucomputer);
    // const {id} = req.params;
    // await db
    // .collection("computadoras")
    // .doc(id)
    // .update(actucomputer);
    // console.log(req.body);
    // var ref = new firebase('https://db-node-firebase-admi-computer-default-rtdb.firebaseio.com/')

    // var newpostref = db.ref.child("posts").push();
    // var newpostkey = newpostref.key();

    // var updateUserData = {};
    // updateUserData['computadoras/posts/' + newpostkey] = true;
    // updateUserData['posts/' + newpostkey] = {
    //     marca: req.body.marca,
    //     modelo: req.body.modelo,
    //     estado: req.body.estado,
    //     antivirus: req.body.antivirus,
    //     nero: req.body.nero,
    //     winrar: req.body.winrar,
    //     windvd: req.body.windvd
    // };

    // ref.update(updateUserData);
    
    res.redirect('/registros')
})

module.exports = router;