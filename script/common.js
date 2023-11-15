window.onload = () => {
    //gnb드랍메뉴, 햄버거메뉴, 검색 //슬라이드.. 등 6개 정도..
    gnbMenu();
    search();
    sitemap();
    visualSlider();
}

/*
function gnbMenu(){
    const mainMenu = Array.from(document.querySelectorAll('.gnb-list > li > a')); //Array.from배열로
    const subMenu = document.querySelectorAll('.subMenu-wrapper');
    
    const tabMenu = document.querySelectorAll('.subMenu-left a'); //.subMenu-left의 모든 a태그, ul li할 필요 없음. 모든 a태그 찾기때문에
    const tabContent = document.querySelectorAll('.subMenu-right-model');
    let isOpen = false; 
    //console.log(subMenu);
    //console.log(mainMenu); //NodeList(5) [a, a, a, a, a] 
    
    //탭메뉴 하나가 아님. forEach돌림
    tabMenu.forEach((el) => {
        el.addEventListener('click', function(){
            //a태그에 각각 data-target을 남겨둠. 내가 클릭한 것(this, 화살표함수X)의 data-target을 찾아옴
            const target = this.getAttribute('data-target');
            //console.log(target);

            //data-target과 일치한 것만 display:block해주고 나머진 none
            tabContent.forEach((content) => {
                content.style.display = 'none'; //일단 모든 애들 다 none
                content.classList.remove('on');
            })

            const activeTab = document.querySelector(`.subMenu-right-model.${target}`);
            if(activeTab){
                activeTab.style.display = 'block';
                activeTab.classList.add('on');
                const activeSwiper = activeTab.querySelector('.swiper-container').swiper;
                if(activeSwiper){
                    activeSwiper.update();
                }else{
                    new Swiper(activeTab.querySelector('.swiper-container'),{
                        slidesPerView : 'auto',
                        navigation : {
                            prevEl : '.swiper-button-prev',
                            nextEl : '.swiper-button-next',
                        },
                        allowTouchMove : false,
                        speed : 0,
                        watchOverFlow : true, 
                        //watchOverFlow : 페이지가 하나인 경우 버튼,navi,pagination활성화 하지X
                    })
                }
            }
        })
    })

    mainMenu.forEach((el, idx) => {
        //console.log(idx);
        el.addEventListener('click', () => toggleMenu(subMenu[idx])) //toggleMenu의 idx를 받아오기 위해ㅐ Array.from으로 배열로 함
    })

    subMenu.forEach((el)=>{
        outMenuOver(el); //아래 필요없이 얘만 있어도 됨
        //el.classList.add('slide-up'); //모든 메뉴에 slide-up넣어줌ㅣ
        //isOpen = false; //false가 되어야지 내려올 준비됨
    })


    function toggleMenu(index){
        if(isOpen === false){
            onMenuOver(index); //닫혀있으면 onMenuOver로 열리는 함수를 실행하라
            //console.log('닫혀있음');
        }else{
            outMenuOver(index); //그렇지않으면 outMenuOver을 실행
            //console.log('열려있음');
        }
    }
    function onMenuOver(menu){
        //requestAnimationFrame(() => { //requestAnimationFrame없어도 괜찮음. transition이 알아서 해준다.
        const maxH = window.innerHeight;
        menu.style.display = 'block';
        menu.style.height = `${maxH}px`; //maxH만큼 내려오게
        //height로 잡으면 고정값이 되기 대문에 subMenu-bottom이 보이지 않게 됨.(값마다 길이가 다르기 때문에-> refactoring필요)
        menu.classList.remove('silde-up');
        menu.classList.add('slide-down');
        isOpen = true;

        //gnb swiper
        const swiperContainer = menu.querySelectorAll('.subMenu-item .swiper-container');//subMenuitem에 스와이퍼를 다 넣어줄 것?
        swiperContainer.forEach((el) => {
            if(!el.classList.contains('swiper-initialized')){ //swiper-initialized가 없으면? 스와이퍼가 없으면
                //바로 실행하지 않고 스와이퍼를 만들어 준다.
                new Swiper(el,{
                    slidesPerView : 'auto',
                    navigation : {
                        prevEl : '.swiper-button-prev',
                        nextEl : '.swiper-button-next',
                    },
                    //버튼으로만 스와이퍼되게
                    allowTouchMove : false, //스와이프 기능 중지
                    speed : 0, //슬라이드 넘어가는방식x 툭바뀌는 방식
                    watchOverFlow : true, 
                })
            }
        })
        
        const rightItem = menu.querySelector('.subMenu-right');
        if(rightItem){
            rightItem.querySelector('.subMenu-right-model').classList.add('on');
            rightItem.style.height = `${maxH}px`;
        }
    }
    function outMenuOver(menu){
        
        menu.style.height = '0';
        menu.classList.remove('silde-down');
        menu.classList.add('slide-up');
        isOpen = false;

        const rightItem = menu.querySelector('.subMenu-right');
        if(rightItem){
            rightItem.querySelector('.subMenu-right-model').classList.remove('on');
            rightItem.style.height = 0;
        }
    }
}


*/

