"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productoController = void 0;
var database_1 = __importDefault(require("../database"));
var nodemailer_1 = __importDefault(require("nodemailer")); //Envia correos, references https://nodemailer.com/about/
var email_1 = __importDefault(require("../email"));
var ProductoController = /** @class */ (function () {
    function ProductoController() {
        //Esta ruta sera para enviar el correo para cambiar la contrania
        this.pala = [];
    }
    ProductoController.prototype.addCategoria = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var connection, sql, obj;
            return __generator(this, function (_a) {
                connection = database_1.default.db2();
                sql = 'INSERT INTO categoria (nombre) VALUES (:nombre)';
                obj = req.body;
                connection.exec(sql, obj, function (result) {
                    res.json(result);
                });
                return [2 /*return*/];
            });
        });
    };
    ProductoController.prototype.getCategoria = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var connection, sql, obj;
            return __generator(this, function (_a) {
                connection = database_1.default.db2();
                sql = 'SELECT * FROM categoria WHERE idCategoria=:ID';
                obj = req.params.id;
                connection.exec(sql, [obj], function (result) {
                    var tempUser = null;
                    if (result.length > 0 && result.length < 2) {
                        tempUser = {
                            idCategoria: result[0].IDCATEGORIA,
                            nombre: result[0].NOMBRE
                        };
                        res.json(tempUser);
                    }
                    else {
                        res.json(tempUser);
                    }
                });
                return [2 /*return*/];
            });
        });
    };
    ProductoController.prototype.getCategorias = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var sql;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        sql = "SELECT * FROM categoria";
                        return [4 /*yield*/, database_1.default.db2().exec(sql, [], function (result) {
                                res.json(result);
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ProductoController.prototype.updateCategoria = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var connection, sql, obj;
            return __generator(this, function (_a) {
                connection = database_1.default.db2();
                sql = 'UPDATE categoria set nombre=:nombre WHERE idCategoria=:idCategoria';
                obj = req.body;
                connection.exec(sql, obj, function (result) {
                    res.json(result);
                });
                return [2 /*return*/];
            });
        });
    };
    ProductoController.prototype.addProducto = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var connection, sql, obj;
            return __generator(this, function (_a) {
                connection = database_1.default.db2();
                sql = 'INSERT INTO producto (nombre, detalle, precio, estado, pathI, idCategoria, idUsuario, palabras) VALUES (:nombre, :detalle, :precio, :estado, :pathI, :idCategoria, :idUsuario, :palabras)';
                obj = req.body;
                //recorremos las palabras clave
                connection.exec(sql, obj, function (result) {
                    res.json(result);
                });
                return [2 /*return*/];
            });
        });
    };
    ProductoController.prototype.getProductos = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var connection, sql, id;
            return __generator(this, function (_a) {
                connection = database_1.default.db2();
                sql = 'SELECT P.idProducto, P.nombre, P.detalle, P.precio, P.estado, P.pathI, P.idCategoria, C.nombre AS nombreCa, P.idUsuario, P.palabras FROM producto P INNER JOIN categoria C ON (C.idCategoria=P.idCategoria) WHERE P.estado=0 AND P.idUsuario!=:ID';
                id = req.params.id;
                connection.exec(sql, [id], function (result) {
                    res.json(result);
                });
                return [2 /*return*/];
            });
        });
    };
    ProductoController.prototype.getMyProductos = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var connection, sql, id;
            return __generator(this, function (_a) {
                connection = database_1.default.db2();
                sql = 'SELECT * FROM producto WHERE idUsuario=:ID';
                id = req.params.id;
                connection.exec(sql, [id], function (result) {
                    res.json(result);
                });
                return [2 /*return*/];
            });
        });
    };
    ProductoController.prototype.getFiltro = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var connection, sql;
            return __generator(this, function (_a) {
                connection = database_1.default.db2();
                sql = req.body;
                connection.exec(sql.sql, [], function (result) {
                    res.json(result);
                });
                return [2 /*return*/];
            });
        });
    };
    ProductoController.prototype.getProductoDetalis = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var connection, sql, id;
            return __generator(this, function (_a) {
                connection = database_1.default.db2();
                sql = 'SELECT P.idProducto, P.nombre, P.detalle, P.precio, P.estado, P.pathI, P.idCategoria, C.nombre AS nombreCa, P.idUsuario, P.palabras FROM producto P INNER JOIN categoria C ON (C.idCategoria=P.idCategoria)'
                    + 'WHERE  P.idProducto=:ID';
                id = req.params.id;
                connection.exec(sql, [id], function (result) {
                    var tempP = {
                        detalle: result[0].DETALLE,
                        estado: result[0].ESTADO,
                        idCategoria: result[0].IDCATEGORIA,
                        idProducto: result[0].IDPRODUCTO,
                        idUsuario: result[0].IDUSUARIO,
                        nombre: result[0].NOMBRE,
                        nombreCA: result[0].NOMBRECA,
                        palabras: result[0].PALABRAS,
                        pathI: result[0].PATHI,
                        precio: result[0].PRECIO,
                    };
                    res.json(tempP);
                });
                return [2 /*return*/];
            });
        });
    };
    ProductoController.prototype.addLike = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var connection, sql, obj, obj2, estado;
            return __generator(this, function (_a) {
                connection = database_1.default.db2();
                sql = 'SELECT * FROM Likes WHERE idProducto=:idProducto AND idUsuario=:idUsuario';
                obj = req.body;
                obj2 = req.body;
                estado = obj.estado;
                delete obj.estado;
                connection.exec(sql, obj, function (result) {
                    console.log(result.length);
                    if (result.length < 1) {
                        sql = 'INSERT INTO Likes (estado, idProducto, idUsuario) VALUES (:estado,:idProducto,:idUsuario)';
                        console.log(obj2);
                        connection.exec(sql, [estado, obj2.idProducto, obj2.idUsuario], function (result) {
                            res.json(result);
                        });
                    }
                    else if (result.length > 0) {
                        sql = 'UPDATE Likes SET estado=:estado WHERE idProducto=:idProducto AND idUsuario=:idUsuario';
                        connection.exec(sql, [estado, obj2.idProducto, obj2.idUsuario], function (result) {
                            res.json(result);
                        });
                    }
                });
                return [2 /*return*/];
            });
        });
    };
    ProductoController.prototype.getCantLikes = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var connection, sql, id;
            return __generator(this, function (_a) {
                connection = database_1.default.db2();
                sql = 'SELECT count(*) AS Megusta FROM Likes WHERE idProducto=:ID AND estado=1'
                    + ' UNION ALL '
                    + 'SELECT count(*) AS Megusta FROM Likes WHERE idProducto=:ID AND estado=2';
                id = req.params.id;
                //recorremos las palabras clave
                connection.exec(sql, [id], function (result) {
                    var tempL = {
                        Megusta: result[0].MEGUSTA,
                        NoMegusta: result[1].MEGUSTA
                    };
                    res.json(tempL);
                });
                return [2 /*return*/];
            });
        });
    };
    ProductoController.prototype.addComentario = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var connection, sql, obj;
            return __generator(this, function (_a) {
                connection = database_1.default.db2();
                sql = 'INSERT INTO Comentario (coment, idProducto, idUsuario, fecha) VALUES (:coment,:idProducto,:idUsuario, LOCALTIMESTAMP(2) )';
                obj = req.body;
                //recorremos las palabras clave
                connection.exec(sql, obj, function (result) {
                    res.json(result);
                });
                return [2 /*return*/];
            });
        });
    };
    ProductoController.prototype.getComentario = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var connection, sql, id;
            return __generator(this, function (_a) {
                connection = database_1.default.db2();
                sql = 'SELECT C.coment, C.idProducto, C.idUsuario, C.fecha, U.nombre, U.apellido FROM comentario C INNER JOIN usuario U ON (U.idUsuario=C.idUsuario) WHERE C.idProducto=:ID';
                id = req.params.id;
                //recorremos las palabras clave
                connection.exec(sql, [id], function (result) {
                    res.json(result);
                });
                return [2 /*return*/];
            });
        });
    };
    ProductoController.prototype.addDenuncia = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var connection, sql, obj;
            return __generator(this, function (_a) {
                connection = database_1.default.db2();
                sql = 'INSERT INTO Denuncias (coment, idProducto, idUsuario, fecha) VALUES (:coment,:idProducto,:idUsuario, LOCALTIMESTAMP(2) )';
                obj = req.body;
                //recorremos las palabras clave
                connection.exec(sql, obj, function (result) {
                    res.json(result);
                });
                return [2 /*return*/];
            });
        });
    };
    ProductoController.prototype.getDenuncias = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var connection, sql, id;
            return __generator(this, function (_a) {
                connection = database_1.default.db2();
                sql = 'SELECT C.coment, C.idProducto, C.idUsuario, C.fecha, U.nombre, U.apellido, P.nombre AS nombreP, P.idUsuario AS idUP, J.nombre AS nombreU2, J.apellido AS apellido2, J.email AS email FROM Denuncias C ' +
                    'INNER JOIN usuario U ON (U.idUsuario=C.idUsuario) ' +
                    'INNER JOIN producto P ON (C.idProducto=P.idProducto) ' +
                    'INNER JOIN usuario J ON (J.idUsuario=P.idUsuario) ' +
                    'ORDER BY C.fecha ASC';
                id = req.params.id;
                //recorremos las palabras clave
                connection.exec(sql, [], function (result) {
                    res.json(result);
                });
                return [2 /*return*/];
            });
        });
    };
    ProductoController.prototype.updateDenuncia = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var connection, sql, obj;
            return __generator(this, function (_a) {
                connection = database_1.default.db2();
                sql = 'UPDATE producto SET estado=:estado WHERE idProducto=:idProducto';
                obj = req.body;
                //recorremos las palabras clave
                connection.exec(sql, obj, function (result) {
                    res.json(result);
                });
                return [2 /*return*/];
            });
        });
    };
    ProductoController.prototype.emailSend = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var transporter, obj, info;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        transporter = nodemailer_1.default.createTransport({
                            service: "gmail",
                            auth: email_1.default.auth,
                        });
                        obj = req.body;
                        console.log(obj);
                        return [4 /*yield*/, transporter.sendMail({
                                from: "familyu3213@gmail.com",
                                to: obj.email,
                                subject: "Bloqueo de publicacion",
                                text: " Su publicacion " + obj.nombrep,
                                html: "<br><h1> Su publicacion " + obj.nombrep + " ah sido Bloqueado .</h1>" + "<br>" +
                                    "<p> Estimado cliente " + obj.nombreU2 + " " + obj.apellido2 + " Su publicacion de este producto flue bloqueada </p>" +
                                    "<p> por algunas denuncias y no cumplir con nuestras especificaciones </p>" +
                                    "<br>" +
                                    "<br>" +
                                    "<br><img src=\"https://peru21.pe/resizer/90jpNbYzwoLyqGFQBCEzBerT_QM=/580x330/smart/filters:format(jpeg):quality(75)/cloudfront-us-east-1.images.arcpublishing.com/elcomercio/3RO6LRMUIJHHZMMKHOHIUPHXZU.PNG\"/>",
                            })];
                    case 1:
                        info = _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ProductoController.prototype.addCarrito = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var connection, sql, obj;
            return __generator(this, function (_a) {
                connection = database_1.default.db2();
                sql = 'INSERT INTO Carrito (idUsuario, idProducto, cantidad, fecha) VALUES (:idUsuario, :idProducto, :cantidad, LOCALTIMESTAMP(2))';
                obj = req.body;
                //recorremos las palabras clave
                connection.exec(sql, obj, function (result) {
                    res.json(result);
                });
                return [2 /*return*/];
            });
        });
    };
    ProductoController.prototype.getCarritoOneUser = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var connection, sql, id;
            return __generator(this, function (_a) {
                connection = database_1.default.db2();
                sql = 'SELECT C.idCarrito, P.idProducto, P.nombre, P.precio, C.cantidad, C.fecha, C.idUsuario, (C.Cantidad*P.precio) AS subtotal, P.pathI, U.nombre AS nombreUP, U.email AS emailUP FROM Carrito C ' +
                    'INNER JOIN producto P ON (P.idProducto=C.idProducto) ' +
                    'INNER JOIN usuario U ON (U.idUsuario=P.idUsuario) ' +
                    'WHERE C.idUsuario=:ID';
                id = req.params.id;
                //recorremos las palabras clave
                connection.exec(sql, [id], function (result) {
                    res.json(result);
                });
                return [2 /*return*/];
            });
        });
    };
    ProductoController.prototype.deleteOneCarrito = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var connection, sql, id;
            return __generator(this, function (_a) {
                connection = database_1.default.db2();
                sql = 'DELETE Carrito WHERE idCarrito=:ID';
                id = req.params.id;
                connection.exec(sql, [id], function (result) {
                    res.json(result);
                });
                return [2 /*return*/];
            });
        });
    };
    ProductoController.prototype.deleteAllCarrito = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var connection, sql, id;
            return __generator(this, function (_a) {
                connection = database_1.default.db2();
                sql = 'DELETE Carrito WHERE idUsuario=:ID';
                id = req.params.id;
                console.log(id);
                connection.exec(sql, [id], function (result) {
                    res.json(result);
                });
                return [2 /*return*/];
            });
        });
    };
    ProductoController.prototype.addCompra = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var connection, sql, obj;
            return __generator(this, function (_a) {
                connection = database_1.default.db2();
                sql = 'INSERT INTO factura (idUsuario,fecha) VALUES (:idUsuario,TO_TIMESTAMP(:fecha, \'DD/MM/YYYY HH24:MI:SS\'))';
                obj = req.body;
                // console.log(obj);
                //recorremos las palabras clave
                connection.exec(sql, [obj.idUsuario, obj.fecha], function (result) {
                    var _loop_1 = function (i) {
                        var element = obj.productos[i];
                        sql = 'INSERT INTO detalle_factura (idFactura, idProducto, cantidad, subtotal) VALUES ' +
                            '( (SELECT idFactura FROM factura WHERE idUsuario=:idUsuario AND fecha=TO_TIMESTAMP(:fecha, \'DD/MM/YYYY HH24:MI:SS\')),:idProducto,:cantidad,:subtotal ) ';
                        connection.exec(sql, [obj.idUsuario, obj.fecha, element.IDPRODUCTO, element.CANTIDAD, element.SUBTOTAL], function (result) {
                            console.log('añadido detalle');
                            if (i == obj.productos.length - 1) {
                                res.json(result);
                            }
                        });
                    };
                    for (var i = 0; i < obj.productos.length; i++) {
                        _loop_1(i);
                    }
                });
                return [2 /*return*/];
            });
        });
    };
    ProductoController.prototype.sendEmailCompra = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var transporter, table, obj, i, element, detalleFactura, i, element, info;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log('/////*------------------- Entra');
                        transporter = nodemailer_1.default.createTransport({
                            service: "gmail",
                            auth: email_1.default.auth,
                        });
                        table = '';
                        table += '<div class="container text-center"> <table> <tr> <th>Producto</th> <th>Cantidad</th> <th>Precio Unitario</th> <th>Sub Total</th>    </tr> ';
                        obj = req.body;
                        for (i = 0; i < obj.productos.length; i++) {
                            element = obj.productos[i];
                            table += ' <tr> ' +
                                ' <td>' + element.NOMBRE + '</td> ' +
                                ' <td>' + element.CANTIDAD + '</td> ' +
                                ' <td>' + element.PRECIO + '</td> ' +
                                ' <td>' + element.SUBTOTAL + '</td> ' +
                                ' </tr> ';
                        }
                        table += ' </table> </div> ';
                        return [4 /*yield*/, transporter.sendMail({
                                from: "familyu3213@gmail.com",
                                to: obj.correoComprador,
                                subject: "Tu compra se ah realizado con exito",
                                text: " Detalle de compra ",
                                html: " <br><h1> Su compra del dia " + obj.fecha + " ah sido realizada con exito .</h1>" + "<br> " +
                                    " <h3 class=\"text-center\"> Detalle </h3>  <br> " +
                                    table + ' <br> ' +
                                    ' <h2 class="text-center"> Total: ' + obj.total + ' creditos </h2> ' +
                                    " <br><img src=\"https://i.pinimg.com/originals/ed/bf/28/edbf289403dd7db09f07f6dc0c7b8456.jpg\"/> ",
                            })];
                    case 1:
                        detalleFactura = _a.sent();
                        i = 0;
                        _a.label = 2;
                    case 2:
                        if (!(i < obj.productos.length)) return [3 /*break*/, 5];
                        element = obj.productos[i];
                        return [4 /*yield*/, transporter.sendMail({
                                from: "familyu3213@gmail.com",
                                to: element.EMAILUP,
                                subject: "Han comprado un producto suyo",
                                text: " Su producto " + element.NOMBRE,
                                html: "<br><h1> Su publicacion " + element.NOMBRE + " ah sido comprado el dia " + obj.fecha + ".</h1>" + "<br>" +
                                    "<p> Estimado cliente " + element.NOMBREUP + " Ah sido comprado su producto " + element.NOMBRE + " </p>" +
                                    "<p> por una cantidad de " + element.CANTIDAD + " dando un total de " + element.SUBTOTAL + " creditos que seran acreditados a su cuenta</p>" +
                                    "<br>" +
                                    "<br>" +
                                    "<br><img src=\"https://megalopolismx.com/images/noticias/201611/shcp-lanza-comunicado.jpg\"/>",
                            })];
                    case 3:
                        info = _a.sent();
                        _a.label = 4;
                    case 4:
                        i++;
                        return [3 /*break*/, 2];
                    case 5:
                        res.json({ text: 'Se enviaron los correos' });
                        return [2 /*return*/];
                }
            });
        });
    };
    return ProductoController;
}());
exports.productoController = new ProductoController();
