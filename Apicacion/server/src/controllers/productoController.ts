import { Request, Response} from 'express';
import pool from '../database';
import nodemailer from 'nodemailer'; //Envia correos, references https://nodemailer.com/about/
import email from  '../email'
import * as crypto from 'crypto'; //para incriptar en md5
class ProductoController {
    //Esta ruta sera para enviar el correo para cambiar la contrania
    public pala:any=[]
   public async addCategoria(req: Request, res: Response){
        var connection = pool.db2();
        var sql = 'INSERT INTO categoria (nombre) VALUES (:nombre)';
        var obj = req.body;
        connection.exec(sql,obj,function(result:any){
            res.json(result);
        });
    }

    public async getCategoria(req: Request, res: Response){
        var connection = pool.db2();
        var sql = 'SELECT * FROM categoria WHERE idCategoria=:ID';
        var obj = req.params.id;
        connection.exec(sql,[obj],function(result:any){
            let tempUser:any=null;
            if (result.length > 0 && result.length < 2 ) {        
                 tempUser={
                    idCategoria: result[0].IDCATEGORIA,
                    nombre: result[0].NOMBRE
                };
                res.json(tempUser)
            }else{
                res.json(tempUser)
            }
        });
    }

    public async getCategorias(req: Request, res: Response){
        var sql = "SELECT * FROM categoria";
         
         await pool.db2().exec(sql,[],function(result:any){
            res.json(result);
        });
    }

    public async updateCategoria(req: Request, res: Response){
        var connection = pool.db2();
        var sql = 'UPDATE categoria set nombre=:nombre WHERE idCategoria=:idCategoria';
        var obj = req.body;
        connection.exec(sql,obj,function(result:any){
            res.json(result);
        });
    }

    public async addProducto(req: Request, res: Response){
        var connection = pool.db2();
        var sql = 'INSERT INTO producto (nombre, detalle, precio, estado, pathI, idCategoria, idUsuario, palabras) VALUES (:nombre, :detalle, :precio, :estado, :pathI, :idCategoria, :idUsuario, :palabras)';
        var obj = req.body;
         //recorremos las palabras clave
        connection.exec(sql,obj,function(result:any){
           res.json(result);
           
        });
    }

    public async getProductos(req: Request, res: Response){
        var connection = pool.db2();
        var sql = 'SELECT P.idProducto, P.nombre, P.detalle, P.precio, P.estado, P.pathI, P.idCategoria, C.nombre AS nombreCa, P.idUsuario, P.palabras FROM producto P INNER JOIN categoria C ON (C.idCategoria=P.idCategoria) WHERE P.estado=0 AND P.idUsuario!=:ID';
        var id = req.params.id; //Se optiene el parametro que se le envia 
        connection.exec(sql,[id],function(result:any){
            res.json(result);
        });
    }

    public async getMyProductos(req: Request, res: Response){
        var connection = pool.db2();
        var sql = 'SELECT * FROM producto WHERE idUsuario=:ID';
        var id = req.params.id; //Se optiene el parametro que se le envia 
        connection.exec(sql,[id],function(result:any){
            res.json(result);
        });
    }

    public async getFiltro(req: Request, res: Response){
        var connection = pool.db2();
        var sql = req.body; //obtiene la consulta
        
        connection.exec(sql.sql,[],function(result:any){
            res.json(result);
        });
    }

    public async getProductoDetalis(req: Request, res: Response){
        var connection = pool.db2();
        var sql = 'SELECT P.idProducto, P.nombre, P.detalle, P.precio, P.estado, P.pathI, P.idCategoria, C.nombre AS nombreCa, P.idUsuario, P.palabras FROM producto P INNER JOIN categoria C ON (C.idCategoria=P.idCategoria)'
                    +'WHERE  P.idProducto=:ID';
        var id = req.params.id; //Se optiene el parametro que se le envia 
        connection.exec(sql,[id],function(result:any){
            let tempP={
                detalle:result[0].DETALLE,
                estado :result[0].ESTADO,
                idCategoria:result[0].IDCATEGORIA,
                idProducto:result[0].IDPRODUCTO,
                idUsuario:result[0].IDUSUARIO,
                nombre:result[0].NOMBRE,
                nombreCA:result[0].NOMBRECA,
                palabras:result[0].PALABRAS,
                pathI:result[0].PATHI,
                precio:result[0].PRECIO,
            }
            res.json(tempP);
        });
    }