function gnbMenu(){
    const mainMenu = document.querySelectorAll('.gnb-list > li > a');
    const subMenu = document.querySelectorAll('.subMenu-wrapper');

    const tabMenu = document.querySelectorAll('.subMenu-left a');
    const tabContent = document.querySelectorAll('.subMenu-right-item');
    //클릭할때마다 높이값이 달라져야하기 때문에..

    /*
    tabMenu.forEach((el) => {
        el.addEventListener('click', (e) => {
            //e넣은 이유: 링크가 가지고 있는 기본적인 이벤트 막으려고.
            e.preventDefault(); //태그가 가지고 있는 기본 이벤트를 중지시켜 준다. 비슷한걸론 return false(jQuery에서)
            const target = el.getAttribute('data-target');
            //console.log(target)
            tabContent.forEach((item) => {
                item.style.display = 'none';
                item.classList.remove('on');
            })
            
            const activeTab = document.querySelector(`.subMenu-right-item.${target}`);
            if(activeTab){
                subMenuTab(activeTab);
            }

            tabMenu.forEach((item) => {
                item.classList.remove('on');
            })
            el.classList.add('on');
        })
    })
    
    function subMenuTab(activeTab){
        activeTab.style.display = 'block'; 
        activeTab.classList.add('on');
    }

    function activeTab으로 리팩토링함
    */
    activeTab(tabMenu[0]);
    tabMenu.forEach((el) => {
        el.addEventListener('click', (e) => {
            e.preventDefault();
            activeTab(el);
        })
    })
    function activeTab(item){
        const target = item.getAttribute('data-target');
        tabContent.forEach((el) => {
            el.style.display = 'none';
            item.classList.remove('on');
            //리셋
        });
        const activeTabMenu = document.querySelector(`.subMenu-right-item.${target}`);

        if(activeTabMenu){
            activeTabMenu.style.display = 'block';
            activeTabMenu.classList.add('on');
        }
        tabMenu.forEach((tabItem) => {
            tabItem.classList.remove('on');
        })
        item.classList.add('on');
    }



    //초기 설정값
    subMenu.forEach((menu) => { //모든 subMenu올라가 있어야 함. 그래서 forEach로 전체에 init함수를 줌
        init(menu); 
    })

    //메인메뉴 드랍
    mainMenu.forEach((el, index) => {
        el.addEventListener('click', () => {
            const currentMenu = subMenu[index]; //subMenu의 index를 받아온다.
            //console.log(currentMenu); //선택한 subMenu-wrapper가 뜸
            if(currentMenu.dataset.isOpen === 'true') {
                 //currentMenu에 데이터셋을 입력할것
                outMenuOver(currentMenu);
            }else{
                transitionMenu(currentMenu);
                onMenuOver(currentMenu);
            }
            mainMenu.forEach((item) => {
                item.classList.remove('on');
            })
            el.classList.add('on');
        })
    })

    //초기설정값
    function init(menu){
        menu.classList.add('slide-up');
        menu.dataset.isOpen = 'false'; //닫혀있어
        outMenuOver(menu);
    }

    //onMenuOver
    function onMenuOver(menu){
        menu.style.display = 'block';
        const winH = window.innerHeight;
        menu.style.maxHeight = `${winH}px`;
        menu.classList.remove('slide-up');
        menu.classList.add('slide-down');
        menu.dataset.isOpen = 'true';

        const rightItem = menu.querySelector('.subMenu-right');
        if(rightItem){ //rightItem이 있으면
            rightItem.querySelector('.subMenu-right-item').classList.add('on');
            rightItem.style.maxHeight = `${winH}px`;
        }

        const swiperContainer = menu.querySelectorAll('.subMenu-item .swiper-container');
        swiperContainer.forEach((el)=>{
            //swiper-initialized 스와이퍼 작동중이란 의미.
            if(!el.classList.contains('swiper-initialized')){
                //swiper-initialized없으면 swiper새로 세팅한다.
                new Swiper(el, {
                    navigation : {
                        prevEl : '.swiper-button-prev',
                        nextEl : '.swiper-button-next'
                    },
                    allowTouchMove : false,
                    speed : 0 //슬라이드 기능 안보이게
                })
            }
        })
    }

    //outMenu
    function outMenuOver(menu){
        if(!menu) return; //menu가 없으면 리턴한다.
        menu.style.maxHeight = '0';
        menu.classList.remove('slide-down');
        menu.classList.add('slide-up');
        menu.dataset.isOpen = 'false';
    }

    //transition
    function transitionMenu(menu){
        document.querySelectorAll('.subMenu-wrapper').forEach((el) => {
            if(el !== menu && el.dataset.isOpen === 'true'){ 
                //el이 현재 열려있는 menu와 다르면, currentMenu엔 클릭한 메뉴가 담겨있음
                //isopen이 트루 열려있음 . 두가지 조건 충족되면
                outMenuOver(el); //다르면 원래 열려있는거 닫아주고 내가 클릭한 메뉴 내려옴
            }
        })
    }
}


