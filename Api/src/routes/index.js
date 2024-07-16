const { Router } = require("express");
// const trademarkMiddleware = require('./Trademark');
// Ejemplo: const auth Router = require('./auth.js');
// Ejemplo: const authRouter = require('./auth.js');
const authServices = require("./services");
const authRubro = require("./rubro");
const authEmpresa = require("./empresa");

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);                                                                                                                                                                                                                        
// router.use('/trademarks', trademarkMiddleware);
router.use("/services", authServices);
router.use("/rubro", authRubro);
router.use("/empresa", authEmpresa);

module.exports = router;