    public async addLike(req: Request, res: Response){
        var connection = pool.db2();
        var sql = 'SELECT * FROM Likes WHERE idProducto=:idProducto AND idUsuario=:idUsuario';
        var obj = req.body;
        var obj2 = req.body; //obtiene la consulta
        var estado= obj.estado;
        delete obj.estado;
        connection.exec(sql,obj,function(result:any){
            console.log(result.length);
            if(result.length<1){
                sql= 'INSERT INTO Likes (estado, idProducto, idUsuario) VALUES (:estado,:idProducto,:idUsuario)';
                console.log(obj2);
                connection.exec(sql,[estado,obj2.idProducto, obj2.idUsuario],function(result:any){
                    res.json(result);
                });
            }else if(result.length>0){
                sql='UPDATE Likes SET estado=:estado WHERE idProducto=:idProducto AND idUsuario=:idUsuario';
                connection.exec(sql,[estado,obj2.idProducto, obj2.idUsuario],function(result:any){
                    res.json(result);
                });
            }
        });
    }

    public async getCantLikes(req: Request, res: Response){
        var connection = pool.db2();
        var sql = 'SELECT count(*) AS Megusta FROM Likes WHERE idProducto=:ID AND estado=1'
        +' UNION ALL '
        +'SELECT count(*) AS Megusta FROM Likes WHERE idProducto=:ID AND estado=2';
        var id = req.params.id;
         //recorremos las palabras clave
        connection.exec(sql,[id],function(result:any){
            
            var tempL={
                Megusta: result[0].MEGUSTA,
                NoMegusta: result[1].MEGUSTA
            }
            res.json(tempL);
        });
    }

    public async addComentario(req: Request, res: Response){
        var connection = pool.db2();
        var sql = 'INSERT INTO Comentario (coment, idProducto, idUsuario, fecha) VALUES (:coment,:idProducto,:idUsuario, LOCALTIMESTAMP(2) )';
        var obj = req.body;
         //recorremos las palabras clave
        connection.exec(sql,obj,function(result:any){
           res.json(result);
        });
    }

    public async getComentario(req: Request, res: Response){
        var connection = pool.db2();
        var sql = 'SELECT C.coment, C.idProducto, C.idUsuario, C.fecha, U.nombre, U.apellido FROM comentario C INNER JOIN usuario U ON (U.idUsuario=C.idUsuario) WHERE C.idProducto=:ID';
        var id = req.params.id;
         //recorremos las palabras clave
        connection.exec(sql,[id],function(result:any){
            res.json(result);
        });
    }

    public async addDenuncia(req: Request, res: Response){
        var connection = pool.db2();
        var sql = 'INSERT INTO Denuncias (coment, idProducto, idUsuario, fecha) VALUES (:coment,:idProducto,:idUsuario, LOCALTIMESTAMP(2) )';
        var obj = req.body;
         //recorremos las palabras clave
        connection.exec(sql,obj,function(result:any){
           res.json(result);
        });
    }

    public async getDenuncias(req: Request, res: Response){
        var connection = pool.db2();
        var sql = 'SELECT C.coment, C.idProducto, C.idUsuario, C.fecha, U.nombre, U.apellido, P.nombre AS nombreP, P.idUsuario AS idUP, J.nombre AS nombreU2, J.apellido AS apellido2, J.email AS email FROM Denuncias C '+
        'INNER JOIN usuario U ON (U.idUsuario=C.idUsuario) '+ 
        'INNER JOIN producto P ON (C.idProducto=P.idProducto) '+
        'INNER JOIN usuario J ON (J.idUsuario=P.idUsuario) '+
        'ORDER BY C.fecha ASC';
        var id = req.params.id;
         //recorremos las palabras clave
        connection.exec(sql,[],function(result:any){
            res.json(result);
        });
    }

