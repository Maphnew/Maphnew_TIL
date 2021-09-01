YOU DON_T KNOW JS - this

# CHAPTER3 객체

- 객체는 정확히 무엇이고 this를 바인딩할 때 왜 객체를 가리켜야 할까?

## 3.1 구문

- 객체는 선언적`Declarative`(리터럴`Literal`) 형식과 생성자 형식, 두 가지로 정의한다.
- 리터럴 형식

```JS
var myObj = {
    key: value
    // ...
}
```

- 생성자 형식

```JS
var myObj = new Object();
myObj.key = value;
```

## 3.2 타입

- 자바스크립트 객체의 7개 주요 타입(명세서엔 '언어 타입`Language Type`'이라고 표현한다)은 다음과 같다.

```
1. null
2. undefined
3. boolean
4. number
5. string
6. object
7. symbol
```

- '단순 원시 타입`Simple Primitive`(string, number, null, undefined)'은 객체가 아니다.
- 반면 '복합 원시 타입`Complex Primitive`'이라는 독특한 객체 하위 타입`Sub Type`이 있다. function은 객체(정확히는 호출 가능한 객체`Callable Object`)의 하위 타입이다. 자바스크립트 함수는 기본적으로는 (호출 가능한 특성이 고정된) 객체이므로 '일급`First Class`'이며 여타의 일반 객체와 똑같이 취급된다.
- 배열 역시 추가 기능이 구현된 객체의 일종이다. 다른 일반 객체보다 좀 더 조직적으로 데이터가 구성되는 특징이 있다.

### 3.2.1 내장 객체

- 내장 객체라고 부르는 객체 하위 타입도 있다.

1. String
2. Number
3. Boolean
4. Object
5. Function
6. Array
7. Date
8. RegExp
9. Error

- 이들은 단지 자바스크립트의 내장 함수일 뿐 각각 생성자`Constructor`로 사용되어 주어진 하위 타입의 새 객체를 생성한다.

```JS
var strPrimitive = 'I am string!';
typeof strPrimitive; // "string"
strPrimitive instanceof String // false

var strObject = new String('I am string!');
typeof strObject; // "object"
strObject instanceof String; // true

// 객체 하위 타입을 확인한다.
Object.prototype.toString.call( strObject ); // [Object String]
```

- `Object.prototype.toString`부분은 toString() 메서드의 기본 구현체를 빌려서 내부 하위 타입을 조사한다. 그 결과 strObject가 String 생성자에 의해 만들어진 객체임을 알 수 있다.

- 원시 값은 객체가 아닌 원시 리터럴`Primitive Literal`이며 불변값`Immutable Value`이다. 문자 개수를 세는 등 문자별로 접근할 때엔 String 객체가 필요하다.
- 다행이도 자바스크립트 엔진은 자동 강제변환`Coerce`하므로 명시적으로 객체를 생성할 일은 거의 없다. 리터럴 형식을 사용하라고 적극 권장한다.

```JS
var strPrimitive = 'I am string!';
console.log( strPrimitive.length );  // 13
console.log( strPrimitive.charAt(3) ); // "m"
```

- `42.359.toFixed( 2 )`와 같이 숫자 리터럴 42에 메서드를 호출해도 `new Number( 42 )` 객체 래퍼로 강제변환되고 불리언 원시 값도 Boolean 객체로 바뀐다.
- 객체 래퍼 형식이 없는 `null`과 `undefined`는 그 자체로 유일 값이다. 반대로 `Date`값은 리터럴 형식이 없어서 반드시 생성자 형식으로 생성해야 한다.
- `Objects`, `Arrays`, `Functions`, `RegExps`는 형식(리터럴/생성자)과 무관하게 모두 객체다.
- `Error`객체는 예외가 던져지면 알아서 생성되니 명시적으로 생성할 일은 드물다.

## 3.3 내용 Contents
- 객체는 특정한 위치에 프로퍼티로 Contents가 채워진다. 

### 3.3.1 계산된 프로퍼티명
- ES6부터는 계산된 프로퍼티명`Computed Property Names`이라는 기능이 추가됐는데, 객체 리터럴 선언 구문의 키 이름 부분에 해당 표현식을 넣고 `[ ]`로 감싸면 된다.
```JS
var prefix = "foo";
var myObject = {
    [prefix + "bar"]: "hello",
    [prefix + "baz"]: "world"
};
myObject["foobar"]; // hello
myObject["foobaz"]; // world
```
- 계산된 프로퍼티명은 ES6 심볼에서 가장 많이 사용하지 않을까 싶다.
- 심볼은 새로운 원시 데이터 타입으로 불분명하고 예측 불가능한 값(기술적으로는 문자열 값)을 가진다. 심볼의 실제 값(이론적으로는 자바스크립트 엔진마다 제각각일 수 있다)을 직접 다룰 일은 거의 없으므로 Symbol.Something 같은 심볼명을 사용하면 된다.
```JS
var myObject = {
    [Symbol.Something]: "hello wolrd"
}
```

