import { Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Filesystem, Directory } from '@capacitor/filesystem';

@Injectable({
  providedIn: 'root',
})
export class CameraService {

  async takePhoto(){
    const photo = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera
    });

    return photo;
  }


  async selectImage() {
    const image = await Camera.getPhoto({
      quality: 90,
      resultType: CameraResultType.Uri,
      source: CameraSource.Photos
    })

    return image;
  }

  async savePhoto(photo: any){
    const base64 = await this.readAsBase64(photo.webPath);

    console.log('Bas64: ' + base64)

    const fileName = new Date().getTime() + '.jpeg';

    const savedFile = await Filesystem.writeFile({
      path : fileName,
      data: base64,
      directory: Directory.Data
    })
    console.log('archivo de photo guardado!', savedFile)
    console.log('ruta del archivo de photo guardado!', fileName)

    return fileName;
  }

  async readAsBase64(photo: any){
    const response = await fetch(photo.webPath!);
    const blob = await response.blob();

    console.log('Blob para convertir: ' + blob)
    return await this.convertBlobToBase64(blob);
  }

  private convertBlobToBase64(blob: Blob): Promise<string>{
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onerror = reject;
      reader.onload = () => resolve(reader.result as string);

      reader.readAsDataURL(blob);
    })
  }

}
