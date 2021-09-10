# 24. 클로저
- 클로저`closure`는 난해하기로 유명한 자바스크립트의 개념 중 하나로, 실행 컨텍스트에 대한 사전 지식이 있으면 이해하기 어려운 개념은 아니다.
- 클로저는 자바스크립트 고유의 개념이 아니다. 함수를 일급 객체로 취급하는 함수형 프로그래밍 언어(예: 하스켈, 리스프, 얼랭, 스칼라 등)에서 사용되는 중요한 특성이다. 고유의 개념이 아니므로 ECMAScript 사양에 등장하지 않는다.
- MDN에서 "클로저는 함수와 그 함수가 선언된 렉시컬 환경과의 조합이다."라고 정의하고 있다.
## 24.1 렉시컬 스코프
- 자바스크립트 엔진은 함수를 어디서 호출했는지가 아니라 함수를 어디에 정의했는지에 따라 상위 스코프를 결정한다. 이를 렉시컬 스코프(정적 스코프)라 한다.
- 렉시컬 환경의 "외부 렉시컬 환경에 대한 참조"에 저장할 참조값, 즉 상위 스코프에 대한 참조는 함수 정의가 평가되는 시점에 함수가 정의된 환경(위치)에 의해 결정된다. 이것이 바로 렉시컬 스코프다.
## 24.2 함수 객체의 내부 슬롯 [[Environment]]
- 함수는 자신이 정의된 환경, 즉 상위 스코프를 기억해야 한다. 이를 위해 함수는 자신의 내부 슬롯 [[Environment]]에 자신이 정의된 환경, 즉 상위 스코프의 참조를 저장한다.
- 함수 객체의 내부 슬롯 [[Environment]]에 저장된 현재 실행 중인 실행 컨텍스트의 렉시컬 환경의 참조가 바로 상위 스코프이다. 또한 자신이 호출되었을 때 생성될 함수 렉시컬 환경의 "외부 렉시컬 환경에 대한 참조"에 저장될 참조값이다. 함수 객체는 내부 슬롯 [[Environment]]에 저장한 렉시컬 환경의 참조, 즉 상위 스코프를 자신이 존재하는 한 기억한다.
## 24.3 클로저와 렉시컬 환경
- 다음 예제를 살펴보자
```JS
const x = 1;

// <1>
function outer() {
  const x = 10;
  const y = 5;
  const inner = function() { console.log(x); }; // <2>
  return inner;
}

const innerFunc = outer(); // <3>
innerFunc(); // <4> 10
```
- outer 함수를 호출<3>하면 outer 함수는 중첩 함수 inner를 반환하고 생명 주기`life cycle`를 마감한다. 즉, outer 함수의 호출이 종료하면 outer 함수의 실행 컨텍스트는 실행 컨텍스트 스택에서 제거`pop`된다. 이때 outer 함수의 지역 변수 x와 변수 값 10을 저장하고 있던 outer 함수의 실행 컨텍스트가 제거되었으므로 outer 함수의 지역 변수 x 또한 생명 주기를 마감한다. 따라서 outer 함수의 지역 변수 x는 더는 유효하지 않게 되어 x 변수에 접근할 수 있는 방법은 달리 없어 보인다.
- 그러나 위 코드의 실행 결과<4>는 outer 함수의 지역 변수 x의 값인 10이다. 이미 생명 주기가 종료되어 실행 컨텍스트 스택에서 제거된 outer함수의 지역 변수 x가 다시 부활한 듯 동작하고 있다.
- 이처럼 **외부 함수보다 중첩 함수가 더 오래 유지되는 경우 중첩 함수는 이미 생명 주기가 종료한 외부 함수의 변수를 참조할 수 있다. 이러한 중첩 함수를 클로저`closure`라고 부른다.**
- 자바스크립트의 모든 함수는 자신의 상위 스코프를 기억한다고 했다. 함수를 어디서 호출하든 상관없이 함수는 언제나 자신이 기억하는 상위 스코프의 식별자를 참조할 수 있으며 식별자에 바인딩된 값을 변경할 수도 있다.
- 위 예제에서 중첩 함수 inner는 상위 스코프의 x, y 식별자 중에 x만 참조하고 있다. 이런 경우 대부분의 모던 브라우저는 최적화를 통해 상위 스코프의 식별자 중에서 클로저가 참조하고 있는 식별자만을 기억한다.
- 클로저에 의해 참조되는 상위 스코프의 변수를 자유 변수`free variable`라고 부른다. 클로저`closure`란 "함수가 자유 변수에 대해 닫혀있다`closed`"라는 의미다. 이를 좀 더 알기 쉽게 의역하자면 "자유 변수에 묶여있는 함수"라고 할 수 있다.

