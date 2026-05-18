// Permissions
const tablePermissions = document.querySelector('table[table-permissions]');

if (tablePermissions) {
    const buttonSubmit = document.querySelector('[button-submit]');
    buttonSubmit.addEventListener('click', () => {
        let permissions = [];
        const rows = tablePermissions.querySelectorAll('[data-name]');
        // console.log(rows);

        rows.forEach(row => {
            const name = row.getAttribute('data-name');
            const inputs = row.querySelectorAll('input');
            // console.log(name);
            if (name == "id") {
                inputs.forEach(input => {
                    const id = input.value;
                    permissions.push({
                        id: id,
                        permissions: []
                    })
                })

            } else {
                inputs.forEach((input, index) => {
                    const checked = input.checked;
                    //console.log(name)
                    //console.log(index)
                    //console.log(checked);
                    if (checked) {
                        permissions[index].permissions.push(name);
                    }

                })
            }
        })

        if (permissions.length > 0) {
            const formChangePermissions = document.querySelector('#form-change-permissions');
            const inputPermissions = formChangePermissions.querySelector('input[name="permissions"]');
            inputPermissions.value = JSON.stringify(permissions);
            formChangePermissions.submit();
        }
    });
}
// End Permissions


// permissions data default
const dataRecords = document.querySelector('[data-records]');
// console.log(dataRecords);
if (dataRecords) {
    const records = JSON.parse(dataRecords.getAttribute('data-records'));
    console.log("records: ", records);
    const tablePermissions = document.querySelector('[table-permissions]');

    records.forEach((record, index) => {
        const permissions = record.permissions;

        // console.log("permissions: ", permissions);
        permissions.forEach(permission => {
            // console.log("permission: ", permission);
            // console.log("index: ", index);
            const row = tablePermissions.querySelector(`[data-name="${permission}"]`);
            const input = row.querySelectorAll('input')[index];
            input.checked = true;
        })


    })
}

// end permissions data default