tinymce.init({
    selector: 'textarea.textarea-tinymce',
    plugins: 'image',
    file_picker_callback: function (cb, value, meta) {
        var input = document.createElement('input');
        input.setAttribute('type', 'file');
        input.setAttribute('accept', 'image/*');

        input.onchange = function() {
            var file = this.files[0];
            var reader = new FileReader(); // Sửa từ render thành reader

            reader.onload = function() {
                var id = 'blobid' + (new Date()).getTime();
                // Sửa từ tiny thành tinymce
                var blobCache = tinymce.activeEditor.editorUpload.blobCache;
                var base64 = reader.result.split(',')[1];
                var blobInfo = blobCache.create(id, file, base64);
                blobCache.add(blobInfo);

                // Gọi callback để đưa đường dẫn blob vào thanh Source
                cb(blobInfo.blobUri(), { title: file.name });
            };
            reader.readAsDataURL(file); 
        };
        input.click();
    }
});