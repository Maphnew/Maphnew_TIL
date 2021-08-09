YOU DON_T KNOW JS - this

# CHAPTER1 this라나 뭐라나

- 가장 헷갈리는 매카니즘 중 하나 this 키워드
- this는 모든 함수 스코프 내에 자동으로 설정되는 특수한 식별자

| 모든 기술이 고도로 발전하면 마술과 구별하기 어려워진다.

## 1.1 this를 왜?

- this의 유용함과 사용 동기
- 다음 코드가 '어떻게' 작동하는지 보자
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
