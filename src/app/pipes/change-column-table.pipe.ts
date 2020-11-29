import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'changeColumns'
})

export class ChangeColumnsPipe implements PipeTransform {


    transform(value: string, ...args: any[]) {

        switch (value) {

            case 'name':
                    return   'Producto';
            case 'tipo':
                    return   'Tipo';

            case 'med':
                    return   'Medida/Unidad';

            case 'quantity':
                    return   'Cantidad';

            case 'precio':
                    return   'Precio Estimado';
            case 'Total':
                    return    'Total';        
        }
    }


}