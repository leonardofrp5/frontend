import { Observable, Observer } from 'rxjs';

const observer: Observer<any> = {
  next: value => console.log('next:', value),
  error: error => console.warn('error:', error),
  complete: () => console.info('completed')
};

const intervalo$ = new Observable<number>(subscriber => {
  let count = 0;
  const interval = setInterval(() => {
    count++;
    subscriber.next(count);
  }, 1000);

  setTimeout(() => {
    subscriber.complete();
  }, 2500)

  return () => {
    clearInterval(interval);
    console.log('destroy interval');
  }
});

const subs1 = intervalo$.subscribe(num => console.log('Num:', num));
const subs2 = intervalo$.subscribe(num => console.log('Num:', num));
const subs3 = intervalo$.subscribe(num => console.log('Num:', num));

subs1.add(subs2).add(subs3);

setTimeout(() => {
  // subs1.unsubscribe();
  // subs2.unsubscribe();
  // subs3.unsubscribe();
  subs1.unsubscribe();
  console.log('completed timeout');
}, 5000)
