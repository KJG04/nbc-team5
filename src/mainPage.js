import { initializeApp } from 'firebase/app'
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  limit,
} from 'firebase/firestore'
import $ from 'jquery'

export default function mainPage() {
  // Firebase 구성 정보 설정
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: 'AIzaSyCTyiAydhtj3fHT68BQeiJ7zzMe4D9597I',
    authDomain: 'sparta-4343d.firebaseapp.com',
    projectId: 'sparta-4343d',
    storageBucket: 'sparta-4343d.appspot.com',
    messagingSenderId: '323306871299',
    appId: '1:323306871299:web:15070599899f2122e5cc36',
    measurementId: 'G-2Y0NR2HZZR',
  }

  // Firebase 인스턴스 초기화
  const app = initializeApp(firebaseConfig)
  const db = getFirestore(app)

  $('.like-Btn').click(async function () {
    var currentCount = parseInt($('.like-count').text())
    $('.like-count').text(currentCount + 1)

    let num = $('.like-count').text()

    // 넣을 데이터
    let doc = {
      num: num,
      Date: new Date(),
    }

    await addDoc(collection(db, 'num'), doc)
    alert('감사합니다(❁´◡`❁)')
  })

  // 가장 최근 데이터 가져오기 함수
  const getLatestDoc = async () => {
    const querySnapshot = await getDocs(
      query(collection(db, 'num'), orderBy('Date', 'desc'), limit(1))
    )

    if (!querySnapshot.empty) {
      querySnapshot.forEach((doc) => {
        let row = doc.data()
        $('.like-count').html(row['num'])
      })
    }
  }

  getLatestDoc()

  $('.submit').click(async function () {
    let name = $('.name').val()
    let guestBook = $('.guestBook').val()

    if (name != '' && guestBook != '') {
      let doc = {
        name: name,
        guestBook: guestBook,
      }
      await addDoc(collection(db, 'guestBook'), doc)
      alert('작성 되었습니다.!')
      window.location.reload()
    } else {
      alert('빈칸을 작성해주세요^^')
    }
  })

  const getGuestBook = async () => {
    let docs = await getDocs(collection(db, 'guestBook'))

    docs.forEach((doc) => {
      let row = doc.data()
      console.log(row)

      let name = row['name']
      let guestBook = row['guestBook']

      var commnet_html = `            
                    <div class="card mb-3">
                        <div class="card-body">
                            <h3 class="card-text">${name}</h3>
                            <p class="card-title">${guestBook}</p>
                        </div>
                    </div>`

      $('.comments').append(commnet_html)
    })
  }

  getGuestBook()
}
