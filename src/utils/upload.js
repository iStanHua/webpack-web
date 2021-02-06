// utils/upload.js

/**
 * 截图粘贴
 * @param selector
 * @param callback
 */
export function pasteImage(selector, callback) {
  document.querySelector(selector).addEventListener('paste', function (event) {
    const items = (event.clipboardData || event.originalEvent.clipboardData).items
    for (let i in items) {
      let item = items[i]
      if (item.kind === 'file' && item.type.indexOf('image') > -1) {
        const blob = item.getAsFile()

        const reader = new FileReader()
        reader.onload = function (e) {
          if (typeof callback === 'function')
            callback(e.target.result, { type: item.type, kind: item.kind }, e)
        }
        reader.readAsDataURL(blob)
      }
    }
  });
};

/**
 * 拖拽上传
 * @param selector
 * @param callback
 */
export function dragUpload(selector, callback) {
  const element = document.querySelector(selector)
  element.addEventListener('drop', function (e) {
    e.preventDefault()

    let files = e.dataTransfer.files
    for (let i = 0; i < files.length; i++) {
      let item = files[i]
      const reader = new FileReader()
      reader.onload = function (event) {
        if (typeof callback === 'function')
          callback(event.target.result, { type: item.type, name: item.name }, event)
      };
      reader.readAsDataURL(files[i])
    }
    return false
  })

  element.addEventListener('dragenter', function (e) {
    e.stopPropagation()
    e.preventDefault()
  })

  element.addEventListener('dragover', function (e) {
    e.dataTransfer.dropEffect = 'copy'
    e.stopPropagation()
    e.preventDefault()
  })

  document.body.addEventListener('dragover', function (e) {
    e.stopPropagation()
    e.preventDefault()
    return false
  })
}