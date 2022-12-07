import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { map, mapTo, mergeMap, switchMap, take, takeUntil } from 'rxjs/operators';
import { FaceSnap } from '../../models/face-snap.model';
import { FaceSnapsService } from '../../services/face-snaps.service';

@Component({
  selector: 'app-new-face-snap',
  templateUrl: './new-face-snap.component.html',
  styleUrls: ['./new-face-snap.component.scss']
})
export class NewFaceSnapComponent implements OnInit, OnDestroy {

  private urlRegex!: RegExp;
  snapForm!: FormGroup;
  faceSnapPreview$!: Observable<FaceSnap>;
  private subcribtionClosure$!: Subject<boolean>;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private faceSnapService: FaceSnapsService
  ) { }

  ngOnInit(): void {
    this.urlRegex = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&/=]*)/;
    this.subcribtionClosure$ = new Subject();
    this.initForm();
    this.faceSnapPreview$ = this.snapForm.valueChanges
      .pipe(
        takeUntil(this.subcribtionClosure$),
        map(formValue => ({
          ...formValue,
          createdDate: new Date(),
          snaps: 0,
          id: 0
        }))
      )
  }

  private initForm(): void {
    this.snapForm = this.formBuilder.group({
      title: [null, [Validators.required]],
      description: [null, [Validators.required]],
      imageUrl: [null, [Validators.required, Validators.pattern(this.urlRegex)]],
      location: [null, [Validators.required]]
    },
      { updateOn: 'blur' } //to send the update only when the focus moves
    );
  }

  onSubmitForm() {
    this.faceSnapService.getAllFaceSnaps()
      .pipe(take(1),
        map(faceSnaps => faceSnaps[faceSnaps.length - 1].id + 1),
        map(newId => ({
          ...this.snapForm.value,
          createdDate: new Date(),
          snaps: 0,
          id: newId
        })
        ),
        switchMap(faceSnap => this.faceSnapService.addFaceSnap(faceSnap))
      ).subscribe(() => this.router.navigateByUrl('/facesnaps'));
  }

  ngOnDestroy(): void {
    this.subcribtionClosure$.next(true);
  }

}
