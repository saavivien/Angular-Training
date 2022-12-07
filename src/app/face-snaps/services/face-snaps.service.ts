import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FaceSnap } from '../models/face-snap.model';

@Injectable({
  providedIn: 'root'
})
export class FaceSnapsService {
  faceSnapsUri = 'http://localhost:3000/facesnaps';

  constructor(private httpClient: HttpClient) { }


  getAllFaceSnaps(): Observable<FaceSnap[]> {
    return this.httpClient.get<FaceSnap[]>(this.faceSnapsUri);
  }

  getFaceSnapById(faceSnapId: number): Observable<FaceSnap> {
    return this.httpClient.get<FaceSnap>(`${this.faceSnapsUri}/${faceSnapId}`)
  }

  addFaceSnap(faceSnap: FaceSnap): Observable<FaceSnap> {
    return this.httpClient.post<FaceSnap>(this.faceSnapsUri, faceSnap);
  }

  updadeFaceSnap(faceSnap: FaceSnap): Observable<FaceSnap> {
    return this.httpClient.put<FaceSnap>(`${this.faceSnapsUri}/${faceSnap.id}`, faceSnap);
  }
}
