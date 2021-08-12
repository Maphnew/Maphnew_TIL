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

## 3.3 내용
