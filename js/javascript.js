var inputs = document.getElementsByClassName('registro__input');

for (var i = 0; i < inputs.length; i++) {

    inputs[i].addEventListener('keyup', function () {

        if (this.value.length >= 1) {
            this.nextElementSibling.classList.add('fijar')

        } else {
            this.nextElementSibling.classList.remove('fijar')
        }
    });
}

//CLASE CLIENTE:
class Cliente {
    constructor(nombre, apellidos, correo, telefono, dni, iban, swift, nombre_usuario, contraseña, fecha_nacimiento) {
        this._nombre = nombre;
        this._apellidos = apellidos;
        this._correo = correo;
        this._telefono = telefono;
        this._dni = dni;
        this._iban = iban;
        this._swift = swift;
        this._nombre_usuario = nombre_usuario;
        this._contraseña = contraseña;
        this._fecha_nacimiento = fecha_nacimiento;
    }

}

function validar() {
    let valido = true;

    try {
        var nombre, apellidos, correo, telefono, dni, iban, swift, nombre_usuario, contraseña, fecha_nacimiento;
        nombre = document.getElementById("nombre").value;
        apellidos = document.getElementById("apellidos").value;
        correo = document.getElementById("correo").value;
        telefono = document.getElementById("telefono").value;
        dni = document.getElementById("dni").value;
        iban = document.getElementById("iban").value;
        swift = document.getElementById("swift").value;
        nombre_usuario = document.getElementById("nombre_usuario").value;
        contraseña = document.getElementById("contraseña").value;
        fecha_nacimiento = document.getElementById("fecha_nacimiento").value;
        terminos = document.getElementById("terminos").checked;
        expresion_correo = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
        expresion_dni = /^\d{8}[A-Z]$/;
        expresion_telefono = /^\d{9}$/;
        expresion_fecha = /^\d{1,2}\/\d{1,2}\/\d{2,4}$/;
        var mayor_edad = new Date(new Date().getTime() - 18 * 365 * 24 * 60 * 60 * 1000);









        if (nombre === "" || apellidos === "" || correo === "" || telefono === "" || dni === "" || iban === "" || swift === "" || nombre_usuario === "" || fecha_nacimiento === "") {
            alert("Todos los campos son obligatorios.");
            valido = false;
        }
        else if (nombre.length > 30) {
            alert("El nombre es muy largo.");
            valido = false;
        }
        else if (apellidos.length > 80) {
            alert("Los apellidos son muy largos.");
            valido = false;
        }
        else if (correo.length > 100) {
            alert("El correo es muy largo.");
            valido = false;
        }
        else if (!expresion_correo.test(correo)) {
            alert("El correo no es valido.");
            valido = false;
        }
        else if (telefono.length > 9) {
            alert("El telefono es muy largo.");
            valido = false;
        }
        else if (!expresion_telefono.test(telefono)) {
            alert("El telefono no es valido.");
            valido = false;
        }
        else if (dni.length > 9) {
            alert("El dni es muy largo.");
            valido = false;
        }
        else if (!expresion_dni.test(dni)) {
            alert("El dni no es valido.");
            valido = false;
        }
        else if (fn_ValidateIBAN(iban) === false) {
            alert("El iban es incorrecto");
            valido = false;
        }
        else if (swift.length > 11) {
            alert("El swift es muy largo.");
            valido = false;
        }
        else if (nombre_usuario.length > 20 || contraseña.length > 20) {
            alert("El nombre de usuario y contraseña max 20 caracteres.");
            valido = false;
        }
        else if (!expresion_fecha.test(new Date(fecha_nacimiento).toLocaleDateString("es-ES"))) {
            alert("La fecha no es valida. (dd/mm/yyyy)");
            valido = false;
        }
        else if (new Date(fecha_nacimiento) > mayor_edad) {
            alert("No eres mayor de edad");
            valido = false;
        }

        if (!document.getElementById('terminos').checked) {
            alert("Porfavor acepta los terminos.");
            valido = false;
        }

        if (valido===true){
            window.open('index.html');
        }
        

    } catch (err) {
        console.log(err)
        valido = false;
    } finally {
        return valido;
       
    }

    
}







