// aqui hay funciones normales y exportables

import Swal from 'sweetalert2'
// sweetalert2 se usa para mostrar alertas en la paguina
import withreactContent from 'sweetalert2-react-content'
// withreactContent se usa para mostrar alertas en la paguina



// show_alert se usa para mostrar alertas en la paguina
export function show_alert(mensaje,icono,foco=''){ {
    onfocus(foco );
    const MySwal = withreactContent(Swal)
    MySwal.fire({
        title: mensaje,
        icon: icono,
        
    });
}}

function onfocus (foco){
    if (foco !==''){
        document.getElementById(foco).focus();
    }
}