import { Observable, Observer, Subject } from 'rxjs';

const observer: Observer<any> = {
  next: value => console.log('next:', value),
  error: error => console.warn('error:', error),
  complete: () => console.info('completed')
};

const interval$ = new Observable<number>(subs => {
  const intervalId = setInterval(() => subs.next(Math.random()), 5000)
  return (() => clearInterval(intervalId))
});

// const subs1 = interval$.subscribe(rnd => console.log('subs1', rnd));
// const subs2 = interval$.subscribe(rnd => console.log('subs2', rnd));

// Subject
// 1- casteo multiple
// 2- also is a observer
// 3- Next, Error and complete

const subject$ = new Subject();
interval$.subscribe(subject$);

const subs1 = subject$.subscribe(rnd => console.log('subs1', rnd));
const subs2 = subject$.subscribe(rnd => console.log('subs2', rnd));
