function buttonStartStammtisch () {
    var bild_height = 1080;
    var bild_width = 1920;
    var logo_width_grenze = 1250;
    var logo_height_grenze = 400;
    var logo_start_height = 490;
    var logo_start_width = 350;
    var datum = document.getElementById("datum").value;
    var dunkel = document.getElementById("dunkel").value;
    dunkel = dunkel * 0.01;
    var blur = document.getElementById("blur").value;
    var logoArtBild = document.getElementById('logoArtBild');

    var c=document.getElementById("canvasStammtisch");
	var ctx=c.getContext("2d");
	
	//####################################################//
	// Ab hier wird das Hintergrund-BILD gemalt ###########//
	//####################################################//	
	var bild = document.getElementById('vorschau_bild_stammtisch');
	c.height = bild_height;
	c.width = bild_width;
    ctx.filter = "blur(" + blur + "px)";
    ctx.drawImage(bild, 0, 0, 1920, 1080);	 
    ctx.filter = "none";
    ctx.globalAlpha = dunkel;
    ctx.fillRect(0,0,bild_width,bild_height);
    ctx.globalAlpha = 1;

	//####################################################//
	// Ab hier werden die Balken gemalt ##################//
    //####################################################//		
	ctx.globalAlpha = 0.5;
    ctx.fillStyle = "#b4b8bd";
    // LINKS OBEN 
    //klein
	ctx.beginPath();
	ctx.moveTo(170,0);
	ctx.lineTo(140,0);
	ctx.lineTo(0,200);
	ctx.lineTo(0,240);
    ctx.closePath(); 
    ctx.fill();
    ctx.stroke();    
    // groß
	ctx.beginPath();
	ctx.moveTo(255,0);
	ctx.lineTo(190,0);
	ctx.lineTo(0,265);
	ctx.lineTo(0,355);
    ctx.closePath(); 
    ctx.fill();
    ctx.stroke();
    
    // RECHTS UNTEN
    // klein
	ctx.beginPath();
	ctx.moveTo(bild_width-170,bild_height);
	ctx.lineTo(bild_width-140,bild_height);
	ctx.lineTo(bild_width,bild_height-200);
	ctx.lineTo(bild_width,bild_height-240);
    ctx.closePath(); 
    ctx.fill();
    ctx.stroke();
    // groß
	ctx.beginPath();
	ctx.moveTo(bild_width-255,bild_height);
	ctx.lineTo(bild_width-190,bild_height);
	ctx.lineTo(bild_width,bild_height-265);
	ctx.lineTo(bild_width,bild_height-355);
    ctx.closePath(); 
    ctx.fill();
    ctx.stroke();

    ctx.globalAlpha = 1;
    
	//####################################################//
	// Ab hier wird das Stuk-LOGO gemalt #################//
	//####################################################//
    var stuk_logo = new Image();
    stuk_logo.src = "bilder/stuk_logo.png";
    stuk_logo.width = stuk_logo.width*0.8;
    stuk_logo.height = stuk_logo.height*0.8;
    ctx.drawImage(stuk_logo, 20, bild_height-stuk_logo.height-17, stuk_logo.width, stuk_logo.height);	 
    
	//####################################################//
	// Ab hier wird das LES-LOGO gemalt ##################//
	//####################################################//
    var les_logo = new Image();
    les_logo.src = "bilder/logo_farbe.svg";
    ctx.drawImage(les_logo, 900, 185, les_logo.width*0.92, les_logo.height*0.92);
    
    //####################################################//
	// Ab hier wird der Text geschrieben #################//
	//####################################################//    
	ctx.font = "bold 100px Titillium Web";
	ctx.fillStyle = "white";
    ctx.fillText("Kommt zum",  350, 302);  
	ctx.font = "bold 110px Titillium Web";
    ctx.fillText("Stammtisch!", 574, 393);    
	ctx.font = "88px Titillium Web";
    ctx.fillText("am " + datum, 1036, 458);
	ctx.font = "70px Titillium Web";
    ctx.fillText("www.leipzigesports.de", 998, 1050);

    //####################################################//
	// Ab hier wird das Logo-BILD gemalt ###########//
	//####################################################//	
    var logo = document.getElementById('vorschau_logo_stammtisch');
    if(logoArtBild.checked){
        if(logo != null){
            // 1. Prüfe ob die Höhe des Logos größer als unsere Grenze ist
            if(logo.height > logo_height_grenze){
                // dann setzen wir die Höhe auf unser Maximum
                logo.height = logo_height_grenze;
                // um den gleichen Faktor muss die Breite verringert werden
                logo.width = logo.width * (logo_height_grenze/logo.height);
            }
            // 2. Prüfe ob die Breite des Logos größer als unsere Grenze ist
            // -> Höhe wurde schon zuvor betrachtet und gesetzt
            if(logo.width > logo_width_grenze){
                // dann setzen wir die Breite auf unser Maximum
                logo.width = logo_width_grenze;
                // um den gleichen Faktor muss die Höhe verringert werden
                logo.height = logo.height * (logo_width_grenze/logo.width);
            }
            var logo_width = logo_start_width + (logo_width_grenze-logo.width)/2;
            var logo_height = logo_start_height + (logo_height_grenze-logo.height)/2;
            ctx.drawImage(logo, logo_width, logo_height, logo.width, logo.height);    
        }
    } else {
        var logoText = document.getElementById("logoText").value
        ctx.font = "italic 200px Kanit black";
        var textLength = ctx.measureText(logoText).width;
        logo_start_width = logo_start_width - textLength  /2;  
        ctx.fillText(logoText, logo_start_width, 700);
    }

    //####################################################//
	// Ab hier wird das Grafik-BILD gemalt ###########//
	//####################################################//	
    var grafik = document.getElementById('vorschau_grafik_stammtisch');
    if(grafik != null){
        ctx.drawImage(grafik, 0, 0, grafik.width, grafik.height);
    }

	//####################################################//
	// ERFOLG! ###########################################//
	//####################################################//
    bild.style.display = "none";
    if(logo != null){
        logo.style.display = "none";
    }
    if(grafik != null){
        grafik.style.display = "none";
    }
	document.getElementById("ausgabeStammtisch").innerHTML = "Erfolg! Jetzt nur noch<br/>Rechtsklick > Bild speichern unter...<br/> klicken.";
}

