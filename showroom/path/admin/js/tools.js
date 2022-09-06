function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

  function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    let expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }

  function deleteCookie(name) {
    document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  }

  function printElem(divId) {
    var content = document.getElementById(divId).innerHTML;
    var mywindow = window.open("", "Print", "height=600,width=800");

    mywindow.document.write(
      '<html><head><meta charset="gb18030"><title>Print</title>'
    );
    mywindow.document.write("</head><body >");
    mywindow.document.write(content);
    mywindow.document.write("</body></html>");

    mywindow.document.close();
    mywindow.focus();
    mywindow.print();
    mywindow.close();
    return true;
  }

  function selectedProv(x) {
    var cad = "";
    $.ajax({
      url: "../../db/consultas/getProveedoresUno.php",
      dataType: "text",
      type: "post",
      data: { x: x },
      async: false,
      beforeSend: function () {},
      complete: function () {},
      error: function (resp) {
        console.log(resp);
      },
      success: function (resp) {
        var provs = resp.split("||");

        var cleanArray = provs.filter(function (el) {
          return el != "";
        });

        for (var i = 0; i <= cleanArray.length - 1; i++) {
          var uniq = provs[i].split("|");

          cad =
            cad +
            '<option value ="' +
            uniq[0] +
            '" attr = "' +
            uniq[1] +
            '">' +
            uniq[1] +
            "|" +
            uniq[0] +
            "</option>";
        }
        $("#pProv").html(cad);
      },
    });
  }

  function SVGToImage(settings) {
    let _settings = {
      svg: null,
      mimetype: "image/png",
      quality: 0.92,
      width: "auto",
      height: "auto",
      outputFormat: "base64",
    };

    // Override default settings
    for (let key in settings) {
      _settings[key] = settings[key];
    }

    return new Promise(function (resolve, reject) {
      let svgNode;

      // Create SVG Node if a plain string has been provided
      if (typeof _settings.svg == "string") {
        // Create a non-visible node to render the SVG string
        let SVGContainer = document.createElement("div");
        SVGContainer.style.display = "none";
        SVGContainer.innerHTML = _settings.svg;
        svgNode = SVGContainer.firstElementChild;
      } else {
        svgNode = _settings.svg;
      }

      let canvas = document.createElement("canvas");
      let context = canvas.getContext("2d");

      let svgXml = new XMLSerializer().serializeToString(svgNode);
      let svgBase64 = "data:image/svg+xml;base64," + btoa(svgXml);

      const image = new Image();

      image.onload = function () {
        let finalWidth, finalHeight;

        // Calculate width if set to auto and the height is specified (to preserve aspect ratio)
        if (_settings.width === "auto" && _settings.height !== "auto") {
          finalWidth = (this.width / this.height) * _settings.height;
          // Use image original width
        } else if (_settings.width === "auto") {
          finalWidth = this.naturalWidth;
          // Use custom width
        } else {
          finalWidth = _settings.width;
        }

        // Calculate height if set to auto and the width is specified (to preserve aspect ratio)
        if (_settings.height === "auto" && _settings.width !== "auto") {
          finalHeight = (this.height / this.width) * _settings.width;
          // Use image original height
        } else if (_settings.height === "auto") {
          finalHeight = this.naturalHeight;
          // Use custom height
        } else {
          finalHeight = _settings.height;
        }

        // Define the canvas intrinsic size
        canvas.width = finalWidth;
        canvas.height = finalHeight;

        // Render image in the canvas
        context.drawImage(this, 0, 0, finalWidth, finalHeight);

        if (_settings.outputFormat == "blob") {
          // Fullfil and Return the Blob image
          canvas.toBlob(
            function (blob) {
              resolve(blob);
            },
            _settings.mimetype,
            _settings.quality
          );
        } else {
          // Fullfil and Return the Base64 image
          resolve(canvas.toDataURL(_settings.mimetype, _settings.quality));
        }
      };

      // Load the SVG in Base64 to the image
      image.src = svgBase64;
    });
  }

  onScan.attachTo(document, {
    suffixKeyCodes: [13], // enter-key expected at the end of a scan
    reactToPaste: true, // Compatibility to built-in scanners in paste-mode (as opposed to keyboard-mode)
    onScan: function(sCode, iQty) { // Alternative to document.addEventListener('scan')
        console.log('Scanned: ' + iQty + 'x ' + sCode); 
    },
    onKeyDetect: function(iKeyCode){ // output all potentially relevant key events - great for debugging!
        
    },
    onScanError: function(sError){ // output any errors encountered
       
    }
});