function generarSWIFT() {
    const iban = document.getElementById("iban").value;
    const swiftInput = document.getElementById("swift")
    if (fn_ValidateIBAN(iban)) {
        const entidad = iban.slice(4, 8);
        console.log(entidad)

        swiftInput.value = getBICBank(entidad);
        swiftInput.nextElementSibling.classList.add('fijar')
    } else
        swiftInput.value = "";

}

function fn_ValidateIBAN(iban) {

    iban = iban.toUpperCase();
    iban = iban.trim();
    iban = iban.replace(/\s/g, "");

    var letra1, letra2, num1, num2;
    var isbanaux;
    var numeroSustitucion;

    if (iban.length != 24) {
        return false;
        console.log(iban);
    }

    letra1 = iban.substring(0, 1);
    letra2 = iban.substring(1, 2);
    num1 = getnumiban(letra1);
    num2 = getnumiban(letra2);

    isbanaux = String(num1) + String(num2) + iban.substring(2);
    isbanaux = isbanaux.substring(6) + isbanaux.substring(0, 6);

    resto = modulo97(isbanaux);
    if (resto == 1) {
        return true;
    } else {
        return false;
        console.log(iban);
    }

}


function modulo97(iban) {
    var parts = Math.ceil(iban.length / 7);
    var remainer = "";

    for (var i = 1; i <= parts; i++) {
        remainer = String(parseFloat(remainer + iban.substr((i - 1) * 7, 7)) % 97);
    }

    return remainer;
}

function getnumiban(letra) {
    ls_letras = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    return ls_letras.search(letra) + 10;
}