## 24.4 클로저의 활용
- 클로저는 상태`state`를 안전하게 변경하고 유지하기 위해 사용한다. 다시 말해, 상태가 의도치 않게 변경되지 않도록 상태를 안전하게 은닉`information hiding`하고 특정 함수에게만 상태 변경을 허용하기 위해 사용한다.
```JS
// 카운트 상태 변경 함수
const increase = (function() {
  // 카운트 상태 변수
  let num = 0;
  // 클로저
  return function() {
    // 카운트 상태를 1만큼 증가시킨다.
    return ++num;
  }
})());

console.log(increase()); // 1
console.log(increase()); // 2
console.log(increase()); // 3
```
- 위 코드가 실행되면 즉시 실행 함수가 호출되고 즉시 실행 함수가 반환한 함수가 increase 변수에 할당된다. increase 변수에 할당된 함수는 자신이 정의된 위치에 의해 결정된 상위 스코프인 즉시 실행 함수의 렉시컬 환경을 기억하는 클로저다.
- 즉시 실행 함수는 한 번만 실행되므로 increase가 호출될 때마다 num 변수가 재차 초기화될 일은 없을 것이다. 또한 num 변수는 외부에서 직접 접근할 수 없는 은닉된 private 변수이므로 전역 변수를 사용했을 떄와 같이 의도되지 않은 변경을 걱정할 필요도 없기 떄문에 더 안정적인 프로그래밍이 가능하다.
- 이처럼 클로저는 상태`state`가 의도치 않게 변경되지 않도록 안전하게 은닉`information hiding`하고 특정 함수에게만 상태 변경을 허용하여 상태를 안전하게 변경하고 유지하기 위해 사용한다.
```JS
const counter = (function () {
  let num = 0;
  return {
    increase() {
      return ++num;
    },
    decrease() {
      return num > 0 ? --num : 0;
    }
  };
}());
console.log(counter.increase()); // 1
console.log(counter.increase()); // 2
console.log(counter.decrease()); // 1
console.log(counter.decrease()); // 0
```
- 위 예제에서 즉시 실행하는 함수가 반환하는 객체 리터럴은 즉시 실행 함수의 실행 단계에서 평가되어 객체가 된다. 이떄 객체의 메서드도 함수 객체로 생성된다. 객체 리터럴의 중괄호는 코드 블록이 아니므로 별도의 스코프를 생성하지 않는다.
- 위 예제의 increase, decrease 메서드의 상위 스코프는 두 메서드가 평가되는 시점에 실행 중인 실행 컨텍스트인 즉시 실행 함수 실행 컨텍스트의 렉시컬 환경이다. 따라서 두 메서드가 언제 어디서 호출되든 상관없이 즉시 실행 함수의 스코프의 식별자를 참조할 수 있다.
- 위 예제를 생성자 함수로 표현하면 다음과 같다.
```JS
const Counter = (function(){
  let num = 0;
  function Counter() {
    // this.num = 0; // 프로퍼티는 public하므로 은닉되지 않는다.
  }
  
  Counter.prototype.increase = function() {
    return ++num;
  };
  
  Counter.prototype.decrease = function() {
    return num > 0 ? --num : 0;
  };
  
  return Counter
})();

const counter = new Counter();
console.log(counter.increase()); // 1
console.log(counter.increase()); // 2
console.log(counter.decrease()); // 1
console.log(counter.decrease()); // 0
```
- 만약 num이 생성자 함수 Counter가 생성할 인스턴스의 프로퍼티라면 인스턴스를 통해 외부에서 접근이 자유로운 public 프로퍼티가 된다. 하지만 즉시 실행 함수 내에서 선언된 num 변수는 인스턴스를 통해 접근할 수 없으며, 즉시 실행 함수 외부에서도 접근할 수 없는 은닉된 변수다.
- 다음은 함수형 프로그래밍에서 클로저를 활용하는 간단한 예제다.
```JS
// 함수를 인수로 전달받고 함수를 반환하는 고차 함수
// 이 함수는 카운트 상태를 유지하기 위한 자유 변수 counter를 기억하는 클로저를 반환한다.
function makeCounter(predicate) {
  // 카운트 상태를 유지하기 위한 자유 변수
  let counter = 0;
  
  // 클로저를 반환
  return function () {
    // 인수로 전달받은 보조 함수에 상태 변경을 위임하낟.
    counter = predicate(counter);
    return counter
  }
}

// 보조 함수
function increase(n) {
  return ++n;
}

// 보조 함수
function decrease(n) {
  return --n;
}

// 함수로 함수를 생성한다.
// makeCounter 함수는 보조 함수를 인수로 전달받아 함수를 반환한다
const increaser = makeCounter(increase);
console.log(increaser()); // 1
console.log(increaser()); // 2

const decreaser = makeCounter(decrease);
console.log(decreaser()); // -1
console.log(decreaser()); // -2

```
- makerCounter 함수가 반환하는 함수는 자신이 생성됐을 떄의 렉시컬 환경인 makeCounter 함수의 스코프에 속한 counter 변수를 기억하는 클로저다.
- 주의해야 할 것은 makeCounter 함수를 호출해 함수를 반환할 때 반환된 함수는 자신만의 독립된 렉시컬 환경을 갖는다는 것이다. 함수를 호출하면 그때마다 새로운 makeCounter 함수 실행 컨텍스트의 렉시컬 환경에 생성되기 때문이다.
- 독립된 카운터가 아니라 연동하여 증감이 가능한 카운터를 만들려면 렉시컬 환경을 공유하는 클로저를 만들어야 한다. 이를 위해서는 makeCounter 함수를 두 번 호출하지 말아야 한다.
```JS
// 함수를 반환하는 고차 함수
// 이 함수는 카운트 상태를 유지하기 위한 자유 변수 counter를 기억하는 클로저를 반환한다.
const counter = (function () {
  // 카운트 상태를 유지하기 위한 자유 변수
  let counter = 0;
  
  // 클로저를 반환
  return function (predicate) {
    // 인수로 전달받은 보조 함수에 상태 변경을 위임하낟.
    counter = predicate(counter);
    return counter
  }
}

// 보조 함수
function increase(n) {
  return ++n;
}

// 보조 함수
function decrease(n) {
  return --n;
}

// 보조 함수를 전달하여 호출
console.log(counter(increase)); // 1
console.log(counter(increase)); // 2

// 자유 변수를 공유한다.
console.log(counter(decrease)); // 1
console.log(counter(decrease)); // 0
```

## 24.5 캡슐화와 정보 은닉
