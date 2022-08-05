const Role = require('../models/role');
const Usuario = require('../models/usuario');




//Verificar si el rol existe en la bd      
const esRoleValido = async(rol = '') => {
    const existeRol = await Role.findOne({ rol });
    if ( !existeRol ) {
      throw new Error(`El rol ${ rol } no esta registrado en la BD`)
    }
  }

//Verificar si el correo existe      
const existeEmail = async( correo = '' ) => {
    const emailExiste = await Usuario.findOne({correo});
    if( emailExiste) {
      throw new Error(`El correo ${ correo } ya esta registrado, favor intentar con otro`)
    }
  }

  //Verificar si el usuario existe      
const existeUsuarioPorId = async( id ) => {

  const existeUsuario = await Usuario.findById(id);
  if( !existeUsuario) {
    throw new Error(`El id ${ id } no existe`)
  }
}

  module.exports = {
    esRoleValido,
    existeEmail,
    existeUsuarioPorId
  }