/*function search(){
    const searchBtn = document.querySelector('.search-wrapper > .search-btn');//search btn 두개기 때문에 >로, >는 하위요소, 자식요소만 참조하겠다. 자손은X
    const searchWrapper = document.querySelector('.search-wrapper');
    const header = document.querySelector('header');
    searchWrapper.addEventListener('click', (e) => {
        //e.preventDefault(); //필요x, 기본이벤트가 없기 때문
        //기본이벤트 a태그 : 링크이동, submit:제출기능, reset:리셋기능 등 원래 기본으로 있는 이벤트를 막아주는 것이다.
        
        e.stopPropagation(); //이벤트 버블링 방지, 버블링을 막아주는 역할만 한다.
    })
    //seachBtn 클릭하면 searchWrapper에 on넣기
    searchBtn.addEventListener('click', (e) => {
        e.preventDefault(); //a태그에 잡았기 때문에? 기본 이벤트 막아줘야 함.
        searchWrapper.classList.add('on');
        //console.log('22')
    })
    header.addEventListener('click', () => {
        searchWrapper.classList.remove('on');
        //console.log('11')
    })

    /*이벤트 버블링 현상
    한 요소에 이벤트가 발생할 때, 이벤트가 동작되고 이어서 부모 요소에 있는 이벤트도 같이 실행되는 현상이다.

    e.preventDefault와 e.stopPropagation의 차이
    e.preventDefault()
    기본 동작으로 되어 있는 이벤트르르 방지하기 위해 만들어진 메서드다.
    (ex)링크버튼의 링크 이동 이벤트, submit의 제출 기능 등
    e.preventDefault() : 기본 기능을 중지시키는 것은 가능하지만, 버블링을 막지는 않는다.

    e.stopPropagation()
    이벤트가 dom객체를 상위 객체로 버블링되거나 혹은 하위 요소로 전달되는 캡쳐링을 방지하는 목적으로 사용하는 메서드다.
    e.stopPropagation() 기본 동작을 중지시키지는 않는다.
    //버블링과 캡처링. 캡처링은 잘 보이진 않고 오류도 잘 나진 않음. 주로 버블링 발생하고 오류도 발생함

    //기본기능과 버블링을 막으려면 e.preventDefault()과 e.stopPropagation()둘 다 넣어야함.

    


    //이벤트가 중첩될 경우 ㅇㅇ를 꺼줘야한다.
    //버튼은 하위요소, 부모요소이벤트도 같이 실행되는 것. 
    //버튼보다 상위요소(헤더)를 클릭하면 꺼지는 이벤트를 만들었음. 버튼을 클릭하는 것도 헤더로 인식하기 때문에 버튼이벤트가 발생하자마자 헤더이벤트도 같이 들어가는 것
}
*/
//function search리팩토링
function search() {
    const searchBtn = document.querySelector('.search-wrapper > .search-btn');
    const searchWrapper = document.querySelector('.search-wrapper');

    const header = document.querySelector('header');
    const inputItem = document.querySelector('input');

    //매개변수 isShow를 받아와서 
    const toggleSearch = (isShow) => {
        if(isShow){ //true라면
            searchWrapper.classList.add('on');
            inputItem.focus(); //focus기능
        }else{
            searchWrapper.classList.remove('on');
            inputItem.value = ''; //검색내용 초기화
        }
    }

    searchBtn.addEventListener('click', (e) => {
        toggleSearch(true); //isShow 가 true
        e.stopPropagation();
    })
    header.addEventListener('click', () => {
        toggleSearch(false); 
    })
    searchWrapper.addEventListener('click', (e) =>{
        e.stopPropagation();
    })
}

