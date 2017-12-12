import * as store from '../utils/store';
import { navigateToRoom } from '../utils/redirect';
import { buildAppearInUrl } from '../utils/appear.in';

const loadRoomList = async (ul) => {
  const data = await store.get(['roomList']);
  ul.innerHTML = '';
  data.roomList.forEach(x => {
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.href = buildAppearInUrl(x);
    a.innerText = x;
    li.appendChild(a);
    ul.appendChild(li);
  });
};

const followRoomListLink = async e => {
  if (e.target.tagName !== 'A') return;
  e.preventDefault();
  const uri = e.target.getAttribute('href');
  await navigateToRoom(uri);
};

const roomList = document.getElementById('my-rooms-list');
loadRoomList(roomList)
  .then(() => roomList.addEventListener('click', followRoomListLink));