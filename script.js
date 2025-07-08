document.addEventListener('DOMContentLoaded', () => {
    const accountNumberSpan = document.getElementById('accountNumber');
    const copyButton = document.getElementById('copyButton');
    const copyMessage = document.getElementById('copyMessage');
    const actualAccountNumber = "1002-756-591624"; // 실제 복사될 계좌번호 (UI에 보이는 것과 동일)

    // 계좌번호 텍스트 자체를 클릭했을 때 복사
    accountNumberSpan.addEventListener('click', () => {
        copyToClipboard(actualAccountNumber);
    });

    // '복사하기' 버튼 클릭 시 복사
    copyButton.addEventListener('click', () => {
        copyToClipboard(actualAccountNumber);
    });

    /**
     * 지정된 텍스트를 클립보드에 복사하고 메시지를 표시합니다.
     * @param {string} text - 클립보드에 복사할 텍스트
     */
    function copyToClipboard(text) {
        // navigator.clipboard API 사용 (최신 브라우저 권장)
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(text)
                .then(() => {
                    displayMessage('계좌번호가 클립보드에 복사되었습니다!', 'success');
                })
                .catch(err => {
                    console.error('클립보드 복사 실패:', err);
                    displayMessage('클립보드 복사에 실패했습니다. 직접 복사해주세요: ' + text, 'error');
                });
        } else {
            // 구형 브라우저 또는 navigator.clipboard를 사용할 수 없는 경우 대체 방법
            const textArea = document.createElement("textarea");
            textArea.value = text;
            // 화면에서 보이지 않게 배치
            textArea.style.position = "fixed";
            textArea.style.top = "-9999px";
            textArea.style.left = "-9999px";
            textArea.style.opacity = "0";

            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();

            try {
                const successful = document.execCommand('copy');
                if (successful) {
                    displayMessage('계좌번호가 클립보드에 복사되었습니다!', 'success');
                } else {
                    displayMessage('계좌번호 복사에 실패했습니다. 직접 복사해주세요: ' + text, 'error');
                }
            } catch (err) {
                console.error('execCommand 복사 실패:', err);
                displayMessage('계좌번호 복사에 실패했습니다. 직접 복사해주세요: ' + text, 'error');
            } finally {
                document.body.removeChild(textArea);
            }
        }
    }

    /**
     * 사용자에게 메시지를 표시하고 일정 시간 후 사라지게 합니다.
     * @param {string} message - 표시할 메시지 텍스트
     * @param {string} type - 메시지 타입 ('success' 또는 'error')
     */
    function displayMessage(message, type) {
        copyMessage.textContent = message;
        copyMessage.className = `message ${type}`; // 클래스 추가로 스타일 변경

        // 3초 후 메시지 사라지게
        setTimeout(() => {
            copyMessage.textContent = '';
            copyMessage.className = 'message'; // 클래스 초기화
        }, 3000);
    }
});