async function copyEmail(email) {
    try {
        await navigator.clipboard.writeText(email);
        alert("이메일 복사에 성공했습니다");
    } catch (err) {
        console.error('Failed to copy: ', err);
        alert("이메일 복사에 실패했습니다");
    }
}

document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('.fa-envelope-open').addEventListener('click', function() {
        const email = 'ghdwjdrl56@naver.com';
        copyEmail(email);
    });
});
