
// Fetch the items from the JSON file
function loadItems(){
    // fetch : 데이터를 성공적으로 받아오면, response object를 호출함
    return fetch('data/data.json') // json의 데이터를 받아옴
    .then(response => response.json()) // 데이터가 성공적으로 받아지면, json 형태로 변환
    .then(json =>json.items); // json 안에 있는 item들을 리턴
}


// update the list with the given items
function displayItems(items){
    const container = document.querySelector('.items');
    // item을 받아와서 li 요소로 변환시킴 + 받아온 여러개의 배열을 하나로 병합  : join()
    container.innerHTML = items.map(item => createHTMLString(item)).join('');
}

// create HTML list items from the given data item
function createHTMLString(item){
    return `
        <li class="item" data-type="${item.type}" data-color="">
            <img src="${item.image}" alt="${item.type}" class="item_thumbnail">
            <span class="item_description">${item.gender}, ${item.size}</span>
        </li>
    `;
}

// 이벤트 처리 함수 on+이벤트
function onButtonClick(event, items){
    const target = event.target;
    const key = target.dataset.key;
    const value = target.dataset.value;

    // key나 value가 없을 경우, 해당 함수를 종료
    if(key == null || value == null){
        return;
    }
    // updateItems(items, key, value);
    const filtered = items.filter(item => item[key] === value);
    displayItems(filtered);
}

function setEventListners(items){
    const logo = document.querySelector('.logo');
    // 이벤트 위임
    // 버튼들이 들어있는 container에 이벤트 리스너 등록
    // 한군데에서만 handling 할 수 있는 방법
    const buttons = document.querySelector('.buttons');
    logo.addEventListener('click', () => displayItems(items));
    buttons.addEventListener('click', event => onButtonClick(event, items));
}

//data.json에서 데이터를 읽어옴
// main
loadItems()
.then(items => {
    displayItems(items);
    setEventListners(items);
})
.catch(console.error);