    public async updateDenuncia(req: Request, res: Response){
        var connection = pool.db2();
        var sql = 'UPDATE producto SET estado=:estado WHERE idProducto=:idProducto';
        var obj = req.body;
         //recorremos las palabras clave
        connection.exec(sql,obj,function(result:any){
           res.json(result);
        });
    }

    public async emailSend(req: Request, res:Response){
        let transporter = nodemailer.createTransport({
            service: "gmail",
            auth: email.auth,
          });
          
          var obj = req.body;
          console.log(obj);
          let info = await transporter.sendMail({           
                from: "familyu3213@gmail.com", // sender address
                to: obj.email, // list of receivers
                subject: "Bloqueo de publicacion", // Subject line
                text: " Su publicacion "+obj.nombrep, // plain text body
                html: "<br><h1> Su publicacion "+ obj.nombrep+" ah sido Bloqueado .</h1>"+"<br>"+
                "<p> Estimado cliente "+obj.nombreU2+" "+ obj.apellido2+" Su publicacion de este producto flue bloqueada </p>"+
                "<p> por algunas denuncias y no cumplir con nuestras especificaciones </p>"+
                "<br>"+ 
                "<br>"+
                "<br><img src=\"https://peru21.pe/resizer/90jpNbYzwoLyqGFQBCEzBerT_QM=/580x330/smart/filters:format(jpeg):quality(75)/cloudfront-us-east-1.images.arcpublishing.com/elcomercio/3RO6LRMUIJHHZMMKHOHIUPHXZU.PNG\"/>", // html body
              });
    }

    public async addCarrito(req: Request, res: Response){
        var connection = pool.db2();
        var sql = 'INSERT INTO Carrito (idUsuario, idProducto, cantidad, fecha) VALUES (:idUsuario, :idProducto, :cantidad, LOCALTIMESTAMP(2))';
        var obj = req.body;
         //recorremos las palabras clave
        connection.exec(sql,obj,function(result:any){
           res.json(result);
        });
    }

    public async getCarritoOneUser(req: Request, res: Response){
        var connection = pool.db2();
        var sql = 'SELECT C.idCarrito, P.idProducto, P.nombre, P.precio, C.cantidad, C.fecha, C.idUsuario, (C.Cantidad*P.precio) AS subtotal, P.pathI, U.nombre AS nombreUP, U.email AS emailUP FROM Carrito C '+
        'INNER JOIN producto P ON (P.idProducto=C.idProducto) '+
        'INNER JOIN usuario U ON (U.idUsuario=P.idUsuario) '+
        'WHERE C.idUsuario=:ID';
        var id = req.params.id;
         //recorremos las palabras clave
        connection.exec(sql,[id],function(result:any){
            res.json(result);
        });
    }

    public async deleteOneCarrito(req: Request, res: Response){
        var connection = pool.db2();
        var sql = 'DELETE Carrito WHERE idCarrito=:ID';
        var id = req.params.id;
        connection.exec(sql,[id],function(result:any){
            res.json(result);
        });
    }

    public async deleteAllCarrito(req: Request, res: Response){
        var connection = pool.db2();
        var sql = 'DELETE Carrito WHERE idUsuario=:ID';
        var id = req.params.id;
        console.log(id);
        
        connection.exec(sql,[id],function(result:any){
            res.json(result);
        });
    }