### 3.3.2 프로퍼티 vs 메서드
- 함수는 결코 객체에 속하는 것이 아니며, 객체 레퍼런스로 접근한 함수를 그냥 메서드라 칭하는 건 그 의미를 지나치게 확대해 해석한 것이다.

### 3.3.3 배열
- 배열은 숫자 인덱싱, 즉 인덱스라는 양수로 표기된 위치에 값을 저장한다.
- 인덱스는 양수지만 배열 자체는 객체여서 배열에 프로퍼티를 추가하는 것도 가능하다.
- 인덱스를 쓰지 않고 일반적인 키/값 객체로 배열을 사용할 수도 있지만 좋은 생각은 아니다.

### 3.3.4 객체 복사
- 객체 복사에는 얕은 복사`Shallow Copy`, 깊은 복사`Deep Copy`가 있다.
- 얕은 복사를 할 경우 환형 참조`Circular Reference` 형태가 되어 무한 복사의 구렁텅이에 빠질 수 있다.
- 깊은 복사 방법인 'JSON-Safe 객체'는 쉽게 복사할 수 있으므로 하나의 대안이 될 수는 있다.
- 한편, 얕은 복사는 이해하기 쉽고 별다른 이슈가 없기에 ES6부터는 Object.assign() 메서드를 제공한다.

### 3.3.5 프로퍼티 서술자
- ES5부터 모든 프로퍼티는 프로퍼티 서술자`Property Descriptor`로 표현된다.
```JS
var myObject = {
    a: 2
};
Object.getOwnPropertyDescriptor( myObject, "a" );
// {
// value: 2,
// writable: true,
// enumerable: true,
// configurable: true
// }
```
- 평범한 객체 프로퍼티 a의 프로퍼티 서술자(또는 데이터 서술자)를 조회해보니 writable, enumerable, configurable의 세 가지 특성이 더 있다.
- `Object.defineProperty()`로 새로운 프로퍼티를 추가하거나 기존 프로퍼티의 특성을 수정할 수 있다.(configurable이 true일 때만 가능)
```JS
var myObject = {};
Object.defineProperty( myObject, "a", {
    value: 2,
    writable: true,
    enumerable: true,
    configurable: true
} );
myObject.a; // 2
```

- 쓰기가능/설정가능/열거가능 특성에 따라 프로퍼티의 성격이 바뀐다.

### 3.3.6 불변성
- 프로퍼티/객체가 변경되지 않게 해야 할 경우 ES5부터 이런 처리를 할 수 있는 여러 가지 방법일 제공하지만, 얕은 불변성`Shallow Immutability`만 지원한다. 즉, 객체 자신과 직속 프로퍼티 특성만 불변으로 만들 뿐 다른 객체(배열, 객체, 함수)를 가리키는 레퍼런스가 있을 때 해당 객체의 내용까지 불변으로 만들지는 못한다.
```JS
myImmutableObject.foo; // [1,2,3]
myImmutableObject.foo.push( 4 );
myImmutableObject.foo; // [1,2,3,4]
```
- foo를 분변 객체로 바꾸려면 아래의 방법이 있다.
1. 객체 상수
- `writable:false`와 `configuration:false`를 같이 쓰면 프로퍼티를 상수처럼 쓸 수 있다.
```JS
var myObject = {};
Object.defineProperty( myObject, "FAVORITE_NUMBER", {
    value: 42,
    writable: false,
    configurable: false
});
```

2. 확장 금지
- 객체에 더는 프로퍼티를 추가할 수 없게 차단하고 현재 프로퍼티는 있는 그대로 놔두고 싶을 때 `Object.preventExtensions()`를 호출한다.
```JS
var myObject = {
    a: 2
};
Object.preventExtensions( myObject );

myObject.b = 3;
myObject.b; // undefined
```
- 비엄격 모드에선 프로퍼티 b를 추가해도 조용히 실패하고 엄격 모드에서는 TypeError가 발생한다.

3. 봉인
- `Object.seal()`는 봉인된 객체를 생성한다. 즉, 어떤 객체에 대해 `Object.preventExtensions()`를 실행하고 프로퍼티를 전부 `configurable:false` 처리한다. 결과적으로 프로퍼티를 추가할 수 없고 기존 프로퍼티를 재설정하거나 삭제할 수도 없다. 물론 값을 바꿀 수 있다.

4. 동결
- `Object.freeze()`는 객체를 꽁꽁 얼린다. 앞에서 설명한 Object.seal()을 적용하고 '데이터 접근자`Data Accessor`' 프로퍼티를 모두 `writable:false` 처리해서 값도 못 바꾸게 한다.
- 동결은 가장 높은 단계의 불변성을 적용한 것으로 객체와 직속 프로퍼티에 어떤 변경도 원천 봉쇄한다.

### 3.3.7 [[Get]]
