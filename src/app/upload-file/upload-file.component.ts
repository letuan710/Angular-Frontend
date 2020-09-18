import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UploadFileService } from 'src/app/_services/upload-file.service';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.css']
})
export class UploadFileComponent implements OnInit {

  selectedFiles: FileList;
  progerssInfos = [];
  message = '';

  fileInfos: Observable<any>;

  constructor(private uploadService: UploadFileService) { }


  ngOnInit(): void {
    this.fileInfos = this.uploadService.getFiles();
  }
  selectFiles(event): void{
    this.progerssInfos = [];
    this.selectedFiles = event.target.files;
  }

  upload(idx, file): void{
     this.progerssInfos[idx]={value: 0, fileName: file.name };

     this.uploadService.upload(file).subscribe(
       event => {
         if(event.type == HttpEventType.UploadProgress){
           this.progerssInfos[idx].value = Math.round(100 * event.loaded/ event.total);
         } else if (event instanceof HttpResponse){
           this.fileInfos = this.uploadService.getFiles();
         }
       },
       err => {
         this.progerssInfos[idx].value = 0;
         this.message = 'Could not upload the file:' + file.name;
       });
      }

      uploadFiles(): void{
        this.message = '';

        for(let i = 0; i< this.selectedFiles.length; i++){
          this.upload(i, this.selectedFiles[i]);
        }
      }
    }


