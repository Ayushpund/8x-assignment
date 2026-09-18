const DEFAULT_MS = 12_000;

export class FirestoreTimeoutError extends Error {
  constructor(label: string) {
    super(`${label} timed out — check Firestore is enabled in Firebase Console.`);
    this.name = "FirestoreTimeoutError";
  }
}

export function withFirestoreTimeout<T>(
  promise: Promise<T>,
  label: string,
  ms = DEFAULT_MS
): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    const timer = setTimeout(() => reject(new FirestoreTimeoutError(label)), ms);
    promise
      .then((value) => {
        clearTimeout(timer);
        resolve(value);
      })
      .catch((err) => {
        clearTimeout(timer);
        reject(err);
      });
  });
}
