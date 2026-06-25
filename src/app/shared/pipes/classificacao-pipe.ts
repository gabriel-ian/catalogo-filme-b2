import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'classificacao',
  standalone: true
})
export class ClassificacaoPipe
implements PipeTransform {

  transform(valor: string): string {

    switch(valor){

      case 'L':
        return 'Livre';

      case '10':
        return '10 anos';

      case '12':
        return '12 anos';

      case '14':
        return '14 anos';

      case '16':
        return '16 anos';

      case '18':
        return '18 anos';

      default:
        return valor;
    }
  }
}