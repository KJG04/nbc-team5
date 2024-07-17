import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  limit,
  deleteDoc,
  doc as firestoreDoc, // doc을 firestoreDoc으로 이름 변경
} from 'firebase/firestore';
import $ from 'jquery';

// Firebase 구성 정보 설정
const firebaseConfig = {
  apiKey: 'AIzaSyCTyiAydhtj3fHT68BQeiJ7zzMe4D9597I',
  authDomain: 'sparta-4343d.firebaseapp.com',
  projectId: 'sparta-4343d',
  storageBucket: 'sparta-4343d.appspot.com',
  messagingSenderId: '323306871299',
  appId: '1:323306871299:web:15070599899f2122e5cc36',
  measurementId: 'G-2Y0NR2HZZR',
};

// Firebase 인스턴스 초기화
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

$('.like-Btn').click(async function () {
  var currentCount = parseInt($('.like-count').text());
  $('.like-count').text(currentCount + 1);

  let num = $('.like-count').text();

  // 넣을 데이터
  let docData = {
    num: num,
    Date: new Date(),
  };

  await addDoc(collection(db, 'num'), docData);
  alert('감사합니다(❁´◡`❁)');
});

// 가장 최근 데이터 가져오기 함수
const getLatestDoc = async () => {
  const querySnapshot = await getDocs(
    query(collection(db, 'num'), orderBy('Date', 'desc'), limit(1))
  );

  if (!querySnapshot.empty) {
    querySnapshot.forEach((doc) => {
      let row = doc.data();
      $('.like-count').html(row['num']);
    });
  }
};

getLatestDoc();

$('.submit').click(async function () {
  let name = $('.name').val();
  let guestBook = $('.guestBook').val();
  let password = $('.password').val();

  if (name !== '' && guestBook !== '' && password !== '') {
    let docData = {
      name: name,
      guestBook: guestBook,
      password : password,
      Date: new Date(),
    };
    await addDoc(collection(db, 'guestBook'), docData);
    alert('작성 되었습니다.!');
    window.location.reload();
  } else {
    alert('빈칸을 작성해주세요^^');
  }
});

const getGuestBook = async () => {
  const q = query(collection(db, 'guestBook'), orderBy('Date', 'desc'));
  let docs = await getDocs(q);

  docs.forEach((doc) => {
    let id = doc.id;
    let row = doc.data();
    let password = row['password'];
    let name = row['name'];
    let guestBook = row['guestBook'];

    var comment_html = `
                    <div class="card mb-3" id="${id}">
                        <div class="card-body">
                            <h3 class="card-text dbtext">${name} <i class="bi bi-trash3 delete-btn" id="${id}"></i></h3>
                            <p class="card-title">${guestBook}</p>
                            <input type="hidden" id="${password}"/>
                        </div>
                    </div>`;

    $('.comments').append(comment_html);
  });
};

// 이벤트 델리게이션을 사용하여 삭제 버튼 클릭 이벤트를 처리
$(document).on('click', '.delete-btn', function() {

  // 현재 게시글의 db에서 가져온 아이디 
  let id = $(this).attr('id'); 
  
  // 부모태그의 형제중 input에 id값을 가져옴(DB에 저장된 비밀번호 저장)
  var password = $(this).parent().siblings('input').attr('id'); 
  
  // 가려져 있던 모달 보여주기
  $('.passwordModal').css('display','flex');

  // 비밀번호 확인 클릭
  $('.pwCheck').on('click', async function(){

    // 입력한 비밀번호 저장
    let pw = $('.pw').val(); 

    //DB에 저장된 비밀번호와 클라이언트가 입력한 비밀번호 비교
    if(pw === password){

      // 비밀번호 비교해서 맞다면 삭제 여부 확인
      const deleteOrNot = confirm("댓글을 삭제 하시겠습니까?");
      if(deleteOrNot){

      // Firestore에서 문서 삭제
      await deleteDoc(firestoreDoc(db, 'guestBook', id));

      // UI에서 방병록을 제거
      $(`#${id}`).remove();

      // 페이지 리로드
      window.location.reload();
      alert("삭제되었습니다.");
      }
    }else{
      alert("비밀번호가 틀립니다.");
    }
  })
    
    // 비밀번호 입력하지 않고 취소시 모달 사라짐
    $('.pwNo').on('click', function(){
      $('.passwordModal').css('display','none');
      $('.pw').val(''); // 내용 지우기
    })
})

// 처음에 guestBook 데이터 가져오기
getGuestBook();

$(window).on('scroll', function () {
  if (window.scrollY > 150) {
    $('.header-container').css('transform', 'translateY(0%)')
  } else {
    $('.header-container').css('transform', 'translateY(-100%)')
  }
})
