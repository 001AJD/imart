import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { auth } from 'firebase/app';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public user: any = null;

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router
  ) {
    this.afAuth.authState.subscribe((user) => {
      this.user = user;
    });
  }

  async googleSignIn(): Promise<any> {
    const provider = new auth.GoogleAuthProvider();
    const credential = await this.afAuth.signInWithPopup(provider);
    await this.updateUserData(credential.user);
    return credential;
  }

  async logout(): Promise<any> {
    return await this.afAuth.signOut().then(() => {
      this.router.navigate(['home']);
    });
  }

  async updateUserData(user): Promise<any> {
    const data = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
    };

    return await this.afs
      .collection('users')
      .doc(`${user.uid}`)
      .set(data, { merge: true });
  }

  isLoggedIn(): Promise<any> {
    return this.afAuth.authState.pipe(first()).toPromise();
  }
}
