YOU DON_T KNOW JS - this

# CHAPTER2 this가 이런 거로군!

- this는 호출부에서 함수를 호출할 때 바인딩 된다.

```
꽃, 김춘수

내가 그의 이름을 불러 주기 전에는
그는 다만
하나의 몸짓에 지나지 않았다.

내가 그의 이름을 불러 주었을 때
그는 나에게로 와서
꽃이 됐다.
```

## 2.1 호출부

- this 바인딩의 개념을 이해하려면 먼저 호출부, 즉 함수 호출 코드부터 확인하고 'this가 가리키는 것'이 무엇인지 찾아봐야 한다.

```JS
function baz() {
    // 호출 스택: 'baz'
    // 호출부는 전역 스코프 내부
    console.log( "baz" );
    bar(); // <- 'bar'의 호출부
}

function bar() {
    // 호출 스택: 'baz' -> 'bar'
    // 호출부는 'baz' 내부
    console.log( "bar" );
    foo(); // <- 'foo'의 호출부
}

function foo() {
    // 호출 스택: 'baz' -> 'bar' -> 'foo'
    // 호출부는 'bar' 내부
    console.log( "foo" );
}

baz(); // <- 'baz'의 호출부
```
