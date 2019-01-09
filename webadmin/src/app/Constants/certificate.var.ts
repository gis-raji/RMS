import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })

export class CertificateVar{

   labels = {
        batch             : 'Batch',
        course           :  'Course',
        template          : 'Template',
        tempName          : 'Template Name',
        tempNameMandatory : 'Template Name is required.',
        uploadErrMsg      :  'Template File is mandatory',
        fileUpload        : 'Upload your HTML File',
        badge             : 'Badge',
        gold              : 'Gold',
        silver            : 'Silver',
        bronze            : 'Bronze',
        diamond           : 'Diamond'       
    };
     
    btns = {
        upload  :  'UPLOAD',
        save    :  'SAVE',
        cancel  :  'CANCEL',
        add     :  'ADD'
    }

    title            = 'Certificates';
    formTitle        = 'Certificates Templates';
    modalHeader      = 'Add Certificate Template';
    uploadSuccessMsg = 'Certificate Template uploaded successfully';
    uploadErrMsg     = 'Template File is mandatory';
    assignSuccessMsg = 'Template Assigned Successfully';
    assignErrMsg     = 'Invalid Batch Selection';
    badgepercentageError = 'Badge pass percentage already assigned';
    url;
    certificateList;
    courseList;
    badgePercentage;
    showUploadErrMsg= false;
    fileToUpload: File = null;
    diamond=null;
    gold=null;
    silver=null;
    bronze=null;
    templateAssign : any[]=[{
        course: 1,
        template: 1
      }
     ]
  
}