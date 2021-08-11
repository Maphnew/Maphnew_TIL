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
