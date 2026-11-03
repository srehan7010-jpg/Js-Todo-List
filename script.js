let k = document.getElementById('in-box');
let a = document.getElementById('add');
let r = document.getElementById('del');
let n = document.getElementById('note');

function getdata() {
    let value = k.value;
    if (value === "") {
        return n.innerHTML = "Type Something...";
    }

    let newdata = JSON.parse(localStorage.getItem('myNoteNew')) || [];
    newdata.push({ text: value, done: false });

    localStorage.setItem('myNoteNew', JSON.stringify(newdata));
    show();
    k.value = "";
}

function show() {
    let t = JSON.parse(localStorage.getItem('myNoteNew')) || [];
    if (t.length === 0) {
        n.innerHTML = "No Works Are Stored";
        return;
    }

    n.innerHTML = t.map((item, index) => {
        let text = typeof item === 'string' ? item : item.text;
        let done = typeof item === 'string' ? false : item.done;
        return `<div class="row">
      <span>
        <input type="checkbox" class="check" data-index="${index}" ${done ? 'checked' : ''}>
        <span class="${done ? 'done' : ''}">${text}</span>
      </span>
      <button class="remo" data-index="${index}">🗑️</button>
    </div>`;
    }).join('');
}

function removedata() {
    localStorage.removeItem('myNoteNew');
    n.innerHTML = "All Cleared";
}

a.addEventListener('click', getdata);
r.addEventListener('click', removedata);

n.addEventListener('click', (e) => {
    let t = JSON.parse(localStorage.getItem('myNoteNew')) || [];

    if (e.target.classList.contains('check')) {
        let i = e.target.dataset.index;
        if (typeof t[i] === 'string') {
            t[i] = { text: t[i], done: false };
        }
        t[i].done = e.target.checked;
        localStorage.setItem('myNoteNew', JSON.stringify(t));
        show();
        return;
    }

    if (e.target.classList.contains('remo')) {
        t.splice(e.target.dataset.index, 1);
        localStorage.setItem('myNoteNew', JSON.stringify(t));
        show();
    }
});

window.onload = show;