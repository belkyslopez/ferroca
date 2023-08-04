export class Formateo{

    static verificarFormatRut(rut:string){ // verifica que el rut venga formateado de la forma 1111111-1
      if((rut.length == 9 || rut.length == 10) && rut.indexOf("-") == rut.length -2){ // se verifica tamaño
        return 0
      }else{
        if((rut.length == 11 && rut.substring(0,1) == "0")  ||  (rut.length == 12 && rut.substring(0,1) == "0" && rut.substring(1,1) == "0") ){
            return 0
      }else{
          return 1
      }
    }
  }
  
    static formatRutCeros(rut:string){// recive un rut con formato 11111111-1 y le pone ceros
      if(rut.length == 10){
        rut = "0" + rut
      }
      if(rut.length == 9){
        rut = "00" + rut
      }
      return rut.toUpperCase();
  }
  
      static formatRut(rut:string){  // le pone puntos 
        let auxRut = ""
        if(rut.substring(0,1) == "0"){
          auxRut = rut.substring(1)
        }
        if(auxRut.substring(0,1) == "0"){
          auxRut = auxRut.substring(1)
        }
        if(auxRut.length == 9 ){
          auxRut = auxRut.slice(0,1) + "." + auxRut.slice(1,4) + "." + auxRut.slice(4)
        }
        if(auxRut.length == 10){
          auxRut = auxRut.slice(0,2) + "." + auxRut.slice(2,5) + "." + auxRut.slice(5)
        }
        return auxRut
      }
  
    static formatFecha(fecha:string){ // recibe fecha en con el metodo toLocaleDateString
      let auxFecha  = fecha.split("/")
      if(auxFecha[0].length == 1){
        auxFecha[0] = "0" + auxFecha[0]
      }
      if(auxFecha[1].length == 1){
        auxFecha[1] = "0" + auxFecha[1]
      }
      return auxFecha[0] + "/" +auxFecha[1] + "/" + auxFecha[2]
    }
  
    static formatFechaAlreves(fecha:string){ // recive fecha formato dd/mm/aaaa
      let auxFecha = fecha.split("/")
      return auxFecha[2] + "/" + auxFecha[1] + "/" + auxFecha[0]
    }
  
  
    // formatea rut a formato 5888592-4
    static rutFormat(cleanRut) {
      let rutFormat;
      let part1;
      let part2;
      let result =
          cleanRut.slice(-4, -1) + '-' + cleanRut.substr(cleanRut.length - 1);
      for (let i = 4; i < cleanRut.length; i += 3) {
          result = cleanRut.slice(-3 - i, -i) + result;
      }
      let findGuion = result.indexOf('-');    
      part1 = result.slice(0, findGuion);
      // console.log('findGuion', findGuion);
      if(findGuion === 7){
          part2 = result.slice(7, 10);
      }
      if(findGuion === 8){
          part2 = result.slice(8, 10);
      }   
      // console.log('rut-1', part1);
      // console.log('rut-2', part2);
      let rutCompuesto = part1 + part2;
      if (part1.length === 7) {
          // console.log('se agregan 2 0');
          rutFormat = part1+part2;
      }
      if (part1.length === 8) {
          // console.log('se agrega 1 0');
          rutFormat = part1+part2;
      }
      // console.log('rutFormat', rutFormat);    
      return rutFormat;    
    }
    // elimina los 0 del rut y el caracter - 
    static clean(rut) {
        return typeof rut === 'string'
            ? rut.replace(/^0+|[^0-9kK]+/g, '').toUpperCase()
            : '';
    }
    // const cleanRut = this.clean(this.args.rutDoctor);
    // this.rutFormat(cleanRut);
  }