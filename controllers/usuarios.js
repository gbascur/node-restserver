const { response } = require('express');
const bcryptjs = require('bcryptjs');
const Usuario = require('../models/usuario');



  const usuariosGet = async (req, res = response ) => {

    const { limite = 5, desde = 0} = req.query;
    const query = { estado: true};

    // const usuarios = await Usuario.find(query)
    // .skip(Number(desde))
    // .limit(Number(limite));

    // const total = await Usuario.countDocuments(query);

    //promise all para disminuir la peticion a la mitad del tiempo que se demora 
    const [ total, usuarios] = await Promise.all([ 
      Usuario.countDocuments(query),
      Usuario.find(query)
      .skip(Number(desde))
      .limit(Number(limite))])

    res.json({
      total,
      usuarios
    })
  }

  const usuariosPost = async(req, res= response) => {

    try {
      const {nombre, correo, password, rol} = req.body;
      const usuario = new Usuario({nombre, correo, password, rol });


      //Encriptar la contraseña
      const salt = bcryptjs.genSaltSync();
      usuario.password = bcryptjs.hashSync( password, salt );

      //Guardar en BD

      await usuario.save();


      res.json({
          msg: 'POST API - Controlador',
          usuario 
      })
    } catch (error) {
      console.log(error);
      
    }
    
  }

  const usuariosPut = async (req, res= response) => {

    const id = req.params.id
    const { _id, password, google, correo, ...resto } = req.body

    if ( password ) {
       //Encriptar la contraseña
       const salt = bcryptjs.genSaltSync();
       resto.password = bcryptjs.hashSync( password, salt );
    }

    const usuario = await Usuario.findByIdAndUpdate( id, resto );
    res.json( usuario )
  }

  

  const usuariosPatch = (req, res= response) => {
    res.json({
        msg: 'PATCH API - Controlador'
    })
  }

  const usuariosDelete = async (req, res= response) => {

    const { id } = req.params;
    //borrando fisicamente
    // const usuario = await Usuario.findByIdAndDelete( id );

    const usuario = await Usuario.findByIdAndUpdate( id , { estado : false} );

    res.json(usuario)
  }




  module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete
  }