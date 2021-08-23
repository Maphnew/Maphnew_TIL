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

## 2.2 단지 규칙일 뿐

- 4가지 규칙

### 2.2.1 기본 바인딩

- default 규칙

```JS
function foo() {
    console.log( this.a );
}

var a = 2;
foo(); // 2
```

- 기본 바인딩이 적용되어 this는 전역 객체를 참조한다.

### 2.2.2 암시적 바인딩`implicit Binding`

- 호출부에 콘텍스트 객체가 있는지, 즉 객체의 소유`Owning`/포함`Containing` 여부를 확인하는 것이다.

```JS
function foo() {
    console.log( this.a );
}

var obj = {
    a: 2,
    foo: foo // 앞에서 선언한 foo() 함수를 참조
}

obj.foo(); // 2
```

- 호출부는 obj 콘텍스트로 foo()를 참조하므로 obj 객체는 함수 호출 시점에 함수의 레퍼런스를 '소유'하거나 '포함'한다고 볼 수 있다.
- 암시적 바인딩 규칙에 따르면 바로 이 obj 콘텍스트 객체가 함수 호출 시 this에 바인딩 된다.
- 다음 예제처럼 객체 프로퍼티 참조가 체이닝`Chaining`된 형태라면 최상위`Top`/최하위`Last` 수준의 정보만 호출부와 연관된다.

```JS
function foo() {
    console.log( this.a );
}

var obj2 = {
    a: 42,
    foo: foo
};

var obj1 = {
    a:2,
    obj2: obj2
};

obj1.obj2.foo(); // 42
```

#### 암시적 소실

- '암시적으로 바인딩 된`implicitly Bound`' 함수에서 바인딩이 소실되는 경우가 있다.
- strict mode 여부에 따라 전역 객체나 undefined 중 한 가지로 기본 바인딩 된다.

```JS
function foo() {
    console.log( this.a );
}

var obj = {
    a: 2,
    foo: foo
};

var bar = obj.foo; // 함수 레퍼런스/별명
var a = "엥, 전역이네!" // 'a' 역시 전역 객체의 프로퍼티
bar(); // "엥, 전역이네!"
```

- bar는 obj의 foo를 참조하는 변수처럼 보이지만 실은 foo를 직접 가리키는 또 다른 레퍼런스다.
- 게다가 호출부에서 그냥 평범하게 `bar()`를 호출하므로 기본 바인딩이 적용된다.
- 콜백 함수를 전달하는 경우엔 좀 더 애매하게 실행되어 예상외의 결과가 나온다.

```JS
function foo() {
    console.log( this.a );
}

function doFoo(fn) {
    // 'fn'은 'foo'의 또 다른 레퍼런스일 뿐이다.

    fn(); // <- 호출부
}

var obj = {
    a:2,
    foo:foo
};

var a = "엥, 적역이네!";  // 'a' 역시 전역 객체의 프로퍼티
doFoo( obj.foo ); // "엥, 전역이네!"
```

- 콜백을 받아 처리하는 함수가 내장 함수라도 결과는 마찬가지다. (예제 생략)

### 2.2.3 명시적 바인딩

### 2.2.4 new 바인딩

## 2.3 모든 건 순서가 있는 법

### 2.3.1 this 확정 규칙

## 2.4 바인딩 예외

### 2.4.1 this 무시

### 2.4.2 간접 레퍼런스

### 2.4.3 소프트 바인딩

## 2.5 어휘적 this
- ES6 화살표 함수는 4가지 표준 규칙 대신 에두른 스코프`Enclosing Scope`(함수 또는 전역)를 보고 `this`를 알아서 바인딩 한다.
- 다음은 화살표 함수의 렉시컬 스코프를 나타낸 예제다.
```JS
function foo() {
    // 화살표함수를 반환한다.
    return (a) => {
        // 여기서 'this'는 어휘적으로 'foo()'에서 상속된다.
        console.log( this.a );
    };
}

var obj1 = {
    a: 2
}

var obj2 = {
    a: 3
}

var bar = foo.call( obj1 );
bar.call( obj2 ); // 2, 3이 아니다!
```
- foo() 내부에서 생성된 화살표 함수는 foo() 호출 당시 this를 무조건 어휘적으로 포착한다. foo()는 obj1에 this가 바인딩 되므로 bar(반환된 화살표 함수를 가리키는 변수)의 this 역시 obj1로 바인딩 된다. 화살표 함수의 어휘적 바인딩은 절대로 오버라이드할 수 없다.
- ES6 이전에도 화살표 함수의 기본 기능과 크게 다르지 않은, 나름대로 많이 쓰이던 패턴이 있었다.
```JS
function foo() {
    var self = this; // 'this'를 어휘적으로 포착한다.
    setTimeout( function(){
        console.log( self.a );
    }, 100 );
}

var obj = {
    a: 2
};

foo.call( obj ); // 2
```

- this 스타일의 코드를 작성해야 할 경우 꼭 다음 두 가지 중 하나만 선택하자.
1. 오직 렉시컬 스코프만 사용하고 가식적인 this 스타일의 코드는 접어둔다.
2. 필요하면 bind()까지 포함하여 완전한 this 스타일의 코드를 구사하되 self = this나 화살표 함수 같은 소위 '어휘적 this'꼼수는 삼가야 한다.
3. 두 스타일 모두 적절히 혼용하여 효율적인 프로그래밍을 할 수도 있겠지만 동일 함수 내에서 똑같은 것을 찾는데 서로 다른 스타일이 섞여 있으면 관리도 잘 안되고 개발자가 천재가 아닌 이상 이해하기 곤란한 골칫덩이 코드로 남게 될 것이다.

## 2.6 정리하기
- 함수 실행에 있어서 this 바인딩은 함수의 직접적인 호출부에 따라 달라진다. 일단 호출부를 식별한 후 다음 4가지 규칙을 열거한 우선순위에 따라 적용한다.
1. new로 호출했다면 새로 생성된 객체로 바인딩 된다.
2. call이나 apply 또는 bind로 호출됐다면 주어진 객체로 바인딩 된다.
3. 호출의 주체인 콘텍스트 객체로 호출됐다면 바로 이 콘텍스트 객체로 바인딩 된다.
4. 기본 바인딩에서 엄격 모드는 undefined, 그 밖엔 전역 객체로 바인딩 된다.

- this 바인딩을 안전하게 하고 싶으면 `∅ = Object.create(null)`처럼 DMZ 객체를 자리 끼움 값으로 바꿔넣어 뜻하지 않은 부수 효과가 전역 객체에서 발생하지 않게 한다.
- ES6 화살표 함수는 표준 바인딩 규칙을 무시하고 렉시컬 스코프로 this를 바인딩 한다. 즉, 에두른 함수 호출로부터 어떤 값이든 this 바인딩을 상속한다. 이는 ES6 이전 시절 self = this 구문을 대체한 장치다.