function dateiauswahlStammtisch(evt) {
    var dateien = evt.target.files; // FileList object
    // Auslesen der gespeicherten Dateien durch Schleife
    if(dateien.length > 0){
        var f = dateien[0];
        // nur Bild-Dateien
        if (!f.type.match('image.*')) {
            document.getElementById("ausgabeStammtisch").innerHTML = "!! Sie haben keine Bild-Datei ausgewählt !!";
        } else {
            var reader = new FileReader();
            reader.onload = (function (theFile) {
                return function (e) {
                    // erzeuge Thumbnails.
                    var vorschau = document.getElementById("vorschau_bild_stammtisch");
                    if(vorschau == null){
                    vorschau = document.createElement('img');
                    vorschau.id="vorschau_bild_stammtisch";
                    vorschau.className = 'vorschau';
                    }
                    vorschau.src = e.target.result;
                    vorschau.title = theFile.name;
                    document.getElementById('vorschauStammtisch')
                        .insertBefore(vorschau, null);
                };
            })(f);
            // Bilder als Data URL auslesen.
            reader.readAsDataURL(f);
            document.getElementById("ausgabeStammtisch").innerHTML = "Bitte wählen Sie die Eigenschaften aus <br/>und drücken auf 'Start'";
        }
    }
}

function auswahlLogoStammtisch(evt) {
    var dateien = evt.target.files; // FileList object
    // Auslesen der gespeicherten Dateien durch Schleife
    if(dateien.length > 0){
        var f = dateien[0];
        // nur Bild-Dateien
        if (!f.type.match('image.*')) {
            document.getElementById("ausgabeStammtisch").innerHTML = "!! Sie haben keine Bild-Datei ausgewählt !!";
        } else {
            var reader = new FileReader();
            reader.onload = (function (theFile) {
                return function (e) {
                    // erzeuge Thumbnails.
                    var vorschau = document.getElementById("vorschau_logo_stammtisch");
                    if(vorschau == null){
                    vorschau = document.createElement('img');
                    vorschau.id="vorschau_logo_stammtisch";
                    vorschau.className = 'vorschau';
                    }
                    vorschau.src = e.target.result;
                    vorschau.title = theFile.name;
                    document.getElementById('vorschauLogoStammtisch')
                        .insertBefore(vorschau, null);
                };
            })(f);
            // Bilder als Data URL auslesen.
            reader.readAsDataURL(f);
        }
    }
}

function auswahlGrafikStammtisch(evt) {
    var dateien = evt.target.files; // FileList object
    // Auslesen der gespeicherten Dateien durch Schleife
    if(dateien.length > 0){
        var f = dateien[0];
        // nur Bild-Dateien
        if (!f.type.match('image.*')) {
            document.getElementById("ausgabeStammtisch").innerHTML = "!! Sie haben keine Bild-Datei ausgewählt !!";
        } else {
            var reader = new FileReader();
            reader.onload = (function (theFile) {
                return function (e) {
                    // erzeuge Thumbnails.
                    var vorschau = document.getElementById("vorschau_grafik_stammtisch");
                    if(vorschau == null){
                    vorschau = document.createElement('img');
                    vorschau.id="vorschau_grafik_stammtisch";
                    vorschau.className = 'vorschau';
                    }
                    vorschau.src = e.target.result;
                    vorschau.title = theFile.name;
                    document.getElementById('vorschauGrafikStammtisch')
                        .insertBefore(vorschau, null);
                };
            })(f);
            // Bilder als Data URL auslesen.
            reader.readAsDataURL(f);
        }
    }
}

function dunkelChange(evt) {
    document.getElementById('dunkelWert').value = evt.target.value + " % ";
}

function blurChange(evt) {
    document.getElementById('blurWert').value = evt.target.value;
}