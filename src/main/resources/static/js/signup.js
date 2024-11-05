const userName = document.querySelector("#userName");
const checkExistButton = document.querySelector("#checkExist");
const userPassword = document.querySelector("#userPassword");
const confirmPassword = document.querySelector("#confirmPassword");

const form = document.querySelector("#signupForm");

// 폼 처리 관련.
form.addEventListener("submit", handleSignupAdminForm);

// 아이디 중복 검사 버튼.
checkExistButton.addEventListener("click", handleCheckButton);

let exist = false;

function handleCheckButton(){
    const existId = document.querySelector("#existId");
    const notExistId = document.querySelector("#notExistId");
    const data = {
        username: userName.value
    }
    fetch("/api/signup/checkExisting", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    }).then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error("확인 실패.");
        }
    }).then(data => {
        if (data.code === 204) { // 가능 (204는 성공적으로 실행됐는데 반환된 값이 없는 경우.)
            existId.classList.add("d-none");
            notExistId.classList.remove("d-none");
            exist = true;
        } else if (data.code === 200) { // 불가능. (성공적으로 실행되었고 반환값도 있음.)
            notExistId.classList.add("d-none");
            existId.classList.remove("d-none");
            exist = false;
        }
    }).catch((error) => {
        console.error('Error:', error);
        exist = false;
    });
}

function handleSignupAdminForm (event) {
    event.preventDefault();

    // 유효한 경우.
    if (validateForm()) {
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);

        fetch("/api/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        }).then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error("회원가입 실패.");
            }
        })
            .then(data => {
                if (data.status === "success") {
                    console.log(data.status);
                    alert("회원가입 성공.")
                    window.location.href = "/login/form";
                } else {
                    console.log(data.status)
                    console.log(data.message);
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }
}

function validateForm() {
    const complete = exist && validateConfirmPassword();
    if (complete) {
        return true;
    }
    alert("아이디 중복 검사를 해주세요!");
    return false;
}

function validateConfirmPassword() {
    if (userPassword.value !== confirmPassword.value) {
        confirmPassword.classList.add("is-invalid");
        return false;
    } else {
        confirmPassword.classList.remove("is-invalid");
        return true;
    }
}