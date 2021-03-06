"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.userController = void 0;
var database_1 = __importDefault(require("../database"));
var crypto = __importStar(require("crypto")); //para incriptar en md5
var nodemailer_1 = __importDefault(require("nodemailer")); //Envia correos, references https://nodemailer.com/about/
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var email_1 = __importDefault(require("../email"));
var UserController = /** @class */ (function () {
    function UserController() {
        this.mensaje = "Si sale archivos";
    }
    UserController.prototype.getUser = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var sql;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        sql = "SELECT * FROM usuario";
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
    UserController.prototype.create = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var connection, sql, obj, bandera;
            return __generator(this, function (_a) {
                connection = database_1.default.db2();
                sql = 'SELECT * FROM usuario WHERE email=:email';
                obj = req.body;
                bandera = false;
                obj.token = jsonwebtoken_1.default.sign(obj.email, obj.nombre);
                obj.pass = crypto.createHash('md5').update(obj.pass).digest("hex"); //Incriptamos la contraseña
                connection.exec(sql, [obj.email], function (result) {
                    if (result.length < 1) {
                        sql = 'INSERT INTO usuario (nombre,apellido,pass,email,nacimieno,credito,idTipo_U,confirmacion,token,pathI,idPais) VALUES (:nombre,:apellido,:pass,:email, TO_DATE(:nacimieno, \'YYYY-MM-DD\') ,:credito,:idTipo_U,:confirmacion,:token, :pathI, :idPais)';
                        connection.exec(sql, obj, function (result) {
                            res.json({ text: 'Creado', token: obj.token });
                            bandera = true;
                        });
                    }
                    else {
                        res.json({ text: 'Correo ya existe' });
                    }
                });
                return [2 /*return*/];
            });
        });
    };
    UserController.prototype.emailSend = function (req, res) {
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
                        return [4 /*yield*/, transporter.sendMail({
                                from: "familyu3213@gmail.com",
                                to: obj.email,
                                subject: "Confirmacion De Registro",
                                text: " Confirme su registro ",
                                html: "<br><h1>Confirma  tu servicio " + obj.nombre + ".</h1>" + "<br>" + "<h3>Presiona el siguiente link para confirmar tu cuenta</h3>" + "<br>" +
                                    "<a href=\"http://192.168.0.5:4200/confirmacionUser/" + obj.token + "\"><buttonhref=\"http://192.168.0.5:4200/confirmacionUser/" + obj.token + "\"  style=\"background-color:blue; border-color:black; color:white\" width=\"100\"; height=\"50\">Confirmar Correo</button></a>" +
                                    "<br>" +
                                    "<br><img src=\"https://img.icons8.com/wired/2x/among-us.png\"/>",
                            })];
                    case 1:
                        info = _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    UserController.prototype.login = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var connection, sql, obj;
            return __generator(this, function (_a) {
                connection = database_1.default.db2();
                sql = 'SELECT * FROM usuario WHERE email=:email AND pass=:pass';
                obj = req.body;
                obj.pass = crypto.createHash('md5').update(obj.pass).digest("hex"); //Incriptamos la contraseña
                console.log(obj.pass);
                connection.exec(sql, obj, function (result) {
                    if (result.length > 0 && result.length < 2) {
                        var tempUser = {
                            id: result[0].IDUSUARIO,
                            nombre: result[0].NOMBRE,
                            apellido: result[0].APELLIDO,
                            rol: result[0].IDTIPO_U,
                            confirmacion: result[0].CONFIRMACION,
                            idPais: result[0].IDPAIS,
                            email: result[0].EMAIL
                        };
                        res.json(tempUser);
                    }
                });
                return [2 /*return*/];
            });
        });
    };
    UserController.prototype.confirmacion = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var connection, sql, id;
            return __generator(this, function (_a) {
                connection = database_1.default.db2();
                sql = 'UPDATE usuario SET confirmacion=1 WHERE token=:ID';
                id = req.params.id;
                connection.exec(sql, [id], function (result) {
                    res.json(result);
                });
                return [2 /*return*/];
            });
        });
    };
    UserController.prototype.update = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var connection, sql, obj, id;
            return __generator(this, function (_a) {
                connection = database_1.default.db2();
                sql = 'UPDATE usuario SET nombre=:nombre, apellido=:apellido, nacimieno=TO_DATE(:nacimieno, \'YYYY-MM-DD\'), pass=:pass, pathI=:pathI, idPais=:idPais WHERE idUsuario=:id';
                obj = req.body;
                obj.pass = crypto.createHash('md5').update(obj.pass).digest("hex"); //Incriptamos la contraseña
                id = req.params.id;
                console.log(obj);
                connection.exec(sql, obj, function (result) {
                    res.json(result);
                });
                return [2 /*return*/];
            });
        });
    };
    UserController.prototype.delete = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var connection, sql, obj;
            return __generator(this, function (_a) {
                connection = database_1.default.db2();
                sql = 'BEGIN insertuser(:reg,:nameU,:img,:mail,:pass,:cel); END;';
                obj = req.body;
                console.log(obj);
                connection.exec(sql, [obj.reg, obj.name, obj.img, obj.mail, obj.pass, obj.phone], function (result) {
                    if (result == undefined) {
                        sql = 'INSERT INTO ROL_USUARIO VALUES(:1,:2,:3,:4,:5)';
                        connection = database_1.default.db2();
                        connection.execMany(sql, obj.rolTab);
                        res.send({ status: 'success' });
                    }
                    else
                        res.send({ status: 'error' });
                });
                return [2 /*return*/];
            });
        });
    };
    UserController.prototype.getOneUser = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var connection, sql, obj;
            return __generator(this, function (_a) {
                connection = database_1.default.db2();
                sql = 'SELECT * FROM usuario WHERE idUsuario=:id';
                obj = req.params.id;
                connection.exec(sql, [obj], function (result) {
                    if (result.length > 0 && result.length < 2) {
                        var tempUser = {
                            id: result[0].IDUSUARIO,
                            nombre: result[0].NOMBRE,
                            apellido: result[0].APELLIDO,
                            rol: result[0].IDTIPO_U,
                            confirmacion: result[0].CONFIRMACION,
                            pathI: result[0].PATHI,
                            email: result[0].EMAIL,
                            credito: result[0].CREDITO,
                            nacimieno: result[0].NACIMIENO,
                            idPais: result[0].IDPAIS,
                        };
                        res.json(tempUser);
                    }
                });
                return [2 /*return*/];
            });
        });
    };
    UserController.prototype.getPaises = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var sql;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        sql = "SELECT * FROM pais";
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
    UserController.prototype.addMensaje = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var connection, sql, obj;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        connection = database_1.default.db2();
                        sql = "SELECT * FROM chat WHERE idUsuario1=:ID1 AND idUsuario2=:ID2";
                        obj = req.body;
                        return [4 /*yield*/, database_1.default.db2().exec(sql, obj, function (result) {
                                if (result.length < 1) { //No hay chat existente
                                    sql = "INSERT INTO chat (idUsuario1,idUsuario2) VALUES (:ID1, :ID2)";
                                    connection.exec(sql, obj, function (result2) {
                                        sql = "SELECT * FROM chat WHERE idUsuario1=:ID1 AND idUsuario2=:ID2";
                                        connection.exec(sql, obj, function (result3) {
                                            res.json(result3);
                                        });
                                    });
                                }
                                else {
                                    res.json(result);
                                }
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    UserController.prototype.enviarMensaje = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var connection, sql, obj;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        connection = database_1.default.db2();
                        sql = "INSERT INTO mensaje (texto,fecha,idChat, idUsuario) VALUES (:texto,LOCALTIMESTAMP(2),:idChat,:idUsuario)";
                        obj = req.body;
                        return [4 /*yield*/, database_1.default.db2().exec(sql, obj, function (result) {
                                res.json(result);
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    UserController.prototype.getMensajes = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var connection, sql, obj;
            return __generator(this, function (_a) {
                connection = database_1.default.db2();
                sql = 'SELECT M.idMensaje, M.texto, M.fecha, M.idChat, U.nombre, U.apellido FROM Mensaje M ' +
                    ' INNER JOIN usuario U ON (U.idUsuario=M.idUsuario) ' +
                    ' WHERE M.idChat=:ID ORDER BY M.fecha ASC';
                obj = req.params.id;
                connection.exec(sql, [obj], function (result) {
                    res.json(result);
                });
                return [2 /*return*/];
            });
        });
    };
    UserController.prototype.getChats = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var connection, sql, obj;
            return __generator(this, function (_a) {
                connection = database_1.default.db2();
                sql = 'SELECT C.idChat, C.idUsuario1, U.nombre AS vendedor,C.idUsuario2, U2.nombre AS comprador FROM chat C ' +
                    ' INNER JOIN usuario U ON (U.idUsuario=C.idUsuario1) ' +
                    ' INNER JOIN usuario U2 ON (U2.idUsuario=C.idUsuario2) ' +
                    ' WHERE C.idUsuario1=:ID OR C.idUsuario2=:ID ORDER BY C.idChat ASC';
                obj = req.params.id;
                connection.exec(sql, [obj], function (result) {
                    res.json(result);
                });
                return [2 /*return*/];
            });
        });
    };
    return UserController;
}());
exports.userController = new UserController();