function getBICBank(entity) {
    /**
  * Mapeo de códigos BIC
  **/
    var bicMap = new Object();
    bicMap["0001"] = "BSABESBBXXX";
    bicMap["0003"] = "BDEPESM1XXX";
    bicMap["0004"] = "POPUESMMXXX";
    bicMap["0008"] = "BSABESBBXXX";
    bicMap["0009"] = "BBVAESMMXXX";
    bicMap["0010"] = "BBVAESMMXXX";
    bicMap["0013"] = "BSABESBBXXX";
    bicMap["0015"] = "BBVAESMMXXX";
    bicMap["0016"] = "BSCHESMMXXX";
    bicMap["0019"] = "DEUTESBBXXX";
    bicMap["0020"] = "BBVAESMMXXX";
    bicMap["0021"] = "BDEPESM1XXX";
    bicMap["0024"] = "POPUESMMXXX";
    bicMap["0029"] = "CSSOES2SXXX";
    bicMap["0030"] = "BSCHESMMXXX";
    bicMap["0031"] = "ETCHES2GXXX";
    bicMap["0035"] = "BBVAESMMXXX";
    bicMap["0036"] = "SABNESMMXXX";
    bicMap["0041"] = "CAIXESBBXXX";
    bicMap["0042"] = "BSABESBBXXX";
    bicMap["0043"] = "BSABESBBXXX";
    bicMap["0044"] = "BBVAESMMXXX";
    bicMap["0045"] = "BBVAESMMXXX";
    bicMap["0046"] = "GALEES2GXXX";
    bicMap["0049"] = "BSCHESMMXXX";
    bicMap["0050"] = "BBVAESMMXXX";
    bicMap["0053"] = "BSCHESMMXXX";
    bicMap["0056"] = "CAHMESMMXXX";
    bicMap["0057"] = "BVADESMMXXX";
    bicMap["0058"] = "BNPAESMMXXX";
    bicMap["0059"] = "MADRESMMXXX";
    bicMap["0061"] = "BMARES2MXXX";
    bicMap["0062"] = "BBVAESMMXXX";
    bicMap["0063"] = "CAHMESMMXXX";
    bicMap["0065"] = "BARCESMMXXX";
    bicMap["0067"] = "BSCHESMMXXX";
    bicMap["0068"] = "BBVAESMMXXX";
    bicMap["0069"] = "CAIXESBBXXX";
    bicMap["0072"] = "POPUESMMXXX";
    bicMap["0073"] = "OPENESMMXXX";
    bicMap["0075"] = "POPUESMMXXX";
    bicMap["0076"] = "BSABESBBXXX";
    bicMap["0077"] = "BBVAESMMXXX";
    bicMap["0078"] = "BAPUES22XXX";
    bicMap["0081"] = "BSABESBBXXX";
    bicMap["0082"] = "POPUESMMXXX";
    bicMap["0085"] = "BSCHESMMXXX";
    bicMap["0086"] = "NORTESMMXXX";
    bicMap["0087"] = "CAHMESMMXXX";
    bicMap["0093"] = "CAIXESBBXXX";
    bicMap["0094"] = "BVALESMMXXX";
    bicMap["0095"] = "POPUESMMXXX";
    bicMap["0097"] = "POPUESMMXXX";
    bicMap["0099"] = "AHCRESVVXXX";
    bicMap["0099"] = "CAHMESMMXXX";
    bicMap["0100"] = "BSCHESMMXXX";
    bicMap["0101"] = "CAIXESBBXXX";
    bicMap["0102"] = "BBVAESMMXXX";
    bicMap["0103"] = "BARCESMMXXX";
    bicMap["0104"] = "BBVAESMMXXX";
    bicMap["0107"] = "BNPAESMSXXX";
    bicMap["0108"] = "SOGEESMMXXX";
    bicMap["0109"] = "BSCHESMMXXX";
    bicMap["0112"] = "BSABESBBXXX";
    bicMap["0114"] = "CAIXESBBXXX";
    bicMap["0118"] = "BSABESBBXXX";
    bicMap["0119"] = "BSABESBBXXX";
    bicMap["0122"] = "CITIES2XXXX";
    bicMap["0124"] = "CESCESBBXXX";
    bicMap["0125"] = "BAOFESM1XXX";
    bicMap["0127"] = "BBVAESMMXXX";
    bicMap["0128"] = "BKBKESMMXXX";
    bicMap["0130"] = "CGDIESMMXXX";
    bicMap["0131"] = "BESMESMMXXX";
    bicMap["0133"] = "MIKBESB1XXX";
    bicMap["0136"] = "AREBESMMXXX";
    bicMap["0137"] = "BBVAESMMXXX";
    bicMap["0138"] = "BKOAES22XXX";
    bicMap["0142"] = "CAIXESBBXXX";
    bicMap["0149"] = "BNPAESMSXXX";
    bicMap["0151"] = "CHASESM3XXX";
    bicMap["0154"] = "BSUIESMMXXX";
    bicMap["0155"] = "BRASESMMXXX";
    bicMap["0156"] = "ABNAESMMXXX";
    bicMap["0159"] = "COBAESMXXXX";
    bicMap["0160"] = "BOTKESMXXXX";
    bicMap["0162"] = "MIDLESMMXXX";
    bicMap["0167"] = "GEBAESMMXXX";
    bicMap["0168"] = "BBRUESMXXXX";
    bicMap["0169"] = "NACNESMMXXX";
    bicMap["0182"] = "BBVAESMMXXX";
    bicMap["0184"] = "BEDFESM1XXX";
    bicMap["0185"] = "BSABESBBXXX";
    bicMap["0186"] = "BFIVESBBXXX";
    bicMap["0188"] = "ALCLESMMXXX";
    bicMap["0190"] = "BBPIESMMXXX";
    bicMap["0196"] = "WELAESMMXXX";
    bicMap["0198"] = "BCOEESMMXXX";
    bicMap["0200"] = "PRVBESB1XXX";
    bicMap["0202"] = "BBVAESMMXXX";
    bicMap["0205"] = "DEUTESBBXXX";
    bicMap["0208"] = "CSSOES2SXXX";
    bicMap["0209"] = "BSABESBBXXX";
    bicMap["0210"] = "GALEES2GXXX";
    bicMap["0216"] = "POHIESMMXXX";
    bicMap["0219"] = "BMCEESMMXXX";
    bicMap["0220"] = "FIOFESM1XXX";
    bicMap["0224"] = "SCFBESMMXXX";
    bicMap["0226"] = "UBSWESMMXXX";
    bicMap["0227"] = "BBVAESMMXXX";
    bicMap["0229"] = "POPLESMMXXX";
    bicMap["0230"] = "BSABESBBXXX";
    bicMap["0232"] = "INVLESMMXXX";
    bicMap["0233"] = "POPIESMMXXX";
    bicMap["0234"] = "CCOCESMMXXX";
    bicMap["0235"] = "PICHESMMXXX";
    bicMap["0237"] = "CSURES2CXXX";
    bicMap["0238"] = "PSTRESMMXXX";
    bicMap["0239"] = "EVOBESMMXXX";
    bicMap["0486"] = "CECAESMM086";
    bicMap["0487"] = "GBMNESMMXXX";
    bicMap["0490"] = "CAIXESBBXXX";
    bicMap["1001"] = "BBVAESMMXXX";
    bicMap["1004"] = "BBVAESMMXXX";
    bicMap["1005"] = "BBVAESMMXXX";
    bicMap["1301"] = "BBVAESMMXXX";
    bicMap["1302"] = "BBVAESMMXXX";
    bicMap["1460"] = "CRESESMMXXX";
    bicMap["1465"] = "INGDESMMXXX";
    bicMap["1469"] = "BBVAESMMXXX";
    bicMap["1474"] = "CITIESMXXXX";
    bicMap["1480"] = "VOWAES21XXX";
    bicMap["1484"] = "BSCHESMMXXX";
    bicMap["1485"] = "BOFAES2XXXX";
    bicMap["1490"] = "SELFESMMXXX";
    bicMap["1491"] = "TRIOESMMXXX";
    bicMap["1494"] = "BCITESMMXXX";
    bicMap["1513"] = "CGDIESMMXXX";
    bicMap["1524"] = "UBIBESMMXXX";
    bicMap["1534"] = "KBLXESMMXXX";
    bicMap["1544"] = "BACAESMMXXX";
    bicMap["1545"] = "AGRIESMMXXX";
    bicMap["2000"] = "CECAESMMXXX";
    bicMap["2001"] = "CECAESMM105";
    bicMap["2005"] = "BSABESBBXXX";
    bicMap["2006"] = "UCJAES2MXXX";
    bicMap["2007"] = "UCJAES2MXXX";
    bicMap["2010"] = "CECAESMM010";
    bicMap["2010"] = "CECAESMM086";
    bicMap["2011"] = "CAIXESBBXXX";
    bicMap["2012"] = "CAIXESBBXXX";
    bicMap["2013"] = "CESCESBBXXX";
    bicMap["2015"] = "BASKES2BXXX";
    bicMap["2016"] = "BASKES2BXXX";
    bicMap["2017"] = "CECAESMM017";
    bicMap["2017"] = "CECAESMM086";
    bicMap["2018"] = "CAIXESBBXXX";
    bicMap["2019"] = "CECAESMM099";
    bicMap["2020"] = "UCJAES2MXXX";
    bicMap["2021"] = "CAHMESMMXXX";
    bicMap["2022"] = "CAHMESMMXXX";
    bicMap["2024"] = "CSURES2CXXX";
    bicMap["2025"] = "CSURES2CXXX";
    bicMap["2028"] = "CECAESMM105";
    bicMap["2030"] = "CAIXESBBXXX";
    bicMap["2031"] = "CECAESMM031";
    bicMap["2032"] = "CAIXESBBXXX";
    bicMap["2033"] = "CAIXESBBXXX";
    bicMap["2034"] = "CAIXESBBXXX";
    bicMap["2035"] = "CSPAES2LXXX";
    bicMap["2037"] = "CAHMESMMXXX";
    bicMap["2038"] = "CAHMESMMXXX";
    bicMap["2039"] = "UCJAES2MXXX";
    bicMap["2040"] = "BBVAESMMXXX";
    bicMap["2041"] = "CESCESBBXXX";
    bicMap["2042"] = "CAHMESMMXXX";
    bicMap["2043"] = "CECAESMM043";
    bicMap["2045"] = "CECAESMM045";
    bicMap["2046"] = "CAGLESMMXXX";
    bicMap["2048"] = "CECAESMM048";
    bicMap["2049"] = "CSPAES2LXXX";
    bicMap["2051"] = "CECAESMM051";
    bicMap["2052"] = "CAHMESMMXXX";
    bicMap["2053"] = "CAIXESBBXXX";
    bicMap["2054"] = "CAIXESBBXXX";
    bicMap["2055"] = "CECAESMM099";
    bicMap["2056"] = "CECAESMM056";
    bicMap["2057"] = "CAGLESMMXXX";
    bicMap["2058"] = "UCJAES2MXXX";
    bicMap["2059"] = "BBVAESMMXXX";
    bicMap["2060"] = "CAHMESMMXXX";
    bicMap["2061"] = "CSSOES2SXXX";
    bicMap["2062"] = "BASKES2BXXX";
    bicMap["2063"] = "BASKES2BXXX";
    bicMap["2065"] = "CAIXESBBXXX";
    bicMap["2066"] = "CECAESMM066";
    bicMap["2068"] = "CAHMESMMXXX";
    bicMap["2069"] = "CAHMESMMXXX";
    bicMap["2070"] = "CAIXESBBXXX";
    bicMap["2071"] = "CAIXESBBXXX";
    bicMap["2072"] = "CSSOES2SXXX";
    bicMap["2073"] = "CESCESBBXXX";
    bicMap["2074"] = "BBVAESMMXXX";
    bicMap["2075"] = "CECAESMM105";
    bicMap["2076"] = "BSABESBBXXX";
    bicMap["2077"] = "CAHMESMMXXX";
    bicMap["2078"] = "CSPAES2LXXX";
    bicMap["2079"] = "CSPAES2LXXX";
    bicMap["2080"] = "CAGLESMMXXX";
    bicMap["2081"] = "BSABESBBXXX";
    bicMap["2082"] = "BASKES2BXXX";
    bicMap["2083"] = "BASKES2BXXX";
    bicMap["2084"] = "CSPAES2LXXX";
    bicMap["2085"] = "CAZRES2ZXXX";
    bicMap["2086"] = "CECAESMM086";
    bicMap["2088"] = "BBVAESMMXXX";
    bicMap["2089"] = "CECAESMM031";
    bicMap["2090"] = "BSABESBBXXX";
    bicMap["2091"] = "CAGLESMMXXX";
    bicMap["2092"] = "UCJAES2MXXX";
    bicMap["2093"] = "BSABESBBXXX";
    bicMap["2094"] = "CAHMESMMXXX";
    bicMap["2095"] = "BASKES2BXXX";
    bicMap["2096"] = "CSPAES2LXXX";
    bicMap["2097"] = "BASKES2BXXX";
    bicMap["2098"] = "CAIXESBBXXX";
    bicMap["2099"] = "CECAESMM099";
    bicMap["2100"] = "CAIXESBBXXX";
    bicMap["2101"] = "BASKES2BXXX";
    bicMap["2102"] = "BSABESBBXXX";
    bicMap["2103"] = "UCJAES2MXXX";
    bicMap["2104"] = "CSSOES2SXXX";
    bicMap["2105"] = "CECAESMM105";
    bicMap["2106"] = "CAIXESBBXXX";
    bicMap["2107"] = "BBVAESMMXXX";
    bicMap["3001"] = "BCOEESMM001";
    bicMap["3005"] = "BCOEESMM005";
    bicMap["3007"] = "BCOEESMM007";
    bicMap["3008"] = "BCOEESMM008";
    bicMap["3009"] = "BCOEESMM009";
    bicMap["3016"] = "BCOEESMM016";
    bicMap["3017"] = "BCOEESMM017";
    bicMap["3018"] = "BCOEESMM018";
    bicMap["3020"] = "BCOEESMM020";
    bicMap["3021"] = "BCOEESMM191";
    bicMap["3022"] = "BCOEESMM060";
    bicMap["3023"] = "BCOEESMM023";
    bicMap["3024"] = "BAOFESM1XXX";
    bicMap["3025"] = "CDENESBBXXX";
    bicMap["3029"] = "CCRIES2A029";
    bicMap["3035"] = "CLPEES2MXXX";
    bicMap["3045"] = "CCRIES2A045";
    bicMap["3054"] = "CCRIES2AXXX";
    bicMap["3056"] = "BCOEESMM190";
    bicMap["3057"] = "CCRIES2AXXX";
    bicMap["3058"] = "CCRIES2AXXX";
    bicMap["3059"] = "BCOEESMM059";
    bicMap["3060"] = "BCOEESMM060";
    bicMap["3061"] = "CCRIES2AXXX";
    bicMap["3062"] = "BCOEESMM190";
    bicMap["3063"] = "BCOEESMM063";
    bicMap["3064"] = "BCOEESMM190";
    bicMap["3065"] = "BCOEESMM187";
    bicMap["3066"] = "BCOEESMM191";
    bicMap["3067"] = "BCOEESMM067";
    bicMap["3068"] = "CAGLESMMXXX";
    bicMap["3069"] = "CAZRES2ZXXX";
    bicMap["3070"] = "BCOEESMM070";
    bicMap["3072"] = "CCRIES2AXXX";
    bicMap["3076"] = "BCOEESMM076";
    bicMap["3078"] = "BCOEESMM060";
    bicMap["3079"] = "BCOEESMM187";
    bicMap["3080"] = "BCOEESMM080";
    bicMap["3081"] = "BCOEESMM081";
    bicMap["3082"] = "CCRIES2AXXX";
    bicMap["3083"] = "CCRIES2AXXX";
    bicMap["3084"] = "CVRVES2BXXX";
    bicMap["3085"] = "BCOEESMM085";
    bicMap["3089"] = "BCOEESMM089";
    bicMap["3092"] = "BCOEESMM191";
    bicMap["3093"] = "BCOEESMM191";
    bicMap["3094"] = "CCRIES2AXXX";
    bicMap["3095"] = "CCRIES2A095";
    bicMap["3096"] = "BCOEESMM096";
    bicMap["3098"] = "BCOEESMM098";
    bicMap["3102"] = "BCOEESMM102";
    bicMap["3102"] = "CCRIES2A102";
    bicMap["3104"] = "BCOEESMM104";
    bicMap["3105"] = "CCRIES2A105";
    bicMap["3108"] = "CCRIES2AXXX";
    bicMap["3110"] = "CCRIES2A110";
    bicMap["3110"] = "BCOEESMM110";
    bicMap["3111"] = "BCOEESMM111";
    bicMap["3112"] = "CCRIES2A112";
    bicMap["3113"] = "BCOEESMM113";
    bicMap["3114"] = "CCRIES2AXXX";
    bicMap["3115"] = "BCOEESMM115";
    bicMap["3116"] = "BCOEESMM116";
    bicMap["3117"] = "BCOEESMM117";
    bicMap["3118"] = "CCRIES2A118";
    bicMap["3119"] = "CCRIES2A119";
    bicMap["3121"] = "CCRIES2A121";
    bicMap["3123"] = "CCRIES2A123";
    bicMap["3127"] = "BCOEESMM127";
    bicMap["3128"] = "BCOEESMM190";
    bicMap["3129"] = "BCOEESMM191";
    bicMap["3130"] = "BCOEESMM130";
    bicMap["3131"] = "CCRIES2AXXX";
    bicMap["3134"] = "BCOEESMM134";
    bicMap["3135"] = "CCRIES2A135";
    bicMap["3137"] = "CCRIES2AXXX";
    bicMap["3138"] = "BCOEESMM138";
    bicMap["3140"] = "BCOEESMM140";
    bicMap["3141"] = "CESCESBBXXX";
    bicMap["3144"] = "BCOEESMM144";
    bicMap["3146"] = "CCCVESM1XXX";
    bicMap["3147"] = "CCRIES2AXXX";
    bicMap["3150"] = "BCOEESMM150";
    bicMap["3152"] = "CCRIES2A152";
    bicMap["3157"] = "CCRIES2A157";
    bicMap["3159"] = "BCOEESMM159";
    bicMap["3160"] = "CCRIES2A160";
    bicMap["3161"] = "BCOEESMM060";
    bicMap["3162"] = "BCOEESMM162";
    bicMap["3163"] = "CCRIES2AXXX";
    bicMap["3165"] = "CCRIES2A165";
    bicMap["3166"] = "BCOEESMM166";
    bicMap["3167"] = "CCRIES2AXXX";
    bicMap["3171"] = "BCOEESMM191";
    bicMap["3172"] = "CCOCESMMXXX";
    bicMap["3174"] = "BCOEESMM174";
    bicMap["3177"] = "CCRIES2AXXX";
    bicMap["3177"] = "BCOEESMM177";
    bicMap["3179"] = "CCRIES2A179";
    bicMap["3181"] = "CCRIES2AXXX";
    bicMap["3183"] = "CASDESBBXXX";
    bicMap["3186"] = "CCRIES2A186";
    bicMap["3187"] = "BCOEESMM187";
    bicMap["3188"] = "CCRIES2AXXX";
    bicMap["3189"] = "BCOEESMM191";
    bicMap["3190"] = "BCOEESMM190";
    bicMap["3191"] = "BCOEESMM191";
    bicMap["9000"] = "ESPBESMMXXX";

    return bicMap[entity];
}
