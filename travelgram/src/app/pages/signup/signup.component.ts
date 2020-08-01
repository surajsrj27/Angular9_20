import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

//services
import { AuthService } from 'src/app/services/auth.service';

//Angular forms
import { NgForm } from '@angular/forms';

// rxjs
import { finalize } from 'rxjs/operators';

//firebase
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFireDatabase } from '@angular/fire/database';

//browser-image-resizer
import { readAndCompressImage } from 'browser-image-resizer';
import { imageConfig } from 'src/utils/config';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  picture: string = "https://learnyst.s3.amazonaws.com/assets/schools/2410/resources/images/logo_lco_i3oab.png"; //TODO: add picture url

  uploadPercent: number = null;

  constructor(
    private auth: AuthService,
    private router: Router,
    private db: AngularFireDatabase,
    private storage: AngularFireStorage,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
  }

  onSubmit(f: NgForm){
    const { email, password, username, country, bio, name } = f.form.value;
  
    this.auth.signUp(email, password)
      .then((res) => {
        console.log(res);
        const { uid } = res.user

        this.db.object(`/users/${uid}`) 
        .set({
          id: uid,
          name: name,
          email: email,
          instaUsername: username,
          country: country,
          bio: bio,
          picture: this.picture
        })
      })
      .then(() => {
        this.router.navigateByUrl('/');
        this.toastr.success("SignUp Success");
      })
      .catch((err) => {
        console.log(err);
        this.toastr.error("Signup failed");
      })
    }

  async uploadFile(event){
    const file = event.target.files[0];

    let resizeImage = await readAndCompressImage(file, imageConfig);

    const filePath = file.name // rename the image wih TODO: uuid
    const fileRef = this.storage.ref(filePath)

    const task = this.storage.upload(filePath, resizeImage);

    task.percentageChanges().subscribe((percentage) => {
      this.uploadPercent = percentage
    });

    task.snapshotChanges()
    .pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe((url) => {
          this.picture = url;
          this.toastr.success("Image upload success")
        })
      })
    )
    .subscribe()


  }

}