function visualSlider(){
    //swiper visual, model 등 여러군데 들어감, 섞이지 않게 조심
    const swiper = new Swiper('.visual-wrapper .swiper-container', {
        speed : 1000,
        loop : true,
        autoplay : {
            delay: 3000,
        },
        effect : 'creative',
        creativeEffect : {
            prev : {
                translate : ['-100%', 0, 0] //겹치는듯한 효과를 줄 때 translate많이 사용함
            },
            next : {
                translate : ['50%', 0, -1] //x,y,z
            }
        },
        pagination : {
            el : '.swiper-pagination',
            clickable : true,
        }


    })
}


/*function sitemap(){
    const btn = document.querySelector('.ham-btn');
    const sitemap = document.querySelector('.sitemap');
    let isOpen = true; //버튼 : 토글버튼, 열려있는지 안열려있는지 확인하기 위한 상태변수?
    
    btn.addEventListener('click', function(e){ //this o - 일반함수로
        e.preventDefault();
        let winH = window.innerHeight;//버튼 클릭했을 때 높이값 받아온다.
        document.body.style.overflowY = 'hidden'; //기존의 scroll이 없어짐

        if(isOpen){
            //btn.classList.add('on'); btn으로 잡아도 상관 없음
            this.classList.add('on');
            sitemap.classList.add('on');
            sitemap.style.maxHeight = `${winH}px`;
            sitemap.style.height = `${winH}px`;
            document.body.style.overflowY = 'hidden'; // 기존의 scroll이 없어짐
            isOpen = false; //닫힐 준비
        }else{
            this.classList.remove('on');
            sitemap.classList.remove('on');
            sitemap.style.maxHeight = 0;
            sitemap.style.height = 0;
            document.body.style.overflowY = 'auto'; //sitmap닫히면 스크롤 생겨야함
            isOpen = true;
        }
    })
}
*/
//function sitemap 리팩토링
function sitemap(){
    const btn = document.querySelector('.ham-btn');
    const sitemap = document.querySelector('.sitemap');
    let isOpen = true;

    btn.addEventListener('click', function(e){
        e.preventDefault(); //a태그 hambtn을 잡았음. 없으면 상단으로 올라감

        if(isOpen){
            toggleSiteMap('open', sitemap); //true, false일때도 toggleSiteMap실행. 상태 전달할 것 필요.
        }else{
            toggleSiteMap('close', sitemap);
        }
        isOpen = !isOpen //isOpen세팅, 전엔 클릭하면 isopen바꿔줬지만 지금은 없음. 클릭하면 현재isOpen(true)의 반대값(false), 닫기위해 버튼을 또 누르면 현재isOpen(false)의 반대값(true)
        //console.log(isOpen);
    })

    function toggleSiteMap(action, el){
        const winH = window.innerHeight;
        const overflowAction = action === 'open' ? 'hidden' : 'auto'
        //action에 전달받은 값이 'open'이면 overflowAction 'hidden' : 'open'아니면 'auto'
        const maxH = action === 'open' ? `${winH}px` : '0';

        btn.classList.toggle('on', action === 'open'); //toggle은 add와 remove동시에 해주는 역할. 조건문 필요
        el.classList.toggle('on', action === 'open'); //action이 open이 아니면 'on'이 빠짐
        el.style.maxHeight = maxH;
        el.style.height = maxH;
        document.body.style.overflowY = overflowAction;
    }

}