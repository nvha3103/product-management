// Button status

const buttonStatus = document.querySelectorAll("[button-status]")  // cac thuoc ting tu dinh nghia su dung []
if (buttonStatus.length > 0) {
    let url = new URL(window.location.href)
    buttonStatus.forEach(button => {
        button.addEventListener("click", () => {
            const status = button.getAttribute("button-status")
            console.log(status)

            if (status) {
                url.searchParams.set("status", status)
            } else {
                url.searchParams.delete("status")
            }

            window.location.href = url.href; // Cau lenh nay giup chuyen huong sang url moi

        })
    })
}

// End Button status

// Form search
const formSearch = document.querySelector("#form-search")
if (formSearch) {
    let url = new URL(window.location.href)

    formSearch.addEventListener("submit", (e) => {
        e.preventDefault()
        const keyword = e.target.elements.keyword.value;
        if (keyword) {
            url.searchParams.set("keyword", keyword)
        } else {
            url.searchParams.delete("keyword")
        }
        window.location.href = url.href
    })
}
// End Form Search 

//pagination
const buttonsPagination = document.querySelectorAll("[button-pagination]")

if (buttonsPagination) {
    let url = new URL(window.location.href)

    buttonsPagination.forEach(button => {
        button.addEventListener("click", () => {
            const page = button.getAttribute("button-pagination")
            console.log(page);

            url.searchParams.set("page", page);
            window.location.href = url.href
        })


    })
}
// end pagination

// checkbox multi
const checkboxMulti = document.querySelector("[checkbox-multi]");
if (checkboxMulti) {
    // console.log(checkboxMulti)
    const inputCheckAll = checkboxMulti.querySelector("input[name='checkall']")
    const inputsId = checkboxMulti.querySelectorAll("input[name='id']")
    // console.log(inputsId)
    // console.log(inputCheckAll)

    inputCheckAll.addEventListener("click", () => {
        // console.log(inputCheckAll.checked)

        if (inputCheckAll.checked) {
            // console.log("Check tat ca")
            inputsId.forEach(input => {
                input.checked = true;
            })
        } else {
            // console.log("Bo check tat ca")
            inputsId.forEach(input => {
                input.checked = false;
            })
        }
    })

    inputsId.forEach(input => {
        input.addEventListener("click", () => {
            const countChecked = checkboxMulti.querySelectorAll("input[name='id']:checked").length // tim các ô input đã check

            // console.log(countChecked);
            // console.log(inputsId.length);

            if (countChecked == inputsId.length) {
                inputCheckAll.checked = true
            } else {
                inputCheckAll.checked = false
            }
        })
    })
}
// end checkbox multi

// form change multi
const formChangeMulti = document.querySelector("[form-change-multi]")

if (formChangeMulti) {
    formChangeMulti.addEventListener("submit", (e) => {
        e.preventDefault();
        // console.log(e);
        const checkboxMulti = document.querySelector("[checkbox-multi]");
        const inputsChecked = checkboxMulti.querySelectorAll("input[name='id']:checked");

        // console.log(inputsChecked)

        const typeChange = e.target.elements.type.value;
        if (typeChange == "delete-all") {
            const isConfirm = confirm("Ban co chac muon xoa khong?")
            if (!isConfirm) {
                return;
            }
        }

        if (inputsChecked.length > 0) {
            let ids = [];
            const inputIds = formChangeMulti.querySelector("input[name='ids']");
            inputsChecked.forEach(input => {
                const id = input.value;
                if (typeChange == "change-position") {
                    const position = input
                        .closest("tr")
                        .querySelector("input[name='position']").value; //tim ra the ch tr rooi sau do moi tim den the td chua input co name la position
                    // console.log(`${id}-${position}`)
                    ids.push(`${id}-${position}`)
                } else {
                    ids.push(id);
                }
                // ids.push(id);
            })
            // console.log(ids.join(", "))
            inputIds.value = ids.join(", ")

            formChangeMulti.submit();
        } else {
            alert("Vui long chon it nhat moot ban ghi")
        }
    })
}
// end form change multi

//Shơ alert
const showAlert = document.querySelector('[show-alert]')
if (showAlert) {
    const time = parseInt(showAlert.getAttribute("data-time"))
    const closeAlert = showAlert.querySelector("[close-alert]");
    setTimeout(() => {
        showAlert.classList.add("alert-hidden")
    }, time)

    closeAlert.addEventListener("click", () => {
        showAlert.classList.add("alert-hidden")
    })
}
// show alert


// upload image
const uploadImage = document.querySelector("[upload-image]")
if (uploadImage) {
    const uploadImageInput = uploadImage.querySelector("[upload-image-input]")
    const uploadImagePreview = uploadImage.querySelector("[upload-image-preview]")

    uploadImageInput.addEventListener("change", (e) => {
        console.log(e)
        const file = e.target.files[0]
        if (file) {
            uploadImagePreview.src = URL.createObjectURL(file)
        }
    })
}
// end upload image

// Sort

// const sort = document.querySelector("[sort]")
// console.log('sort: ', sort)

// if (sort) {
//     const sortSelect = sort.querySelector("[sort-select]")
//     const sortClear = sort.querySelector("[sort-clear]")
//     const url = new URL(window.location.href)

//     sortSelect.addEventListener("change", (e) => {
//         // console.log(e)
//         // console.log(e.target.value)

//         const value = e.target.value
//         // console.log(value.split("-"))
//         const [sortKey, sortValue] = value.split("-")

//         url.searchParams.set("sortKey", sortKey)
//         url.searchParams.set("sortValue", sortValue)

//         window.location.href = url.href
//     });

//     // clear sort
//     sortClear.addEventListener("click", () => {
//         url.searchParams.delete("sortKey")
//         url.searchParams.delete("sortValue")
//         window.location.href = url.href
//     })

//     // them selected cho option
//     const sortKey = url.searchParams.get("sortKey")
//     const sortValue = url.searchParams.get("sortValue")


//     if (sortKey && sortValue) {
//         const stringSort = `${sortKey}-${sortValue}`
//         // console.log(stringSort)
//         const optionSelected = sortSelect.querySelector(`option[value="${stringSort}"]`)
//         // console.log(optionSelected)
//         if (optionSelected) {
//             optionSelected.selected = true; // voi cac thuoc tinh mặc định ta . luôn để lấy tên của thuộc tính đó, nếu không có thể sử dụng getAttribute để lấy giá trị của thuộc tính đó
//         }
//     }

// }

const sort = document.querySelector("[sort]")

if (sort) {
    const sortSelect = sort.querySelector("[sort-select]")
    const sortClear = sort.querySelector("[sort-clear]")

    console.log("sortSelect: ", sortSelect)
    console.log("sortClear: ", sortClear)

    const url = new URL(window.location.href)

    sortSelect.addEventListener("change", (e) => {
        const value = e.target.value
        const [sortKey, sortValue] = value.split("-")

        url.searchParams.set("sortKey", sortKey)
        url.searchParams.set("sortValue", sortValue)
        window.location.href = url.href
    })

    sortClear.addEventListener("click", () => {
        url.searchParams.delete("sortKey")
        url.searchParams.delete("sortValue")
        window.location.href = url.href
    })

    const sortKey = url.searchParams.get("sortKey")
    const sortValue = url.searchParams.get("sortValue")
    if (sortKey && sortValue) {
        const stringSort = `${sortKey}-${sortValue}`
        const optionSelected = sortSelect.querySelector(`option[value="${stringSort}"]`)
        if (optionSelected) {
            optionSelected.selected = true
        }
    }
}
// end sort