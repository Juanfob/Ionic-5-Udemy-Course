import { Pipe, PipeTransform } from '@angular/core';

const URL = 'https://image.tmdb.org/t/p';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  /**
   * 
   * @param img es el nombre de la imagen que mandamos al método
   * @param size es el tamaño de la imagen, por defecto w500
   * devolvemos un string
   */
  transform(img: string, size: string = 'w500' ): string {

    //Preguntamos si existe una imagen. Si no existe, se sale
    if ( !img ){
      return './assets/no-image-banner.jpg';
    };

    const imgUrl = `${ URL }/${ size }${ img}`;
    console.log(imgUrl);


    return imgUrl;
  }

}