    public async addCompra(req: Request, res: Response){
        var connection = pool.db2();
        var sql = 'INSERT INTO factura (idUsuario,fecha) VALUES (:idUsuario,TO_TIMESTAMP(:fecha, \'DD/MM/YYYY HH24:MI:SS\'))';
        var obj = req.body;
       // console.log(obj);
         //recorremos las palabras clave
        connection.exec(sql,[obj.idUsuario,obj.fecha],function(result:any){
            for (let i = 0; i < obj.productos.length; i++) {
                const element = obj.productos[i];
                sql='INSERT INTO detalle_factura (idFactura, idProducto, cantidad, subtotal) VALUES '+
                '( (SELECT idFactura FROM factura WHERE idUsuario=:idUsuario AND fecha=TO_TIMESTAMP(:fecha, \'DD/MM/YYYY HH24:MI:SS\')),:idProducto,:cantidad,:subtotal ) ';
                connection.exec(sql,[obj.idUsuario,obj.fecha,element.IDPRODUCTO,element.CANTIDAD,element.SUBTOTAL],function(result:any){
                    console.log('añadido detalle');
                    if(i==obj.productos.length-1){res.json(result);}
                });
            }
           
        });
    }

    public async sendEmailCompra(req: Request, res:Response){
        console.log('/////*------------------- Entra');
        
        let transporter = nodemailer.createTransport({
            service: "gmail",
            auth: email.auth,
          });
          var table:string='';//contrendra la tabla del detalle
          table+='<div class="container text-center"> <table> <tr> <th>Producto</th> <th>Cantidad</th> <th>Precio Unitario</th> <th>Sub Total</th>    </tr> ';
          var obj = req.body;
          for (let i = 0; i < obj.productos.length; i++) {
              const element = obj.productos[i];
              table+=' <tr> '+
              ' <td>'+element.NOMBRE+'</td> '+
              ' <td>'+element.CANTIDAD+'</td> '+
              ' <td>'+element.PRECIO+'</td> '+
              ' <td>'+element.SUBTOTAL+'</td> '+
              ' </tr> ';
          }
          table+=' </table> </div> ';
          //Correo de factura a comprador
          let detalleFactura = await transporter.sendMail({           
            from: "familyu3213@gmail.com", // sender address
            to: obj.correoComprador, // list of receivers
            subject: "Tu compra se ah realizado con exito", // Subject line
            text: " Detalle de compra ", // plain text body
            html: " <br><h1> Su compra del dia "+ obj.fecha+" ah sido realizada con exito .</h1>"+"<br> "+
            " <h3 class=\"text-center\"> Detalle </h3>  <br> "+
            table+ ' <br> '+
            ' <h2 class="text-center"> Total: '+obj.total+' creditos </h2> '+
            " <br><img src=\"https://i.pinimg.com/originals/ed/bf/28/edbf289403dd7db09f07f6dc0c7b8456.jpg\"/> ", // html body
          });
          //Correos a dueños de productos
          for (let i = 0; i < obj.productos.length; i++) {
              const element = obj.productos[i];
              let info = await transporter.sendMail({           
                from: "familyu3213@gmail.com", // sender address
                to: element.EMAILUP, // list of receivers
                subject: "Han comprado un producto suyo", // Subject line
                text: " Su producto "+element.NOMBRE, // plain text body
                html: "<br><h1> Su publicacion "+ element.NOMBRE+" ah sido comprado el dia "+obj.fecha+".</h1>"+"<br>"+
                "<p> Estimado cliente "+element.NOMBREUP+" Ah sido comprado su producto "+element.NOMBRE+ " </p>"+
                "<p> por una cantidad de "+element.CANTIDAD+ " dando un total de "+element.SUBTOTAL+ " creditos que seran acreditados a su cuenta</p>"+
                "<br>"+ 
                "<br>"+
                "<br><img src=\"https://megalopolismx.com/images/noticias/201611/shcp-lanza-comunicado.jpg\"/>", // html body
              });
          }    
          res.json({text:'Se enviaron los correos'}); 
    }



}

export const productoController = new ProductoController();