YOU DON_T KNOW JS - this

# CHAPTER1 this라나 뭐라나

- 가장 헷갈리는 매카니즘 중 하나 this 키워드
- this는 모든 함수 스코프 내에 자동으로 설정되는 특수한 식별자

| 모든 기술이 고도로 발전하면 마술과 구별하기 어려워진다.

## 1.1 this를 왜?

- this의 유용함과 사용 동기
- 다음 코드가 '어떻게' 작동하는지 보다, '왜' 사용하는지 보자
- `identify()`와 `speak()` 두 함수는 객체별로 따로따로 함수를 작성할 필요 없이 다중 콘텍스트 객체인 me와 you 모두에서 재사용할 수 있다.

```JS
function identify(){
    return this.name.toUpperCase();
}

function speak() {
    var greeting = `Hello, I'm ${identify.call( this )}`;
    console.log( greeting );
}

var me = {
    name: 'Kyle'
};

var you = {
    name: 'Reader'
};

identify.call( me ); // KYLE
identify.call( you ); // READER

speak.call( me ); // Hello, I'm KYLE
speak.call( you ); // Hello, I'm READER
```
- ( [function.prototype.call(): 예제 - call을 사용하여 함수 호출 및 `this`에대한 컨텍스트 지정](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Function/call#%ED%95%A8%EC%88%98_%ED%98%B8%EC%B6%9C_%EB%B0%8F_this%EB%A5%BC_%EC%9C%84%ED%95%9C_%EB%AC%B8%EB%A7%A5_%EC%A7%80%EC%A0%95%EC%97%90_call_%EC%82%AC%EC%9A%A9) )

- this를 안 쓰고 identify()와 speak() 함수에 콘텍스트 객체를 명시할 수도 있다.

```JS
function identify(context){
    return context.name.toUpperCase();
}

function speak(context) {
    var greeting = `Hello, I'm ${ context }`;
    console.log( greeting );
}

identify( you ); // READER
speak( me ); // Hello, I'm KYLE
```

- 하지만 암시적인 객체 레퍼런스를 함께 넘기는`Passing Along` this 체계가 API 설계상 좀 더 깔끔하고 명확하며 재사용하기 쉽다.
- 사용 패턴이 복잡해질수록 콘텍스트를 넘기는 방법이 더 지저분해진다.

## 1.2 헷갈리는 것들
- 사람들은 보통 두 가지의 의미로 해석하는데 둘 다 틀렸다.
### 1.2.1 자기 자신
- this가 함수 그 자체를 가리킨다는 오해다.
### 1.2.2 자신의 스코프
- this는 어떤 식으로도 함수의 렉시컬 스코프를 참조하지 않는다.

## 1.3 this는 무엇인가?
- this는 작성 시점이 아닌 런타임 시점에 바인딩 되며 함수 호출 당시 상황에 따라 콘텍스트가 결정된다.
- 어떻게 함수를 호출했느냐에 따라 정해진다.
- 어떤 함수를 호출하면 활성화 레코드`Activation Record`, 즉 실행 콘텍스트`Execution Context`가 만들어진다. 여기엔 함수가 호출된 근원(콜스택`Call-Stack`)과 호출 방법, 전달된 인자 등의 정보가 담겨있다. this 레퍼런스는 그중 하나로, 함수가 실행되는 동안 이용할 수 있다.
- 다음 장에서는 this 바인딩을 결정짓는 함수 호출부`Call-Site`를 설명한다.
