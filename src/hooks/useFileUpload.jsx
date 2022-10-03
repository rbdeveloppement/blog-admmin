import React, { useState } from 'react'

export const useFileUpload = () => {
  const [files, setFiles] = useState(null)
  let userCallback = (fileOrFiles) => {return null;}

  const onChange = async (e) => {
    const parsedFiles = []
    const target = e.target

    for (const fileIndex in target.files) {
      if (isNaN(fileIndex)) {
        continue
      }

      const file = target.files[fileIndex]
      const parsedFile = {
        src: URL.createObjectURL(file),
        name: file.name,
        size: file.size,
        file // original file object
      }
      parsedFiles.push(parsedFile)
    }

    target.removeEventListener('change', onChange)
    target.remove()

    if (target.multiple) {
      setFiles(parsedFiles)
      return userCallback(parsedFiles)
    }

    setFiles(parsedFiles[0])
    return userCallback(parsedFiles[0])

  }

  const uploadFile = ({ accept, multiple } = { accept: '', multiple: false }, callBack) => {
    if (typeof callBack === 'function') {
      userCallback = callBack
    }

    const inputElt = document.createElement('input')
    inputElt.type = 'file'
    inputElt.accept = accept
    inputElt.multiple = multiple
    inputElt.addEventListener('change', onChange)
    inputElt.click()
  }

  const clearFile = () => {
    setFiles(null);
  }

  return React.useMemo(() => [files, uploadFile, clearFile], [files])
}