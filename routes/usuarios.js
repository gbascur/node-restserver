
const { Router } = require('express');
const {check} = require('express-validator');


const { usuariosGet, usuariosDelete, usuariosPatch, usuariosPut, usuariosPost } = require('../controllers/usuarios')

const { validarCampos } = require('../middlewares/validar');
const { esRoleValido, existeEmail, existeUsuarioPorId } = require ('../helpers/validators');

const router = Router();

  router.get('/', usuariosGet );

  router.post('/',[
  check('nombre', 'El nombre no es valido').not().isEmpty(),
  check('password', 'El password debe de ser mas de 6 letras').isLength({ min: 6}),
  check('correo').custom( existeEmail ),
  // check('rol', 'No es un rol valido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
  check('rol').custom( esRoleValido ),
  validarCampos
  ], usuariosPost );

  router.put('/:id', [
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom( existeUsuarioPorId ),
    check('rol').custom( esRoleValido ),
    validarCampos
  ],usuariosPut );

  router.patch('/', usuariosPatch );
 

  router.delete('/:id', [
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom( existeUsuarioPorId ),
    validarCampos

  ],
  usuariosDelete);


module.exports= router